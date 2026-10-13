import { useEffect, useMemo, useState } from 'react'
import Header from '../sections/Header'
import Footer from '../sections/Footer'
import CourseCard from '../components/CourseCard'
import FilterGroup from '../components/FilterGroup'
import { courseFilters, courseList, coursesPage, pages } from '../data/site'

const { region: regionFilter, type: typeFilter } = courseFilters

// 쿼리 값(seoul, day …) → 코스 데이터의 표기(서울 · 경기, 당일여행 …)
const labelOf = (filter, value) => filter.options.find((o) => o.value === value)?.label

// 주소의 ?region=…&type=… 을 읽습니다. 모르는 값은 무시합니다.
function readQuery() {
  const q = new URLSearchParams(window.location.search)
  const pick = (filter, key) => (labelOf(filter, q.get(key)) ? q.get(key) : null)
  return { region: pick(regionFilter, 'region'), type: pick(typeFilter, 'type') }
}

export default function CoursesPage() {
  const [filters, setFilters] = useState(readQuery)

  // 뒤로 가기·앞으로 가기로 필터가 바뀌어도 화면이 따라오게 합니다.
  useEffect(() => {
    const onPop = () => setFilters(readQuery())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // 기존 서비스처럼 필터를 주소에 남겨, 새로고침하거나 링크를 공유해도 같은 목록이 보입니다.
  const update = (next) => {
    const merged = { ...filters, ...next }
    setFilters(merged)
    const q = new URLSearchParams()
    if (merged.region) q.set('region', merged.region)
    if (merged.type) q.set('type', merged.type)
    const search = q.toString()
    window.history.pushState(null, '', search ? `?${search}` : window.location.pathname)
  }

  const visible = useMemo(() => {
    const region = labelOf(regionFilter, filters.region)
    const type = labelOf(typeFilter, filters.type)
    return courseList.filter((c) => (!region || c.region === region) && (!type || c.type === type))
  }, [filters])

  const filtered = filters.region || filters.type

  return (
    <div id="top">
      <a href="#course-list" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-3">
        본문으로 건너뛰기
      </a>
      <Header overlay={false} current={pages.courses} logoHref={pages.home} />

      <main className="pt-[72px] md:pt-[84px]">
        <header className="container-journal pb-10 pt-14 md:pb-12 md:pt-20">
          <p className="label-latin text-brass-ink">{coursesPage.label}</p>
          <h1 className="type-hero mt-4">{coursesPage.title}</h1>
          <p className="type-lead mt-5 max-w-[40rem] text-ink-soft">{coursesPage.intro}</p>
        </header>

        <section aria-label="코스 고르기" className="container-journal">
          <FilterGroup {...regionFilter} value={filters.region} onChange={(v) => update({ region: v })} />
          <FilterGroup {...typeFilter} value={filters.type} onChange={(v) => update({ type: v })} />

          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-ink/70 pt-5">
            <p role="status" aria-live="polite" className="text-[17px]">
              <span className="font-serif text-[20px] font-medium">{visible.length}</span>개의 코스
            </p>
            {filtered && (
              <button type="button" onClick={() => update({ region: null, type: null })} className="link-journal text-[17px]">
                {coursesPage.reset}
              </button>
            )}
          </div>
        </section>

        <section id="course-list" aria-label="코스 목록" className="container-journal pb-20 pt-10 md:pb-28 md:pt-12">
          {visible.length ? (
            <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-14 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
              {visible.map((course) => (
                <li key={course.slug}>
                  <CourseCard course={course} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="border-y border-rule py-16 text-center">
              <p className="font-serif text-[22px] md:text-[24px]">{coursesPage.empty}</p>
              <button type="button" onClick={() => update({ region: null, type: null })} className="link-journal mt-4 text-[17px]">
                {coursesPage.reset}
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
