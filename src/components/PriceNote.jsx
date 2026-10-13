/** 차량 기본 이용요금. 쇼핑몰식 강조 대신 기록처럼 담담하게 적습니다. */
export default function PriceNote({ price, className = '' }) {
  return (
    <div className={className}>
      <p className="text-[16px] text-ink-mute">차량 기본 이용요금 · {price.vehicle} 한 대</p>
      <p className="mt-1">
        <span className="type-price">{price.amount}</span>
        <span className="ml-1.5 text-[17px] text-ink-soft">부터</span>
      </p>
    </div>
  )
}
