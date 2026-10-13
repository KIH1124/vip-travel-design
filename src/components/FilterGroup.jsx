import { useId } from 'react'

/**
 * 한 종류의 필터(지역 또는 여행 유형).
 * 왼쪽에 무엇을 고르는 필터인지 적고, 오른쪽에 선택지를 둡니다.
 * 선택된 항목은 포레스트 그린 바탕·테두리와 체크 표시로 분명히 보입니다.
 */
export default function FilterGroup({ label, hint, options, value, onChange }) {
  const id = useId()
  const all = [{ value: null, label: '전체' }, ...options]
  return (
    <div role="group" aria-labelledby={`${id}-label`} className="grid gap-3 border-t border-rule py-5 md:grid-cols-[11rem_1fr] md:items-center md:gap-8 md:py-6">
      <div>
        <p id={`${id}-label`} className="font-serif text-[20px] font-medium leading-snug">{label}</p>
        <p className="mt-0.5 text-[16px] text-ink-mute">{hint}</p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {all.map((opt) => {
          const selected = opt.value === value
          return (
            <button
              key={opt.label}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(opt.value)}
              className={`inline-flex min-h-[48px] items-center gap-2 rounded-[2px] border px-5 text-[17px] font-medium transition-colors duration-150 active:translate-y-px ${
                selected
                  ? 'border-sage bg-sage text-paper'
                  : 'border-ink/25 bg-transparent text-ink hover:border-sage hover:bg-sage/[0.06] hover:text-sage-deep'
              }`}
            >
              {selected && (
                <svg aria-hidden="true" viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8.5l3.2 3L13 4.5" />
                </svg>
              )}
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
