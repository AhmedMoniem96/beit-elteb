import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { isLocale } from "@/lib/i18n";
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <Header locale={locale} />
      <main>{children}</main>
      <footer className="footer">
        <div className="container">
          <strong>{locale === "ar" ? "بيت الطب" : "Beit El Teb"}</strong>
          <span>© {new Date().getFullYear()} · hello@beitelteb.com</span>
        </div>
      </footer>
    </div>
  );
}
