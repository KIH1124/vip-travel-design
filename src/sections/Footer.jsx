import Button from '../components/Button'
import Logo from '../components/Logo'
import { footer, hero, opening } from '../data/site'

export function Opening() {
  return (
    <section aria-label="정식 오픈 안내" className="bg-linen py-16 md:py-20">
      <div className="container-journal max-w-3xl text-center">
        <p className="label-latin text-brass-ink">Opening · November 2026</p>
        <p className="mt-5 font-serif text-[24px] leading-[1.6] tracking-[-0.01em] md:text-[30px]">{opening.text}</p>
        <Button as="a" href={opening.href} variant="primary" className="mt-10 w-full sm:w-auto sm:min-w-[220px]">
          {opening.cta}
        </Button>
      </div>
    </section>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-paper pb-10 pt-14 md:pt-16">
      <div className="container-journal grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo variant="dark" size="footer" />
          <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-ink-soft">{footer.business}</p>
        </div>
        <nav aria-label="바로 가기" className="md:col-span-3">
          <p className="label-ko text-ink-mute">바로 가기</p>
          <ul className="mt-3">
            {footer.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="inline-flex min-h-11 items-center text-[17px] hover:text-sage">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="label-ko text-ink-mute">상담</p>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">{footer.contact}</p>
        </div>
      </div>

      <div className="container-journal mt-12 border-t border-rule pt-6 text-[15px] leading-relaxed text-ink-mute">
        <p>
          사진: 위키미디어 공용 (작가·라이선스는 각 사진 아래에 적었습니다)
          {!hero.image.credit && ' · 메인 사진 출처 확인 필요'}
        </p>
        <p className="mt-2">{footer.copyright}</p>
      </div>
    </footer>
  )
}
