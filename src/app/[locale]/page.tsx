import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DoctorCard } from "@/components/DoctorCard";
import { db } from "@/lib/db";
import { copy, isLocale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const Arrow = ({ ar }: { ar: boolean }) => <span aria-hidden="true">{ar ? "←" : "→"}</span>;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];
  const ar = locale === "ar";
  const [services, doctors, insurance, cms, doctorCount, serviceCount, insuranceCount] = await Promise.all([
    db.service.findMany({ where: { published: true }, orderBy: [{ featured: "desc" }, { sortOrder: "asc" }], take: 6 }),
    db.doctor.findMany({ where: { published: true, featured: true }, include: { specialty: true }, orderBy: { sortOrder: "asc" }, take: 3 }),
    db.insuranceProvider.findMany({ where: { published: true, featured: true }, orderBy: { sortOrder: "asc" }, take: 8 }),
    db.homepageContent.findUnique({ where: { id: "default" } }),
    db.doctor.count({ where: { published: true } }),
    db.service.count({ where: { published: true } }),
    db.insuranceProvider.count({ where: { published: true } }),
  ]);
  const hero = cms ? (ar ? cms.heroTitleAr : cms.heroTitleEn) : t.hero;
  const desc = cms ? (ar ? cms.heroDescriptionAr : cms.heroDescriptionEn) : t.lead;
  const heroImage = cms?.heroImageUrl || "/clinic.svg";
  const json = { "@context": "https://schema.org", "@type": "MedicalClinic", name: "Beit El Teb", url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000", availableService: services.map((s) => ({ "@type": "MedicalProcedure", name: ar ? s.titleAr : s.titleEn })) };
  const whyItems = ar
    ? [["✦", "أطباء متميزون", "خبرات مختارة بعناية لتقديم رعاية طبية جديرة بثقتك."], ["◌", "وقت كافٍ للاستماع", "نبدأ كل زيارة بفهم احتياجاتك الصحية بصورة كاملة."], ["⌁", "تشخيص حديث", "تقنيات دقيقة تدعم قرارات طبية واضحة ومدروسة."], ["✓", "متابعة مستمرة", "خطط علاج واضحة وتواصل يبقيك مطمئناً في كل خطوة."]]
    : [["✦", "Exceptional clinicians", "Carefully selected expertise delivering medicine worthy of your trust."], ["◌", "Time to truly listen", "Every visit starts with a complete understanding of your needs."], ["⌁", "Modern diagnostics", "Precise technology supporting clear, considered clinical decisions."], ["✓", "Continuous follow-up", "Clear care plans and communication that keeps you reassured."]];
  const journey = ar ? ["اختر التخصص", "اختر طبيبك", "اطلب موعدك", "استلم التأكيد"] : ["Choose a specialty", "Select your doctor", "Request your appointment", "Receive confirmation"];

  return <>
    <section className="home-hero" aria-labelledby="hero-title">
      <div className="container hero-layout">
        <div className="hero-copy hero-sequence">
          <span className="eyebrow">{ar ? "رعاية متخصصة بقلب إنساني" : "PRIVATE CARE, PERSONALLY DELIVERED"}</span>
          <h1 id="hero-title">{hero}</h1><p>{desc}</p>
          <div className="hero-actions"><Link className="button" href={`/${locale}/book-appointment`}>{cms ? (ar ? cms.primaryCtaAr : cms.primaryCtaEn) : t.nav.book}<Arrow ar={ar} /></Link><Link className="button secondary" href={`/${locale}/doctors`}>{cms ? (ar ? cms.secondaryCtaAr : cms.secondaryCtaEn) : (ar ? "ابحث عن طبيب" : "Find a doctor")}</Link></div>
          <ul className="hero-trust" aria-label={ar ? "مزايا الرعاية" : "Care benefits"}><li>✓ {ar ? "أطباء ذوو خبرة" : "Experienced specialists"}</li><li>✓ {ar ? "مرافق حديثة" : "Modern facilities"}</li><li>✓ {ar ? "نقبل التأمين" : "Insurance accepted"}</li></ul>
        </div>
        <div className="hero-visual hero-visual-enter"><div className="hero-image" style={{ backgroundImage: `url(${heroImage})` }} role="img" aria-label={ar ? "رعاية طبية في بيت الطب" : "Personal medical care at Beit El Teb"} /><div className="hero-float"><span className="pulse-dot" /><div><strong>{ar ? "مواعيد في نفس اليوم" : "Same-day appointments"}</strong><small>{ar ? "عندما تحتاج إلى الرعاية" : "Care, when you need it"}</small></div></div></div>
      </div>
    </section>
    <section className="trust-strip" data-counter-group aria-label={ar ? "بيت الطب بالأرقام" : "Beit El Teb at a glance"}><div className="container trust-grid"><div><strong data-counter={doctorCount} aria-label={String(doctorCount)}>{doctorCount}</strong><span>{ar ? "طبيباً متخصصاً" : "Specialists"}</span></div><div><strong data-counter={serviceCount} aria-label={String(serviceCount)}>{serviceCount}</strong><span>{ar ? "خدمة طبية" : "Medical services"}</span></div><div><strong data-counter={insuranceCount} aria-label={String(insuranceCount)}>{insuranceCount}</strong><span>{ar ? "شريك تأمين" : "Insurance partners"}</span></div><div className="trust-promise"><strong>✓</strong><span>{ar ? "حجز بسيط وسريع" : "Simple, timely booking"}</span></div></div></section>

    {cms?.servicesVisible !== false && <section className="section services-section reveal" aria-labelledby="services-title"><div className="container"><div className="section-heading"><div><span className="eyebrow">{ar ? "خبراتنا" : "OUR EXPERTISE"}</span><h2 id="services-title">{cms ? (ar ? cms.servicesHeadingAr : cms.servicesHeadingEn) || (ar ? "رعاية شاملة لكل أفراد الأسرة" : "Thoughtful care for every chapter") : (ar ? "رعاية شاملة لكل أفراد الأسرة" : "Thoughtful care for every chapter")}</h2>{cms && (ar ? cms.servicesDescriptionAr : cms.servicesDescriptionEn) && <p className="lead">{ar ? cms.servicesDescriptionAr : cms.servicesDescriptionEn}</p>}</div><Link className="text-link" href={`/${locale}/services`}>{ar ? "عرض كل الخدمات" : "Explore all services"} <Arrow ar={ar} /></Link></div><div className="service-grid">{services.map((s, i) => <Link className={`service-card ${i === 0 ? "featured-service" : ""}`} href={`/${locale}/services/${s.slug}`} key={s.id}>{i === 0 && s.imageUrl && <div className="service-image" style={{ backgroundImage: `linear-gradient(0deg,rgba(46,38,109,.78),transparent),url(${s.imageUrl})` }} />}<div className="service-card-content"><span className="service-icon" aria-hidden="true">{s.icon || ["✦", "♡", "⌁", "+"][i % 4]}</span><h3>{ar ? s.titleAr : s.titleEn}</h3><p>{ar ? s.descriptionAr : s.descriptionEn}</p><b>{ar ? "اعرف المزيد" : "Learn more"} <Arrow ar={ar} /></b></div></Link>)}</div></div></section>}

    {cms?.doctorsVisible !== false && doctors.length > 0 && <section className="section doctors-section reveal" aria-labelledby="doctors-title"><div className="container"><div className="section-heading"><div><span className="eyebrow">{ar ? "أطباؤنا" : "OUR DOCTORS"}</span><h2 id="doctors-title">{cms ? (ar ? cms.doctorsHeadingAr : cms.doctorsHeadingEn) || (ar ? "خبراء متميزون، هنا من أجلك" : "Experienced specialists, here for you.") : (ar ? "خبراء متميزون، هنا من أجلك" : "Experienced specialists, here for you.")}</h2>{cms && (ar ? cms.doctorsDescriptionAr : cms.doctorsDescriptionEn) && <p className="lead">{ar ? cms.doctorsDescriptionAr : cms.doctorsDescriptionEn}</p>}</div><Link className="button outline" href={`/${locale}/doctors`}>{ar ? "عرض كل الأطباء" : "View all doctors"} <Arrow ar={ar} /></Link></div><div className="doctor-grid">{doctors.map((d) => <DoctorCard doctor={d} locale={locale} key={d.id} />)}</div></div></section>}

    {cms?.whyVisible !== false && <section className="section why-section reveal" aria-labelledby="why-title"><div className="container why"><div className="why-intro"><span className="eyebrow">{ar ? "لماذا بيت الطب" : "WHY BEIT EL TEB"}</span><h2 id="why-title">{cms ? (ar ? cms.whyTitleAr : cms.whyTitleEn) : t.why}</h2><p className="lead">{cms ? (ar ? cms.whyDescriptionAr : cms.whyDescriptionEn) : t.whyText}</p><div className="why-accent"><span>+</span><p>{ar ? "رعاية متكاملة تجمع الخبرة الطبية بالتواصل الإنساني." : "Connected care that brings clinical expertise and human attention together."}</p></div></div><div className="why-grid">{whyItems.map(([icon, title, body]) => <article key={title}><span className="why-icon" aria-hidden="true">{icon}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></div></section>}

    <section className="section journey-section reveal" aria-labelledby="journey-title"><div className="container"><div className="journey-head"><div><span className="eyebrow">{ar ? "رحلتك معنا" : "YOUR CARE JOURNEY"}</span><h2 id="journey-title">{ar ? "رعاية طبية بكل سهولة." : "Care made simple."}</h2></div><Link className="button" href={`/${locale}/book-appointment`}>{t.nav.book} <Arrow ar={ar} /></Link></div><ol className="journey-grid">{journey.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}</ol></div></section>

    {cms?.insuranceVisible !== false && insurance.length > 0 && <section className="section insurance-section reveal" aria-labelledby="insurance-title"><div className="container"><div className="insurance-copy"><span className="eyebrow">{ar ? "شركاء التأمين" : "INSURANCE PARTNERS"}</span><h2 id="insurance-title">{cms ? (ar ? cms.insuranceHeadingAr : cms.insuranceHeadingEn) || (ar ? "رعاية أسهل في الوصول" : "Making exceptional care accessible") : (ar ? "رعاية أسهل في الوصول" : "Making exceptional care accessible")}</h2>{cms && (ar ? cms.insuranceDescriptionAr : cms.insuranceDescriptionEn) && <p className="lead">{ar ? cms.insuranceDescriptionAr : cms.insuranceDescriptionEn}</p>}</div><div className="partner-row">{insurance.map((x) => <div key={x.id}>{x.logoUrl ? <Image src={x.logoUrl} alt={ar ? x.nameAr : x.nameEn} width={130} height={58} unoptimized /> : <b>{ar ? x.nameAr : x.nameEn}</b>}</div>)}</div><Link className="text-link insurance-link" href={`/${locale}/insurance`}>{ar ? "عرض جميع شركاء التأمين" : "View all insurance partners"} <Arrow ar={ar} /></Link></div></section>}

    {cms?.appointmentVisible !== false && <section className="section appointment-wrap reveal"><div className="container"><div className="appointment-cta"><div className="appointment-copy"><span className="eyebrow">{ar ? "نحن هنا من أجلك" : "HERE WHEN YOU NEED US"}</span><h2>{cms ? (ar ? cms.ctaTitleAr : cms.ctaTitleEn) : (ar ? "ابدأ رحلتك نحو صحة أفضل" : "Your healthier future starts here")}</h2><p>{cms ? (ar ? cms.ctaDescriptionAr : cms.ctaDescriptionEn) : (ar ? "احجز موعدك اليوم." : "Choose your doctor and request a time in just a few steps.")}</p><Link className="button light" href={`/${locale}/book-appointment`}>{t.nav.book} <Arrow ar={ar} /></Link></div><div className="appointment-image" style={cms?.ctaImageUrl ? { backgroundImage: `url(${cms.ctaImageUrl})` } : undefined} role="img" aria-label={ar ? "فريق بيت الطب" : "Beit El Teb care team"}><span aria-hidden="true">✦</span></div></div></div></section>}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }} />
  </>;
}
