import Link from "next/link";
export function AdminNav() {
  return (
    <nav>
      <Link href="/admin">Overview</Link>
      <Link href="/admin/appointments">Appointments</Link>
      <Link href="/admin/contacts">Messages</Link>
      <Link href="/admin/services">Services</Link>
      <form action="/api/auth/logout" method="post">
        <button className="small">Sign out</button>
      </form>
    </nav>
  );
}
