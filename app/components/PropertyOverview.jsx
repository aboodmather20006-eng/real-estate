import Reveal from "./Reveal";
import { PROPERTY } from "../lib/site";

const STATS = [
  { label: "Location", value: PROPERTY.location },
  { label: "Interior", value: PROPERTY.size },
  { label: "Layout", value: PROPERTY.bedrooms },
  { label: "Bathrooms", value: PROPERTY.bathrooms },
  { label: "From", value: PROPERTY.price },
  { label: "Handover", value: PROPERTY.handover },
];

const HIGHLIGHTS = [
  "Full-height glazing across the western elevation",
  "Private roof terrace with outdoor kitchen",
  "Two secured basement parking bays",
  "Smart climate, lighting, and access control",
];

export default function PropertyOverview() {
  return (
    <section id="overview" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-teal-300/70">
            The Residence
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            {PROPERTY.tagline}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-white/50 sm:text-base">
            Placeholder copy — replace with the real narrative. Two or three
            sentences describing the site, the architectural intent, and what
            makes the outlook worth the price. Keep it concrete: orientation,
            materials, what you actually see from the terrace.
          </p>
        </Reveal>

        <Reveal className="mt-14 sm:mt-20" delay={0.1}>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-estate-charcoal px-6 py-7 sm:px-8 sm:py-9">
                <dt className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-display text-lg font-semibold tracking-[-0.01em] text-white sm:text-xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="mt-12 sm:mt-16" delay={0.15}>
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-white/55 sm:text-base">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-300/70"
                />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
