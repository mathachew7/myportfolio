import { useEffect, useMemo, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Search, X, ChevronDown, ChevronRight, Sparkles, LayoutGrid, Rows } from "lucide-react";

type Group = {
  title: string;
  items: string[];
};

const groups: Group[] = [
  {
    title: "Programming & Scripting",
    items: [
      "Python (pandas, NumPy, scikit-learn)",
      "SQL (PostgreSQL, MySQL, T-SQL)",
      "JavaScript / TypeScript",
      "Bash / Shell Scripting",
    ],
  },
  {
    title: "Machine Learning & Deep Learning",
    items: [
      "Supervised / Unsupervised Learning",
      "Regression & Classification Models",
      "Feature Engineering & Model Optimization",
      "Neural Networks & Transformers",
      "TensorFlow / PyTorch / Keras",
      "Transfer Learning",
    ],
  },
  {
    title: "Natural Language Processing (NLP)",
    items: [
      "Text Classification & Summarization",
      "NER & Sentiment Analysis",
      "Transformers (BERT, GPT, RoBERTa)",
      "LangChain / LlamaIndex",
      "Vector Databases (Pinecone, Chroma)",
      "Retrieval-Augmented Generation (RAG)",
    ],
  },
  {
    title: "Generative AI & LLM Systems",
    items: [
      "OpenAI / Azure OpenAI APIs",
      "Prompt Engineering & Optimization",
      "LLM Integration & Orchestration (LangChain, CrewAI)",
      "Embeddings & Vector Search",
      "Fine-tuning Custom Models",
      "RAG Pipelines & LLM Evaluation",
    ],
  },
  {
    title: "Data Engineering & ETL",
    items: [
      "Data Cleaning & Transformation (pandas, PySpark)",
      "Airflow / Prefect for Pipeline Orchestration",
      "Data Validation (Great Expectations, Pydantic)",
      "Streaming (Kafka, Spark Structured Streaming)",
      "Lakehouse Architecture (Delta Lake, Databricks)",
    ],
  },
  {
    title: "Big Data & Warehousing",
    items: [
      "Apache Spark / PySpark",
      "Snowflake / Redshift / BigQuery",
      "Hadoop Ecosystem (HDFS, Hive)",
      "Query Optimization & Data Partitioning",
    ],
  },
  {
    title: "MLOps & Deployment",
    items: [
      "FastAPI / Streamlit / Gradio Deployment",
      "MLflow & Weights & Biases Tracking",
      "Containerization (Docker, Kubernetes)",
      "CI/CD (GitHub Actions, Jenkins)",
      "Model Monitoring (Prometheus, Grafana)",
    ],
  },
  {
    title: "Cloud & Infrastructure",
    items: [
      "AWS (S3, Glue, Redshift, Lambda, SageMaker)",
      "Azure (Data Factory, Synapse, Cognitive Services)",
      "GCP (BigQuery, Vertex AI)",
      "Terraform / CloudFormation (IaC)",
    ],
  },
  {
    title: "Visualization & Analytics",
    items: [
      "Power BI / Tableau / Looker Studio",
      "Plotly / Seaborn / Matplotlib",
      "Streamlit Dashboards",
      "EDA & KPI Tracking",
    ],
  },
  {
    title: "Governance & Project Tools",
    items: [
      "Data Governance & Access Control (HIPAA, GDPR)",
      "Version Control (Git, DVC)",
      "Agile / Scrum / Kanban",
      "JIRA / Confluence / Notion",
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
} as const satisfies Variants;

const card = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 22 },
  },
} as const satisfies Variants;

const pill = {
  hidden: { opacity: 0, y: 2 },
  show: { opacity: 1, y: 0, transition: { duration: 0.15 } },
} as const satisfies Variants;

type ViewMode = "pills" | "tiles";

export default function Skills() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [view, setView] = useState<ViewMode>("pills");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const v = localStorage.getItem("skills:view") as ViewMode | null;
    if (v === "pills" || v === "tiles") setView(v);
  }, []);

  useEffect(() => localStorage.setItem("skills:view", view), [view]);

  const toggleExpand = (t: string) =>
    setExpanded((e) => ({ ...e, [t]: !(e[t] ?? true) }));

  const expandAll = () =>
    setExpanded(groups.reduce((acc, g) => ({ ...acc, [g.title]: true }), {} as Record<string, boolean>));

  const collapseAll = () =>
    setExpanded(groups.reduce((acc, g) => ({ ...acc, [g.title]: false }), {} as Record<string, boolean>));

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
      {/* background */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(16,185,129,0.10),transparent),radial-gradient(1000px_480px_at_90%_20%,rgba(79,70,229,0.10),transparent),linear-gradient(135deg,#07140f_0%,#0a1b14_50%,#07140f_100%)]" />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-emerald-400/15 blur-[100px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-indigo-400/15 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8">
        {/* header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-1">
              <Sparkles className="h-4 w-4 text-emerald-300" />
              <span className="text-xs font-medium tracking-[0.12em] text-emerald-200">
                EXPERTISE & TECHNICAL PROFICIENCIES
              </span>
            </div>
            <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Skills & Stack I Master</h2>
            <p className="mt-1 text-sm text-neutral-400 leading-relaxed">
              I specialize in designing, engineering, and deploying intelligent data systems that bridge{" "}
              <span className="text-emerald-300">Machine Learning</span>,{" "}
              <span className="text-emerald-300">Generative AI</span>, and{" "}
              <span className="text-emerald-300">Data Engineering</span>. With deep hands-on experience across
              cloud, analytics, and automation, I build end-to-end, production-grade AI pipelines that
              deliver measurable impact.
            </p>
          </div>

          {/* search + view */}
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
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="rounded-2xl border border-emerald-300/10 bg-white/[0.04] px-3 py-2 text-sm text-neutral-200 transition-all hover:border-emerald-300/25 hover:shadow-[0_0_18px_rgba(52,211,153,0.22)]"
              >
                Expand
              </button>
              <button
                onClick={collapseAll}
                className="rounded-2xl border border-emerald-300/10 bg-white/[0.04] px-3 py-2 text-sm text-neutral-200 transition-all hover:border-emerald-300/25 hover:shadow-[0_0_18px_rgba(52,211,153,0.22)]"
              >
                Collapse
              </button>

              <div className="ml-1 inline-flex items-center gap-1 rounded-2xl border border-emerald-300/10 bg-white/[0.04] p-1">
                <button
                  onClick={() => setView("pills")}
                  className={`flex items-center gap-1 rounded-xl px-2 py-1 text-xs transition ${
                    view === "pills"
                      ? "bg-white/10 text-white shadow-[0_0_12px_rgba(52,211,153,0.25)]"
                      : "text-neutral-300 hover:bg-white/10"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                  Pills
                </button>
                <button
                  onClick={() => setView("tiles")}
                  className={`flex items-center gap-1 rounded-xl px-2 py-1 text-xs transition ${
                    view === "tiles"
                      ? "bg-white/10 text-white shadow-[0_0_12px_rgba(52,211,153,0.25)]"
                      : "text-neutral-300 hover:bg-white/10"
                  }`}
                >
                  <Rows className="h-4 w-4" />
                  Tiles
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* skills grid */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2">
          {filtered.map((g) => {
            const isOpen = expanded[g.title] ?? true;
            return (
              <motion.div
                key={g.title}
                variants={card}
                className="relative overflow-hidden rounded-2xl border border-emerald-300/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all hover:border-emerald-300/25 hover:shadow-[0_0_32px_rgba(52,211,153,0.22)]"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent opacity-70" />

                <div className="flex items-start justify-between gap-3">
                  <button onClick={() => toggleExpand(g.title)} className="group flex flex-1 items-center gap-3 text-left">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-300/10 bg-white/5 text-sm text-neutral-300">
                      {g.title
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 3)
                        .toUpperCase()}
                    </span>
                    <div>
                      <h3 className="text-lg font-medium text-white group-hover:text-emerald-200 transition-colors">
                        {g.title}
                      </h3>
                      <p className="text-xs text-neutral-400">{g.items.length} skills</p>
                    </div>
                  </button>
                  <button
                    onClick={() => toggleExpand(g.title)}
                    className="rounded-md border border-emerald-300/10 bg-white/5 p-1.5 text-neutral-300 hover:bg-white/10 transition"
                  >
                    {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                </div>

                {isOpen && (
                  <motion.div
                    variants={pill}
                    initial="show"
                    animate="show"
                    transition={{ staggerChildren: 0.02 }}
                    className={`mt-4 ${
                      view === "tiles" ? "grid grid-cols-2 gap-2 sm:grid-cols-3" : "flex flex-wrap gap-2"
                    }`}
                  >
                    {g.items.map((item) => (
                      <motion.span
                        key={item}
                        variants={pill}
                        whileHover={{ scale: 1.05, y: -1 }}
                        className="inline-flex items-center rounded-md border border-emerald-300/10 bg-white/[0.04] px-3 py-1.5 text-xs text-neutral-300 transition hover:border-emerald-300/20 hover:bg-emerald-400/10 hover:text-emerald-100"
                      >
                        {highlight(item)}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
