import Photo from '../components/Photo'
import PhotoCredit from '../components/PhotoCredit'
import PriceNote from '../components/PriceNote'
import SampleTag from '../components/SampleTag'
import Timetable from '../components/Timetable'
import { courseHref, program } from '../data/site'

/**
 * 특별 프로그램. 일반 코스와 구별되도록 사진을 여백(매트)이 있는
 * 한 장의 인화지처럼 담고, 섹션 전체를 한 면으로 씁니다.
 */
export default function Program() {
  return (
    <section id="program" aria-labelledby="program-section-title" className="scroll-mt-20 border-t border-rule bg-paper py-16 md:py-24 lg:py-28">
      <div className="container-journal">
        <p className="label-latin text-center text-brass-ink">{program.label}</p>
        <h2 id="program-section-title" className="type-section mt-4 text-center">{program.sectionTitle}</h2>

        <article aria-labelledby="program-title" className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:items-center lg:gap-16">
          <figure className="lg:col-span-6">
            <div className="bg-linen p-3 sm:p-5 md:p-7">
              <Photo image={program.image} position="50% 60%" className="aspect-[4/5] w-full" sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
            <figcaption className="mt-3">
              <PhotoCredit credit={program.image.credit} />
            </figcaption>
          </figure>

          <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
            <p className="label-ko text-ink-soft">
              {program.region} · {program.duration} · <span className="text-brass-ink">{program.type}</span>
            </p>
            <h3 id="program-title" className="mt-5 font-serif text-[30px] font-medium leading-[1.35] tracking-[-0.02em] md:text-[38px] lg:text-[42px]">
              {program.title}
            </h3>
            <p className="type-lead mt-6 text-ink-soft">
              {program.description}
              {program.descriptionIsSample && <SampleTag />}
            </p>

            <Timetable days={program.days} className="mt-8" />

            <div className="mt-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
              <PriceNote price={program.price} />
              <a href={courseHref(program.slug)} className="link-journal text-[17px]">
                일정 자세히 보기 <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
