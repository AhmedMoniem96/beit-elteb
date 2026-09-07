import { db } from "@/lib/db";
import { session } from "@/lib/auth";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function Dashboard() {
  if (!(await session())) redirect("/admin/login");
  const [appointments, messages, services] = await Promise.all([
    db.appointment.count({ where: { status: "PENDING" } }),
    db.contactMessage.count({ where: { status: "NEW" } }),
    db.service.count(),
  ]);
  return (
    <>
      <h2>Overview</h2>
      <div className="grid">
        <div className="card">
          <div className="stat">{appointments}</div>Pending appointments
        </div>
        <div className="card">
          <div className="stat">{messages}</div>New messages
        </div>
        <div className="card">
          <div className="stat">{services}</div>Services
        </div>
      </div>
    </>
  );
}
