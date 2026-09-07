import { createHmac, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
const COOKIE = "beit_session";
const secret = () =>
  process.env.AUTH_SECRET || "development-only-secret-change-me";
export function hashPassword(password: string, salt = crypto.randomUUID()) {
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}
export function verifyPassword(password: string, stored: string) {
  const [salt, key] = stored.split(":");
  if (!salt || !key) return false;
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(key, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
export function signSession(payload: {
  id: string;
  role: string;
  email: string;
}) {
  const body = Buffer.from(
    JSON.stringify({ ...payload, exp: Date.now() + 86400000 }),
  ).toString("base64url");
  return `${body}.${createHmac("sha256", secret()).update(body).digest("base64url")}`;
}
export function readSession(token?: string) {
  if (!token) return null;
  const [body, sig] = token.split(".");
  const wanted = createHmac("sha256", secret())
    .update(body || "")
    .digest("base64url");
  if (
    !sig ||
    sig.length !== wanted.length ||
    !timingSafeEqual(Buffer.from(sig), Buffer.from(wanted))
  )
    return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString());
    return data.exp > Date.now() ? data : null;
  } catch {
    return null;
  }
}
export async function session() {
  return readSession((await cookies()).get(COOKIE)?.value);
}
export const sessionCookie = COOKIE;
