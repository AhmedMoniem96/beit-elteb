import { session } from "./auth";
export async function requireAdmin() {
  const user = await session();
  return user?.role === "ADMIN" ? user : null;
}
export async function requireStaff() {
  return session();
}
