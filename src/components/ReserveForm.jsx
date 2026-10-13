import { useId, useRef, useState } from 'react'
import Button from './Button'
import { findCourse, reservePage } from '../data/site'
import { formatPhone, submitReservation, validate } from '../lib/reservation'

const t = reservePage.form
const courseOptions = reservePage.courses.items.map((c) => ({ value: c.slug, label: findCourse(c.slug).title }))
const partySizes = Array.from({ length: t.partySizeMax }, (_, i) => i + 1)

const inputClass =
  'block min-h-[56px] w-full rounded-[2px] border bg-paper px-4 text-[18px] text-ink placeholder:text-ink-mute/80 focus:border-sage focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage'

/**
 * 사전예약 신청 폼. 항목·필수/선택·동의 문구는 기존 서비스와 같습니다.
 * 필수 항목(성함·휴대폰 번호·개인정보 동의)만 검사하고, 시안에서는 아무것도 전송·저장하지 않습니다.
 */
export default function ReserveForm() {
  const id = useId()
  const formRef = useRef(null)
  const startedAt = useRef(Date.now())
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState('idle') // idle | submitting | demo | error
  const err = (key) => errors.includes(key)

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const found = validate({ name: data.get('name') ?? '', phone: data.get('phone') ?? '', privacy: data.get('privacy') === 'on' })
    setErrors(found)
    if (found.length) {
      setStatus('idle')
      // 첫 번째 오류 항목으로 포커스를 옮깁니다.
      form.elements.namedItem(found[0])?.focus()
      return
    }
    // 기존 서비스와 같은 부가 값
    data.set('fill_ms', String(Date.now() - startedAt.current))
    new URLSearchParams(window.location.search).forEach((v, k) => k.startsWith('utm_') && data.set(k, v))

    if (!submitReservation) {
      setStatus('demo') // 시안: 성공한 것처럼 보이지 않도록 안내만 합니다.
      return
    }
    setStatus('submitting')
    try {
      const res = await submitReservation(data)
      if (!res?.ok) throw new Error('failed')
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div role="status" className="container-journal max-w-3xl text-center">
        <h2 id="reserve-title" className="type-section">{t.done.title}</h2>
        <p className="type-lead mt-4 text-ink-soft">{t.done.body.replace('{phone}', phone)}</p>
      </div>
    )
  }

  return (
    <div className="container-journal grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 xl:gap-24">
      <header className="lg:sticky lg:top-[120px] lg:self-start">
        <p className="label-ko text-brass-ink">{t.eyebrow}</p>
        <h2 id="reserve-title" className="type-section mt-4">{t.title}</h2>
        <p className="type-lead mt-5 text-ink-soft">{t.body}</p>
      </header>

      <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="reserve-title" className="space-y-9">
        <input type="hidden" name="locale" value="ko" />
        {/* 자동 입력 방지용 빈 칸 (기존 서비스와 같음) */}
        <div aria-hidden="true" className="absolute left-[-9999px] size-px overflow-hidden">
          <label>
            Leave empty
            <input type="text" name="hp_field" tabIndex={-1} autoComplete="new-password" />
          </label>
        </div>

        {status === 'error' && (
          <p role="alert" className="border-l-2 border-alert bg-paper px-5 py-4 text-[17px] text-alert">{t.errors.server}</p>
        )}

        <div className="grid gap-7 sm:grid-cols-2 sm:gap-6">
          <Field label={t.name} error={err('name') && t.errors.name} id={`${id}-name`}>
            <input
              id={`${id}-name`}
              name="name"
              autoComplete="name"
              required
              maxLength={40}
              placeholder={t.namePlaceholder}
              aria-invalid={err('name')}
              aria-describedby={err('name') ? `${id}-name-error` : undefined}
              className={`${inputClass} ${err('name') ? 'border-alert' : 'border-ink/25'}`}
            />
          </Field>
          <Field label={t.phone} error={err('phone') && t.errors.phone} id={`${id}-phone`}>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              required
              placeholder={t.phonePlaceholder}
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              aria-invalid={err('phone')}
              aria-describedby={err('phone') ? `${id}-phone-error` : undefined}
              className={`${inputClass} tabular-nums ${err('phone') ? 'border-alert' : 'border-ink/25'}`}
            />
          </Field>
        </div>

        <fieldset>
          <Legend optional>{t.interests}</Legend>
          <p className="mt-1 text-[16px] text-ink-mute">{t.interestsHint}</p>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {courseOptions.map((c) => (
              <Option key={c.value} type="checkbox" name="interests" value={c.value} label={c.label} />
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor={`${id}-party`} className="flex items-baseline gap-1.5 text-[18px] font-semibold">
            {t.partySize} <Optional />
          </label>
          <select
            id={`${id}-party`}
            name="partySize"
            defaultValue=""
            className={`${inputClass} mt-2.5 border-ink/25 sm:max-w-[16rem]`}
          >
            <option value="">—</option>
            {partySizes.map((n) => (
              <option key={n} value={n}>
                {n} {t.partySizeUnit}
                {n === t.partySizeMax ? ' +' : ''}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <Legend optional>{t.period}</Legend>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {t.periods.map((p) => (
              <Option key={p.key} type="radio" name="period" value={p.key} label={p.label} />
            ))}
          </div>
        </fieldset>

        <div>
          <Option type="checkbox" name="mobility" label={t.mobility} describedBy={`${id}-mobility-hint`} />
          <p id={`${id}-mobility-hint`} className="mt-2 text-[16px] text-ink-mute">{t.mobilityHint}</p>
        </div>

        <div>
          <label htmlFor={`${id}-memo`} className="flex items-baseline gap-1.5 text-[18px] font-semibold">
            {t.memo} <Optional />
          </label>
          <textarea
            id={`${id}-memo`}
            name="memo"
            rows={4}
            maxLength={500}
            placeholder={t.memoPlaceholder}
            className={`${inputClass} mt-2.5 resize-y border-ink/25 py-3.5 leading-relaxed`}
          />
        </div>

        {/* 동의 — 필수와 선택을 나눠 둡니다 */}
        <div className="space-y-4 border-t border-ink/70 pt-7">
          <div className={`border bg-paper px-5 py-5 ${err('privacy') ? 'border-alert' : 'border-rule'}`}>
            <label className="flex min-h-11 cursor-pointer items-start gap-3.5">
              <input
                type="checkbox"
                name="privacy"
                required
                aria-invalid={err('privacy')}
                aria-describedby={`${id}-privacy-detail${err('privacy') ? ` ${id}-privacy-error` : ''}`}
                className="mt-0.5 size-6 shrink-0 accent-sage"
              />
              <span className="text-[17px] font-semibold leading-snug md:text-[18px]">{t.privacy}</span>
            </label>
            <dl id={`${id}-privacy-detail`} className="mt-4 space-y-2 pl-[2.375rem] text-[16px] leading-relaxed">
              {t.privacyDetail.map(([k, v]) => (
                <div key={k} className="sm:grid sm:grid-cols-[5.5rem_1fr] sm:gap-3">
                  <dt className="font-medium text-ink-soft">{k}</dt>
                  <dd className="text-ink-soft">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 pl-[2.375rem] text-[16px] text-ink-mute">{t.privacyNote}</p>
            {err('privacy') && (
              <p id={`${id}-privacy-error`} className="mt-3 pl-[2.375rem] text-[16px] font-medium text-alert">{t.errors.privacy}</p>
            )}
          </div>

          <label className="flex min-h-11 cursor-pointer items-start gap-3.5 px-5 py-2">
            <input type="checkbox" name="marketing" className="mt-0.5 size-6 shrink-0 accent-sage" />
            <span className="text-[17px] leading-snug text-ink-soft md:text-[18px]">{t.marketing}</span>
          </label>
        </div>

        <div className="space-y-4">
          <Button type="submit" variant="primary" disabled={status === 'submitting'} className="min-h-[60px] w-full text-[18px] active:translate-y-px disabled:opacity-60">
            {status === 'submitting' ? t.submitting : t.submit}
          </Button>
          <p role="status" aria-live="polite" className={status === 'demo' ? 'border-l-2 border-brass bg-paper px-5 py-4 text-[16px] leading-relaxed text-ink' : 'sr-only'}>
            {status === 'demo' ? t.demo : ''}
          </p>
        </div>
      </form>
    </div>
  )
}

function Field({ label, error, id, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[18px] font-semibold">
        {label}
      </label>
      <div className="mt-2.5">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[16px] font-medium text-alert">
          {error}
        </p>
      )}
    </div>
  )
}

function Optional() {
  return <span className="text-[16px] font-normal text-ink-mute">· {t.optional}</span>
}

function Legend({ children, optional }) {
  return (
    <legend className="flex items-baseline gap-1.5 text-[18px] font-semibold">
      {children} {optional && <Optional />}
    </legend>
  )
}

/** 체크박스·라디오 한 줄 — 진짜 input 위에 크게 다시 그린 선택지 (상세 페이지 예약 패널과 같은 모양) */
function Option({ type, name, value, label, describedBy }) {
  const round = type === 'radio'
  return (
    <label className="group flex min-h-[56px] cursor-pointer items-center gap-3.5 rounded-[2px] border border-ink/20 bg-paper px-4 py-3 transition-colors hover:border-sage has-[:checked]:border-sage has-[:checked]:bg-[#e9ecdf] has-[:checked]:ring-1 has-[:checked]:ring-inset has-[:checked]:ring-sage has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sage">
      <input type={type} name={name} value={value} aria-describedby={describedBy} className="peer sr-only" />
      <span
        aria-hidden="true"
        className={`flex size-6 shrink-0 items-center justify-center border-[1.5px] border-ink/45 bg-paper text-paper peer-checked:border-sage peer-checked:bg-sage ${round ? 'rounded-full' : 'rounded-[3px]'}`}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8.5l3.2 3L13 4.5" />
        </svg>
      </span>
      <span className="text-[17px] font-medium leading-snug group-has-[:checked]:font-semibold md:text-[18px]">{label}</span>
    </label>
  )
}
