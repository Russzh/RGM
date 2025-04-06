import { formatMinutes } from "@shared/helpers";

describe("#formatMinutes", () => {
  describe("should return an empty string for", () => {
    it("NaN input", () => {
      expect(formatMinutes(NaN)).toBe("");
    });

    it("0 input", () => {
      expect(formatMinutes(0)).toBe("");
    });

    it("negative numbers", () => {
      expect(formatMinutes(-45)).toBe("");
    });
  });

  describe("should correctly format minutes", () => {
    it("less than 60", () => {
      expect(formatMinutes(45)).toBe("0h 45min");
    });

    it("equal to 60", () => {
      expect(formatMinutes(60)).toBe("1h 00min");
    });

    it("greater than 60", () => {
      expect(formatMinutes(125)).toBe("2h 05min");
    });
  });
});
