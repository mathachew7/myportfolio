import { motion, useReducedMotion } from "framer-motion";

export default function About() {
  const prefersReducedMotion = useReducedMotion();

  const stats = [
    { label: "Years experience", value: "3+" },
    { label: "Projects delivered", value: "25+" },
    { label: "Pipelines & Models", value: "20+" },
    { label: "Savings unlocked", value: "$3.5M+" },
  ];

  return (
    <section id="about" className="relative w-full py-20">
      {/* background */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[#07140f] via-[#0a1b14] to-[#07140f]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/4 h-72 w-72 rounded-full bg-emerald-400/10 blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-emerald-300/10 blur-[80px]" />

      {/* content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-6 md:grid-cols-2 md:px-8">
        {/* copy */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs tracking-[0.3em] text-emerald-300/80">ABOUT</p>
          <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
            From raw data to intelligent systems and actionable insights.
          </h2>
          <p className="mt-4 max-w-prose leading-relaxed text-emerald-50/85">
            I design data systems that connect engineering precision with analytical depth and
            machine learning intelligence. My work spans the full data lifecycle — from building
            ingestion pipelines and scalable models to delivering insights and automation that
            drive smarter decisions.
          </p>
          <p className="mt-3 max-w-prose text-emerald-50/70">
            Skilled in Python, SQL, and cloud-native tooling (AWS, Azure, GCP), I focus on creating
            clean, reliable, and explainable data flows that power both analytics and AI systems —
            bridging the gap between infrastructure, intelligence, and impact.
          </p>
        </motion.div>

        {/* stats */}
        <motion.dl
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-4 sm:gap-5"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="group flex flex-col items-center justify-center rounded-2xl border border-emerald-300/15 bg-white/[0.04] p-5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]"
            >
              <dd className="order-1 text-3xl font-semibold text-white sm:text-4xl">{s.value}</dd>
              <dt className="order-2 mt-1 text-xs tracking-wide text-emerald-100/60 sm:text-sm">
                {s.label}
              </dt>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
