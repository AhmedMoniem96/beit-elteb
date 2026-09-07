import { AdminShell } from "@/components/AdminShell";
export const metadata = { title: "Admin Portal | Beit El Teb" };
export default function AdminLayout({ children }: { children: React.ReactNode }) { return <AdminShell>{children}</AdminShell>; }
