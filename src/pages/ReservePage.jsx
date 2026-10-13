import { useRef } from 'react'
import Header from '../sections/Header'
import Footer from '../sections/Footer'
import Button from '../components/Button'
import Photo from '../components/Photo'
import ReserveForm from '../components/ReserveForm'
import useParallax from '../hooks/useParallax'
import { findCourse, hero as mainHero, pages, reservePage } from '../data/site'

/**
 * 사전예약 페이지 (/coming-soon/).
 * 메인과 같은 사진·서체·색으로 Hero → 서비스 소개 → 코스 → 신청 폼 순서로 이어집니다.
 */
export default function ReservePage() {
  return (
    <div id="top">
      <a href="#reserve" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-3">
        신청 폼으로 건너뛰기
      </a>
      <Header logoHref={pages.home} />
      <main>
        <ReserveHero />
        <Intro />
        <Courses />
        <section id="reserve" aria-labelledby="reserve-title" className="scroll-mt-[72px] bg-linen py-16 md:scroll-mt-[84px] md:py-24 lg:py-28">
          <ReserveForm />
        </section>
      </main>
      <Footer />
    </div>
  )
}

/** 메인 Hero 사진을 그대로 쓰되, 신청 폼까지 빨리 닿도록 높이를 낮춥니다. */
function ReserveHero() {
  const { hero } = reservePage
  const sectionRef = useRef(null)
  const photoRef = useRef(null)
  useParallax(sectionRef, photoRef, { speed: 0.25, mobileSpeed: 0.12 })

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-title"
      className="relative h-[72svh] min-h-[560px] w-full overflow-hidden text-paper md:h-[66svh] md:min-h-[580px] lg:max-h-[760px]"
    >
      <div ref={photoRef} className="absolute inset-0">
        <Photo image={mainHero.image} position={mainHero.image.position} positionMobile={mainHero.image.positionMobile} eager className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-[#1e211c]/25" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#1e211c]/35 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#1e211c]/60 to-transparent" aria-hidden="true" />

      <div className="container-journal relative flex h-full flex-col justify-end pb-10 md:pb-14">
        <p className="label-ko text-paper">{hero.eyebrow}</p>
        <h1 id="hero-title" className="type-hero mt-4">
          {hero.titleLines.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </h1>
        <p className="type-lead mt-5 max-w-[36rem] text-paper/95">{hero.body}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 md:mt-8">
          <Button as="a" href="#reserve" variant="primary" className="w-full text-[18px] active:translate-y-px sm:w-auto sm:min-w-[240px]">
            {hero.cta}
            <span aria-hidden="true">↓</span>
          </Button>
          <p className="text-[16px] text-paper/90">{hero.note}</p>
        </div>
      </div>
    </section>
  )
}

function Intro() {
  const { intro } = reservePage
  return (
    <section aria-labelledby="intro-title" className="bg-paper py-16 md:py-24 lg:py-28">
      <div className="container-journal">
        <header className="max-w-3xl">
          <p className="label-ko text-brass-ink">{intro.eyebrow}</p>
          <h2 id="intro-title" className="type-section mt-4">{intro.title}</h2>
        </header>
        <ol className="mt-12 grid gap-x-16 md:mt-14 md:grid-cols-2">
          {intro.items.map((item) => (
            <li key={item.no} className="grid grid-cols-[3.25rem_1fr] gap-x-4 border-t border-rule py-7 md:grid-cols-[4rem_1fr] md:py-9 [&:nth-last-child(-n+2)]:md:border-b">
              <span aria-hidden="true" className="font-latin text-[30px] font-medium leading-none text-brass-ink md:text-[36px]">
                {item.no}
              </span>
              <div>
                <h3 className="font-serif text-[22px] font-medium leading-snug md:text-[24px]">{item.title}</h3>
                <p className="type-body mt-2.5 text-ink-soft">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/** 목록 페이지 카드와 같은 사진 비율·서체. 기존 사전예약 페이지처럼 가격은 싣지 않습니다. */
function Courses() {
  const { courses } = reservePage
  return (
    <section aria-labelledby="reserve-courses-title" className="border-t border-rule bg-paper py-16 md:py-24 lg:py-28">
      <div className="container-journal">
        <header className="max-w-3xl">
          <p className="label-ko text-brass-ink">{courses.eyebrow}</p>
          <h2 id="reserve-courses-title" className="type-section mt-4">{courses.title}</h2>
        </header>
        <ul className="mt-12 grid gap-x-10 gap-y-12 md:mt-14 md:grid-cols-2 lg:gap-x-14 lg:gap-y-16">
          {courses.items.map((item) => {
            const course = findCourse(item.slug)
            return (
              <li key={item.slug} className="border-b border-rule pb-6">
                <Photo image={course.image} hint={course.title} className="aspect-[3/2] w-full" sizes="(min-width: 768px) 46vw, 100vw" />
                <p className="label-ko mt-5 text-ink-soft">
                  {item.region} · {item.duration}
                </p>
                <h3 className="mt-2 font-serif text-[24px] font-medium leading-[1.4] tracking-[-0.01em] md:text-[28px]">{course.title}</h3>
                <p className="mt-2 text-[17px] text-ink-soft md:text-[18px]">{item.line}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
