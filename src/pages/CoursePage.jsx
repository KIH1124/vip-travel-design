import { useEffect } from 'react'
import Header from '../sections/Header'
import Footer from '../sections/Footer'
import BookingPanel from '../components/BookingPanel'
import Photo from '../components/Photo'
import PhotoCredit from '../components/PhotoCredit'
import SampleTag from '../components/SampleTag'
import Timetable from '../components/Timetable'
import NotFound from '../components/NotFound'
import { coursePage, findCourse, notFound, pages } from '../data/site'

// 주소 /courses/{slug} 또는 /courses/{slug}/ 에서 코스를 찾습니다.
const slugFromPath = () => window.location.pathname.split('/').filter(Boolean)[1] ?? ''

export default function CoursePage() {
  const slug = slugFromPath()
  const course = findCourse(slug)

  useEffect(() => {
    document.title = `${course ? course.title : notFound.course.title} — 여정`
  }, [course])

  return (
    <div id="top">
      <a href="#course-main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-3">
        본문으로 건너뛰기
      </a>
      <Header
        overlay={false}
        current={pages.courses}
        logoHref={pages.home}
      />

      <main id="course-main" className="pt-[72px] md:pt-[84px]">
        {course ? <CourseDetail course={course} /> : <NotFound variant="course" />}
      </main>

      <Footer />
    </div>
  )
}

function CourseDetail({ course }) {
  return (
    <article aria-labelledby="course-title" className="container-journal pb-20 md:pb-28">
      <a href={pages.courses} className="link-journal mt-6 text-[17px] md:mt-8">
        <span aria-hidden="true">←</span> {coursePage.back}
      </a>

      {/* 제목 영역 */}
      <header className="mt-6 max-w-[52rem] md:mt-8">
        <p className="label-ko text-ink-soft">
          {course.region} · {course.duration} · <span className="text-brass-ink">{course.type}</span>
        </p>
        <h1 id="course-title" className="type-hero mt-4">{course.title}</h1>
        <p className="type-lead mt-5 text-ink-soft">
          {course.description}
          {course.descriptionIsSample && <SampleTag />}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[17px]">
          <span className="font-medium text-sage">{course.departure}</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="이 코스에서 들르는 곳">
            {course.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2.5 text-ink-soft">
                <span aria-hidden="true" className="h-px w-4 bg-brass" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* 본문 + 예약 패널 */}
      <div className="mt-10 grid gap-14 md:mt-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-12 xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-16">
        <div className="min-w-0">
          <figure>
            <Photo image={course.image} hint={course.title} eager className="aspect-[3/2] w-full" sizes="(min-width: 1024px) 60vw, 100vw" />
            <figcaption className="mt-3">
              <PhotoCredit credit={course.image.credit} />
            </figcaption>
          </figure>

          <section aria-labelledby="schedule-title" className="mt-14 md:mt-16">
            <p className="label-latin text-brass-ink">{coursePage.scheduleLabel}</p>
            <h2 id="schedule-title" className="type-section mt-3">{coursePage.scheduleTitle}</h2>
            <Timetable days={course.days} size="lg" headingLevel={3} className="mt-8" />
          </section>

          <section aria-label="포함 · 불포함" className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-12 md:mt-16">
            <IncludeList title={coursePage.includesTitle} items={course.includes} accent />
            <IncludeList title={coursePage.excludesTitle} items={course.excludes} />
          </section>
        </div>

        <BookingPanel course={course} />
      </div>
    </article>
  )
}

function IncludeList({ title, items, accent = false }) {
  return (
    <div>
      <h2 className={`border-b pb-3 font-serif text-[24px] font-medium md:text-[26px] ${accent ? 'border-sage text-sage' : 'border-ink/70'}`}>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item} className="border-b border-rule py-4 text-[18px] md:text-[19px]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
