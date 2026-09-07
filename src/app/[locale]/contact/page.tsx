import { PublicForm } from "@/components/PublicForm";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
export const metadata = { title: "Contact" };
export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <section className="section container">
      <h1>{locale === "ar" ? "تواصل معنا" : "Get in touch"}</h1>
      <p>hello@beitelteb.com · +20 100 000 0000</p>
      <PublicForm kind="contact" locale={locale} />
    </section>
  );
}
