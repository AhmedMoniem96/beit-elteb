"use client";
import { FormEvent, useState } from "react";
import { copy, Locale } from "@/lib/i18n";
type Service = { id: string; titleEn: string; titleAr: string };
export function PublicForm({
  kind,
  locale,
  services = [],
}: {
  kind: "contact" | "appointment";
  locale: Locale;
  services?: Service[];
}) {
  const t = copy[locale].form;
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch(
      kind === "contact" ? "/api/contact" : "/api/appointments",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      },
    );
    setState(res.ok ? "done" : "error");
    if (res.ok) e.currentTarget.reset();
  }
  return (
    <form onSubmit={submit} className="form">
      <label>
        {t.name}
        <input name="name" required minLength={2} />
      </label>
      <label>
        {t.email}
        <input name="email" required type="email" />
      </label>
      <label>
        {t.phone}
        <input name="phone" required={kind === "appointment"} type="tel" />
      </label>
      {kind === "contact" ? (
        <label>
          {t.subject}
          <input name="subject" required />
        </label>
      ) : (
        <>
          <label>
            {t.service}
            <select name="serviceId" required>
              <option value="">—</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {locale === "ar" ? s.titleAr : s.titleEn}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t.date}
            <input name="preferredAt" type="datetime-local" required />
          </label>
        </>
      )}
      <label>
        {t.message}
        <textarea
          name="message"
          required={kind === "contact"}
          minLength={kind === "contact" ? 10 : 0}
        />
      </label>
      <button disabled={state === "sending"}>
        {kind === "contact" ? t.send : t.book}
      </button>
      {state === "done" && (
        <p role="status" className="success">
          {t.success}
        </p>
      )}
      {state === "error" && (
        <p role="alert">Please check your details and try again.</p>
      )}
    </form>
  );
}
