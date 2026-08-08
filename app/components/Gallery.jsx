import Image from "next/image";
import Reveal from "./Reveal";

/* Placeholder imagery: widely-spaced stills pulled from the hero sequence so
   the grid has real content to lay out. Swap each `src` for a proper photo —
   the shape of the grid is what matters here. */
const SHOTS = [
  { src: "/frames/frame_0008.jpg", caption: "Approach", span: "sm:col-span-2" },
  { src: "/frames/frame_0052.jpg", caption: "West elevation", span: "" },
  { src: "/frames/frame_0088.jpg", caption: "Living level", span: "" },
  { src: "/frames/frame_0120.jpg", caption: "Terrace", span: "" },
  { src: "/frames/frame_0148.jpg", caption: "Ridge outlook", span: "sm:col-span-2" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="estate-rule mb-20 sm:mb-28" />

        <Reveal className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-teal-300/70">
            Gallery
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            Inside the building
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
            Placeholder stills from the fly-through. Replace with photography or
            final renders at 3:2 or wider.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-3 sm:gap-5">
          {SHOTS.map((shot, i) => (
            <Reveal
              key={shot.src}
              className={shot.span}
              delay={(i % 3) * 0.08}
              y={24}
            >
              <figure className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  width={848}
                  height={478}
                  sizes="(min-width: 640px) 45vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 pb-4 pt-12 text-xs font-medium uppercase tracking-[0.22em] text-white/70">
                  {shot.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
