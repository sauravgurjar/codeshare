import PageTransition from "../components/PageTransition.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import Badge from "../components/ui/Badge.jsx";
import { useAuth } from "../hooks/useAuth";
import { useSnippets } from "../hooks/useSnippets";

export default function Profile() {
  const { user } = useAuth();
  const { snippets } = useSnippets();

  return (
    <PageTransition>
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="text-left">
            <h1 className="text-xl font-semibold text-slate-100">Profile</h1>
            <p className="mt-1 text-sm text-slate-300">Your account overview (mock).</p>
          </div>

          <GlassCard className="p-5">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-400/80 to-emerald-400/70" />
              <div className="flex-1 text-left">
                <div className="text-base font-semibold text-slate-100">{user?.name}</div>
                <div className="mt-1 text-sm text-slate-300">{user?.email}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge tone="info">Member</Badge>
                  <Badge tone="success">{snippets.length} snippets</Badge>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-4">
          <GlassCard className="p-5 text-left">
            <div className="text-sm font-semibold text-slate-100">Demo note</div>
            <div className="mt-2 text-sm text-slate-300">
              This app uses a localStorage-backed mock database. Replace services in `src/services/` with real API calls when your backend is ready.
            </div>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  );
}

