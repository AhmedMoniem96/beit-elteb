"use client";
import { useState } from "react";
export function StatusSelect({
  id,
  value,
  type,
  options,
}: {
  id: string;
  value: string;
  type: "appointments" | "contacts";
  options: string[];
}) {
  const [status, setStatus] = useState(value);
  return (
    <select className={`admin-status-select badge-${status.toLowerCase()}`}
      aria-label="Status"
      value={status}
      onChange={async (e) => {
        const next = e.target.value;
        const res = await fetch(`/api/admin/${type}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id, status: next }),
        });
        if (res.ok) setStatus(next);
      }}
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}
