import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validation";
export async function POST(req: Request) {
  const parsed = contactSchema.safeParse(await req.json());
  if (!parsed.success)
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.issues },
      { status: 400 },
    );
  const item = await db.contactMessage.create({ data: parsed.data });
  return NextResponse.json({ id: item.id }, { status: 201 });
}
