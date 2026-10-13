import { useRef } from 'react'
import Photo from '../components/Photo'
import useParallax from '../hooks/useParallax'
import { hero } from '../data/site'

/** 브라우저 좌우 끝까지 펼쳐지는 사진 표지 */
export default function Hero() {
  const sectionRef = useRef(null)
  const photoRef = useRef(null)
  // 사진만 스크롤의 25%(모바일·터치 12%) 속도로 따라 내려가 콘텐츠보다 느리게 움직입니다.
  useParallax(sectionRef, photoRef, { speed: 0.25, mobileSpeed: 0.12 })

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-title"
      className="relative h-[70svh] overflow-hidden min-h-[540px] w-full text-paper md:h-[72svh] md:min-h-[600px] lg:max-h-[860px]"
    >
      <div ref={photoRef} className="absolute inset-0">
        <Photo image={hero.image} position={hero.image.position} positionMobile={hero.image.positionMobile} eager className="h-full w-full" />
      </div>
      {/* 절제된 어두운 막 — 전체를 살짝 누르고, 내비게이션이 놓이는 위쪽과 카피가 놓이는 아래쪽만 조금 더 */}
      <div className="absolute inset-0 bg-[#1e211c]/25" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#1e211c]/35 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#1e211c]/55 to-transparent" aria-hidden="true" />

      <div className="container-journal relative flex h-full flex-col justify-end pb-10 md:pb-14 lg:pb-16">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div>
            <p className="label-ko text-paper">{hero.eyebrow}</p>
            <h1 id="hero-title" className="type-hero mt-4 md:mt-5">
              {hero.titleLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </h1>
            <p className="type-lead mt-5 max-w-[35rem] text-paper/95 md:mt-7">{hero.body}</p>
          </div>

          <div className="hidden shrink-0 flex-col items-end gap-1 pb-1 lg:flex">
            <p className="label-latin text-paper/85">The Private Travel Journal</p>
            <a href="#plan" className="inline-flex min-h-11 items-center whitespace-nowrap text-[16px] text-paper/90 hover:text-paper">
              아래로 이어집니다
              <span aria-hidden="true" className="ml-2">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
