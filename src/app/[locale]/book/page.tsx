import { PublicForm } from "@/components/PublicForm";
import { db } from "@/lib/db";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export const metadata = { title: "Book an appointment" };
export default async function Book({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const services = await db.service.findMany({
    where: { published: true },
    select: { id: true, titleEn: true, titleAr: true },
  });
  return (
    <section className="section container">
      <h1>{locale === "ar" ? "احجز موعداً" : "Request an appointment"}</h1>
      <PublicForm kind="appointment" locale={locale} services={services} />
    </section>
  );
}
