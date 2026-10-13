import { useState } from 'react'
import Header from '../sections/Header'
import Footer from '../sections/Footer'
import Button from '../components/Button'
import Photo from '../components/Photo'
import { courseHref, findCourse, pages, savedPage } from '../data/site'
import { removeSaved, useSavedCourses } from '../lib/savedCourses'

/** 담은 코스 — 이 기기에 저장된 코스를 모아 보고, 빼거나 한 번에 상담을 신청(시안)합니다. */
export default function SavedPage() {
  const { saved, persistent } = useSavedCourses()
  const items = saved.map(findCourse).filter(Boolean)
  const [notice, setNotice] = useState(false)

  return (
    <div id="top">
      <a href="#saved-list" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-3">
        본문으로 건너뛰기
      </a>
      <Header overlay={false} current={pages.saved} logoHref={pages.home} />

      <main className="pt-[72px] md:pt-[84px]">
        <header className="container-journal pb-10 pt-14 md:pb-12 md:pt-20">
          <p className="label-latin text-brass-ink">{savedPage.label}</p>
          <h1 className="type-hero mt-4">{savedPage.title}</h1>
          <p className="type-lead mt-5 max-w-[40rem] text-ink-soft">{savedPage.intro}</p>
          <p className="mt-3 text-[16px] text-ink-mute">
            {persistent ? '시안이라 서버에는 저장되지 않고, 이 브라우저에만 남습니다.' : savedPage.memoryOnly}
          </p>
        </header>

        <section id="saved-list" aria-label="담은 코스 목록" className="container-journal pb-20 md:pb-28">
          {items.length ? (
            <>
              <p role="status" className="border-b border-ink/70 pb-4 text-[17px]">
                <span className="font-serif text-[20px] font-medium">{items.length}</span>개의 코스를 담으셨습니다
              </p>
              <ul>
                {items.map((c) => (
                  <li key={c.slug} className="grid grid-cols-[7.5rem_1fr] gap-x-5 gap-y-4 border-b border-rule py-6 sm:grid-cols-[12rem_1fr_auto] sm:items-center md:grid-cols-[15rem_1fr_auto] md:gap-x-8">
                    <a href={courseHref(c.slug)} tabIndex={-1} aria-hidden="true" className="block">
                      <Photo image={c.image} hint={c.title} className="aspect-[4/3] w-full" />
                    </a>
                    <div className="min-w-0">
                      <p className="label-ko text-ink-soft">
                        {c.region} · {c.duration} · <span className="text-brass-ink">{c.type}</span>
                      </p>
                      <h2 className="mt-1.5 font-serif text-[22px] font-medium leading-snug md:text-[26px]">
                        <a href={courseHref(c.slug)} className="inline-flex min-h-11 items-center underline decoration-transparent decoration-1 underline-offset-[6px] hover:decoration-brass">
                          {c.title}
                        </a>
                      </h2>
                      <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
                        <span className="font-serif text-[21px] font-medium md:text-[23px]">{c.price.amount}</span>
                        <span className="text-[16px] text-ink-soft">부터 · {c.price.vehicle}</span>
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => removeSaved(c.slug)}
                      aria-label={`${c.title} ${savedPage.remove}`}
                      className="col-span-2 min-h-[48px] w-full px-6 active:translate-y-px sm:col-span-1 sm:w-auto"
                    >
                      {savedPage.remove}
                    </Button>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col items-stretch gap-4 sm:items-end">
                <Button type="button" variant="primary" onClick={() => setNotice(true)} className="w-full text-[18px] active:translate-y-px sm:w-auto sm:min-w-[320px]">
                  {savedPage.cta}
                </Button>
                {notice && (
                  <p role="status" className="text-[16px] leading-relaxed text-ink-soft sm:text-right">
                    {savedPage.ctaDemo} 담으신 코스: {items.map((c) => c.title).join(', ')}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="border-y border-rule py-16 text-center">
              <p className="font-serif text-[22px] md:text-[24px]">{savedPage.empty}</p>
              <Button as="a" href={pages.courses} variant="outline" className="mt-6 min-w-[220px]">
                {savedPage.browse}
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
