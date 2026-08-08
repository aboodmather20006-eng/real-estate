import Reveal from "./Reveal";

/* Icons kept as inline paths on a shared 24x24 grid — no icon dependency. */
const AMENITIES = [
  {
    title: "Infinity Pool",
    description: "Heated 22m pool on the podium level, open year-round.",
    path: "M2 15c2 0 2 1.5 4 1.5S8 15 10 15s2 1.5 4 1.5S16 15 18 15s2 1.5 4 1.5M2 10c2 0 2 1.5 4 1.5S8 10 10 10s2 1.5 4 1.5S16 10 18 10s2 1.5 4 1.5",
  },
  {
    title: "Private Gym",
    description: "Resident-only training floor with recovery suite and sauna.",
    path: "M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11",
  },
  {
    title: "Concierge",
    description: "Twenty-four hour desk, valet, and package handling.",
    path: "M12 3a7 7 0 0 0-7 7v5M12 3a7 7 0 0 1 7 7v5M5 15h2v4H5zM17 15h2v4h-2z",
  },
  {
    title: "Secure Parking",
    description: "Two allocated bays per residence with EV charging.",
    path: "M9 17V7h4a3.5 3.5 0 0 1 0 7H9M4 4h16v16H4z",
  },
  {
    title: "Landscaped Grounds",
    description: "Half a hectare of terraced gardens and shaded walkways.",
    path: "M12 21V9M12 9c0-3 2-5 5-5 0 3-2 5-5 5M12 13c0-3-2-5-5-5 0 3 2 5 5 5",
  },
  {
    title: "Smart Home",
    description: "Integrated climate, lighting, blinds, and access control.",
    path: "M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5M10 21v-6h4v6",
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="estate-rule mb-20 sm:mb-28" />

        <Reveal className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-teal-300/70">
            Amenities
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            What comes with it
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {AMENITIES.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.08} y={24}>
              <article className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-sm transition-colors duration-300 ease-out hover:border-white/[0.16] sm:p-8">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-7 w-7 text-teal-300/70"
                >
                  <path d={item.path} />
                </svg>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-[-0.01em] text-white sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
