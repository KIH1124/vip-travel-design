/*
 * 사전예약 신청 — 입력 정리·검사와 제출.
 *
 * 기존 서비스는 브라우저 검사 없이(noValidate) 서버에서 검사하고 접수합니다.
 * 이 시안에는 서버가 없으므로 같은 필수 항목(성함·휴대폰 번호·개인정보 동의)을 화면에서 검사하고,
 * 제출은 하지 않습니다. 실제 접수를 연결할 때는 submitReservation 만 바꾸면 됩니다.
 */

/** 휴대폰 번호 자동 하이픈 — 기존 서비스와 같은 규칙 (82 국가번호는 0 으로, 최대 11자리) */
export function formatPhone(value) {
  const digits = value.replace(/\D/g, '')
  const d = (digits.startsWith('82') ? `0${digits.slice(2)}` : digits).slice(0, 11)
  if (d.length < 4) return d
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`
  return `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`
}

/*
 * 휴대폰 번호 검사 — 기존 서비스의 서버 검사 규칙은 화면에서 확인할 수 없어(확인 필요),
 * 국내 휴대폰 번호 형식(01X로 시작하는 10~11자리)만 확인합니다.
 */
const PHONE = /^01[016789]\d{7,8}$/

/** 오류가 있는 항목 이름 목록 (순서 = 화면 순서) */
export function validate({ name, phone, privacy }) {
  const errors = []
  if (!name.trim()) errors.push('name')
  if (!PHONE.test(phone.replace(/\D/g, ''))) errors.push('phone')
  if (!privacy) errors.push('privacy')
  return errors
}

/**
 * 실제 접수 함수 자리. null 이면 시안 모드 — 아무것도 전송·저장하지 않습니다.
 * 연결 예: export const submitReservation = (formData) => fetch('/api/reserve', { method: 'POST', body: formData })
 * 기존 서비스가 함께 보내는 값: locale, hp_field(자동 입력 방지용 빈 칸), fill_ms(작성 시간), utm_* (주소의 광고 추적값)
 */
export const submitReservation = null
