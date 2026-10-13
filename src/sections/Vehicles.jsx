import Photo from '../components/Photo'
import PhotoCredit from '../components/PhotoCredit'
import SectionHeading from '../components/SectionHeading'
import { vehicles } from '../data/site'

/**
 * 여행 안내서의 차량 소개면. 확인된 차량 사진만 쓰고, 없는 차량은 자리표시를 둡니다.
 * 사진은 같은 비율(16:10)로 맞추고, 차체 전체가 보이도록 크롭 위치(position)를 차량마다 정합니다.
 */
export default function Vehicles() {
  return (
    <section id="vehicles" aria-labelledby="vehicles-title" className="scroll-mt-20 bg-paper py-16 md:py-24 lg:py-28">
      <div className="container-journal">
        <SectionHeading id="vehicles-title" label={vehicles.label} title={vehicles.title} intro={vehicles.intro} />

        <ol className="mt-12 grid gap-x-12 gap-y-14 md:mt-16 md:grid-cols-2 lg:gap-x-16 lg:gap-y-20">
          {vehicles.items.map((v, i) => (
            <li key={v.name}>
              <Photo
                image={{ ...v.image, alt: v.image.alt ?? v.name }}
                position={v.image.position}
                hint={`${v.name} 외관`}
                sizes="(min-width: 768px) 46vw, 100vw"
                className="aspect-[16/10] w-full"
              />
              <PhotoCredit credit={v.image.credit} className="mt-2" />
              <div className="mt-6 flex items-baseline gap-4 border-b border-ink/70 pb-4">
                <span className="font-latin text-[18px] tracking-[0.12em] text-brass-ink">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-serif text-[26px] font-medium tracking-[-0.01em] md:text-[30px]">{v.name}</h3>
              </div>
              <dl className="text-[17px] md:text-[18px]">
                <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-rule py-4 md:grid-cols-[8.5rem_1fr]">
                  <dt className="text-ink-mute">타실 수 있는 분</dt>
                  <dd className="font-medium">{v.seats}</dd>
                </div>
                <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-rule py-4 md:grid-cols-[8.5rem_1fr]">
                  <dt className="text-ink-mute">이런 여행에</dt>
                  <dd>{v.features.join(' · ')}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
