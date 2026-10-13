const styles = {
  primary: 'bg-sage text-paper hover:bg-sage-deep border border-sage hover:border-sage-deep',
  secondary: 'bg-transparent text-ink border border-ink/35 hover:border-ink hover:bg-ink/[0.03]',
  // 포레스트 그린 테두리의 보조 버튼 — 주 CTA(primary)와 짝을 이루는 아웃라인
  outline: 'bg-transparent text-sage border border-sage hover:border-sage-deep hover:text-sage-deep hover:bg-sage/[0.06]',
}

export default function Button({ as: Tag = 'button', variant = 'primary', className = '', children, ...props }) {
  return (
    <Tag
      className={`inline-flex min-h-[54px] items-center justify-center gap-2 rounded-[2px] px-7 text-[17px] font-medium tracking-[0.01em] transition-colors duration-200 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
