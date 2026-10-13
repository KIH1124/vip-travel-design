import Photo from './Photo'
import { courseHref } from '../data/site'

/**
 * 목록용 코스 카드. 테두리·그림자 없이 사진과 글로만 구성하고,
 * 아래쪽 얇은 선으로 항목을 나눕니다. 카드 전체가 상세 페이지 링크입니다.
 */
export default function CourseCard({ course }) {
  return (
    <a
      href={courseHref(course.slug)}
      className="group block h-full border-b border-rule pb-6 focus-visible:outline-offset-[6px]"
    >
      <div className="overflow-hidden">
        <Photo
          image={course.image}
          hint={course.title}
          className="aspect-[4/3] w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw"
        />
      </div>

      <p className="label-ko mt-5 text-ink-soft">
        {course.region} · {course.duration} · <span className="text-brass-ink">{course.type}</span>
      </p>
      <h2 className="mt-2 font-serif text-[24px] font-medium leading-[1.4] tracking-[-0.01em] underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-brass md:text-[26px]">
        {course.title}
      </h2>
      <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
        <span className="font-serif text-[23px] font-medium tracking-[-0.01em] md:text-[24px]">{course.price.amount}</span>
        <span className="text-[16px] text-ink-soft md:text-[17px]">부터 · {course.price.vehicle}</span>
      </p>
    </a>
  )
}
