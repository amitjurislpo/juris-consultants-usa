import { describe, expect, it } from "vitest";
import { csvCell, toCsv } from "./export-csv";

describe("csvCell", () => {
  it("quotes commas, quotes and newlines", () => {
    expect(csvCell('a,"b"')).toBe('"a,""b"""');
    expect(csvCell("a\nb")).toBe('"a\nb"');
  });
  it("neutralises spreadsheet formulas", () => {
    expect(csvCell("=SUM(A1)")).toBe("'=SUM(A1)");
    expect(csvCell("+91 98765")).toBe("'+91 98765");
  });
  it("formats empty values, numbers and dates", () => {
    expect(csvCell(null)).toBe("");
    expect(csvCell(new Date("2026-11-01T00:00:00Z"))).toBe(
      "2026-11-01T00:00:00.000Z",
    );
    expect(csvCell(12.5)).toBe("12.5");
  });
});

describe("toCsv", () => {
  it("joins header and rows", () => {
    expect(toCsv(["a", "b"], [[1, "x,y"]])).toBe('a,b\r\n1,"x,y"');
  });
});
