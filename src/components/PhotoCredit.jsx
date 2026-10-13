export default function PhotoCredit({ credit, className = '' }) {
  if (!credit) return null
  return <p className={`text-[15px] leading-relaxed text-ink-mute ${className}`}>사진 · {credit}</p>
}
