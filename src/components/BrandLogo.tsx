import Link from "next/link";
import type { Locale } from "@/lib/i18n";

/** Preserves the supplied logo proportions while allowing its CMS asset to be swapped freely. */
export function BrandLogo({ locale, logoUrl, footer = false }: { locale: Locale; logoUrl?: string | null; footer?: boolean }) {
  const label = locale === "ar" ? "بيت الطيب الطبية - الرئيسية" : "Bait AlTeeb Medical home";
  return <Link className={`brand-logo${footer ? " brand-logo-footer" : ""}`} href={`/${locale}`} aria-label={label}>
    {logoUrl ? <img src={logoUrl} alt="Bait AlTeeb Medical" /> : <span className="brand-logo-fallback" aria-hidden="true"><span>Bait AlTeeb</span><small>MEDICAL</small></span>}
  </Link>;
}
