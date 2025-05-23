import { getWeatherBackground } from "../weatherBackgrounds";

jest.mock("../../assets/images/forest_sunny.png", () => "sunny-image");
jest.mock("../../assets/images/forest_cloudy.png", () => "cloudy-image");
jest.mock("../../assets/images/forest_rainy.png", () => "rainy-image");

describe("getWeatherBackground", () => {
  it("returns sunny theme for clear or sun", () => {
    const result1 = getWeatherBackground("Clear");
    const result2 = getWeatherBackground("sunny");
    expect(result1.backgroundColor).toBe("#47ab27");
    expect(result2.backgroundColor).toBe("#47ab27");
  });

  it("returns cloudy theme for cloud", () => {
    const result = getWeatherBackground("Clouds");
    expect(result.backgroundColor).toBe("#54717a");
  });

  it("returns rainy theme for rain, drizzle, or thunderstorm", () => {
    expect(getWeatherBackground("Rain").backgroundColor).toBe("#57575d");
    expect(getWeatherBackground("Drizzle").backgroundColor).toBe("#57575d");
    expect(getWeatherBackground("Thunderstorm").backgroundColor).toBe(
      "#57575d",
    );
  });

  it("returns sunny theme for unknown input", () => {
    const result = getWeatherBackground("Snow");
    expect(result.backgroundColor).toBe("#47ab27");
  });
});
