import { motion } from "framer-motion";

type Item = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

const items: Item[] = [
  {
    company: "Aptech Staffing, TX",
    role: "Data Engineer (Remote)",
    period: "Feb 2025 – Present",
    bullets: [
      "Cut weekly manual reporting time by 40% with 12+ Power BI dashboards.",
      "Identified $3.5M+ annual savings analyzing 15M+ records in Redshift & other sources.",
      "Reduced refresh latency by 65% via automated Python/SQL ETL; boosted compliance accuracy.",
    ],
  },
  {
    company: "Webster University, MO",
    role: "Data Analyst",
    period: "Feb 2023 – Dec 2024",
    bullets: [
      "Built 8+ Tableau dashboards across departments for trends & outcomes.",
      "Validated 10M+ rows from Handshake/Workday; KPI tracking for 25+ metrics.",
      "60% faster prep + daily refresh via Python/SQL ETL and Snowflake models.",
    ],
  },
  {
    company: "Spell Innovations Pvt. Ltd, Nepal",
    role: "SQL Developer / Data Architect",
    period: "Sep 2020 – Jul 2022",
    bullets: [
      "Architected HIPAA-compliant platforms handling 10K+ daily transactions.",
      "Star/Snowflake schemas across clinical/claims/ops for advanced analytics.",
      "150+ procs & heavy query tuning → 70% faster on 100M+ record sets.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative w-full py-20">
      {/* background */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[#07140f] via-[#0a1b14] to-[#07140f]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-300/10 blur-[100px]" />

      {/* container */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-6 px-5 sm:px-6 md:px-8">
        {/* heading */}
        <div>
          <p className="text-xs tracking-[0.3em] text-emerald-300/80">JOURNEY</p>
          <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
            Journey so far
          </h2>
        </div>

        {/* timeline */}
        <div className="relative mt-6">
          {/* center spine */}
          <div aria-hidden className="pointer-events-none absolute left-4 top-0 h-full w-px bg-emerald-400/15 md:left-1/2" />

          <ul role="list" className="space-y-12">
            {items.map((it, idx) => {
              const left = idx % 2 === 0; // alternate on md+
              return (
                <motion.li
                  key={it.company}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  className="group relative md:grid md:grid-cols-12 md:gap-6"
                >
                  {/* node on the spine */}
                  <span
                    aria-hidden
                    className="absolute left-4 top-8 -translate-x-1/2 md:left-1/2"
                  >
                    <span className="absolute -inset-3 rounded-full bg-emerald-400/20 blur-md" />
                    <span className="relative block h-3 w-3 rounded-full bg-emerald-400 ring-4 ring-emerald-400/25" />
                  </span>

                  {/* short cap curve above the card */}
                  <div
                    aria-hidden
                    className={[
                      "pointer-events-none absolute -top-1 md:top-6 h-10 md:h-12",
                      left
                        ? "right-1/2 w-[calc(50%-2rem)]"
                        : "left-1/2 w-[calc(50%-2rem)]",
                      "hidden md:block",
                    ].join(" ")}
                  >
                    <svg
                      viewBox="0 0 200 100"
                      preserveAspectRatio="none"
                      className={left ? "h-full w-full -scale-x-100 origin-center" : "h-full w-full"}
                      aria-hidden
                    >
                      <path
                        d="M0,70 C60,70 110,30 200,30"
                        fill="none"
                        stroke="rgba(52,211,153,0.7)"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        className="opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </svg>
                  </div>

                  {/* card */}
                  <div
                    className={[
                      "relative z-10 rounded-xl p-5 transition-all duration-300",
                      "hover:bg-white/[0.05] hover:backdrop-blur-sm",
                      "hover:shadow-[0_0_28px_rgba(52,211,153,0.22)]",
                      "border border-emerald-300/10 hover:border-emerald-300/20",
                      left ? "md:col-span-5 md:col-start-1" : "md:col-span-5 md:col-start-8",
                      "mt-6 md:mt-10",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(140px_90px_at_10%_0%,rgba(52,211,153,0.15),transparent_70%)]"
                    />

                    <div className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">
                      {it.period}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <h3 className="text-lg font-medium text-white">{it.role}</h3>
                      <svg
                        className="h-4 w-4 flex-none text-emerald-300/80"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M5 12h12m0 0l-4-4m4 4l-4 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="text-neutral-400">{it.company}</div>

                    <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-300">
                      {it.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>

                    {/* hairline separators */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
