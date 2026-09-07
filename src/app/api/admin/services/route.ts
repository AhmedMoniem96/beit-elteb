import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/authorize";
import { db } from "@/lib/db";
import { z } from "zod";
const schema = z.object({
  id: z.string().optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  titleEn: z.string().min(2),
  titleAr: z.string().min(2),
  descriptionEn: z.string().min(10),
  descriptionAr: z.string().min(10),
  published: z.boolean().default(true),
});
export async function POST(req: Request) {
  if (!(await requireStaff()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  const { id, ...data } = parsed.data;
  return NextResponse.json(
    id
      ? await db.service.update({ where: { id }, data })
      : await db.service.create({ data }),
    { status: id ? 200 : 201 },
  );
}
export async function DELETE(req: Request) {
  if (!(await requireStaff()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  await db.service.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
