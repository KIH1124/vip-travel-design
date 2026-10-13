import Photo from '../components/Photo'
import { about } from '../data/site'

/**
 * 린넨 바탕의 브랜드 에세이.
 * 대표 사진 한 장이 화면 왼쪽 끝까지 붙고, 그 옆에 편지 같은 문장이 이어집니다.
 * 차창 프레임이 잘리지 않도록 사진은 원본(3:2)에 가까운 비율로 보여 줍니다.
 */
export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 bg-linen lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center">
      <div>
        <Photo
          image={about.image}
          hint={about.image.hint}
          position={about.image.position}
          tone="linen"
          sizes="(min-width: 1024px) 54vw, 100vw"
          className="aspect-[4/3] w-full md:aspect-[3/2] lg:aspect-[4/3] xl:aspect-[3/2]"
        />
      </div>

      <div className="container-journal py-14 md:py-20 lg:max-w-none lg:self-center lg:py-24 lg:pl-16 xl:pl-24 xl:pr-[max(56px,calc((100vw-1320px)/2+56px))]">
        <div className="max-w-[36rem]">
          <p className="label-latin text-brass-ink">{about.label}</p>
          <h2 id="about-title" className="type-section mt-4">{about.title}</h2>

          <div className="mt-8 space-y-6 md:mt-10">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="type-lead text-ink">{p}</p>
            ))}
          </div>

          <p className="mt-10 flex items-center gap-4 font-serif text-[22px]">
            <span className="h-px w-12 bg-brass" aria-hidden="true" />
            {about.signature}
          </p>
        </div>
      </div>
    </section>
  )
}
