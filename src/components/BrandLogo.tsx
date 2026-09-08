import Link from "next/link";
import type { Locale } from "@/lib/i18n";

/** Preserves the official logo proportions while allowing a CMS override. */
export function BrandLogo({
  locale,
  logoUrl,
  footer = false,
}: {
  locale: Locale;
  logoUrl?: string | null;
  footer?: boolean;
}) {
  const label =
    locale === "ar"
      ? "بيت الطيب الطبية - الرئيسية"
      : "Bait AlTeeb Medical home";

  const src = logoUrl?.trim() || "/brand/bait-alteeb-logo.png";

  return (
    <Link
      className={`brand-logo${footer ? " brand-logo-footer" : ""}`}
      href={`/${locale}`}
      aria-label={label}
    >
      <img src={src} alt="Bait AlTeeb Medical" />
    </Link>
  );
}