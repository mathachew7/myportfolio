import { useMemo, useState } from "react";
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion";
import { Award, Calendar, Rows, LayoutGrid, ExternalLink } from "lucide-react";

type Cert = {
  title: string;
  org: string;
  date: string;
  logo?: string;
  link?: string;
};

const certs: Cert[] = [
  {
    title: "AWS Certified Data Engineer – Associate",
    org: "Amazon Web Services (AWS)",
    date: "Date issued: November 17 | 2024 Expires: November 17, 2027",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    link: "https://www.credly.com/badges/2d65a8fe-8e45-4efc-a882-aae94ef4438a",
  },
//    ,
];

const spring: Transition = { type: "spring", stiffness: 240, damping: 22 };

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: spring },
};

type ViewMode = "cards" | "timeline";

export default function Certifications() {
  const [view, setView] = useState<ViewMode>("cards");
  const grouped = useMemo(() => certs, []);

  return (
    <section id="certifications" className="relative w-full py-20">
      {/* background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(16,185,129,0.10),transparent),radial-gradient(1000px_480px_at_90%_20%,rgba(79,70,229,0.10),transparent),linear-gradient(135deg,#07140f_0%,#0a1b14_50%,#07140f_100%)]"
      />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-emerald-400/15 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-indigo-400/15 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8">
        {/* header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-1">
              <Award className="h-4 w-4 text-emerald-300" />
              <span className="text-xs font-medium tracking-[0.12em] text-emerald-200">
                CERTIFICATIONS
              </span>
            </div>
            <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
              Industry-recognized credentials
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Validating expertise across data engineering, analytics, and cloud ecosystems.
            </p>
          </div>

          {/* view toggle */}
          <div
            role="group"
            aria-label="Toggle certification view"
            className="inline-flex items-center gap-1 rounded-2xl border border-emerald-300/10 bg-white/[0.04] p-1"
          >
            <button
              type="button"
              onClick={() => setView("cards")}
              aria-pressed={view === "cards"}
              className={`flex items-center gap-1 rounded-xl px-2 py-1 text-xs ${
                view === "cards" ? "bg-white/10 text-white" : "text-neutral-300 hover:bg-white/10"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              Cards
            </button>
            <button
              type="button"
              onClick={() => setView("timeline")}
              aria-pressed={view === "timeline"}
              className={`flex items-center gap-1 rounded-xl px-2 py-1 text-xs ${
                view === "timeline" ? "bg-white/10 text-white" : "text-neutral-300 hover:bg-white/10"
              }`}
            >
              <Rows className="h-4 w-4" />
              Timeline
            </button>
          </div>
        </div>

        {/* content */}
        <AnimatePresence mode="wait">
          {view === "cards" ? (
            <motion.div
              key="cards"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: 8 }}
              className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
            >
              {grouped.map((c) => (
                <motion.div
                  key={c.title}
                  variants={item}
                  className="relative overflow-hidden rounded-2xl border border-emerald-300/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all hover:border-emerald-300/25 hover:shadow-[0_0_28px_rgba(52,211,153,0.22)]"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent opacity-70"
                  />

                  <div className="flex items-center gap-3">
                    {c.logo && (
                      <img
                        src={c.logo}
                        alt={c.org}
                        className="h-8 w-8 rounded-md bg-white/10 p-1 object-contain"
                      />
                    )}
                    <div>
                      <h3 className="text-base font-semibold text-white">{c.title}</h3>
                      <p className="text-sm text-neutral-400">{c.org}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-emerald-300/90">
                        <Calendar className="h-3.5 w-3.5" /> {c.date}
                      </p>
                    </div>
                  </div>

                  {c.link && (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-emerald-300/10 bg-white/[0.06] px-3 py-1.5 text-xs text-neutral-200 hover:border-emerald-300/25 hover:bg-white/10"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> View Credential
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="relative"
            >
              <div
                aria-hidden
                className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-emerald-400/40 via-emerald-400/10 to-transparent"
              />
              <div className="space-y-6">
                {grouped.map((c, i) => (
                  <motion.div
                    key={c.title}
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative pl-12"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-2 inline-flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-emerald-300/20 bg-white/[0.06] backdrop-blur-sm"
                    >
                      <span className="block h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.8)]" />
                    </span>

                    <div className="rounded-2xl border border-emerald-300/10 bg-white/[0.04] p-5 transition-colors hover:border-emerald-300/25">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                          {c.logo && (
                            <img
                              src={c.logo}
                              alt={c.org}
                              className="h-7 w-7 rounded-md bg-white/10 p-1 object-contain"
                            />
                          )}
                          <h3 className="text-base font-semibold text-white">{c.title}</h3>
                        </div>
                        <p className="inline-flex items-center gap-1.5 text-sm text-emerald-300/90">
                          <Calendar className="h-3.5 w-3.5" /> {c.date}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-neutral-400">{c.org}</p>
                      {c.link && (
                        <a
                          href={c.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-emerald-300/10 bg-white/[0.06] px-3 py-1.5 text-xs text-neutral-200 hover:border-emerald-300/25 hover:bg-white/10"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> View Credential
                        </a>
                      )}
                    </div>

                    {i < grouped.length - 1 && (
                      <div
                        aria-hidden
                        className="absolute left-4 top-10 h-8 w-px bg-gradient-to-b from-emerald-400/20 to-emerald-400/0"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
