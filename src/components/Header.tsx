import type { Locale } from "@/lib/i18n";
import { db } from "@/lib/db";
import { MobileNav } from "./MobileNav";
import { BrandLogo } from "./BrandLogo";

export async function Header({ locale }: { locale: Locale }) {
  const settings = await db.siteSettings.findUnique({ where: { id: "default" }, select: { logoUrl: true } });
  return <header className="site-header"><div className="container header"><BrandLogo locale={locale} logoUrl={settings?.logoUrl} /><MobileNav locale={locale} /></div></header>;
}
