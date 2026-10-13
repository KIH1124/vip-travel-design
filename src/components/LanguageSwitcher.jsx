import { useEffect, useId, useRef, useState } from 'react'
import { languages } from '../data/site'

/**
 * 언어 선택 버튼 (지구본 · KO · 화살표) + 드롭다운.
 *
 * 디자인 시안 단계: 현재 언어는 한국어로 고정이고, 준비되지 않은 언어(ready: false)를 골라도
 * 메뉴만 닫히고 아무것도 바뀌지 않습니다.
 *
 * 실제 전환을 연결할 때는
 *   <LanguageSwitcher current={lang} onChange={(code) => …} />
 * 처럼 current 와 onChange 를 넘기고, data/site.js 의 languages.options[].ready 를 true 로 바꾸면 됩니다.
 *
 * 글자·아이콘 색은 currentColor 를 따릅니다 — Hero 위 헤더에서는 흰색, 아이보리 헤더에서는 어두운 색.
 */
export default function LanguageSwitcher({ current = languages.current, options = languages.options, onChange, className = '' }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const itemRefs = useRef([])
  const active = options.find((o) => o.code === current) ?? options[0]

  // 바깥을 누르거나 Escape 를 누르면 닫습니다.
  useEffect(() => {
    if (!open) return
    const onPointer = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // 열리면 현재 언어 항목으로 포커스를 옮깁니다 (키보드 사용자).
  const openMenu = (focusIndex = options.indexOf(active)) => {
    setOpen(true)
    requestAnimationFrame(() => itemRefs.current[Math.max(0, focusIndex)]?.focus())
  }

  const choose = (option) => {
    setOpen(false)
    buttonRef.current?.focus()
    // 준비된 언어이고 지금과 다를 때만 알립니다. 시안에서는 onChange 가 없어 아무 일도 일어나지 않습니다.
    if (option.ready && option.code !== current) onChange?.(option.code)
  }

  const onMenuKey = (e) => {
    const i = itemRefs.current.indexOf(document.activeElement)
    const move = (n) => {
      e.preventDefault()
      itemRefs.current[(i + n + options.length) % options.length]?.focus()
    }
    if (e.key === 'ArrowDown') move(1)
    else if (e.key === 'ArrowUp') move(-1)
    else if (e.key === 'Home') move(-i)
    else if (e.key === 'End') move(options.length - 1 - i)
    else if (e.key === 'Tab') setOpen(false)
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={`${id}-menu`}
        aria-label={`${languages.label}, 현재 ${active.label}`}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault()
            openMenu(e.key === 'ArrowUp' ? options.length - 1 : options.indexOf(active))
          }
        }}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-[2px] px-2 opacity-90 transition-opacity hover:opacity-100 aria-expanded:opacity-100"
      >
        <GlobeIcon />
        <span className="font-latin text-[16px] font-medium tracking-[0.14em]">{active.short}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <ul
          id={`${id}-menu`}
          role="menu"
          aria-label={languages.label}
          onKeyDown={onMenuKey}
          className="absolute right-0 top-full z-10 mt-2 min-w-[11rem] border border-rule bg-paper py-1.5 text-ink shadow-[0_8px_24px_-12px_rgba(45,48,42,0.35)]"
        >
          {options.map((o, i) => {
            const selected = o.code === active.code
            return (
              <li key={o.code} role="none">
                <button
                  ref={(el) => (itemRefs.current[i] = el)}
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  lang={o.code}
                  onClick={() => choose(o)}
                  className={`flex min-h-12 w-full items-center gap-3 px-4 text-left text-[17px] outline-none transition-colors hover:bg-linen/60 focus-visible:bg-linen/70 ${
                    selected ? 'font-semibold text-sage-deep' : 'font-medium'
                  }`}
                >
                  <span aria-hidden="true" className="flex w-4 justify-center text-sage">
                    {selected && <CheckIcon />}
                  </span>
                  <span className="flex-1">{o.label}</span>
                  {!o.ready && !selected && (
                    <span lang="ko" className="text-[15px] font-normal text-ink-mute">
                      {languages.notReady}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function GlobeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="shrink-0">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5M12 3.5C9.6 5.9 8.4 8.7 8.4 12s1.2 6.1 3.6 8.5" />
    </svg>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path d="M3.5 6l4.5 4.5L12.5 6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  )
}
