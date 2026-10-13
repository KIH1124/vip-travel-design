import { copyFileSync, mkdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { courseList } from './src/data/site.js'

const root = import.meta.dirname
const slugs = courseList.map((c) => c.slug)

/*
 * 페이지 주소 규칙 (개발 서버 · 미리보기 서버 공통)
 *
 *   /courses/{slug}/  → 코스 상세 템플릿
 *   /courses/{slug}   → /courses/{slug}/ 로 이동 (끝 슬래시 정리)
 *   /courses, /saved, /coming-soon → 끝에 / 를 붙인 주소로 이동
 *   없는 코스 ID       → 404 페이지 ('여행 코스를 찾을 수 없습니다'), 상태 코드 404
 *   그 밖의 없는 주소   → 404 페이지 ('페이지를 찾을 수 없습니다'), 상태 코드 404
 *
 * SPA fallback(모든 주소에 메인 index.html)은 쓰지 않습니다 — appType: 'mpa'.
 * 빌드 때는 상세 템플릿을 dist/courses/{slug}/index.html 로 코스마다 복사해,
 * 정적 호스팅에서도 같은 주소로 열리게 합니다. 배포 설정은 README 를 보세요.
 */
function pageRoutes() {
  const redirect = (res, location) => {
    // 개발·미리보기에서는 브라우저가 기억하지 않도록 302 를 씁니다 (배포에서는 301 권장).
    res.statusCode = 302
    res.setHeader('Location', location)
    res.end()
  }

  // 주소 정리: 끝 슬래시와 코스 상세 템플릿 연결
  const before = (notFound) => (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next()
    const [path, query] = (req.url ?? '/').split('?')
    const q = query ? `?${query}` : ''
    if (path === '/courses' || path === '/saved' || path === '/coming-soon') return redirect(res, `${path}/${q}`)
    const m = path.match(/^\/courses\/([^/.]+)(\/?)$/)
    if (m) {
      if (!m[2]) return redirect(res, `${path}/${q}`)
      if (!slugs.includes(m[1])) return notFound(req, res)
      req.url = `/course/index.html${q}`
    }
    next()
  }

  // 어디에도 해당하지 않는 HTML 요청은 404 페이지로
  const after = (notFound) => (req, res, next) => {
    const path = (req.url ?? '/').split('?')[0]
    const wantsHtml = req.headers.accept?.includes('text/html')
    if ((req.method === 'GET' || req.method === 'HEAD') && wantsHtml && !path.endsWith('.html')) return notFound(req, res)
    next()
  }

  const send404 = (res, html) => {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(html)
  }

  return {
    name: 'page-routes',
    configureServer(server) {
      // 개발 서버: 404.html 도 Vite 변환을 거쳐야 스크립트가 동작합니다.
      const notFound = async (req, res) => {
        const html = readFileSync(resolve(root, '404.html'), 'utf8')
        send404(res, await server.transformIndexHtml(req.originalUrl ?? req.url, html))
      }
      server.middlewares.use(before(notFound))
      return () => server.middlewares.use(after(notFound))
    },
    configurePreviewServer(server) {
      const notFound = (_req, res) => send404(res, readFileSync(resolve(root, 'dist/404.html'), 'utf8'))
      server.middlewares.use(before(notFound))
      return () => server.middlewares.use(after(notFound))
    },
    closeBundle() {
      const template = resolve(root, 'dist/course/index.html')
      for (const slug of slugs) {
        const dir = resolve(root, 'dist/courses', slug)
        mkdirSync(dir, { recursive: true })
        copyFileSync(template, resolve(dir, 'index.html'))
      }
    },
  }
}

// 페이지마다 HTML 진입점을 하나씩 둡니다 (라우터 없이 /, /courses/, /courses/{slug}/, /saved/, /coming-soon/, 404).
export default defineConfig({
  appType: 'mpa',
  plugins: [react(), tailwindcss(), pageRoutes()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        courses: resolve(root, 'courses/index.html'),
        course: resolve(root, 'course/index.html'),
        saved: resolve(root, 'saved/index.html'),
        reserve: resolve(root, 'coming-soon/index.html'),
        notfound: resolve(root, '404.html'),
      },
    },
  },
})
