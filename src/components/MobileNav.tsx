"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { copy, Locale } from "@/lib/i18n";

export function MobileNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = copy[locale];
  const links = [["services", t.nav.services], ["doctors", t.nav.doctors], ["about", t.nav.about], ["insurance", t.nav.insurance], ["contact", t.nav.contact]];
  useEffect(() => {
    const header = document.querySelector(".site-header");
    const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 20);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);
  return <><button className="menu" aria-expanded={open} aria-controls="public-navigation" aria-label={arLabel(locale, open)} onClick={() => setOpen(!open)}><span /><span /><span /></button><nav id="public-navigation" className={open ? "nav open" : "nav"} aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}>{links.map(([p, label]) => <Link className={pathname.startsWith(`/${locale}/${p}`) ? "active" : ""} aria-current={pathname.startsWith(`/${locale}/${p}`) ? "page" : undefined} key={p} href={`/${locale}/${p}`} onClick={() => setOpen(false)}>{label}</Link>)}<span className="language-switch"><Link className={locale === "en" ? "active" : ""} href="/en">EN</Link><span>/</span><Link className={locale === "ar" ? "active" : ""} href="/ar">AR</Link></span><Link className="button small nav-book" href={`/${locale}/book-appointment`} onClick={() => setOpen(false)}>{t.nav.book}</Link></nav></>;
}
function arLabel(locale: Locale, open: boolean) { return locale === "ar" ? (open ? "إغلاق القائمة" : "فتح القائمة") : (open ? "Close menu" : "Open menu"); }
