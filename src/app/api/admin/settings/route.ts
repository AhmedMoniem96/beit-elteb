import { NextResponse } from "next/server";
import { z } from "zod";
import { requireStaff } from "@/lib/authorize";
import { db } from "@/lib/db";
const nullableText = z.string().trim().max(5000).transform((v) => v || null);
const nullableUrl = z.union([z.literal(""), z.url()]).transform((v) => v || null);
const schema = z.object({
  siteName: z.string().trim().min(1).max(120), logoUrl: nullableUrl, faviconUrl: nullableUrl,
  phone: nullableText, whatsapp: nullableText, email: z.union([z.literal(""), z.email()]).transform(v => v || null),
  addressEn: nullableText, addressAr: nullableText, googleMapsUrl: nullableUrl,
  workingHoursEn: nullableText, workingHoursAr: nullableText,
  facebook: nullableUrl, instagram: nullableUrl, linkedin: nullableUrl, youtube: nullableUrl,
  seoTitle: nullableText, seoDescription: nullableText, ogImageUrl: nullableUrl,
});
export async function GET() {
  if (!(await requireStaff())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await db.siteSettings.findUnique({ where: { id: "default" } }));
}
export async function PUT(req: Request) {
  if (!(await requireStaff())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Please correct the invalid fields.", issues: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json(await db.siteSettings.upsert({ where: { id: "default" }, update: parsed.data, create: { id: "default", ...parsed.data } }));
}
