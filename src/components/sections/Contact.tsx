// src/components/sections/Contact.tsx
import { Mail, Linkedin, FileText } from "lucide-react";
import { motion } from "framer-motion";

const MAIL =
  "mailto:ysubash0011@gmail.com?subject=Opportunity%20for%20Data%20Engineer%2FAnalyst&body=Hi%20Subash%2C%0A%0AWe%27d%20love%20to%20chat%20about%20...%0A%0AThanks%2C%0A";
const LINKEDIN = "https://linkedin.com/in/mathachew7";

// Use the same filename everywhere and place it in /public
const RESUME = "/Subash_Yadav_Resume.pdf";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full py-24">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(16,185,129,0.10),transparent),radial-gradient(1000px_480px_at_90%_20%,rgba(79,70,229,0.10),transparent),linear-gradient(135deg,#07140f_0%,#0a1b14_50%,#07140f_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-72 w-72 rounded-full bg-emerald-400/15 blur-[100px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-emerald-300/10 bg-white/5 p-10 text-center backdrop-blur-sm transition-all hover:border-emerald-300/25 hover:shadow-[0_0_28px_rgba(52,211,153,0.22)]"
        >
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Let’s work together.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-neutral-300">
            Open to Data Engineering & Analytics roles. I ship pipelines, models, and dashboards that move the business.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={MAIL}
              aria-label="Email Subash"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-medium text-black shadow-sm transition hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              Email Me
            </a>

            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open LinkedIn profile"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/50 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-400/10"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>

            {/* <a
              href={RESUME}
              download
              aria-label="Download résumé"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/50 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-400/10"
            >
              <FileText className="h-4 w-4" />
              Download Résumé
            </a> */}
          </div>

          <p className="mt-4 text-xs text-neutral-400">Avg. response: &lt; 24 hours</p>
        </motion.div>

        <footer className="mt-12 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} Subash Yadav
        </footer>
      </div>
    </section>
  );
}
