import { brand } from '../data/site'

// 실제 글자 높이 기준 크기. 폭은 원본 비율로 따라옵니다.
const sizes = {
  header: 'h-[44px] md:h-[54px]', // 헤더 72px / 84px 안에 여유 있게
  footer: 'h-[60px] md:h-[68px]',
}

/**
 * 손글씨 로고. brand.logo 에 이미지 경로가 있으면 이미지를, 없으면 명조체 워드마크를 씁니다.
 *
 * - crop 정보가 있으면 투명 여백을 잘라 내고 실제 글자 영역을 기준으로 크기를 맞춥니다.
 *   (원본 비율 그대로, 찌그러지지 않음)
 * - swap 을 주면 흰색·검은색 로고를 겹쳐 두고 variant 에 따라 서서히 바꿉니다.
 *   헤더가 투명 → 아이보리로 바뀔 때 새 이미지를 불러오느라 깜빡이지 않게 하기 위함입니다.
 */
export default function Logo({ variant = 'dark', size = 'header', swap = false, href = '#top', className = '' }) {
  const { logo } = brand
  const src = logo[variant]
  const layers = swap && logo.light && logo.dark ? ['light', 'dark'] : src ? [variant] : []

  return (
    <a href={href} className={`inline-flex min-h-11 items-center ${className}`} aria-label={`${brand.name} ${brand.latin} — 처음으로`}>
      {layers.length ? (
        <LogoArt layers={layers} active={variant} crop={logo.crop} sizeClass={sizes[size]} />
      ) : (
        <span className="inline-flex items-center gap-3">
          <span className="font-serif text-[28px] font-medium leading-none tracking-[-0.02em] md:text-[30px]">{brand.name}</span>
          <span className="hidden font-latin text-[14px] font-medium tracking-[0.22em] opacity-80 sm:inline">{brand.latin}</span>
        </span>
      )}
    </a>
  )
}

function LogoArt({ layers, active, crop, sizeClass }) {
  // crop 이 없으면 원본 전체를 한 영역으로 봅니다.
  const c = crop ?? { width: 1, height: 1, x: 0, y: 0, w: 1, h: 1 }
  const box = crop ? { aspectRatio: `${c.w} / ${c.h}` } : undefined
  const imgStyle = crop
    ? {
        position: 'absolute',
        width: `${(c.width / c.w) * 100}%`,
        maxWidth: 'none',
        left: `${(-c.x / c.w) * 100}%`,
        top: `${(-c.y / c.h) * 100}%`,
      }
    : undefined

  return (
    <span className={`relative block overflow-hidden ${sizeClass}`} style={box}>
      {layers.map((key, i) => (
        <img
          key={key}
          src={brand.logo[key]}
          alt=""
          aria-hidden="true"
          decoding="async"
          draggable="false"
          style={imgStyle}
          className={`${crop ? '' : i > 0 ? 'absolute left-0 top-0 h-full w-auto' : 'h-full w-auto'} select-none transition-opacity duration-300 ${
            layers.length > 1 ? (key === active ? 'opacity-100' : 'opacity-0') : ''
          }`}
        />
      ))}
    </span>
  )
}
