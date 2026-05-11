import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiCode, FiLock, FiShare2, FiZap } from "react-icons/fi";
import PageTransition from "../components/PageTransition.jsx";
import Button from "../components/ui/Button.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";

const features = [
  { icon: FiCode, title: "VS Code-like editor", desc: "Monaco-powered editing with multiple languages and a clean layout." },
  { icon: FiShare2, title: "Shareable URLs", desc: "Generate unique links for public snippets in one click." },
  { icon: FiLock, title: "Public / Private", desc: "Keep drafts private, publish when you’re ready." },
  { icon: FiZap, title: "Fast workflow", desc: "Search, filter, edit and copy in a few seconds." },
];

const testimonials = [
  { name: "Aarav", role: "Frontend Engineer", quote: "Feels like VS Code met Pastebin, with the right polish." },
  { name: "Maya", role: "Backend Engineer", quote: "Love the share panel + quick copy. Great for code reviews." },
  { name: "Noah", role: "Student", quote: "I can keep notes private and publish solutions later." },
];

export default function Home() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <section className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
            >
              <FiCheckCircle className="h-4 w-4 text-emerald-300" />
              Beautiful snippets. Share in seconds.
            </motion.div>

            <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight text-slate-100">
              A modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-emerald-200">CodeShare</span>{" "}
              for developers
            </h1>
            <p className="mt-4 text-base text-slate-300 max-w-xl">
              Create, edit, and share code snippets with a VS Code-like editor, beautiful glassmorphism UI, and smooth animations.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button as={Link} to="/register" size="lg" variant="primary">
                Get started
              </Button>
              <Button as={Link} to="/login" size="lg" variant="secondary">
                Try demo login
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-400">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Monaco Editor</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">React Router</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Framer Motion</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Tailwind</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/20 via-emerald-500/10 to-rose-500/10 blur-2xl" />
            <GlassCard className="relative p-5">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-sm font-semibold text-slate-100">CodeShare Editor</div>
                  <div className="text-xs text-slate-400">VS Code vibes, Pastebin simplicity</div>
                </div>
                <div className="flex gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-12 gap-3">
                <div className="col-span-4 glass rounded-xl p-3">
                  <div className="text-xs text-slate-300 font-medium">Recent</div>
                  <div className="mt-3 space-y-2">
                    {["hello-world.js", "qsort.py", "notes.md"].map((x) => (
                      <div key={x} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-xs text-slate-200">
                        {x}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-8 glass rounded-xl p-3">
                  <div className="text-xs text-slate-300 font-medium">Editor</div>
                  <pre className="mt-3 text-[12px] leading-5 text-slate-200 font-mono whitespace-pre-wrap">
                    <code>{`export const add = (a, b) => a + b;\n\nconsole.log(add(2, 40)); // 42`}</code>
                  </pre>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                    <span>JavaScript</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">Public</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        <section id="features" className="mt-16">
          <div className="text-left">
            <h2 className="text-2xl font-semibold text-slate-100">Features</h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              Everything you need for a clean snippet workflow — built with scalable architecture and reusable components.
            </p>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <GlassCard key={f.title} className="p-4">
                <div className="text-left">
                  <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <f.icon className="h-5 w-5 text-slate-100" />
                  </div>
                  <div className="mt-3 text-sm font-semibold text-slate-100">{f.title}</div>
                  <div className="mt-1 text-sm text-slate-300">{f.desc}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section id="testimonials" className="mt-16">
          <div className="text-left">
            <h2 className="text-2xl font-semibold text-slate-100">Testimonials</h2>
            <p className="mt-2 text-sm text-slate-300">A few words from developers who ship.</p>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <GlassCard key={t.name} className="p-4">
                <div className="text-left">
                  <div className="text-sm text-slate-200">“{t.quote}”</div>
                  <div className="mt-4 text-xs text-slate-400">
                    <span className="text-slate-200 font-medium">{t.name}</span> · {t.role}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="glass rounded-3xl p-6 sm:p-10 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-emerald-500/10 to-rose-500/10" />
            <div className="relative text-left max-w-3xl">
              <div className="text-xs text-slate-300 font-medium">Ready to share?</div>
              <div className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-100">Build your snippet library in minutes</div>
              <p className="mt-3 text-sm text-slate-300">
                This frontend ships with protected routes, a mock API service layer, and production-ready UI components.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button as={Link} to="/register" size="lg">
                  Create your account
                </Button>
                <Button as={Link} to="/dashboard" size="lg" variant="secondary">
                  Go to dashboard
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

