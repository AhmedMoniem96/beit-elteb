import { describe, expect, it } from "vitest";
import { appointmentSchema, contactSchema } from "@/lib/validation";
describe("public workflow validation", () => {
  it("accepts a complete contact request", () => {
    expect(
      contactSchema.safeParse({
        name: "Mona Ali",
        email: "mona@example.com",
        subject: "New patient",
        message: "I would like more information.",
        locale: "en",
      }).success,
    ).toBe(true);
  });
  it("rejects appointments in the past", () => {
    expect(
      appointmentSchema.safeParse({
        name: "Mona Ali",
        email: "mona@example.com",
        phone: "010000000",
        serviceId: "service",
        preferredAt: "2020-01-01",
        locale: "ar",
      }).success,
    ).toBe(false);
  });
});
