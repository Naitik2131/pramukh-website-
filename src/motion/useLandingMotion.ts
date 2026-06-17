import type { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import {
  breakpoints,
  gsap,
  motion,
  ScrollSmoother,
  ScrollTrigger,
  SplitText,
  useGSAP,
} from "./gsap";
import { nextIndex } from "../utils/content";

type HeroController = MutableRefObject<((index: number) => void) | null>;

export function useLandingMotion(
  root: RefObject<HTMLDivElement | null>,
  setActiveHero: Dispatch<SetStateAction<number>>,
  heroController: HeroController,
) {
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(breakpoints.reduced).matches;
      const heroLayers = gsap.utils.toArray<HTMLElement>(".hero-layer");
      const heroCopies = gsap.utils.toArray<HTMLElement>(".hero-copy");
      const progressPaths = gsap.utils.toArray<SVGPathElement>(
        ".hero-progress-path",
      );
      let currentHero = 0;
      let progressTween: gsap.core.Tween | null = null;
      let smoother: ScrollSmoother | null = null;
      let heroEnabled = false;

      if (reduceMotion) {
        gsap.set(".preloader", { display: "none" });
        gsap.set(heroLayers, { autoAlpha: 0, yPercent: 0, scale: 1 });
        gsap.set(heroLayers[0], { autoAlpha: 1 });
        gsap.set(heroCopies, { autoAlpha: 0 });
        gsap.set(heroCopies[0], { autoAlpha: 1 });
        document.body.classList.remove("is-loading");
      } else {
        document.body.classList.add("is-loading");
      }

      const media = gsap.matchMedia();
      media.add(breakpoints.smooth, () => {
        if (reduceMotion) return;
        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.05,
          effects: true,
          normalizeScroll: true,
          ignoreMobileResize: true,
        });
        return () => {
          smoother?.kill();
          smoother = null;
        };
      });

      const progressFor = (index: number) => {
        progressTween?.kill();
        gsap.set(progressPaths, { drawSVG: "0%" });
        progressTween = gsap.fromTo(
          progressPaths[index],
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: motion.heroBeat,
            ease: "none",
            onComplete: () => goToHero(nextIndex(currentHero, heroLayers.length)),
          },
        );
      };

      const setInitialHero = () => {
        gsap.set(heroLayers, {
          yPercent: 100,
          autoAlpha: 1,
          scale: 1,
          transformOrigin: "50% 50%",
        });
        gsap.set(heroLayers[0], { yPercent: 0 });
        gsap.set(heroCopies, { autoAlpha: 0 });
        gsap.set(heroCopies[0], { autoAlpha: 1 });
      };

      function goToHero(index: number) {
        if (
          reduceMotion ||
          !heroEnabled ||
          index === currentHero ||
          !heroLayers[index]
        ) {
          return;
        }

        const outgoing = heroLayers[currentHero];
        const incoming = heroLayers[index];
        const outgoingCopy = heroCopies[currentHero];
        const incomingCopy = heroCopies[index];
        const outgoingChars = outgoingCopy.querySelectorAll(".hero-copy-char");
        const incomingChars = incomingCopy.querySelectorAll(".hero-copy-char");

        progressTween?.kill();
        gsap.killTweensOf([outgoing, incoming, outgoingCopy, incomingCopy]);
        gsap.set(incoming, { yPercent: 100, autoAlpha: 1, scale: 1 });
        gsap.set(incomingCopy, { autoAlpha: 1 });
        gsap.set(incomingChars, { yPercent: 110 });

        gsap
          .timeline({
            defaults: { ease: motion.easeInOut },
            onStart: () => {
              currentHero = index;
              setActiveHero(index);
            },
            onComplete: () => {
              gsap.set(outgoing, { yPercent: 100, scale: 1, autoAlpha: 1 });
              gsap.set(outgoingCopy, { autoAlpha: 0 });
              progressFor(index);
            },
          })
          .to(outgoing, { yPercent: -80, duration: 1 }, 0)
          .to(outgoing, { scale: 0.85, autoAlpha: 0, duration: 0.7 }, 0.3)
          .to(incoming, { yPercent: 0, duration: 1 }, 0)
          .to(outgoingChars, { yPercent: -110, duration: 0.55, stagger: 0.018 }, 0)
          .to(incomingChars, { yPercent: 0, duration: 0.7, stagger: 0.018 }, 0.12)
          .to(
            ".hero-chrome",
            {
              backgroundColor:
                getComputedStyle(incoming).getPropertyValue("--slide-color"),
              duration: 0.8,
            },
            0,
          );
      }

      heroController.current = goToHero;

      if (!reduceMotion) {
        setInitialHero();
        const heroTextSplits = heroCopies.flatMap((copy) =>
          gsap
            .utils
            .toArray<HTMLElement>(".hero-intro-split", copy)
            .map(
              (element) =>
                new SplitText(element, {
                  type: "chars",
                  charsClass: "hero-copy-char",
                }),
            ),
        );
        const firstHeroSplits = heroTextSplits.slice(0, 4);

        const preloaderTimeline = gsap.timeline({
            defaults: { ease: motion.easeInOut },
            onComplete: () => {
              document.body.classList.remove("is-loading");
              gsap.set(".preloader", { display: "none" });
              heroEnabled = true;
              progressFor(0);
              ScrollTrigger.refresh();
            },
          });

        preloaderTimeline
          .fromTo(
            ".preloader-column",
            { y: "280vh" },
            { y: "-120vh", duration: 2.7, ease: motion.easeStrong },
            0,
          )
          .fromTo(
            ".preloader-image",
            { scale: 0.4 },
            { scale: 1, duration: 2.7 },
            0,
          )
          .fromTo(
            ".preloader-image img",
            { scale: 1.45, y: "24vh" },
            { scale: 1, y: "-10vh", duration: 2.5 },
            0.2,
          )
          .to(
            ".preloader-center",
            { width: "100vw", height: "100vh", duration: 1.05 },
            1.1,
          )
          .to(".preloader-grid", { columnGap: 0, duration: 0.9 }, 1.2)
          .to(".preloader-logo", { scale: 0, duration: 0.85 }, 2.35)
          .to(".preloader", { autoAlpha: 0, duration: 0.65 }, 2.55)
          .fromTo(
            ".header-reveal",
            { scale: 0 },
            { scale: 1, duration: 0.65, stagger: 0.06 },
            2.65,
          )
          .fromTo(
            ".brand-mark",
            { yPercent: 112 },
            { yPercent: 0, duration: 0.7 },
            2.75,
          )
          .fromTo(
            ".hero-selector",
            { xPercent: 115, scale: 0.65 },
            { xPercent: 0, scale: 1, duration: 0.85, stagger: 0.08 },
            2.65,
          );

        firstHeroSplits.forEach((split, index) => {
          preloaderTimeline.fromTo(
            split.chars,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.58, stagger: 0.012 },
            2.62 + index * 0.06,
          );
        });
      }

      if (!reduceMotion) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".header-trigger",
              start: "80px top",
              end: "bottom 30%",
              once: true,
            },
          })
          .to(".site-header", { paddingInline: "1.1rem", duration: 0.55 }, 0)
          .to(
            ".header-shell",
            {
              width: "12rem",
              marginInline: "auto",
              backgroundColor: "rgba(20,20,19,.62)",
              borderColor: "rgba(255,255,255,.2)",
              backdropFilter: "blur(12px)",
              duration: 0.6,
            },
            0,
          )
          .to(
            ".header-nav-link, .header-contact",
            { autoAlpha: 0, x: (index) => (index % 2 ? 60 : -60), duration: 0.3 },
            0,
          )
          .to(".header-logo", { scale: 0.78, xPercent: -14, duration: 0.4 }, 0)
          .fromTo(
            ".menu-button",
            { x: "2vw" },
            { x: 0, duration: 0.4 },
            0.08,
          );
      }

      if (!reduceMotion) {
        const revealSplits: SplitText[] = [];
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          const split = new SplitText(element, {
            type: "lines",
            linesClass: "reveal-line",
          });
          revealSplits.push(split);
          gsap.fromTo(
            split.lines,
            { yPercent: 105, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: motion.revealDuration,
              stagger: 0.08,
              ease: motion.easeInOut,
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                once: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 60, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: motion.easeInOut,
              scrollTrigger: {
                trigger: element,
                start: "top 92%",
                once: true,
              },
            },
          );
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((element) => {
        if (reduceMotion) return;
        const target = Number(element.dataset.count ?? 0);
        const suffix = element.dataset.suffix ?? "";
        const decimals = Number(element.dataset.decimals ?? 0);
        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
          onUpdate: () => {
            element.textContent = `${state.value.toFixed(decimals)}${suffix}`;
          },
        });
      });

      media.add(breakpoints.desktop, () => {
        if (reduceMotion) return;
        const projectLayers = gsap.utils.toArray<HTMLElement>(
          ".featured-project",
        );
        const projectCopy = gsap.utils.toArray<HTMLElement>(
          ".featured-copy-item",
        );

        gsap.set(projectLayers.slice(1), { autoAlpha: 0 });
        gsap.set(projectCopy.slice(1), { autoAlpha: 0, yPercent: 35 });

        const featured = gsap
          .timeline({
            scrollTrigger: {
              trigger: ".featured-pin",
              start: "top top",
              end: () => `+=${window.innerHeight * 7}`,
              scrub: 0.8,
              pin: true,
              anticipatePin: 1,
            },
          })
          .to(".featured-frame", { width: "100vw", height: "100vh", borderRadius: 0, duration: 2.5 }, 0)
          .to(".featured-blur", { backdropFilter: "blur(0px)", duration: 1.7 }, 0.8)
          .fromTo(".featured-kicker", { yPercent: 105 }, { yPercent: 0, duration: 0.8 }, 0.1);

        for (let index = 1; index < projectLayers.length; index += 1) {
          const at = 2.2 + index * 2.3;
          featured
            .to(projectLayers[index - 1], { autoAlpha: 0, scale: 0.9, duration: 0.8 }, at)
            .fromTo(
              projectLayers[index],
              { autoAlpha: 0, yPercent: 100, scale: 1 },
              { autoAlpha: 1, yPercent: 0, duration: 0.9 },
              at,
            )
            .to(projectCopy[index - 1], { autoAlpha: 0, yPercent: -30, duration: 0.5 }, at)
            .to(projectCopy[index], { autoAlpha: 1, yPercent: 0, duration: 0.7 }, at + 0.1);
        }

        const portfolioTrack = document.querySelector<HTMLElement>(".portfolio-track");
        if (portfolioTrack) {
          gsap.to(portfolioTrack, {
            x: () => -(portfolioTrack.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: ".portfolio-pin",
              start: "top top",
              end: () => `+=${portfolioTrack.scrollWidth}`,
              scrub: 0.8,
              pin: true,
              invalidateOnRefresh: true,
            },
          });
        }

        const stages = gsap.utils.toArray<HTMLElement>(".process-stage");
        gsap.set(stages.slice(1), { autoAlpha: 0, yPercent: 30 });
        const processTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".ownership-pin",
            start: "top top",
            end: () => `+=${window.innerHeight * 4.5}`,
            scrub: 0.65,
            pin: true,
          },
        });
        stages.forEach((stage, index) => {
          if (!index) return;
          const at = index * 1.2;
          processTimeline
            .to(stages[index - 1], { autoAlpha: 0, yPercent: -30, duration: 0.45 }, at)
            .to(stage, { autoAlpha: 1, yPercent: 0, duration: 0.65 }, at + 0.12)
            .to(".process-number-track", { yPercent: -index * 16.6667, duration: 0.7 }, at);
        });
      });

      media.add(breakpoints.mobile, () => {
        if (reduceMotion) return;
        gsap.fromTo(
          ".featured-frame",
          { clipPath: "inset(18% 8% round 1rem)" },
          {
            clipPath: "inset(0% 0% round 0rem)",
            scrollTrigger: {
              trigger: ".featured-pin",
              start: "top 80%",
              end: "top 10%",
              scrub: 0.7,
            },
          },
        );
      });

      if (!reduceMotion) {
        gsap.fromTo(
          ".film-media",
          { yPercent: 12, scale: 1.08 },
          {
            yPercent: -12,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".film-section",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      }

      let cursorCleanup: (() => void) | undefined;
      const cursor = document.querySelector<HTMLElement>(".cursor");
      if (cursor && window.matchMedia("(pointer: fine)").matches && !reduceMotion) {
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.32, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.32, ease: "power3" });
        const moveCursor = (event: PointerEvent) => {
          cursor.classList.add("is-visible");
          xTo(event.clientX);
          yTo(event.clientY);
        };
        window.addEventListener("pointermove", moveCursor);
        const hoverCleanups: Array<() => void> = [];
        gsap.utils.toArray<HTMLElement>("a, button, [data-cursor]").forEach((item) => {
          const enter = () => cursor.classList.add("is-active");
          const leave = () => cursor.classList.remove("is-active");
          item.addEventListener("mouseenter", enter);
          item.addEventListener("mouseleave", leave);
          hoverCleanups.push(() => {
            item.removeEventListener("mouseenter", enter);
            item.removeEventListener("mouseleave", leave);
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((item) => {
          const move = (event: PointerEvent) => {
            const rect = item.getBoundingClientRect();
            gsap.to(item, {
              x: (event.clientX - rect.left - rect.width / 2) * 0.18,
              y: (event.clientY - rect.top - rect.height / 2) * 0.18,
              duration: 0.35,
            });
          };
          const leave = () => gsap.to(item, { x: 0, y: 0, duration: 0.55 });
          item.addEventListener("pointermove", move);
          item.addEventListener("pointerleave", leave);
          hoverCleanups.push(() => {
            item.removeEventListener("pointermove", move);
            item.removeEventListener("pointerleave", leave);
          });
        });

        cursorCleanup = () => {
          window.removeEventListener("pointermove", moveCursor);
          cursor.classList.remove("is-visible");
          hoverCleanups.forEach((cleanup) => cleanup());
        };
      }

      const navigate = (event: Event) => {
        const sectionId = (event as CustomEvent<string>).detail;
        const destination = document.querySelector(sectionId);
        if (!destination) return;
        if (reduceMotion) {
          destination.scrollIntoView({ behavior: "auto" });
          return;
        }
        gsap
          .timeline()
          .set(".transition-curtain", { xPercent: 100 })
          .to(".transition-curtain", { xPercent: 0, duration: 0.7, ease: motion.easeInOut })
          .add(() => {
            if (smoother) smoother.scrollTo(destination, false, "top top");
            else destination.scrollIntoView({ behavior: "auto" });
          })
          .to(".transition-curtain", { xPercent: -100, duration: 0.75, ease: motion.easeInOut }, "+=.08")
          .set(".transition-curtain", { xPercent: 100 });
      };
      window.addEventListener("pramukh:navigate", navigate);

      return () => {
        heroController.current = null;
        progressTween?.kill();
        media.revert();
        cursorCleanup?.();
        window.removeEventListener("pramukh:navigate", navigate);
        document.body.classList.remove("is-loading");
      };
    },
    { scope: root },
  );
}

export function useMenuMotion(
  root: RefObject<HTMLDivElement | null>,
  menuOpen: boolean,
) {
  useGSAP(
    () => {
      document.body.classList.toggle("menu-open", menuOpen);
      const timeline = gsap.timeline({ defaults: { ease: motion.easeInOut } });
      if (menuOpen) {
        timeline
          .set(".menu-overlay", { pointerEvents: "auto" })
          .to(".menu-backdrop", { autoAlpha: 1, duration: 0.35 }, 0)
          .fromTo(".menu-panel", { yPercent: -105 }, { yPercent: 0, duration: 1.05 }, 0)
          .fromTo(
            ".menu-link-inner",
            { yPercent: 110 },
            { yPercent: 0, duration: 0.8, stagger: 0.06 },
            0.18,
          )
          .fromTo(
            ".menu-detail",
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
            0.38,
          );
      } else {
        timeline
          .to(".menu-detail", { autoAlpha: 0, duration: 0.2 }, 0)
          .to(".menu-link-inner", { yPercent: -110, duration: 0.4, stagger: 0.025 }, 0)
          .to(".menu-panel", { yPercent: -105, duration: 0.75 }, 0.08)
          .to(".menu-backdrop", { autoAlpha: 0, duration: 0.3 }, 0.3)
          .set(".menu-overlay", { pointerEvents: "none" });
      }
      return () => document.body.classList.remove("menu-open");
    },
    { scope: root, dependencies: [menuOpen], revertOnUpdate: true },
  );
}
