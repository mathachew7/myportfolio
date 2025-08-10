import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, MapPin, Calendar, Rows, LayoutGrid } from "lucide-react";

type School = {
  degree: string;
  org: string;
  period: string;
  location?: string;
};

const schools: School[] = [
  {
    degree: "M.S. in Data Analytics",
    org: "Webster University",
    period: "Aug 2022 – Dec 2024",
    location: "Saint Louis, MO",
  },
  {
    degree: "B.Tech in Information Technology",
    org: "Sharda University",
    period: "Aug 2016 – Jul 2020",
    location: "Delhi NCR, India",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 240, damping: 22 } },
};

type ViewMode = "cards" | "timeline";

export default function Education() {
  const [view, setView] = useState<ViewMode>("cards");
  const grouped = useMemo(() => schools, []);

  return (
    <section id="education" className="relative w-full py-20">
      {/* full-bleed gradient — matches Projects/Skills */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(16,185,129,0.10),transparent),radial-gradient(1000px_480px_at_90%_20%,rgba(79,70,229,0.10),transparent),linear-gradient(135deg,#07140f_0%,#0a1b14_50%,#07140f_100%)]" />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-emerald-400/15 blur-[100px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-indigo-400/15 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8">
        {/* header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-1">
              <GraduationCap className="h-4 w-4 text-emerald-300" />
              <span className="text-xs font-medium tracking-[0.12em] text-emerald-200">EDUCATION</span>
            </div>
            <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Degrees & coursework</h2>
            <p className="mt-1 text-sm text-neutral-400">
              Academic journey blending analytics, engineering, and real-world problem solving.
            </p>
          </div>

          {/* view toggle */}
          <div className="inline-flex items-center gap-1 rounded-2xl border border-emerald-300/10 bg-white/[0.04] p-1">
            <button
              onClick={() => setView("cards")}
              className={`flex items-center gap-1 rounded-xl px-2 py-1 text-xs ${
                view === "cards" ? "bg-white/10 text-white" : "text-neutral-300 hover:bg-white/10"
              }`}
              aria-label="Cards view"
            >
              <LayoutGrid className="h-4 w-4" />
              Cards
            </button>
            <button
              onClick={() => setView("timeline")}
              className={`flex items-center gap-1 rounded-xl px-2 py-1 text-xs ${
                view === "timeline" ? "bg-white/10 text-white" : "text-neutral-300 hover:bg-white/10"
              }`}
              aria-label="Timeline view"
            >
              <Rows className="h-4 w-4" />
              Timeline
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === "cards" ? (
            <motion.div
              key="cards"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: 8 }}
              className="grid gap-6 sm:grid-cols-2"
            >
              {grouped.map((s) => (
                <motion.div
                  key={s.degree}
                  variants={item}
                  className="relative overflow-hidden rounded-2xl border border-emerald-300/10 bg-white/[0.04] p-6 backdrop-blur-sm outline-none transition-all hover:border-emerald-300/25 hover:shadow-[0_0_28px_rgba(52,211,153,0.22)]"
                >
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent opacity-70" />
                  <div className="flex items-start gap-3">
                    <div className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-300/10 bg-white/5">
                      <GraduationCap className="h-4.5 w-4.5 text-emerald-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{s.degree}</h3>
                      <p className="mt-1 flex flex-wrap items-center gap-x-3 text-neutral-300">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-emerald-300/90" />
                          {s.org}
                          {s.location ? `, ${s.location}` : ""}
                        </span>
                      </p>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-emerald-300/90">
                        <Calendar className="h-3.5 w-3.5" />
                        {s.period}
                      </p>
                    </div>
                  </div>
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
              <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-emerald-400/40 via-emerald-400/10 to-transparent" />
              <div className="space-y-6">
                {grouped.map((s, i) => (
                  <motion.div
                    key={s.degree}
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative pl-12"
                  >
                    <span className="absolute left-0 top-2 inline-flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-emerald-300/20 bg-white/[0.06] backdrop-blur-sm">
                      <span className="block h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.8)]" />
                    </span>

                    <div className="rounded-2xl border border-emerald-300/10 bg-white/[0.04] p-5 transition-colors hover:border-emerald-300/25">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-base font-semibold text-white">{s.degree}</h3>
                        <p className="inline-flex items-center gap-1.5 text-sm text-emerald-300/90">
                          <Calendar className="h-3.5 w-3.5" />
                          {s.period}
                        </p>
                      </div>
                      <p className="mt-1 flex flex-wrap items-center gap-3 text-neutral-300">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-emerald-300/90" />
                          {s.org}
                          {s.location ? `, ${s.location}` : ""}
                        </span>
                      </p>
                    </div>

                    {i < grouped.length - 1 && (
                      <div className="absolute left-4 top-10 h-8 w-px bg-gradient-to-b from-emerald-400/20 to-emerald-400/0" />
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
