/*
 * 크기별 스타일. md 는 메인 페이지(기존과 동일), lg 는 코스 상세 페이지용으로
 * 글자를 한 단계 키우고 시간·장소·머무는 시간 열 이름을 함께 보여 줍니다.
 */
const sizes = {
  md: {
    row: 'grid-cols-[4.25rem_1fr_auto] gap-x-4 py-[14px] md:grid-cols-[4.75rem_1fr_auto]',
    time: 'text-[19px] md:text-[20px]',
    place: 'text-[17px] md:text-[18px]',
    stay: 'text-[16px] md:text-[17px]',
    day: 'text-[18px]',
    theme: 'text-[16px] md:text-[17px]',
  },
  lg: {
    row: 'grid-cols-[4.5rem_1fr_auto] gap-x-4 py-4 md:grid-cols-[6rem_1fr_7rem] md:gap-x-6 md:py-[18px]',
    time: 'text-[21px] md:text-[23px]',
    place: 'text-[18px] md:text-[20px]',
    stay: 'text-[16px] md:text-[18px] md:text-right',
    day: 'text-[21px] md:text-[23px]',
    theme: 'text-[17px] md:text-[18px]',
  },
}

/**
 * 여행 노트 형식의 시간표. 일정은 절대 줄이지 않고 모두 표시합니다.
 * 당일 일정은 일차 표기 없이 그날의 주제만, 여러 날이면 일차를 함께 적습니다. (lg 는 항상 일차 표기)
 */
export default function Timetable({ days, size = 'md', headingLevel = 4, className = '' }) {
  const st = sizes[size]
  const large = size === 'lg'
  const showDay = large || days.length > 1
  const Heading = `h${headingLevel}`
  return (
    <div className={className}>
      {days.map((d) => (
        <section key={d.day} className={`first:mt-0 ${large ? 'mt-12' : 'mt-8'}`} aria-label={`${d.day} 일정`}>
          <Heading className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-ink/70 pb-3">
            {showDay && <span className={`font-serif font-medium ${st.day}`}>{d.day}</span>}
            <span className={`text-ink-soft ${st.theme}`}>{showDay ? d.theme : `오늘의 길 · ${d.theme}`}</span>
          </Heading>
          {large && (
            <p aria-hidden="true" className={`grid border-b border-rule py-2 text-[15px] text-ink-mute ${st.row.replace(/py-\S+/g, '')}`}>
              <span>시간</span>
              <span>장소</span>
              <span className="text-right max-md:hidden">머무는 시간</span>
            </p>
          )}
          <ol>
            {d.stops.map((s) => (
              <li key={s.time + s.place} className={`grid items-baseline border-b border-rule ${st.row}`}>
                <time className={`font-latin font-medium tabular-nums tracking-[0.02em] text-brass-ink ${st.time}`}>{s.time}</time>
                <span className={`leading-snug ${st.place}`}>{s.place}</span>
                <span className={`text-ink-mute ${st.stay}`}>
                  {s.stay ? (
                    <>
                      {large && <span className="sr-only">머무는 시간 </span>}
                      {s.stay}
                    </>
                  ) : (
                    ''
                  )}
                </span>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}
