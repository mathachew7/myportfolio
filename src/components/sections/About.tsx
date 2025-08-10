import { motion } from "framer-motion";

export default function About() {
  const stats = [
    { label: "Years experience", value: "3+" },
    { label: "Dashboards shipped", value: "20+" },
    { label: "ETL pipelines", value: "12+" },
    { label: "Savings unlocked", value: "$3.5M+" },
  ];

  return (
    <section id="about" className="relative w-full py-20">
      {/* full-width hero-style background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#07140f] via-[#0a1b14] to-[#07140f]" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-72 w-72 rounded-full bg-emerald-400/10 blur-[90px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-emerald-300/10 blur-[80px]" />

      {/* content container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8 grid gap-12 md:grid-cols-2">
        {/* about copy */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs tracking-[0.3em] text-emerald-300/80">ABOUT</p>
          <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
            Turning messy data into reliable systems and clear decisions.
          </h2>
          <p className="mt-4 leading-relaxed text-emerald-50/85">
            I’m a data engineer & analyst focused on building robust pipelines,
            dimensional models, and dashboards that move the business. I work
            across Python, SQL, Power BI/Tableau, and AWS (S3/Redshift/Athena)
            to automate refreshes, reduce latency, and surface actionable KPIs.
          </p>
          <p className="mt-3 text-emerald-50/70">
            Recent wins include reducing manual reporting by 40%, enabling daily
            refresh cycles, and identifying $3.5M+ in savings via deep analysis.
          </p>
        </motion.div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-4 sm:gap-5"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="group flex flex-col items-center justify-center rounded-2xl border border-emerald-300/15 bg-white/[0.04] p-5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]"
            >
              <div className="text-3xl font-semibold text-white sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs tracking-wide text-emerald-100/60 sm:text-sm">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
