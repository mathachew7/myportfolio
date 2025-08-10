import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Copy,
  X,
  ChevronDown,
  ChevronRight,
  Check,
  Sparkles,
  LayoutGrid,
  Rows,
  Asterisk,
  CornerDownRight,
} from "lucide-react";

type Group = {
  title: string;
  items: string[];
};

const groups: Group[] = [
  { title: "Programming & Scripting", items: ["Python (pandas, NumPy)", "SQL", "Excel (Advanced/VBA)"] },
  { title: "Visualization", items: ["Power BI", "Tableau", "Excel Dashboards"] },
  {
    title: "Databases & Warehousing",
    items: ["SQL Server", "PostgreSQL", "MySQL", "Oracle", "Snowflake", "Amazon Redshift"],
  },
  { title: "Cloud & Big Data", items: ["AWS (S3, Redshift, Athena)", "Hadoop", "Apache Spark"] },
  {
    title: "Data Mgmt & ETL",
    items: ["Data Cleaning", "Transformation", "Validation", "ETL Pipelines", "Dimensional Modeling"],
  },
  {
    title: "Analytics & Stats",
    items: ["EDA", "A/B Testing", "Descriptive/Inferential", "Trend & Variance", "KPI Tracking"],
  },
  { title: "Governance & Compliance", items: ["HIPAA", "PHI/PII Handling", "Audit Trails", "Access Controls"] },
  { title: "Tools & Methods", items: ["Git", "JIRA", "Confluence", "Agile/Scrum", "SDLC"] },
];

// motion
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};

const card = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 240, damping: 22 } },
};

const pill = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

// localStorage keys
const LS_SELECTED = "skills:selected";
const LS_EXPANDED = "skills:expanded";
const LS_VIEW = "skills:view";

type ViewMode = "pills" | "tiles";

export default function Skills() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [view, setView] = useState<ViewMode>("pills");
  const [toast, setToast] = useState<string>("");

  const searchRef = useRef<HTMLInputElement>(null);

  // hydrate
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(LS_SELECTED) || "[]");
      if (Array.isArray(s)) setSelected(new Set(s));
      const e = JSON.parse(localStorage.getItem(LS_EXPANDED) || "{}");
      if (e && typeof e === "object") setExpanded(e);
      const v = localStorage.getItem(LS_VIEW) as ViewMode | null;
      if (v === "pills" || v === "tiles") setView(v);
    } catch {}
  }, []);

  // persist
  useEffect(() => localStorage.setItem(LS_SELECTED, JSON.stringify(Array.from(selected))), [selected]);
  useEffect(() => localStorage.setItem(LS_EXPANDED, JSON.stringify(expanded)), [expanded]);
  useEffect(() => localStorage.setItem(LS_VIEW, view), [view]);

  // expand/collapse
  const toggleExpand = (t: string) => setExpanded((e) => ({ ...e, [t]: e[t] === undefined ? false : !e[t] }));
  const expandAll = () =>
    setExpanded(groups.reduce((acc, g) => ({ ...acc, [g.title]: true }), {} as Record<string, boolean>));
  const collapseAll = () =>
    setExpanded(groups.reduce((acc, g) => ({ ...acc, [g.title]: false }), {} as Record<string, boolean>));

  // filter
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter((i) => i.toLowerCase().includes(q) || g.title.toLowerCase().includes(q)),
      }))
      .filter((g) => g.items.length > 0);
  }, [query]);

  // select
  const toggleSelect = (item: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });

  const selectAllInGroup = (g: Group) =>
    setSelected((prev) => {
      const next = new Set(prev);
      g.items.forEach((i) => next.add(i));
      return next;
    });

  const clearGroup = (g: Group) =>
    setSelected((prev) => {
      const next = new Set(prev);
      g.items.forEach((i) => next.delete(i));
      return next;
    });

  // copy
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1300);
  };

  const copySelected = async () => {
    const text = Array.from(selected).join(", ");
    if (!text) return;
    await navigator.clipboard.writeText(text);
    showToast("Copied selected skills");
  };

  const clearSelected = () => setSelected(new Set());

  const copyAllVisible = async () => {
    const all = filtered.flatMap((g) => g.items);
    if (!all.length) return;
    await navigator.clipboard.writeText(all.join(", "));
    showToast("Copied visible skills");
  };

  // highlight
  const highlight = (text: string) => {
    const q = query.trim();
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="rounded-[3px] bg-emerald-400/20 px-0.5 text-emerald-200">
          {text.slice(idx, idx + q.length)}
        </span>
        {text.slice(idx + q.length)}
      </>
    );
  };

  return (
    <section id="skills" className="relative w-full py-20">
      {/* full-bleed gradient — matches Projects section */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(16,185,129,0.10),transparent),radial-gradient(1000px_480px_at_90%_20%,rgba(79,70,229,0.10),transparent),linear-gradient(135deg,#07140f_0%,#0a1b14_50%,#07140f_100%)]" />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-emerald-400/15 blur-[100px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-indigo-400/15 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8">
        {/* header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-1">
              <Sparkles className="h-4 w-4 text-emerald-300" />
              <span className="text-xs font-medium tracking-[0.12em] text-emerald-200">SKILL MATRIX</span>
            </div>
            <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Skills</h2>
            <p className="mt-1 text-sm text-neutral-400">
              Click to select · press <kbd className="rounded bg-white/10 px-1">/</kbd> to focus search · copy chips or whole
              view.
            </p>
          </div>

          {/* search + actions */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="group flex items-center gap-2 rounded-2xl border border-emerald-300/10 bg-white/[0.04] px-3 py-2 backdrop-blur-sm">
              <Search className="h-4 w-4 text-neutral-400" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills or categories..."
                className="w-72 bg-transparent text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="rounded-md p-1 text-neutral-400 hover:bg-white/10 hover:text-neutral-200"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyAllVisible}
                className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/10 bg-white/[0.04] px-3 py-2 text-sm text-neutral-200 outline-none transition-all hover:border-emerald-300/25 hover:shadow-[0_0_18px_rgba(52,211,153,0.22)] focus-visible:ring-2 focus-visible:ring-emerald-400/60 active:scale-[0.98]"
                aria-label="Copy all visible skills"
              >
                <Copy className="h-4 w-4" />
                Copy All
              </button>
              <button
                onClick={expandAll}
                className="rounded-2xl border border-emerald-300/10 bg-white/[0.04] px-3 py-2 text-sm text-neutral-200 outline-none transition-all hover:border-emerald-300/25 hover:shadow-[0_0_18px_rgba(52,211,153,0.22)] focus-visible:ring-2 focus-visible:ring-emerald-400/60 active:scale-[0.98]"
              >
                Expand
              </button>
              <button
                onClick={collapseAll}
                className="rounded-2xl border border-emerald-300/10 bg-white/[0.04] px-3 py-2 text-sm text-neutral-200 outline-none transition-all hover:border-emerald-300/25 hover:shadow-[0_0_18px_rgba(52,211,153,0.22)] focus-visible:ring-2 focus-visible:ring-emerald-400/60 active:scale-[0.98]"
              >
                Collapse
              </button>

              {/* view toggle */}
              <div className="ml-1 inline-flex items-center gap-1 rounded-2xl border border-emerald-300/10 bg-white/[0.04] p-1">
                <button
                  onClick={() => setView("pills")}
                  className={`flex items-center gap-1 rounded-xl px-2 py-1 text-xs ${
                    view === "pills" ? "bg-white/10 text-white" : "text-neutral-300 hover:bg-white/10"
                  }`}
                  aria-label="Pill view"
                >
                  <LayoutGrid className="h-4 w-4" />
                  Pills
                </button>
                <button
                  onClick={() => setView("tiles")}
                  className={`flex items-center gap-1 rounded-xl px-2 py-1 text-xs ${
                    view === "tiles" ? "bg-white/10 text-white" : "text-neutral-300 hover:bg-white/10"
                  }`}
                  aria-label="Tile view"
                >
                  <Rows className="h-4 w-4" />
                  Tiles
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* selected bar */}
        {selected.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3"
          >
            <p className="text-sm text-emerald-200">{selected.size} selected — click a pill again to unselect.</p>
            <div className="flex items-center gap-2">
              <button
                onClick={copySelected}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/30 bg-emerald-400/10 px-3 py-1.5 text-sm text-emerald-100 hover:bg-emerald-400/20 active:scale-[0.98]"
              >
                <Copy className="h-4 w-4" />
                Copy Selected
              </button>
              <button
                onClick={clearSelected}
                className="rounded-xl border border-emerald-300/10 bg-white/[0.04] px-3 py-1.5 text-sm text-neutral-200 hover:bg-white/10 active:scale-[0.98]"
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}

        {/* grid/list */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2">
          {filtered.map((g) => {
            const isOpen = expanded[g.title] ?? true;

            return (
              <motion.div
                key={g.title}
                variants={card}
                className="relative overflow-hidden rounded-2xl border border-emerald-300/10 bg-white/[0.04] p-5 backdrop-blur-sm outline-none transition-all hover:border-emerald-300/25 hover:shadow-[0_0_32px_rgba(52,211,153,0.22)]"
              >
                {/* accent line to match Projects */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent opacity-70" />

                <div className="flex w-full items-start justify-between gap-3">
                  <button
                    onClick={() => toggleExpand(g.title)}
                    className="group flex flex-1 items-center gap-3 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-300/10 bg-white/5 text-sm text-neutral-300">
                      {g.title
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 3)
                        .toUpperCase()}
                    </span>
                    <div>
                      <h3 className="text-lg font-medium text-white">{g.title}</h3>
                      <p className="text-xs text-neutral-400">{g.items.length} skills</p>
                    </div>
                  </button>

                  <button
                    onClick={() => toggleExpand(g.title)}
                    className="rounded-md border border-emerald-300/10 bg-white/5 p-1.5 text-neutral-300 hover:bg-white/10"
                    aria-label={isOpen ? "Collapse" : "Expand"}
                  >
                    {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                </div>

                {/* group actions */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => selectAllInGroup(g)}
                    className="inline-flex items-center gap-1 rounded-md border border-emerald-300/30 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-100 hover:bg-emerald-400/20"
                  >
                    <Asterisk className="h-3.5 w-3.5" /> Select all
                  </button>
                  <button
                    onClick={() => clearGroup(g)}
                    className="inline-flex items-center gap-1 rounded-md border border-emerald-300/10 bg-white/[0.04] px-2.5 py-1 text-xs text-neutral-300 hover:bg-white/10"
                  >
                    <CornerDownRight className="h-3.5 w-3.5" /> Clear group
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="open"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className={`mt-4 ${view === "tiles" ? "grid grid-cols-2 gap-2 sm:grid-cols-3" : "flex flex-wrap gap-2"}`}
                    >
                      {g.items.map((item) => {
                        const active = selected.has(item);
                        const base =
                          "group inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs transition backdrop-blur-sm";
                        const on = "border-emerald-300/40 bg-emerald-400/15 text-emerald-100";
                        const off = "border-emerald-300/10 bg-white/[0.04] text-neutral-300 hover:border-emerald-300/20 hover:bg-white/10";

                        return (
                          <motion.button
                            key={item}
                            variants={pill}
                            whileHover={{ scale: 1.03, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleSelect(item)}
                            className={`${base} ${active ? on : off}`}
                            title="Click to (un)select"
                          >
                            {active ? <Check className="h-3.5 w-3.5" /> : null}
                            <span>{highlight(item)}</span>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* helper */}
        <div className="mt-8 text-xs text-neutral-400">
          Tip: Click skills to select and copy. Press <kbd className="rounded bg-white/10 px-1">/</kbd> to focus search.
        </div>
      </div>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-2xl border border-emerald-300/10 bg-white/[0.10] px-4 py-2 text-sm text-white backdrop-blur"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* keyboard shortcut */}
      <Shortcut keyChar="/" onPress={() => searchRef.current?.focus()} />
    </section>
  );
}

// keyboard shortcut
function Shortcut({ keyChar, onPress }: { keyChar: string; onPress: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === keyChar && !["INPUT", "TEXTAREA"].includes(tag)) {
        e.preventDefault();
        onPress();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [keyChar, onPress]);
  return null;
}
