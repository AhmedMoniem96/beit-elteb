import { AdminNav } from "@/components/AdminNav";
export const metadata = { title: "Admin" };
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="admin">
      <h1>Beit El Teb Admin</h1>
      <AdminNav />
      {children}
    </main>
  );
}
