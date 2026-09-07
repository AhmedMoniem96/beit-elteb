import Link from "next/link";
import { notFound } from "next/navigation";
import { copy, isLocale } from "@/lib/i18n";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];
  const services = await db.service.findMany({
    where: { published: true },
    take: 3,
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Beit El Teb",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    availableService: services.map((s) => ({
      "@type": "MedicalProcedure",
      name: locale === "ar" ? s.titleAr : s.titleEn,
    })),
  };
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <div className="eyebrow">{t.brand}</div>
          <h1>{t.hero}</h1>
          <p>{t.lead}</p>
          <Link className="button" href={`/${locale}/book`}>
            {t.nav.book}
          </Link>
        </div>
      </section>
      <section className="section container">
        <div className="intro">
          <h2>{t.why}</h2>
          <p>{t.whyText}</p>
        </div>
        <div className="grid">
          {services.map((s) => (
            <article className="card" key={s.id}>
              <h3>{locale === "ar" ? s.titleAr : s.titleEn}</h3>
              <p>{locale === "ar" ? s.descriptionAr : s.descriptionEn}</p>
            </article>
          ))}
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
