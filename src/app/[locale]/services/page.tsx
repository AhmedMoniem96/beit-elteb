import { db } from "@/lib/db";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export const metadata = { title: "Services" };
export default async function Services({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const items = await db.service.findMany({ where: { published: true } });
  return (
    <section className="section container">
      <h1>{locale === "ar" ? "خدماتنا" : "Our services"}</h1>
      <div className="grid">
        {items.map((s) => (
          <article className="card" key={s.id}>
            <h2>{locale === "ar" ? s.titleAr : s.titleEn}</h2>
            <p>{locale === "ar" ? s.descriptionAr : s.descriptionEn}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
