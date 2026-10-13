import { useEffect } from 'react'
import Header from '../sections/Header'
import Footer from '../sections/Footer'
import NotFound, { notFoundVariant } from '../components/NotFound'
import { notFound, pages } from '../data/site'

/**
 * 404 페이지 (dist/404.html). 정적 호스팅은 없는 주소에 이 파일을 보여 줍니다.
 * 메인 페이지로 대신 보내지 않습니다.
 */
export default function NotFoundPage() {
  const variant = notFoundVariant(window.location.pathname)

  useEffect(() => {
    document.title = `${notFound[variant].title} — 여정`
  }, [variant])

  return (
    <div id="top">
      <Header overlay={false} current={variant === 'course' ? pages.courses : undefined} logoHref={pages.home} />
      <main className="pt-[72px] md:pt-[84px]">
        <NotFound variant={variant} />
      </main>
      <Footer />
    </div>
  )
}
