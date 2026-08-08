"use client";

import { useRef } from "react";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "../lib/gsap";

/**
 * Fade + slide-up wrapper. Plays once as the element enters the viewport.
 *
 * Starts at opacity 0 inline so there is no flash of un-animated content on
 * first paint; reduced-motion users get it snapped straight to visible.
 */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  y = 32,
  start = "top 85%",
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: EASE,
        delay,
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0, transform: `translateY(${y}px)` }}>
      {children}
    </Tag>
  );
}
