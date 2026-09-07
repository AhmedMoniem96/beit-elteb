import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
export const metadata = { title: "About" };
export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <section className="section container">
      <div className="intro">
        <div className="eyebrow">{locale === "ar" ? "قصتنا" : "OUR STORY"}</div>
        <h1>
          {locale === "ar"
            ? "طب إنساني، مصمم للحياة الحقيقية"
            : "Human medicine, designed for real life"}
        </h1>
        <p>
          {locale === "ar"
            ? "أسسنا بيت الطب لجعل الرعاية الممتازة أكثر دفئاً ووضوحاً وسهولة."
            : "We founded Beit El Teb to make excellent care warmer, clearer and easier to access. Every visit starts with listening and ends with a plan you understand."}
        </p>
      </div>
    </section>
  );
}
