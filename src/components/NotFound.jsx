import Button from './Button'
import { notFound, pages } from '../data/site'

/**
 * 찾을 수 없는 주소 안내. variant 'course' 는 없는 여행 코스 주소, 'page' 는 그 밖의 주소입니다.
 * 코스 상세 템플릿과 404 페이지가 함께 씁니다.
 */
export default function NotFound({ variant = 'page' }) {
  const copy = notFound[variant]
  return (
    <section aria-labelledby="not-found-title" className="container-journal py-20 md:py-28">
      <div className="mx-auto max-w-[40rem] border-y border-rule py-14 text-center md:py-20">
        <p className="label-latin text-brass-ink">Not Found</p>
        <h1 id="not-found-title" className="type-section mt-4">{copy.title}</h1>
        <p className="type-lead mt-5 text-ink-soft">{copy.body}</p>
        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <Button as="a" href={pages.courses} variant="primary" className="active:translate-y-px sm:min-w-[260px]">
            {notFound.toCourses}
          </Button>
          <Button as="a" href={pages.home} variant="secondary" className="active:translate-y-px sm:min-w-[160px]">
            {notFound.toHome}
          </Button>
        </div>
      </div>
    </section>
  )
}

/** 주소가 /courses/{무언가} 형태면 '여행 코스를 찾을 수 없습니다'로 안내합니다. */
export const notFoundVariant = (pathname) => (/^\/courses\/[^/]+\/?$/.test(pathname) ? 'course' : 'page')
