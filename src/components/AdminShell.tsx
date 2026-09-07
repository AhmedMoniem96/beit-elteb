"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const groups = [
  ["MAIN", [["/admin", "Overview", "⌂"]]],
  ["MANAGEMENT", [["/admin/doctors", "Doctors", "♙"], ["/admin/specialties", "Specialties", "✦"], ["/admin/services", "Services", "✚"], ["/admin/insurance", "Insurance", "♢"]]],
  ["OPERATIONS", [["/admin/appointments", "Appointments", "◷"], ["/admin/contacts", "Messages", "✉"]]],
  ["CONTENT", [["/admin/homepage", "Homepage", "▣"], ["/admin/media", "Media Library", "▧"]]],
  ["SYSTEM", [["/admin/settings", "Settings", "⚙"]]],
] satisfies [string, [string, string, string][]][];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  if (path === "/admin/login") return <main className="admin-login-page">{children}</main>;
  const current = groups.flatMap((g) => g[1]).find(([href]) => href === "/admin" ? path === href : path.startsWith(href));
  return <div className="admin-shell">
    {open && <button className="admin-scrim" aria-label="Close navigation" onClick={() => setOpen(false)} />}
    <aside className={`admin-sidebar ${open ? "is-open" : ""}`}>
      <div className="admin-brand"><span className="admin-brand-mark">B</span><div><strong>Beit El Teb</strong><small>Admin Portal</small></div></div>
      <nav aria-label="Admin navigation">{groups.map(([label, links]) => <div className="admin-nav-group" key={label}><span>{label}</span>{links.map(([href, text, icon]) => <Link onClick={() => setOpen(false)} className={(href === "/admin" ? path === href : path.startsWith(href)) ? "active" : ""} href={href} key={href}><i aria-hidden>{icon}</i>{text}</Link>)}</div>)}</nav>
      <div className="admin-sidebar-bottom"><Link href="/en" target="_blank"><i aria-hidden>↗</i>View website</Link><div className="admin-user"><span>AD</span><div><strong>Administrator</strong><small>Content manager</small></div></div><form action="/api/auth/logout" method="post"><button type="submit" className="admin-signout">↪ <span>Sign out</span></button></form></div>
    </aside>
    <div className="admin-workspace"><header className="admin-topbar"><button className="admin-menu-toggle" type="button" onClick={() => setOpen(true)} aria-label="Open navigation">☰</button><div><small>Admin /</small><strong>{current?.[1] || "Dashboard"}</strong></div><div className="admin-top-actions"><Link href="/en" target="_blank" className="admin-view-site">View website ↗</Link><span className="admin-avatar">AD</span></div></header><main className="admin-content">{children}</main></div>
  </div>;
}
