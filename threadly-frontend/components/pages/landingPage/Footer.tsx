"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUp, Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteContent } from "@/data/content";
import { footerContact, paymentMethods, socialLinks } from "@/data/after-extras";

// Brand glyphs as inline SVGs — lucide v1 no longer ships brand icons.
function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function PinterestGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  );
}

const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  Instagram: InstagramGlyph,
  Facebook: FacebookGlyph,
  X: XGlyph,
  Pinterest: PinterestGlyph,
};

const contactIcons = [MapPin, Phone, Mail, Clock];

// Dark olive footer: link columns, contact, socials, payment badges,
// back-to-top and the large wordmark.
export default function Footer() {
  const reducedMotion = useReducedMotion();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }

  return (
    <footer className="bg-[#2f3a26] text-stone-300">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <Image
                src="/images/threadly-mark.png"
                alt=""
                width={284}
                height={310}
                className="h-10 w-auto invert"
              />
              <span className="text-xl font-semibold tracking-wide text-white [font-family:var(--font-after-display)]">
                {siteContent.brand}
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-stone-400">
              {siteContent.footer.tagline}
            </p>
          </div>
          <nav aria-label="Social media">
            <ul className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.label] ?? InstagramGlyph;
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-stone-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {siteContent.footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-stone-400 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {footerContact.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {footerContact.lines.map((line, index) => {
                const Icon = contactIcons[index] ?? MapPin;
                const content = (
                  <span className="flex items-start gap-2.5 text-sm text-stone-400 transition-colors duration-200 group-hover:text-white">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#c8a96a]" aria-hidden="true" />
                    <span>{line.text}</span>
                  </span>
                );
                return (
                  <li key={line.text}>
                    {line.href ? (
                      <a
                        href={line.href}
                        className="group rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 border-t border-white/10 pt-8 md:flex-row md:justify-between">
          <nav aria-label="Payment methods">
            <ul className="flex flex-wrap justify-center gap-2">
              {paymentMethods.map((method) => (
                <li
                  key={method}
                  className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-stone-400"
                >
                  {method}
                </li>
              ))}
            </ul>
          </nav>
          <p className="order-3 text-center text-sm text-stone-500 md:order-2">
            {siteContent.footer.copyright}
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="order-2 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium text-stone-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:order-3"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            Back to top
          </button>
        </div>
      </div>

      {/* Large subtle wordmark */}
      <div className="overflow-hidden px-4 pb-8 sm:px-6 lg:px-8" aria-hidden="true">
        <p className="select-none whitespace-nowrap text-center text-6xl font-semibold leading-none tracking-tight text-white/[0.07] md:text-8xl lg:text-9xl [font-family:var(--font-after-display)]">
          {siteContent.brand}
        </p>
      </div>
    </footer>
  );
}
