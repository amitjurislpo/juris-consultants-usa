import { describe, expect, it, vi } from "vitest";
import {
  ConsoleEmailAdapter,
  ResendEmailAdapter,
  type EmailMessage,
} from "./email.js";

const message: EmailMessage = {
  to: "founder@example.com",
  subject: "Order update",
  text: "Your order has been updated.",
};

describe("email adapters", () => {
  it("labels console output as logged, not delivered", async () => {
    const log = vi.fn();
    const result = await new ConsoleEmailAdapter(log).send(message);

    expect(log).toHaveBeenCalledWith(message);
    expect(result.id).toMatch(/^console:/);
    expect(result.status).toBe("logged");
  });

  it("requires explicit Resend credentials and sender configuration", () => {
    expect(
      () => new ResendEmailAdapter({ apiKey: "", from: "team@example.com" }),
    ).toThrow(/API key is required/);
    expect(
      () => new ResendEmailAdapter({ apiKey: "configured", from: " " }),
    ).toThrow(/sender address is required/);
  });
});
