import { describe, expect, it } from "vitest";
import {
  attemptsLeft,
  blockMillisForFailures,
  isBlocked,
  lockMessage,
  nextBlockLabel,
} from "./lockout";

const MIN = 60_000;
const now = new Date("2026-01-01T12:00:00Z");

describe("blockMillisForFailures", () => {
  it("allows exactly three wrong tries with no block", () => {
    expect(blockMillisForFailures(1)).toBe(0);
    expect(blockMillisForFailures(2)).toBe(0);
  });
  it("blocks 15 minutes on the 3rd wrong try", () => {
    expect(blockMillisForFailures(3)).toBe(15 * MIN);
  });
  it("blocks 1 hour on the 4th wrong try", () => {
    expect(blockMillisForFailures(4)).toBe(60 * MIN);
  });
  it("blocks 1 day on the 5th and every later wrong try", () => {
    expect(blockMillisForFailures(5)).toBe(1440 * MIN);
    expect(blockMillisForFailures(9)).toBe(1440 * MIN);
  });
});

describe("attempts and labels", () => {
  it("counts attempts left", () => {
    expect(attemptsLeft(0)).toBe(3);
    expect(attemptsLeft(2)).toBe(1);
    expect(attemptsLeft(3)).toBe(0);
  });
  it("names the next block", () => {
    expect(nextBlockLabel(0)).toBe("15 minutes");
    expect(nextBlockLabel(2)).toBe("15 minutes");
    expect(nextBlockLabel(3)).toBe("1 hour");
    expect(nextBlockLabel(4)).toBe("1 day");
  });
});

describe("isBlocked and lockMessage", () => {
  it("is blocked only before lockedUntil", () => {
    const state = { failures: 3, lockedUntil: new Date(now.getTime() + MIN) };
    expect(isBlocked(state, now)).toBe(true);
    expect(isBlocked(state, new Date(now.getTime() + 2 * MIN))).toBe(false);
    expect(isBlocked(null, now)).toBe(false);
  });
  it("warns with attempts left, then shows the wait", () => {
    expect(lockMessage({ failures: 1, lockedUntil: null }, now)).toContain(
      "2 attempts left",
    );
    const blocked = {
      failures: 3,
      lockedUntil: new Date(now.getTime() + 15 * MIN),
    };
    expect(lockMessage(blocked, now)).toContain("15 minutes");
  });
});
