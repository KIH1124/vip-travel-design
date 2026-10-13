import { useEffect, useId, useMemo, useRef, useState } from 'react'
import Button from './Button'
import { booking, pages } from '../data/site'
import { estimate, won } from '../lib/pricing'
import { toggleSaved, useSavedCourses } from '../lib/savedCourses'

/**
 * 예약 옵션 패널 (디자인 시안).
 * 출발일 · 인원 · 차량 · 가이드 · 동행 케어를 고르면 기존 서비스와 같은 규칙으로 예상 금액을 보여 줍니다.
 * 상담 신청은 서버에 연결하지 않고, 고른 조건만 화면에 정리해 보여 줍니다.
 */
export default function BookingPanel({ course }) {
  const id = useId()
  const panelRef = useStickyTop(108)
  const [date, setDate] = useState(course.dates?.[0]?.value ?? '')
  const [pax, setPax] = useState(booking.paxDefault)
  const [vehicleId, setVehicleId] = useState('kanival')
  const [guide, setGuide] = useState(false)
  const [care, setCare] = useState(false)
  const [summary, setSummary] = useState(null)
  const { saved, persistent } = useSavedCourses()
  const isSaved = saved.includes(course.slug)

  const result = useMemo(() => estimate(course, { vehicleId, pax, guide, care }), [course, vehicleId, pax, guide, care])
  const { vehicles, vehicle, split } = result

  // 조건이 바뀌면 이전에 보여 준 요약은 지웁니다.
  useEffect(() => setSummary(null), [date, pax, vehicleId, guide, care])

  const dateLabel = course.dates ? course.dates.find((d) => d.value === date)?.label : date ? formatDate(date) : '날짜 미정'

  const submit = () =>
    setSummary([
      ['코스', course.title],
      [booking.dateLegend, dateLabel],
      [booking.paxLabel, `${pax}명`],
      [booking.vehicleLegend, vehicle ? vehicle.name : `${split.vehicle.name} ${split.count}대 (상담으로 조정)`],
      [booking.guideLegend, guide ? booking.guide.label : booking.guide.none],
      ['동행 케어', care ? '신청' : '신청 안 함'],
      [booking.totalLabel, vehicle ? won(result.total) : `${won(split.amount)} (차량만)`],
    ])

  return (
    <aside ref={panelRef} aria-labelledby={`${id}-title`} className="bg-paper-deep px-5 py-7 sm:px-7 sm:py-8 lg:sticky">
      <h2 id={`${id}-title`} className="font-serif text-[26px] font-medium tracking-[-0.01em] md:text-[28px]">
        {booking.title}
      </h2>

      {/* 출발일 */}
      <fieldset className="mt-7">
        <Legend>{booking.dateLegend}</Legend>
        {course.dates ? (
          <div className="clear-left grid gap-2.5 pt-3">
            {course.dates.map((d) => (
              <Choice key={d.value} type="radio" name={`${id}-date`} checked={date === d.value} onChange={() => setDate(d.value)} title={d.label} sub={d.note} />
            ))}
          </div>
        ) : (
          <label className="clear-left block pt-3">
            <span className="text-[16px] text-ink-soft">{booking.dateLabel}</span>
            <input
              type="date"
              value={date}
              min={today()}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1.5 block min-h-[56px] w-full rounded-[2px] border border-ink/25 bg-paper px-4 text-[18px] text-ink focus:border-sage focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
            />
          </label>
        )}
      </fieldset>

      {/* 인원 */}
      <div className="mt-7 flex items-center justify-between gap-4 border-t border-rule pt-6">
        <p id={`${id}-pax`} className="font-serif text-[20px] font-medium">{booking.paxLabel}</p>
        <div role="group" aria-labelledby={`${id}-pax`} className="flex items-center">
          <StepButton label="한 명 줄이기" disabled={pax <= booking.paxMin} onClick={() => setPax((n) => Math.max(booking.paxMin, n - 1))}>
            −
          </StepButton>
          <output aria-live="polite" className="min-w-[4.5rem] text-center text-[21px] font-semibold tabular-nums">
            {pax}명
          </output>
          <StepButton label="한 명 늘리기" onClick={() => setPax((n) => n + 1)}>
            +
          </StepButton>
        </div>
      </div>

      {/* 차량 */}
      <fieldset className="mt-6 border-t border-rule pt-6">
        <Legend>{booking.vehicleLegend}</Legend>
        <div className="clear-left grid gap-2.5 pt-3">
          {vehicles.map((v) => {
            const fits = v.capacity >= pax
            return (
              <Choice
                key={v.id}
                type="radio"
                name={`${id}-vehicle`}
                checked={vehicle?.id === v.id}
                disabled={!fits}
                onChange={() => setVehicleId(v.id)}
                title={v.name}
                sub={fits ? `최대 ${v.capacity}명` : booking.tooMany}
                price={won(v.fare)}
              />
            )
          })}
        </div>
      </fieldset>

      {/* 가이드 · 동행 케어 */}
      <fieldset className="mt-6 border-t border-rule pt-6">
        <Legend>{booking.guideLegend}</Legend>
        <div className="clear-left grid gap-2.5 pt-3">
          <Choice type="radio" name={`${id}-guide`} checked={!guide} onChange={() => setGuide(false)} title={booking.guide.none} />
          <Choice type="radio" name={`${id}-guide`} checked={guide} onChange={() => setGuide(true)} title={booking.guide.label} price={`하루 ${won(booking.guide.perDay)}`} />
        </div>
        <div className="mt-4">
          <Choice type="checkbox" checked={care} onChange={() => setCare((v) => !v)} title={booking.care.label} price={`하루 ${won(booking.care.perDay)}`} />
        </div>
      </fieldset>

      {/* 예상 금액 */}
      <div className="mt-7 border-t border-ink/70 pt-6" aria-live="polite">
        {vehicle ? (
          <>
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[17px] font-medium">{booking.totalLabel}</p>
              <p className="font-serif text-[32px] font-semibold leading-none tracking-[-0.01em] md:text-[36px]">{won(result.total)}</p>
            </div>
            {result.lines.length > 1 && (
              <ul className="mt-4 space-y-1.5 text-[16px] text-ink-soft">
                {result.lines.map((l) => (
                  <li key={l.label} className="flex justify-between gap-4">
                    <span>{l.label}</span>
                    <span className="tabular-nums">{won(l.amount)}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 text-[16px] leading-relaxed text-ink-mute">{booking.fareNote}</p>
          </>
        ) : (
          <p className="border-l-2 border-brass pl-4 text-[17px] leading-relaxed">{booking.splitNote(split.vehicle.name, split.count, won(split.amount))}</p>
        )}
      </div>

      {/* 상담 신청 · 코스 담기 */}
      <div className="mt-7 grid gap-3">
        <Button type="button" variant="primary" onClick={submit} className="w-full text-[18px] active:translate-y-px active:bg-[#343d30]">
          {booking.cta}
        </Button>
        <Button
          type="button"
          variant="outline"
          aria-pressed={isSaved}
          onClick={() => toggleSaved(course.slug)}
          className={`w-full text-[18px] active:translate-y-px ${isSaved ? 'border-sage bg-sage/[0.1] text-sage-deep' : ''}`}
        >
          <BookmarkIcon filled={isSaved} />
          {isSaved ? booking.saved : booking.save}
        </Button>
      </div>

      <div className="mt-4 space-y-2 text-[16px] leading-relaxed text-ink-mute">
        <p>{persistent ? booking.savedNote : '이 브라우저에서는 저장 공간을 쓸 수 없어, 페이지를 닫으면 담은 코스가 사라집니다.'}</p>
        <a href={pages.saved} className="link-journal min-h-11 text-[16px] text-ink">
          {booking.savedLink}
          {saved.length > 0 && ` (${saved.length})`} <span aria-hidden="true">→</span>
        </a>
      </div>

      {summary && (
        <div role="status" className="mt-5 border-t border-ink/70 pt-5">
          <p className="text-[16px] leading-relaxed text-ink-soft">{booking.ctaDemo}</p>
          <dl className="mt-3 text-[16px]">
            {summary.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-rule py-2">
                <dt className="text-ink-mute">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </aside>
  )
}

function Legend({ children }) {
  // float 로 띄워 fieldset 윗선 위에 겹치지 않게 합니다.
  return <legend className="float-left w-full font-serif text-[20px] font-medium">{children}</legend>
}

/** 라디오·체크박스 한 줄. 진짜 input 을 쓰고(키보드·화면 낭독기 지원), 겉모습만 크게 다시 그립니다. */
function Choice({ type, name, checked, disabled = false, onChange, title, sub, price }) {
  const round = type === 'radio'
  return (
    <label
      className={`flex min-h-[56px] items-center gap-3.5 rounded-[2px] border px-4 py-3 transition-colors duration-150 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sage ${
        disabled
          ? 'cursor-not-allowed border-ink/10 bg-paper/50 text-ink-mute'
          : checked
            ? 'cursor-pointer border-sage bg-[#e9ecdf] ring-1 ring-inset ring-sage'
            : 'cursor-pointer border-ink/20 bg-paper hover:border-sage'
      }`}
    >
      <input type={type} name={name} checked={checked} disabled={disabled} onChange={onChange} className="sr-only" />
      <span
        aria-hidden="true"
        className={`flex size-6 shrink-0 items-center justify-center border-[1.5px] ${round ? 'rounded-full' : 'rounded-[3px]'} ${
          checked ? 'border-sage bg-sage text-paper' : disabled ? 'border-ink/20' : 'border-ink/45 bg-paper'
        }`}
      >
        {checked && (
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8.5l3.2 3L13 4.5" />
          </svg>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-[17px] leading-snug md:text-[18px] ${checked ? 'font-semibold' : 'font-medium'}`}>{title}</span>
        {sub && <span className={`mt-0.5 block text-[15px] leading-snug ${disabled ? 'text-ink-mute' : 'text-ink-soft'}`}>{sub}</span>}
      </span>
      {price && <span className={`shrink-0 text-right text-[16px] tabular-nums md:text-[17px] ${disabled ? 'line-through decoration-ink/30' : 'font-medium'}`}>{price}</span>}
    </label>
  )
}

function StepButton({ label, disabled, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-[52px] items-center justify-center rounded-[2px] border border-ink/30 bg-paper text-[26px] leading-none transition-colors hover:border-sage hover:text-sage active:translate-y-px disabled:cursor-not-allowed disabled:border-ink/10 disabled:text-ink/25 disabled:hover:text-ink/25"
    >
      <span aria-hidden="true">{children}</span>
    </button>
  )
}

function BookmarkIcon({ filled }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className="shrink-0">
      <path d="M6.5 3.5h11v17l-5.5-4-5.5 4z" />
    </svg>
  )
}

/**
 * 데스크톱 sticky 위치. 패널이 화면보다 짧으면 헤더 아래(offset)에 붙고,
 * 길면 패널 아래쪽(금액·버튼)이 화면 안에 들어온 뒤에 멈춥니다. 패널이 잘려서 안 보이는 일이 없습니다.
 * 스크롤마다 계산하지 않고, 패널·창 크기가 바뀔 때만 다시 계산합니다.
 */
function useStickyTop(offset) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      el.style.top = `${Math.min(offset, window.innerHeight - el.offsetHeight - 24)}px`
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [offset])
  return ref
}

const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const formatDate = (v) => {
  const d = new Date(`${v}T00:00:00`)
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${'일월화수목금토'[d.getDay()]})`
}
