import Link from "next/link";
import type { Doctor, Specialty } from "@prisma/client";
import type { Locale } from "@/lib/i18n";
export function DoctorCard({ doctor, locale }: { doctor: Doctor & { specialty: Specialty }; locale: Locale }) {
  return <article className="doctor-card">
    <Link className="doctor-photo" href={`/${locale}/doctors/${doctor.slug}`} aria-label={locale === "ar" ? `عرض ملف ${doctor.nameAr}` : `View ${doctor.nameEn}'s profile`} style={doctor.imageUrl ? { backgroundImage: `url(${doctor.imageUrl})` } : undefined}><span>{doctor.nameEn.split(" ").map(x=>x[0]).join("").slice(0,2)}</span></Link>
    <div className="card-body"><span className="pill">{locale === "ar" ? doctor.specialty.nameAr : doctor.specialty.nameEn}</span>
      <h3>{locale === "ar" ? doctor.nameAr : doctor.nameEn}</h3><strong>{locale === "ar" ? doctor.titleAr : doctor.titleEn}</strong>
      <p>{locale === "ar" ? doctor.shortDescriptionAr : doctor.shortDescriptionEn}</p>
      <div className="card-actions"><Link href={`/${locale}/doctors/${doctor.slug}`}>{locale === "ar" ? "الملف الشخصي" : "View profile"} <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span></Link><Link className="button small" href={`/${locale}/book-appointment?doctor=${doctor.id}`}>{locale === "ar" ? "احجز" : "Book"}</Link></div>
    </div>
  </article>;
}
