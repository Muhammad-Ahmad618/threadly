"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { newsletterCopy } from "@/data/after-extras";
import Reveal from "./Reveal";

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

// Newsletter band: glass card over a lifestyle photo, with email validation
// and an animated success state.
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("Please enter your email address.");
      return;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setError("That doesn’t look like a valid email address.");
      return;
    }
    setError(null);
    setSuccess(true);
  }

  return (
    <section aria-labelledby="newsletter-heading" className="relative isolate overflow-hidden py-24 md:py-28">
      <Image
        src={newsletterCopy.image}
        alt={newsletterCopy.imageAlt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#2f3a26]/60" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-white/25 bg-[#2f3a26]/50 p-8 text-center shadow-2xl backdrop-blur-md md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ddc287]">
              {newsletterCopy.eyebrow}
            </p>
            <h2
              id="newsletter-heading"
              className="mt-4 text-4xl font-semibold text-white [font-family:var(--font-after-display)]"
            >
              {newsletterCopy.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/90">
              {newsletterCopy.text}
            </p>

            <div className="mt-8 flex min-h-40 items-center justify-center">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex w-full flex-col items-center gap-4"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.1 }}
                      className="grid h-14 w-14 place-items-center rounded-full border border-white/30 bg-white/15"
                    >
                      <Check className="h-7 w-7 text-[#ddc287]" aria-hidden="true" />
                    </motion.span>
                    <p className="text-xl font-semibold text-white [font-family:var(--font-after-display)]">
                      {newsletterCopy.successHeading}
                    </p>
                    <p className="max-w-sm text-sm leading-relaxed text-white/85">
                      {newsletterCopy.successText}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex w-full max-w-lg flex-col gap-3 sm:flex-row"
                  >
                    <div className="flex-1">
                      <label htmlFor="newsletter-email" className="sr-only">
                        {newsletterCopy.inputLabel}
                      </label>
                      <input
                        id="newsletter-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          if (error) setError(null);
                        }}
                        placeholder={newsletterCopy.inputPlaceholder}
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? "newsletter-error" : undefined}
                        className={`w-full rounded-full border-2 bg-white/95 px-6 py-4 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96a] focus-visible:ring-offset-2 ${
                          error ? "border-[#e8927c]" : "border-transparent"
                        }`}
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-full bg-[#2f3a26] px-8 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#4d5b3f] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2f3a26]"
                    >
                      {newsletterCopy.buttonLabel}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
              {error && (
                <p id="newsletter-error" role="alert" className="mt-3 text-sm font-medium text-[#f6c6bb]">
                  {error}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
