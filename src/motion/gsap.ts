import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(
  DrawSVGPlugin,
  ScrollSmoother,
  ScrollTrigger,
  SplitText,
  useGSAP,
);

export { DrawSVGPlugin, gsap, ScrollSmoother, ScrollTrigger, SplitText, useGSAP };

export const motion = {
  easeInOut: "power2.inOut",
  easeStrong: "power4.inOut",
  revealDuration: 0.85,
  heroBeat: 6,
};

export const breakpoints = {
  desktop: "(min-width: 768px)",
  mobile: "(max-width: 767px)",
  smooth: "(min-width: 577px)",
  reduced: "(prefers-reduced-motion: reduce)",
};
