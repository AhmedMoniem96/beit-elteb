import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/authorize";
import { db } from "@/lib/db";
import { AppointmentStatus } from "@prisma/client";
export async function PATCH(req: Request) {
  if (!(await requireStaff()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status } = await req.json();
  if (!Object.values(AppointmentStatus).includes(status))
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  return NextResponse.json(
    await db.appointment.update({ where: { id }, data: { status } }),
  );
}
export async function DELETE(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  await db.appointment.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
