import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/authorize";
import { db } from "@/lib/db";
export async function POST(req: Request) {
  if (!(await requireStaff()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await req.formData(),
    file = form.get("file");
  if (
    !(file instanceof File) ||
    !file.type.startsWith("image/") ||
    file.size > 5_000_000
  )
    return NextResponse.json(
      { error: "Image up to 5MB required" },
      { status: 400 },
    );
  const base = process.env.SUPABASE_URL,
    key = process.env.SUPABASE_SERVICE_ROLE_KEY,
    bucket = process.env.SUPABASE_STORAGE_BUCKET || "media";
  if (!base || !key)
    return NextResponse.json(
      { error: "Storage is not configured" },
      { status: 503 },
    );
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${crypto.randomUUID()}-${safe}`;
  const upload = await fetch(`${base}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${key}`,
      apikey: key,
      "content-type": file.type,
      "x-upsert": "false",
    },
    body: await file.arrayBuffer(),
  });
  if (!upload.ok)
    return NextResponse.json({ error: "Upload failed" }, { status: 502 });
  const url = `${base}/storage/v1/object/public/${bucket}/${path}`;
  return NextResponse.json(
    await db.media.create({
      data: {
        path,
        url,
        altEn: String(form.get("altEn") || ""),
        altAr: String(form.get("altAr") || ""),
      },
    }),
    { status: 201 },
  );
}
