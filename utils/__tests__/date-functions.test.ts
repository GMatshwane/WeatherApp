import { getDayOfWeek } from "../date-functions";

describe("getDayOfWeek", () => {
  it("returns the correct day for a valid date string", () => {
    expect(getDayOfWeek("2024-05-23T00:00:00Z")).toBe("Thursday");
    expect(getDayOfWeek("2024-05-24T00:00:00Z")).toBe("Friday");
  });

  it('returns "Invalid Date" for an invalid date string', () => {
    expect(getDayOfWeek("invalid-date")).toBe("Invalid Date");
  });
});
