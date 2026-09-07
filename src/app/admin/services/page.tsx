import { db } from "@/lib/db";
import { session } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ServiceManager } from "@/components/ServiceManager";
export const dynamic = "force-dynamic";
export default async function ServicesAdmin() {
  if (!(await session())) redirect("/admin/login");
  const items = await db.service.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <>
      <h2>Services</h2>
      <ServiceManager initial={items} />
      <h2>Media library</h2>
      <form
        className="form"
        action="/api/admin/media"
        method="post"
        encType="multipart/form-data"
      >
        <label>
          Image (max 5MB)
          <input type="file" name="file" accept="image/*" required />
        </label>
        <label>
          English alt text
          <input name="altEn" />
        </label>
        <label>
          Arabic alt text
          <input name="altAr" dir="rtl" />
        </label>
        <button>Upload to Supabase</button>
      </form>
    </>
  );
}
