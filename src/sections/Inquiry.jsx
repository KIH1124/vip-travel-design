import { useId, useState } from 'react'
import Button from '../components/Button'
import { inquiry } from '../data/site'

// 세 버튼 공통: 같은 높이·모서리, 눌렀을 때 살짝 내려앉는 느낌과 분명한 포커스 링
const pressable = 'duration-150 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-sage'

/**
 * Hero 바로 아래의 검색·문의 영역.
 * 디자인 시안이므로 입력 내용은 어디에도 전송되지 않으며, 화면에도 그렇게 안내합니다.
 */
export default function Inquiry() {
  const id = useId()
  const [text, setText] = useState('')
  const [notice, setNotice] = useState('')

  const demo = (action) => (e) => {
    e.preventDefault()
    setNotice(`디자인 시안 화면이라 '${action}'은(는) 아직 동작하지 않습니다. 입력하신 내용은 전송되지 않았습니다.`)
  }

  return (
    <section id="plan" aria-labelledby={`${id}-q`} className="scroll-mt-24 bg-paper py-14 md:py-16 lg:py-20">
      <div className="container-journal grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-14">
        <div className="lg:col-span-5">
          <p className="label-latin text-brass-ink">Plan Your Journey</p>
          <label id={`${id}-q`} htmlFor={`${id}-input`} className="type-section mt-4 block">
            {inquiry.question}
          </label>
          <p className="type-body mt-4 max-w-md text-ink-soft md:mt-5">{inquiry.help}</p>
        </div>

        <form className="lg:col-span-7 lg:pt-10" onSubmit={demo(inquiry.primary)} noValidate>
          <textarea
            id={`${id}-input`}
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={inquiry.placeholder}
            className="block w-full resize-none rounded-[2px] border border-ink/25 bg-white/55 px-5 py-5 text-[18px] leading-[1.75] text-ink placeholder:text-ink-mute/90 focus:border-sage focus:bg-white/80 focus:outline-none md:px-7 md:py-6 md:text-[19px]"
          />

          {/* 모바일: 세로로 꽉 차게 / 태블릿 이상: 입력 방법(말씀으로 하기)은 왼쪽, 진행 버튼은 오른쪽 */}
          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center">
            <Button type="submit" variant="primary" className={`${pressable} active:bg-[#343d30] md:order-3 md:min-w-[200px]`}>
              {inquiry.primary}
            </Button>
            <Button type="button" variant="secondary" className={`${pressable} active:bg-ink/[0.07] md:order-2 md:ml-auto`} onClick={demo(inquiry.secondary)}>
              {inquiry.secondary}
            </Button>
            <Button type="button" variant="outline" className={`${pressable} active:bg-sage/[0.12] md:order-1 md:pl-6 md:pr-7`} onClick={demo(inquiry.voice)}>
              <MicIcon />
              {inquiry.voice}
            </Button>
          </div>

          <p role="status" aria-live="polite" className="mt-4 min-h-[1.65em] text-[16px] leading-relaxed text-ink-mute">
            {notice || '시안 화면입니다. 실제 상담 접수와 일정 생성은 연결되어 있지 않습니다.'}
          </p>
        </form>
      </div>
    </section>
  )
}

/** 단순한 선 마이크 아이콘 (장식용 — 버튼 글자가 이름 역할을 합니다) */
function MicIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
      <path d="M12 17.5V21" />
    </svg>
  )
}
