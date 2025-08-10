import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Grid, List, ExternalLink, ChevronDown, ChevronUp, Filter } from "lucide-react";

type Project = {
  title: string;
  blurb: string;
  impact: string;
  stack: string[];
  github: string;
  tags: string[];
};

const GITHUB = "https://github.com/mathachew7";

const projects: Project[] = [
  {
    title: "ETL Automation @ Aptech",
    blurb: "Built Python/SQL pipelines feeding 12+ Power BI dashboards.",
    impact: "↓65% refresh latency, higher compliance accuracy.",
    stack: ["Python", "SQL", "Redshift", "Power BI", "DBT/Scripts"],
    github: GITHUB,
    tags: ["ETL", "BI", "Automation"],
  },
  {
    title: "Predictive Outreach Model",
    blurb: "Integrated multi-source datasets to prioritize outreach.",
    impact: "↑12% program participation across regions.",
    stack: ["Python", "Pandas", "Sklearn", "SQL", "EDA"],
    github: GITHUB,
    tags: ["ML", "Analytics"],
  },
  {
    title: "Webster KPI Dashboards",
    blurb: "8+ Tableau dashboards for trends & accreditation metrics.",
    impact: "↓60% prep time, daily refresh cycles enabled.",
    stack: ["Tableau", "Snowflake", "Python", "SQL"],
    github: GITHUB,
    tags: ["BI", "Dashboards"],
  },
  {
    title: "Healthcare Data Warehouse",
    blurb: "Star/Snowflake models across clinical/claims/ops data.",
    impact: "10K+ daily txns; queries 70% faster after tuning.",
    stack: ["SQL Server", "PostgreSQL", "Modeling", "PL/SQL", "T-SQL"],
    github: GITHUB,
    tags: ["DWH", "Modeling", "Healthcare"],
  },
  {
    title: "Claims Cost Explorer",
    blurb: "Interactive BI to drill into claim spend, leakage, and outliers.",
    impact: "Surfaced $3.5M+ yearly savings opportunities.",
    stack: ["Power BI", "DAX", "SQL", "Redshift"],
    github: GITHUB,
    tags: ["BI", "Cost"],
  },
  {
    title: "Provider Performance Scorecard",
    blurb: "Role-based views for outcomes, utilization, and SLAs.",
    impact: "Improved partner alignment and reduced rework by 9%.",
    stack: ["Tableau", "Snowflake", "Python", "SQL"],
    github: GITHUB,
    tags: ["Healthcare", "Dashboards"],
  },
];

const ALL_TAGS = ["ETL", "ML", "BI", "Dashboards", "DWH", "Modeling", "Healthcare", "Automation", "Analytics", "Cost"];

// ✅ make variants literal-typed for Framer's TS
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
} as const;

const card = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 22 },
  },
} as const;

export default function Projects() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleOpen = (title: string) =>
    setOpen((s) => ({ ...s, [title]: !s[title] }));

  const toggleTag = (t: string) =>
    setActiveTags((arr) => (arr.includes(t) ? arr.filter((x) => x !== t) : [...arr, t]));

  const clearTags = () => setActiveTags([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchesTags = activeTags.length === 0 || activeTags.every((t) => p.tags.includes(t));
      return matchesQ && matchesTags;
    });
  }, [query, activeTags]);

  return (
    <section id="projects" className="relative w-full py-20">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(16,185,129,0.10),transparent),radial-gradient(1000px_480px_at_90%_20%,rgba(79,70,229,0.10),transparent),linear-gradient(135deg,#07140f_0%,#0a1b14_50%,#07140f_100%)]" />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-emerald-400/15 blur-[100px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-indigo-400/15 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] text-emerald-300/80">BUILDS</p>
            <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
              Not Just Code — Real Results
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
              <Search className="h-4 w-4 text-neutral-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, tech, tags…"
                className="w-64 bg-transparent text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 py-1 backdrop-blur-sm">
              <button
                onClick={() => setView("grid")}
                className={`flex items-center gap-1 rounded-xl px-3 py-1.5 text-sm ${
                  view === "grid" ? "bg-white/10 text-white" : "text-neutral-300 hover:bg-white/10 hover:text-white"
                }`}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" /> Grid
              </button>
              <button
                onClick={() => setView("list")}
                className={`flex items-center gap-1 rounded-xl px-3 py-1.5 text-sm ${
                  view === "list" ? "bg-white/10 text-white" : "text-neutral-300 hover:bg-white/10 hover:text-white"
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" /> List
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="mr-1 inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-neutral-300">
            <Filter className="h-3.5 w-3.5" /> Filters
          </span>
          {ALL_TAGS.map((t) => {
            const active = activeTags.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className={`rounded-md border px-2.5 py-1 text-xs transition ${
                  active
                    ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-100"
                    : "border-white/10 bg-white/5 text-neutral-300 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            );
          })}
          {activeTags.length > 0 && (
            <button
              onClick={clearTags}
              className="ml-2 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-300 hover:border-white/20 hover:bg-white/10"
            >
              Clear
            </button>
          )}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className={view === "grid" ? "grid gap-6 md:grid-cols-2" : "flex flex-col gap-4"}
        >
          {filtered.map((p) => {
            const isOpen = !!open[p.title];
            const Base = view === "grid" ? motion.a : motion.div;
            const baseProps =
              view === "grid"
                ? ({
                    href: p.github,
                    target: "_blank",
                    rel: "noreferrer",
                    "aria-label": `${p.title} on GitHub`,
                  } as const)
                : {};

            return (
              <Base
                key={p.title}
                {...(baseProps as any)}
                variants={card}
                whileHover={{ y: -2 }}
                className={`group relative block rounded-2xl border border-emerald-300/10 bg-white/[0.04] p-5 backdrop-blur-sm outline-none transition-all duration-300 hover:border-emerald-300/25 hover:shadow-[0_0_32px_rgba(52,211,153,0.22)] focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${
                  view === "list" ? "sm:flex sm:items-start sm:justify-between" : ""
                }`}
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="pr-2">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md border border-white/10 bg-white/5 p-1.5 text-neutral-300 hover:bg-white/10"
                      aria-label="Open repo"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <p className="mt-2 text-neutral-300">{p.blurb}</p>
                  <p className="mt-2 text-sm font-medium text-emerald-300/90">{p.impact}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-neutral-300 transition-colors group-hover:border-emerald-300/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleOpen(p.title);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-200 hover:bg-white/10"
                    >
                      {isOpen ? (
                        <>
                          <ChevronUp className="h-4 w-4" /> Hide details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" /> Show details
                        </>
                      )}
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="details"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: "tween", duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4">
                            <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-300">
                              <li>What changed: automated refreshes, better lineage, less manual prep.</li>
                              <li>How: Python/SQL ETL + semantic models + tuned queries.</li>
                              <li>Outcome: faster insights, cleaner ops, tighter feedback loops.</li>
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(180px_110px_at_10%_0%,rgba(52,211,153,0.14),transparent_70%)]" />
              </Base>
            );
          })}
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-neutral-300">
            No projects found. Try clearing filters or adjusting your search.
          </div>
        )}
      </div>
    </section>
  );
}
