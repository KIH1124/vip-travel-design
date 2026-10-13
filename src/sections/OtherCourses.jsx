import Photo from '../components/Photo'
import { courseHref, otherCourses } from '../data/site'

/*
 * 2열 그리드. 사진 비율(3:2)과 폭·정렬 기준은 모두 같게 두고,
 * 오른쪽 열만 한 단 내려 놓아 사진집 같은 리듬을 남깁니다.
 * 세로 원본은 crop 위치로 주요 풍경을 맞춥니다.
 */
const crop = {
  pyeongchang: '50% 45%',
  'seoul-night': '50% 55%',
}

export default function OtherCourses() {
  return (
    <section aria-labelledby="other-title" className="bg-paper pb-16 md:pb-24">
      <div className="container-journal">
        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-ink/70 pt-8">
          <div>
            <p className="label-latin text-brass-ink">More Routes</p>
            <h2 id="other-title" className="mt-3 font-serif text-[28px] font-medium tracking-[-0.015em] md:text-[34px]">
              {otherCourses.title}
            </h2>
          </div>
          <a href={otherCourses.allHref} className="link-journal text-[17px]">
            {otherCourses.allLabel} <span aria-hidden="true">→</span>
          </a>
        </div>

        <ul className="mt-10 grid gap-y-12 md:mt-12 md:grid-cols-2 md:gap-x-10 md:gap-y-14 md:pb-20 lg:gap-x-16">
          {otherCourses.items.map((c) => (
            <li key={c.slug} className="md:[&:nth-child(even)]:translate-y-20">
              <a href={courseHref(c.slug)} className="group block">
                <div className="overflow-hidden">
                  <Photo
                    image={c.image}
                    hint={c.title}
                    position={crop[c.slug]}
                    className="aspect-[3/2] w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                    sizes="(min-width: 768px) 46vw, 100vw"
                  />
                </div>
                <div className="mt-5 border-b border-rule pb-5">
                  <div>
                    <p className="label-ko text-ink-soft">{c.region} · {c.duration}</p>
                    <h3 className="mt-1.5 font-serif text-[24px] font-medium leading-snug tracking-[-0.01em] underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-brass md:text-[27px]">
                      {c.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-[16px] text-ink-mute md:text-[17px]">
                    {c.price.vehicle} 한 대 <span className="text-ink">{c.price.amount}</span>부터
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
