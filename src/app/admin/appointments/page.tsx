import { db } from "@/lib/db";
import { session } from "@/lib/auth";
import { redirect } from "next/navigation";
import { StatusSelect } from "@/components/StatusSelect";
export const dynamic = "force-dynamic";
export default async function Appointments() {
  if (!(await session())) redirect("/admin/login");
  const rows = await db.appointment.findMany({
    include: { service: true },
    orderBy: { preferredAt: "asc" },
  });
  return (
    <>
      <h2>Appointments</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Service</th>
            <th>Preferred time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>
                {r.name}
                <br />
                <a href={`mailto:${r.email}`}>{r.email}</a>
                <br />
                {r.phone}
              </td>
              <td>{r.service?.titleEn || "—"}</td>
              <td>{r.preferredAt.toLocaleString()}</td>
              <td>
                <StatusSelect
                  id={r.id}
                  value={r.status}
                  type="appointments"
                  options={["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
