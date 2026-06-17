import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Picture } from "../components/Picture";

describe("Picture", () => {
  it("renders responsive AVIF and WebP sources with an accessible image", () => {
    const { container } = render(
      <Picture image="one-tapi" alt="One Tapi residence" eager />,
    );
    const image = screen.getByRole("img", { name: "One Tapi residence" });
    const sources = container.querySelectorAll("source");

    expect(image).toHaveAttribute("fetchpriority", "high");
    expect(sources).toHaveLength(2);
    expect(sources[0].getAttribute("srcset")).toContain(
      "/media/one-tapi-1800.avif",
    );
    expect(sources[1].getAttribute("srcset")).toContain(
      "/media/one-tapi-1800.webp",
    );
  });
});
