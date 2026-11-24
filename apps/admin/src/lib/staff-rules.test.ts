import { describe, expect, it } from "vitest";
import {
  generateTemporaryPassword,
  staffChangeBlocker,
  type StaffTarget,
} from "./staff-rules";

const admin: StaffTarget = { id: "a", role: "SUPER_ADMIN", status: "ACTIVE" };
const staff: StaffTarget = { id: "s", role: "STAFF", status: "ACTIVE" };

describe("staffChangeBlocker", () => {
  it("blocks demoting or disabling yourself", () => {
    expect(
      staffChangeBlocker("a", admin, { type: "role", role: "STAFF" }, 3),
    ).not.toBeNull();
    expect(
      staffChangeBlocker("a", admin, { type: "disable" }, 3),
    ).not.toBeNull();
  });
  it("blocks removing the last active super admin", () => {
    expect(
      staffChangeBlocker("x", admin, { type: "disable" }, 1),
    ).not.toBeNull();
    expect(
      staffChangeBlocker("x", admin, { type: "role", role: "STAFF" }, 1),
    ).not.toBeNull();
  });
  it("allows normal changes", () => {
    expect(staffChangeBlocker("x", admin, { type: "disable" }, 2)).toBeNull();
    expect(
      staffChangeBlocker("a", staff, { type: "role", role: "SUPER_ADMIN" }, 1),
    ).toBeNull();
    expect(staffChangeBlocker("a", staff, { type: "disable" }, 1)).toBeNull();
    expect(
      staffChangeBlocker("a", admin, { type: "resetPassword" }, 1),
    ).toBeNull();
    expect(staffChangeBlocker("a", admin, { type: "enable" }, 1)).toBeNull();
  });
});

describe("generateTemporaryPassword", () => {
  it("is long, mixed and different each time", () => {
    const first = generateTemporaryPassword();
    expect(first).toHaveLength(20);
    expect(first).toMatch(/[a-z]/);
    expect(first).toMatch(/[A-Z]/);
    expect(first).toMatch(/\d/);
    expect(first).toMatch(/[^A-Za-z0-9]/);
    expect(generateTemporaryPassword()).not.toBe(first);
  });
});
