import { NextResponse } from "next/server";
import { z } from "zod";
import { requireStaff } from "@/lib/authorize";
import { db } from "@/lib/db";

const required = z.string().trim().min(1, "Required").max(5000);
const optional = z.union([z.literal(""), z.url()]).transform((value) => value || null);
const schema = z.object({
  heroTitleEn: required, heroTitleAr: required,
  heroDescriptionEn: required, heroDescriptionAr: required,
  heroImageUrl: optional,
  primaryCtaEn: required, primaryCtaAr: required,
  secondaryCtaEn: required, secondaryCtaAr: required,
  servicesHeadingEn: required, servicesHeadingAr: required,
  servicesDescriptionEn: required, servicesDescriptionAr: required,
  servicesVisible: z.boolean(),
  doctorsHeadingEn: required, doctorsHeadingAr: required,
  doctorsDescriptionEn: required, doctorsDescriptionAr: required,
  doctorsVisible: z.boolean(),
  whyTitleEn: required, whyTitleAr: required,
  whyDescriptionEn: required, whyDescriptionAr: required, whyVisible: z.boolean(),
  ctaTitleEn: required, ctaTitleAr: required,
  ctaDescriptionEn: required, ctaDescriptionAr: required,
  ctaImageUrl: optional, appointmentVisible: z.boolean(),
  insuranceHeadingEn: required, insuranceHeadingAr: required,
  insuranceDescriptionEn: required, insuranceDescriptionAr: required,
  insuranceVisible: z.boolean(),
});
export async function GET() {
  if (!(await requireStaff())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await db.homepageContent.findUnique({ where: { id: "default" } }));
}
export async function PUT(req: Request) {
  if (!(await requireStaff())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Please correct the invalid fields.", issues: parsed.error.flatten() }, { status: 400 });
  const content = await db.homepageContent.upsert({ where: { id: "default" }, update: parsed.data, create: { id: "default", ...parsed.data } });
  return NextResponse.json(content);
}
