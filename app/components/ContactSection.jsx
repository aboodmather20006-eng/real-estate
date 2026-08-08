"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { PROPERTY } from "../lib/site";

const FIELD_CLASS =
  "w-full rounded-xl border border-white/[0.10] bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 ease-out focus:border-teal-300/50 focus:bg-white/[0.05]";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    /* TODO: wire to a real destination — a route handler, a form service, or a
       WhatsApp deep link. Nothing leaves the browser right now. */
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="estate-rule mb-20 sm:mb-28" />

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-teal-300/70">
              Enquire
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
              Arrange a viewing
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/50 sm:text-base">
              Private viewings run daily by appointment. Leave your details and
              the sales team will follow up within one working day.
            </p>

            <dl className="mt-10 space-y-5">
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">
                  Sales gallery
                </dt>
                <dd className="mt-1.5 text-sm text-white/70">{PROPERTY.location}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">
                  Hours
                </dt>
                <dd className="mt-1.5 text-sm text-white/70">
                  Sun–Thu, 10:00 – 18:00
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-sm sm:p-9"
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-white/35"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your full name"
                    className={FIELD_CLASS}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-white/35"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="+962 7 —— ——"
                    className={FIELD_CLASS}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-white/35"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Preferred viewing time, questions, anything else."
                    className={`${FIELD_CLASS} resize-none`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-7 w-full rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-opacity duration-300 ease-out hover:opacity-85"
              >
                Request a viewing
              </button>

              <p
                role="status"
                aria-live="polite"
                className={`mt-4 text-center text-xs text-teal-300/80 transition-opacity duration-300 ${
                  submitted ? "opacity-100" : "opacity-0"
                }`}
              >
                Thanks — nothing is wired up yet, so this went nowhere.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
