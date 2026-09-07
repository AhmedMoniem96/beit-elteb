"use client";
import { FormEvent, useState } from "react";
type S = {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  published: boolean;
};
export function ServiceManager({ initial }: { initial: S[] }) {
  const [items, setItems] = useState(initial);
  async function add(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = {
      slug: f.get("slug"),
      titleEn: f.get("titleEn"),
      titleAr: f.get("titleAr"),
      descriptionEn: f.get("descriptionEn"),
      descriptionAr: f.get("descriptionAr"),
      published: true,
    };
    const r = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.ok) {
      setItems([...items, await r.json()]);
      e.currentTarget.reset();
    }
  }
  async function remove(id: string) {
    if (!confirm("Delete this service?")) return;
    const r = await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
    if (r.ok) setItems(items.filter((x) => x.id !== id));
  }
  return (
    <>
      <div className="grid">
        {items.map((s) => (
          <article className="card" key={s.id}>
            <h3>
              {s.titleEn} / {s.titleAr}
            </h3>
            <p>{s.descriptionEn}</p>
            <button onClick={() => remove(s.id)}>Delete</button>
          </article>
        ))}
      </div>
      <h2>Add service</h2>
      <form className="form" onSubmit={add}>
        <label>
          Slug
          <input name="slug" pattern="[a-z0-9-]+" required />
        </label>
        <label>
          English title
          <input name="titleEn" required />
        </label>
        <label>
          Arabic title
          <input name="titleAr" dir="rtl" required />
        </label>
        <label>
          English description
          <textarea name="descriptionEn" required minLength={10} />
        </label>
        <label>
          Arabic description
          <textarea name="descriptionAr" dir="rtl" required minLength={10} />
        </label>
        <button>Create service</button>
      </form>
    </>
  );
}
