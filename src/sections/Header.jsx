import { useEffect, useState } from 'react'
import Logo from '../components/Logo'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { nav, pages } from '../data/site'
import { useSavedCourses } from '../lib/savedCourses'

/**
 * Hero 위에서는 투명하게 사진과 겹치고,
 * Hero를 지나면 아이보리 바탕의 헤더로 바뀝니다.
 *
 * 다른 페이지에서 재사용할 때:
 * - items: 메뉴 항목 (기본값은 메인 페이지 메뉴)
 * - overlay: false 면 사진 없이 처음부터 아이보리 헤더
 * - current: 현재 페이지에 해당하는 메뉴의 href (aria-current 로 표시)
 * - logoHref: 로고 링크 대상
 * - onLanguageChange: 언어를 골랐을 때 실행할 함수 (시안에서는 넘기지 않아 아무 일도 일어나지 않음)
 */
export default function Header({ items = nav, overlay = true, current, logoHref = '#top', onLanguageChange }) {
  const [solid, setSolid] = useState(!overlay)
  const [open, setOpen] = useState(false)
  const { saved } = useSavedCourses()
  // '담은 코스' 옆에 담은 개수를 작게 표시합니다 (0개면 숨김).
  const badge = (item) =>
    item.href === pages.saved && saved.length > 0 ? (
      <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-sage px-1.5 font-sans text-[15px] font-semibold leading-none text-paper">
        {saved.length}
        <span className="sr-only">개 담음</span>
      </span>
    ) : null

  useEffect(() => {
    if (!overlay) return
    const onScroll = () => {
      const hero = document.getElementById('hero')
      const limit = hero ? hero.offsetHeight - 88 : 400
      setSolid(window.scrollY > limit)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [overlay])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  // 화면이 넓어져 메뉴가 바로 보이게 되면(640px 이상) 열려 있던 모바일 메뉴를 닫습니다.
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 640px)')
    const onChange = (e) => e.matches && setOpen(false)
    wide.addEventListener('change', onChange)
    return () => wide.removeEventListener('change', onChange)
  }, [])

  const onPhoto = !solid && !open
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        onPhoto ? 'bg-transparent text-paper' : 'border-b border-rule bg-paper/95 text-ink backdrop-blur-sm'
      }`}
    >
      <div className="container-journal flex h-[72px] items-center justify-between md:h-[84px]">
        <Logo variant={onPhoto ? 'light' : 'dark'} size="header" swap={overlay} href={logoHref} />

        <nav aria-label="주 메뉴" className="hidden items-center gap-7 sm:ml-auto sm:flex lg:gap-9">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={item.href === current ? 'page' : undefined}
              className="inline-flex min-h-11 items-center text-[17px] font-medium opacity-90 decoration-sage decoration-[1.5px] underline-offset-[10px] hover:opacity-100 aria-[current=page]:underline aria-[current=page]:opacity-100"
            >
              {item.label}
              {badge(item)}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:ml-5 lg:ml-8">
          {/* 언어 선택 — 헤더 글자색(currentColor)을 따라 사진 위에서는 흰색, 아이보리 헤더에서는 어두운 색 */}
          <LanguageSwitcher onChange={onLanguageChange} />
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-[17px] font-medium sm:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '닫기' : '메뉴'}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="주 메뉴" className="h-[calc(100svh-72px)] border-t border-rule bg-paper sm:hidden">
          <ul className="container-journal pt-6">
            {items.map((item) => (
              <li key={item.label} className="border-b border-rule">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={item.href === current ? 'page' : undefined}
                  className="flex min-h-16 items-center font-serif text-[24px] aria-[current=page]:text-sage"
                >
                  {item.label}
                  {badge(item)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
