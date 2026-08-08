import { NAV_SECTIONS, PROPERTY, whatsappHref } from "../lib/site";

export default function Footer() {
  return (
    <footer className="relative mt-auto px-5 pb-12 pt-20 sm:px-8 sm:pb-16 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="estate-rule" />

        <div className="mt-14 flex flex-col gap-12 sm:mt-16 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-xl font-semibold tracking-[-0.01em] text-white">
              {PROPERTY.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/45">
              {PROPERTY.tagline}
            </p>

            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="estate-cta-pulse mt-8 inline-flex items-center gap-2.5 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-black transition-colors duration-300 ease-out hover:bg-teal-400"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-4.5 w-4.5"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12s-.64.8-.79.97c-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.17 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
              </svg>
              Message on WhatsApp
            </a>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {NAV_SECTIONS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-white/45 transition-colors duration-300 ease-out hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-16 text-xs text-white/25 sm:mt-20">
          © {new Date().getFullYear()} {PROPERTY.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
