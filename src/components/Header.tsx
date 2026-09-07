import Link from "next/link";
import { copy, Locale } from "@/lib/i18n";
export function Header({ locale }: { locale: Locale }) {
  const t = copy[locale],
    other = locale === "en" ? "ar" : "en";
  return (
    <header className="header">
      <Link className="brand" href={`/${locale}`}>
        {t.brand}
      </Link>
      <nav aria-label="Main navigation">
        <Link href={`/${locale}`}>{t.nav.home}</Link>
        <Link href={`/${locale}/services`}>{t.nav.services}</Link>
        <Link href={`/${locale}/about`}>{t.nav.about}</Link>
        <Link href={`/${locale}/contact`}>{t.nav.contact}</Link>
        <Link className="button small" href={`/${locale}/book`}>
          {t.nav.book}
        </Link>
        <Link href={`/${other}`} hrefLang={other}>
          {other.toUpperCase()}
        </Link>
      </nav>
    </header>
  );
}
