import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { isLocale } from "@/lib/i18n";
import { Footer } from "@/components/Footer";
import { PublicMotion } from "@/components/PublicMotion";
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
      <PublicMotion />
      <main>{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
