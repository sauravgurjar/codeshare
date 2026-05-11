import PageTransition from "../components/PageTransition.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import Badge from "../components/ui/Badge.jsx";

export default function Settings() {
  return (
    <PageTransition>
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="text-left">
            <h1 className="text-xl font-semibold text-slate-100">Settings</h1>
            <p className="mt-1 text-sm text-slate-300">Theme, preferences, and app configuration.</p>
          </div>

          <GlassCard className="p-5 text-left">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-100">Theme</div>
                <div className="mt-1 text-sm text-slate-300">Toggle dark / light mode.</div>
              </div>
              <ThemeToggle />
            </div>
          </GlassCard>

          <GlassCard className="p-5 text-left">
            <div className="text-sm font-semibold text-slate-100">Roadmap</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="info">Realtime collaboration</Badge>
              <Badge tone="info">Folders</Badge>
              <Badge tone="info">Team workspaces</Badge>
              <Badge tone="info">Backend auth</Badge>
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-4">
          <GlassCard className="p-5 text-left">
            <div className="text-sm font-semibold text-slate-100">Environment</div>
            <div className="mt-2 text-sm text-slate-300">
              Configure `VITE_API_BASE_URL` when connecting a real backend. The UI is designed to remain stable as services evolve.
            </div>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  );
}

