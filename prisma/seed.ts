import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";
const db = new PrismaClient();
async function main() {
  const services = [
    {
      slug: "family-medicine",
      titleEn: "Family medicine",
      titleAr: "طب الأسرة",
      descriptionEn:
        "Continuous, compassionate primary care for adults and children.",
      descriptionAr: "رعاية أولية مستمرة ورحيمة للبالغين والأطفال.",
    },
    {
      slug: "pediatrics",
      titleEn: "Pediatrics",
      titleAr: "طب الأطفال",
      descriptionEn:
        "Thoughtful preventive and acute care for growing families.",
      descriptionAr: "رعاية وقائية وعلاجية مدروسة للأطفال والعائلات.",
    },
    {
      slug: "wellness",
      titleEn: "Preventive wellness",
      titleAr: "العافية الوقائية",
      descriptionEn: "Screening and practical plans that help you thrive.",
      descriptionAr: "فحوصات وخطط عملية تساعدك على حياة أكثر صحة.",
    },
  ];
  for (const item of services)
    await db.service.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
  const email = process.env.ADMIN_EMAIL || "admin@beitelteb.com";
  const password = process.env.ADMIN_PASSWORD || "change-me-now";
  await db.user.upsert({
    where: { email },
    update: { role: Role.ADMIN },
    create: { email, role: Role.ADMIN, passwordHash: hashPassword(password) },
  });
  console.log(`Seeded ${services.length} services and admin ${email}`);
}
main().finally(() => db.$disconnect());
