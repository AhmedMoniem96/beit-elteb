import { db } from "@/lib/db";
import { session } from "@/lib/auth";
import { redirect } from "next/navigation";
import { StatusSelect } from "@/components/StatusSelect";
export const dynamic = "force-dynamic";
export default async function Contacts() {
  if (!(await session())) redirect("/admin/login");
  const rows = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      <h2>Contact messages</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Message</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>
                {r.name}
                <br />
                {r.email}
              </td>
              <td>
                <strong>{r.subject}</strong>
                <br />
                {r.message}
              </td>
              <td>
                <StatusSelect
                  id={r.id}
                  value={r.status}
                  type="contacts"
                  options={["NEW", "READ", "RESOLVED"]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
