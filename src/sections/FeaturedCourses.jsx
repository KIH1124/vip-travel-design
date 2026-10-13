import Photo from '../components/Photo'
import PhotoCredit from '../components/PhotoCredit'
import PriceNote from '../components/PriceNote'
import SampleTag from '../components/SampleTag'
import SectionHeading from '../components/SectionHeading'
import Timetable from '../components/Timetable'
import { courseHref, featured, featuredCourses } from '../data/site'

export default function FeaturedCourses() {
  return (
    <section id="courses" aria-labelledby="courses-title" className="scroll-mt-20 border-t border-rule bg-paper pt-16 md:pt-24">
      <div className="container-journal">
        <SectionHeading id="courses-title" label={featured.label} title={featured.title} intro={featured.intro} />
      </div>

      <div className="mt-12 md:mt-16">
        {featuredCourses.map((course, i) => (
          <CourseSpread key={course.slug} course={course} index={i} total={featuredCourses.length} />
        ))}
      </div>
    </section>
  )
}

/**
 * 사진집의 펼친 면처럼 사진(약 53%)과 여행 노트(약 47%)를 나란히 놓습니다.
 * 노트 쪽 폭을 넉넉히 두어 시간표가 좁아지지 않게 합니다.
 * 짝수 번째는 좌우를 바꿔 리듬을 만듭니다. 사진은 화면 가장자리까지 붙습니다.
 */
function CourseSpread({ course, index, total }) {
  const flip = index % 2 === 1
  const no = String(index + 1).padStart(2, '0')
  return (
    <article aria-labelledby={`course-${course.slug}`} className="pb-16 md:pb-20 lg:grid lg:grid-cols-[minmax(0,1.14fr)_minmax(0,1fr)] lg:pb-24">
      <figure className={flip ? 'lg:order-2' : ''}>
        <div className="lg:sticky lg:top-[100px]">
          <Photo
            image={course.image}
            className="aspect-[4/3] w-full md:aspect-[16/10] lg:aspect-auto lg:h-[min(78svh,780px)]"
            sizes="(min-width: 1024px) 53vw, 100vw"
          />
          <figcaption className={`container-journal mt-3 lg:px-0 ${flip ? 'lg:pr-14' : 'lg:pl-14'}`}>
            <PhotoCredit credit={course.image.credit} />
          </figcaption>
        </div>
      </figure>

      <div className={`container-journal mt-9 lg:mt-0 lg:max-w-none lg:self-center lg:py-4 ${flip ? 'lg:order-1 lg:pr-12 xl:pr-16' : 'lg:pl-12 xl:pl-16'}`}>
        <p className="flex items-center gap-4">
          <span className="font-latin text-[18px] tracking-[0.12em] text-brass-ink">
            {no} <span className="text-brass/70">/ {String(total).padStart(2, '0')}</span>
          </span>
          <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          <span className="label-ko text-ink-soft">{course.region} · {course.duration}</span>
        </p>

        <h3 id={`course-${course.slug}`} className="type-course mt-4">{course.title}</h3>
        <p className="type-lead mt-4 text-ink-soft">
          {course.description}
          {course.descriptionIsSample && <SampleTag />}
        </p>

        <Timetable days={course.days} className="mt-8" />

        <div className="mt-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <PriceNote price={course.price} />
          <a href={courseHref(course.slug)} className="link-journal text-[17px]">
            일정 자세히 보기 <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  )
}
