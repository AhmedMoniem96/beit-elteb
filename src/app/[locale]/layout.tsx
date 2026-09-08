import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { isLocale } from "@/lib/i18n";
import { Footer } from "@/components/Footer";
import { PublicMotion } from "@/components/PublicMotion";
import { PublicExperience } from "@/components/PublicExperience";
import { db } from "@/lib/db";
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const settings = await db.siteSettings.findUnique({
    where: { id: "default" },
    select: { logoUrl: true },
  });
  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <Header locale={locale} />
      <PublicExperience locale={locale} logoUrl={settings?.logoUrl} />
      <PublicMotion />
      <main>{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
