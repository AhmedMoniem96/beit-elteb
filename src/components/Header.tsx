import Link from "next/link"; import {copy,Locale} from "@/lib/i18n"; import {MobileNav} from "./MobileNav";
export function Header({locale}:{locale:Locale}) { return <header className="site-header"><div className="container header"><Link className="brand" href={`/${locale}`}><span className="logo-mark">✦</span>{copy[locale].brand}</Link><MobileNav locale={locale}/></div></header> }
