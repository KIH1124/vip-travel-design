import { booking, vehicleTypes } from '../data/site'

/*
 * 예상 금액 계산 — 기존 서비스 상세 페이지의 동작을 그대로 옮긴 규칙입니다 (2026-10-13 확인).
 *
 * 1. 예상 금액 = 차량 기본 이용요금(차 한 대 고정가)
 *              + 가이드 동행 하루 150,000원 × 여행 일수
 *              + 동행 케어 하루 120,000원 × 여행 일수
 *    예) 설악산 1박 2일 + 가이드 = 1,100,000 + 150,000 × 2 = 1,400,000원
 * 2. 인원이 차량 정원을 넘으면 그 차량은 고를 수 없고,
 *    고른 차량이 맞지 않으면 정원이 맞는 첫 번째 차량(목록 순서)으로 계산합니다.
 *    인원을 다시 줄이면 처음 고른 차량으로 돌아갑니다.
 * 3. 한 대로 모두 탈 수 없으면(12명 초과) 금액 대신 안내 문구를 보여 줍니다.
 *    같은 차종 여러 대 중 가장 싼 조합(대수 = 인원 ÷ 정원 올림)을 고르고,
 *    금액이 같으면 대수가 적은 쪽을 고릅니다. 이 안내 금액에는 가이드·동행 케어가 들어가지 않습니다.
 * 4. 인원 상한은 없습니다 (기존 서비스와 같음).
 */

export const won = (n) => `${n.toLocaleString('ko-KR')}원`

/** 이 코스에서 고를 수 있는 차량 (정원·요금 포함) */
export function vehiclesFor(course) {
  return vehicleTypes.filter((v) => course.fares[v.id] != null).map((v) => ({ ...v, fare: course.fares[v.id] }))
}

/** 고른 차량이 인원에 맞지 않으면 정원이 맞는 첫 차량으로 바꿉니다. 맞는 차가 없으면 null. */
export function effectiveVehicle(vehicles, preferredId, pax) {
  const preferred = vehicles.find((v) => v.id === preferredId)
  if (preferred && preferred.capacity >= pax) return preferred
  return vehicles.find((v) => v.capacity >= pax) ?? null
}

/** 여러 대로 나눠 타는 가장 싼 조합 */
export function splitPlan(vehicles, pax) {
  let best = null
  for (const v of vehicles) {
    const count = Math.ceil(pax / v.capacity)
    const amount = count * v.fare
    if (!best || amount < best.amount || (amount === best.amount && count < best.count)) best = { vehicle: v, count, amount }
  }
  return best
}

export function estimate(course, { vehicleId, pax, guide, care }) {
  const vehicles = vehiclesFor(course)
  const days = course.days.length
  const vehicle = effectiveVehicle(vehicles, vehicleId, pax)
  if (!vehicle) return { vehicles, days, vehicle: null, split: splitPlan(vehicles, pax) }

  const lines = [{ label: `${vehicle.name} 한 대`, amount: vehicle.fare }]
  if (guide) lines.push({ label: `${booking.guide.label} ${won(booking.guide.perDay)} × ${days}일`, amount: booking.guide.perDay * days })
  if (care) lines.push({ label: `동행 케어 ${won(booking.care.perDay)} × ${days}일`, amount: booking.care.perDay * days })
  return { vehicles, days, vehicle, lines, total: lines.reduce((sum, l) => sum + l.amount, 0) }
}
