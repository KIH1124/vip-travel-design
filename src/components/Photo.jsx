import { filmTone } from '../data/site'

/**
 * 사진 슬롯. image.src 가 없으면 같은 크기의 자리표시를 그립니다.
 * 비율은 className(예: aspect-[4/5]) 으로, 크롭 위치는 position 으로 정합니다.
 * positionMobile 을 주면 768px 미만에서는 그 위치로 자릅니다.
 */
export default function Photo({ image, className = '', position = '50% 50%', positionMobile, hint, tone, eager = false, sizes }) {
  if (!image?.src) {
    return <PhotoPlaceholder className={className} label={hint ?? image?.alt} tone={tone} />
  }
  // image.filmTone 이 false 면 그 사진만 CSS 필름 효과를 빼고 원래 색감 그대로 보여 줍니다.
  const toned = filmTone && image.filmTone !== false
  return (
    <div className={`relative overflow-hidden bg-linen ${toned ? 'film-tone film-grain' : ''} ${className}`}>
      <img
        src={image.src}
        alt={image.alt ?? ''}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        className={`absolute inset-0 h-full w-full object-cover ${positionMobile ? 'photo-pos' : ''}`}
        style={positionMobile ? { '--pos': position, '--pos-m': positionMobile } : { objectPosition: position }}
      />
    </div>
  )
}

export function PhotoPlaceholder({ className = '', label, tone = 'paper' }) {
  const bg = tone === 'linen' ? 'bg-[#ddd2bd]' : 'bg-paper-deep'
  return (
    <div
      role="img"
      aria-label={label ? `${label} (사진 준비 중)` : '사진 준비 중'}
      className={`film-grain relative flex items-center justify-center overflow-hidden ${bg} ${className}`}
    >
      <div className="absolute inset-3 border border-brass/35 md:inset-4" aria-hidden="true" />
      <div className="relative px-8 text-center">
        <p className="label-latin text-brass-ink">Photograph</p>
        <p className="mt-2 text-[16px] leading-relaxed text-ink-mute">
          {label && <span className="block">{label}</span>}
          <span className="block">사진 준비 중</span>
        </p>
      </div>
    </div>
  )
}
