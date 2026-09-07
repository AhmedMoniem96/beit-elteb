import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/authorize";
import { db } from "@/lib/db";
import { ContactStatus } from "@prisma/client";
export async function PATCH(req: Request) {
  if (!(await requireStaff()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status } = await req.json();
  if (!Object.values(ContactStatus).includes(status))
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  return NextResponse.json(
    await db.contactMessage.update({ where: { id }, data: { status } }),
  );
}
