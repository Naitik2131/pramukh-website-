import { describe, expect, it } from "vitest";
import { factParts, nextIndex } from "../utils/content";
import { heroSlides, offices, processStages, projects } from "../data";

describe("content utilities", () => {
  it("parses formatted facts for animated counters", () => {
    expect(factParts("13,000+")).toEqual({
      target: 13000,
      suffix: "+",
      decimals: 0,
    });
    expect(factParts("2.7M+")).toEqual({
      target: 2.7,
      suffix: "M+",
      decimals: 1,
    });
  });

  it("wraps hero indexes without exceeding the media array", () => {
    expect(nextIndex(0, 3)).toBe(1);
    expect(nextIndex(2, 3)).toBe(0);
    expect(nextIndex(0, 0)).toBe(0);
  });
});

describe("landing content contracts", () => {
  it("keeps the hero choreography to three layers", () => {
    expect(heroSlides).toHaveLength(3);
    expect(heroSlides[0].media.kind).toBe("video");
  });

  it("provides complete project, office, and process collections", () => {
    expect(projects.length).toBeGreaterThanOrEqual(8);
    expect(offices.map((office) => office.city)).toEqual([
      "Surat",
      "Vapi",
      "Silvassa",
    ]);
    expect(processStages).toHaveLength(6);
  });
});
