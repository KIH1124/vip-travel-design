import { useEffect } from 'react'

/**
 * 사진 레이어를 스크롤보다 느리게 움직이는 패럴랙스.
 *
 * - React state 를 쓰지 않고 layer 의 style.transform 만 직접 바꿉니다 (리렌더 없음).
 * - passive scroll 리스너 + requestAnimationFrame 으로 프레임당 한 번만 계산합니다.
 * - 영역이 화면 밖에 있으면 IntersectionObserver 로 계산을 멈춥니다.
 * - 동작 줄이기 설정, 저사양 기기에서는 끄고, 모바일·터치 기기에서는 약하게 적용합니다.
 *
 * 레이어는 아래로만 이동하고(0 ~ 영역 높이 × speed) 영역이 overflow-hidden 이므로
 * 보이는 부분에는 빈 공간이 생기지 않으며, 맨 위(스크롤 0)의 크롭은 그대로 유지됩니다.
 */
export default function useParallax(sectionRef, layerRef, { speed = 0.25, mobileSpeed = 0.12 } = {}) {
  useEffect(() => {
    const section = sectionRef.current
    const layer = layerRef.current
    if (!section || !layer) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compact = window.matchMedia('(max-width: 767px), (pointer: coarse)')
    const lowEnd =
      (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 2) ||
      (navigator.deviceMemory > 0 && navigator.deviceMemory <= 2)

    let factor = 0
    let top = 0
    let height = 0
    let visible = true
    let frame = 0
    let last = null

    const measure = () => {
      top = section.offsetTop
      height = section.offsetHeight
    }

    const render = () => {
      frame = 0
      // 0 ~ height 로 제한 — iOS 의 위쪽 바운스(음수 스크롤)에서도 레이어가 위로 올라가지 않습니다.
      const progress = Math.min(Math.max(window.scrollY - top, 0), height)
      const offset = Math.round(progress * factor * 10) / 10
      if (offset !== last) {
        layer.style.transform = `translate3d(0, ${offset}px, 0)`
        last = offset
      }
    }

    const onScroll = () => {
      if (!factor || !visible || frame) return
      frame = requestAnimationFrame(render)
    }

    const configure = () => {
      measure()
      factor = reduceMotion.matches || lowEnd ? 0 : compact.matches ? mobileSpeed : speed
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      if (!factor) {
        layer.style.transform = ''
        layer.style.willChange = ''
        last = null
        return
      }
      layer.style.willChange = visible ? 'transform' : ''
      render()
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!factor) return
      layer.style.willChange = visible ? 'transform' : ''
      // 나갈 때·돌아올 때 한 번씩 위치를 맞춰, 빠르게 되돌아와도 이전 값이 남지 않게 합니다.
      render()
    })
    observer.observe(section)

    configure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', configure, { passive: true })
    reduceMotion.addEventListener('change', configure)
    compact.addEventListener('change', configure)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', configure)
      reduceMotion.removeEventListener('change', configure)
      compact.removeEventListener('change', configure)
      layer.style.transform = ''
      layer.style.willChange = ''
    }
  }, [sectionRef, layerRef, speed, mobileSpeed])
}
