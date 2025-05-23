import { getCurrentWeather } from "../forecast";

describe("getCurrentWeather", () => {
  it('returns "clear" for "clear" input (case-insensitive)', () => {
    expect(getCurrentWeather("clear")).toBe("clear");
    expect(getCurrentWeather("CLEAR")).toBe("clear");
  });

  it('returns "rain" for "rain" input (case-insensitive)', () => {
    expect(getCurrentWeather("rain")).toBe("rain");
    expect(getCurrentWeather("RAIN")).toBe("rain");
  });

  it('returns "clouds" for "clouds" input (case-insensitive)', () => {
    expect(getCurrentWeather("clouds")).toBe("clouds");
    expect(getCurrentWeather("CLOUDS")).toBe("clouds");
  });

  it('returns "clear" for unknown input', () => {
    expect(getCurrentWeather("snow")).toBe("clear");
    expect(getCurrentWeather("fog")).toBe("clear");
  });
});
