export default function SectionHeading({ label, title, intro, id, align = 'left', className = '' }) {
  const center = align === 'center'
  return (
    <header className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {label && <p className="label-latin text-brass-ink">{label}</p>}
      <h2 id={id} className="type-section mt-4">{title}</h2>
      {intro && <p className="type-lead mt-5 text-ink-soft">{intro}</p>}
    </header>
  )
}
