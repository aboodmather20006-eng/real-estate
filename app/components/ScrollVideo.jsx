"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollTrigger, gsap, useGSAP } from "../lib/gsap";

/* Sequence exported from the source clip at 20fps — 8.4s of footage.
   Frames are native 848x478; the canvas backing store matches that exactly and
   CSS scales it up, so we never pay for a per-frame resample. */
const FRAME_COUNT = 168;
const FRAME_WIDTH = 848;
const FRAME_HEIGHT = 478;

/* How far the section stays pinned, as a multiple of viewport height. */
const SCROLL_VH = 3;

/* Fraction of the pinned scroll spent playing frames. The remainder is the
   overlay fade, so the text never competes with the sequence. */
const SEQUENCE_PORTION = 0.8;

const framePath = (n) => `/frames/frame_${String(n).padStart(4, "0")}.jpg`;

export default function ScrollVideo() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const imagesRef = useRef([]);

  /* Lives in a ref so the preload effect can repaint the correct frame once the
     images arrive, without re-running the GSAP setup. */
  const playheadRef = useRef({ frame: 0 });

  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  /* ---- Preload every frame before any animation is wired up ---- */
  useEffect(() => {
    let cancelled = false;
    let settled = 0;
    const images = new Array(FRAME_COUNT);

    const onSettle = () => {
      if (cancelled) return;
      settled += 1;
      setProgress(settled / FRAME_COUNT);
      if (settled === FRAME_COUNT) setReady(true);
    };

    for (let i = 0; i < FRAME_COUNT; i += 1) {
      const img = new Image();
      // A single missing frame shouldn't strand the hero on the loader.
      img.onload = onSettle;
      img.onerror = onSettle;
      img.src = framePath(i + 1);
      images[i] = img;
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  const renderFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    // naturalWidth guards against a frame that 404'd — keep the last good paint.
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Frames are opaque and fill the canvas, so no clearRect is needed.
    ctx.drawImage(img, 0, 0, FRAME_WIDTH, FRAME_HEIGHT);
  }, []);

  /* Paint frame 1 as soon as it exists, so the loader fades onto a real image
     rather than onto a black box. */
  useEffect(() => {
    const first = imagesRef.current[0];
    if (!first) return;
    if (first.complete) renderFrame(0);
    else first.addEventListener("load", () => renderFrame(0), { once: true });
  }, [renderFrame]);

  /* Repaint once the sequence lands, and re-measure every trigger now that the
     images can no longer change layout. */
  useEffect(() => {
    if (!ready) return;
    ScrollTrigger.refresh();
    renderFrame(Math.round(playheadRef.current.frame));
  }, [ready, renderFrame]);

  /* Set up on mount, NOT after preloading. The pin has to exist before the
     sections below register their own triggers, otherwise they measure against
     a page that is 300vh too short and fire early. */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (self) => {
          const { motion } = self.conditions;

          if (!motion) {
            // No pinning, no scrubbing: show the final frame and the copy.
            playheadRef.current.frame = FRAME_COUNT - 1;
            renderFrame(FRAME_COUNT - 1);
            gsap.set(overlayRef.current, { opacity: 1, y: 0 });
            return;
          }

          const playhead = playheadRef.current;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              // Function + invalidateOnRefresh so this re-measures on resize.
              end: () => `+=${window.innerHeight * SCROLL_VH}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              /* Refresh this before every other trigger on the page. Pins are
                 reverted during a refresh, so anything measured after this one
                 would otherwise sit 300vh too high. */
              refreshPriority: 1,
            },
          });

          tl.to(
            playhead,
            {
              frame: FRAME_COUNT - 1,
              snap: "frame",
              ease: "none",
              duration: SEQUENCE_PORTION,
              onUpdate: () => renderFrame(playhead.frame),
            },
            0
          );

          tl.fromTo(
            overlayRef.current,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, ease: "power2.out", duration: 1 - SEQUENCE_PORTION },
            SEQUENCE_PORTION
          );
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [renderFrame] }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Fill viewport width at the source aspect ratio, centred vertically.
          On very wide viewports the extra height is clipped by overflow-hidden. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={FRAME_WIDTH}
          height={FRAME_HEIGHT}
          aria-label="Aerial fly-through of The Aurelia Residences"
          role="img"
          className="block h-auto w-full"
        />
      </div>

      {/* Vignette — keeps the overlay copy legible over a bright frame. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent"
      />

      {/* Overlay copy — fades in over the last 20% of the pinned scroll. */}
      <div
        ref={overlayRef}
        style={{ opacity: 0 }}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-teal-300/70 sm:text-xs">
          Now Releasing — Phase One
        </p>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
          The Aurelia
          <span className="block text-white/70">Residences</span>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55 sm:max-w-lg sm:text-base">
          Twenty-four panoramic homes above the ridge line. Architecture, light,
          and view — engineered as one.
        </p>
        <a
          href="#overview"
          className="pointer-events-auto mt-9 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors duration-300 ease-out hover:border-white/30 hover:bg-white/[0.08]"
        >
          Explore the residence
          <span aria-hidden="true">→</span>
        </a>
      </div>

      {/* Loader — sits above everything until the sequence is in memory. */}
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-black transition-opacity duration-700 ease-out ${
          ready ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-hidden={ready}
      >
        <div className="h-px w-40 overflow-hidden bg-white/10 sm:w-56">
          <div
            className="h-full bg-teal-300/80 transition-[width] duration-200 ease-out"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
        <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.28em] text-white/35">
          Loading {Math.round(progress * 100)}%
        </p>
      </div>

      {/* Scroll cue — hidden once the copy takes over. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-8 flex justify-center transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="estate-scroll-hint text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
          Scroll
        </span>
      </div>
    </section>
  );
}
