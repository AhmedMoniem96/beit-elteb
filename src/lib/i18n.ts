export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
export const copy = {
  en: {
    brand: "Beit El Teb",
    nav: {
      home: "Home",
      services: "Services",
      doctors: "Doctors",
      insurance: "Insurance",
      about: "About",
      contact: "Contact",
      book: "Book now",
    },
    hero: "Care that feels like home",
    lead: "Personal, evidence-led healthcare for every stage of life.",
    explore: "Explore our care",
    why: "Healthcare built around you",
    whyText:
      "Our clinicians combine careful listening, modern diagnostics and clear follow-up plans.",
    form: {
      name: "Full name",
      email: "Email",
      phone: "Phone",
      subject: "Subject",
      message: "How can we help?",
      date: "Preferred date and time",
      service: "Service",
      send: "Send message",
      book: "Request appointment",
      success: "Thank you — we will be in touch shortly.",
    },
  },
  ar: {
    brand: "بيت الطب",
    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      doctors: "الأطباء",
      insurance: "التأمين",
      about: "من نحن",
      contact: "تواصل معنا",
      book: "احجز الآن",
    },
    hero: "رعاية تشعرك بأنك في بيتك",
    lead: "رعاية صحية شخصية قائمة على الدليل لكل مرحلة من مراحل الحياة.",
    explore: "اكتشف خدماتنا",
    why: "رعاية صحية تتمحور حولك",
    whyText:
      "يجمع أطباؤنا بين الاستماع الدقيق والتشخيص الحديث وخطط المتابعة الواضحة.",
    form: {
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      subject: "الموضوع",
      message: "كيف يمكننا مساعدتك؟",
      date: "التاريخ والوقت المفضل",
      service: "الخدمة",
      send: "إرسال الرسالة",
      book: "طلب موعد",
      success: "شكراً لك — سنتواصل معك قريباً.",
    },
  },
} as const;
