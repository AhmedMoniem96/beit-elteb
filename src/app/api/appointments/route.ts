import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointmentSchema } from "@/lib/validation";
export async function POST(req: Request) {
  const parsed = appointmentSchema.safeParse(await req.json());
  if (!parsed.success)
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.issues },
      { status: 400 },
    );
  const doctor = await db.doctor.findFirst({ where: { id: parsed.data.doctorId, specialtyId: parsed.data.specialtyId, published: true } });
  if (!doctor) return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
  const item = await db.appointment.create({ data: parsed.data });
  return NextResponse.json(
    { id: item.id, status: item.status },
    { status: 201 },
  );
}
