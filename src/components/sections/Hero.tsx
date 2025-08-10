import { useState, useMemo, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";


export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const MY_IMAGE = "/images/subash.jpeg";
  // Measure once (ResizeObserver) instead of on every mouse move
  const sectionRef = useRef<HTMLElement | null>(null);
  const [bounds, setBounds] = useState({ w: 1, h: 1 });
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBounds({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Mouse-follow spotlight
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bgX = useTransform(mx, (v) => `calc(${(v / Math.max(1, bounds.w)) * 100}% + 0px)`);
  const bgY = useTransform(my, (v) => `calc(${(v / Math.max(1, bounds.h)) * 100}% + 0px)`);

  // Rotating titles (interval-driven)
  const titles = useMemo(
    () => ["Data Engineer", "ETL Specialist", "Analytics Builder", "Dashboard Pro"],
    []
  );
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion) return; // keep static for reduced motion users
    const id = setInterval(() => setIdx((i) => (i + 1) % titles.length), 2000);
    return () => clearInterval(id);
  }, [titles.length, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      }}
    >
      {/* keep Tailwind purge-safe classes used via JS */}
      <span className="hidden ring-4 ring-red-500" aria-hidden />

      {/* Deep green base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07140f] via-[#0a1b14] to-[#07140f]" />

      {/* Mouse spotlight (auto-softened on mobile) */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden
          style={{
            background: `radial-gradient(550px 550px at ${bgX} ${bgY}, rgba(52, 211, 153, 0.12), transparent 60%)`,
          }}
          className="pointer-events-none absolute inset-0 [@media(prefers-reduced-motion:reduce)]:hidden"
        />
      )}

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[60vh] w-[60vh] rounded-full bg-emerald-400/12 blur-[140px]" />
      <div className="pointer-events-none absolute -top-28 -left-28 h-[46vh] w-[46vh] rounded-full bg-emerald-300/10 blur-[120px]" />

      {/* Subtle texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_40%_20%,rgba(255,255,255,0.05),transparent_60%)] mix-blend-soft-light" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* LEFT: Text */}
          <div className="order-2 md:order-1">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-[11px] sm:text-xs tracking-[0.3em] text-emerald-300/80"
            >
              HELLO, I’M
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6 }}
              className="mt-2 text-[clamp(42px,8.5vw,112px)] font-extrabold leading-[1.02] text-white"
            >
              Subash{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                Yadav
              </span>
            </motion.h1>

            {/* Rotating subtitle (mobile-friendly) */}
            <div className="mt-2 h-7 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-[15px] sm:text-base text-emerald-50/80"
                >
                  {titles[idx]} · Python · SQL · AWS · Docker
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Badges (wrap nicely on mobile) */}
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.22 } } }}
              className="mt-6 flex flex-wrap gap-2.5"
            >
              {["AWS · Redshift · Spark", "Python · SQL · dbt", "Power BI · Tableau", "HIPAA · Data Quality"].map(
                (t) => (
                  <motion.li
                    key={t}
                    variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                    className="rounded-full border border-emerald-300/20 bg-white/5 px-3.5 py-1.5 text-[11px] text-emerald-50/85 backdrop-blur"
                  >
                    {t}
                  </motion.li>
                )
              )}
            </motion.ul>

            {/* CTAs (full-width on small screens) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.55 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-500/10 transition-transform hover:scale-[1.02] hover:opacity-95 active:scale-95"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-300/50 px-5 py-3 text-sm font-semibold text-white/90 transition-colors hover:bg-emerald-300/10"
              >
                Contact
              </a>
              <a
                href="/Subash_Yadav_Resume.pdf"
                download
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
              >
                Download Résumé
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Photo + animated ring (scales down on mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.18, duration: 0.65 }}
            className="order-1 mx-auto flex items-center justify-center md:order-2"
          >
            <div className="relative h-[17rem] w-[17rem] sm:h-[19rem] sm:w-[19rem] md:h-[20rem] md:w-[20rem]">
              {/* Outer breathing glow */}
              <div className="pointer-events-none absolute -inset-6 animate-pulse rounded-full bg-emerald-400/10 blur-2xl" />

              {/* Conic ring */}
              {!prefersReducedMotion && (
                <motion.div
                  aria-hidden
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                  className="absolute -inset-[10px] rounded-full bg-[conic-gradient(from_0deg,rgba(16,185,129,0.0),rgba(16,185,129,0.45),rgba(16,185,129,0.0))] blur-[2px] [@media(prefers-reduced-motion:reduce)]:hidden"
                />
              )}

              {/* Photo frame */}
              <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-emerald-300/30 shadow-2xl shadow-emerald-500/20">
                <img
                  src={MY_IMAGE}
                  alt="Subash Yadav"
                  className="h-full w-full object-cover"
                  loading="eager"
                  draggable={false}
                  onError={(e) => {
                    (e.currentTarget.parentElement as HTMLElement).classList.add("ring-4", "ring-red-500");
                    e.currentTarget.style.display = "none";
                    console.warn("Image failed to load:", SUBASH);
                  }}
                />

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.08),transparent_40%)]" />
              </div>

              {/* Floating chips (hidden on very small screens) */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="pointer-events-none absolute -right-6 top-8 hidden rounded-full border border-emerald-300/20 bg-white/5 px-3 py-1 text-[10px] text-emerald-50/80 backdrop-blur sm:block"
              >
                ETL
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="pointer-events-none absolute -left-6 bottom-8 hidden rounded-full border border-emerald-300/20 bg-white/5 px-3 py-1 text-[10px] text-emerald-50/80 backdrop-blur sm:block"
              >
                BI
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="pointer-events-none absolute -left-8 top-6 hidden rounded-full border border-emerald-300/20 bg-white/5 px-3 py-1 text-[10px] text-emerald-50/80 backdrop-blur sm:block"
              >
                SQL
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator (shrinks on small screens) */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
          initial={{ opacity: 0, y: 0 }}
          animate={{ y: [0, -8, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-9 w-5 rounded-full border-2 border-emerald-300/70 p-1 sm:h-10 sm:w-6">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
