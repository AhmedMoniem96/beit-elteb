import { describe, expect, it } from "vitest";
import {
  hashPassword,
  readSession,
  signSession,
  verifyPassword,
} from "@/lib/auth";
describe("authentication", () => {
  it("hashes and verifies passwords", () => {
    const hash = hashPassword("correct horse");
    expect(verifyPassword("correct horse", hash)).toBe(true);
    expect(verifyPassword("wrong", hash)).toBe(false);
  });
  it("signs tamper-resistant sessions", () => {
    const token = signSession({
      id: "1",
      role: "ADMIN",
      email: "admin@example.com",
    });
    expect(readSession(token)?.role).toBe("ADMIN");
    expect(readSession(token + "x")).toBeNull();
  });
});
