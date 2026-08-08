"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/* Register once, here, so components can just import from this module.
   registerPlugin is idempotent, but keeping it in one place means there is
   exactly one spot to add future plugins. */
gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, ScrollTrigger, useGSAP };

/* Matches the ease used across the other Webify builds — a confident,
   long-tailed ease-out. */
export const EASE = "power3.out";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
