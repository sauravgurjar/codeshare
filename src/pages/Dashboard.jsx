import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import Button from "../components/ui/Button.jsx";
import SearchBar from "../components/SearchBar.jsx";
import LanguageFilter from "../components/LanguageFilter.jsx";
import { Skeleton } from "../components/ui/Skeleton.jsx";
import SnippetCard from "../components/SnippetCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Select from "../components/ui/Select.jsx";
import { useAuth } from "../hooks/useAuth";
import { useSnippets } from "../hooks/useSnippets";

export default function Dashboard() {
  const { user } = useAuth();
  const { snippets, loading, error, load, search } = useSnippets();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [visibility, setVisibility] = useState("all");

  useEffect(() => {
    if (!user?.id) return;
    load({ ownerId: user.id });
  }, [user?.id, load]);

  useEffect(() => {
    if (!user?.id) return;
    const t = setTimeout(() => {
      search({ ownerId: user.id, query, language, visibility });
    }, 200);
    return () => clearTimeout(t);
  }, [query, language, visibility, user?.id, search]);

  const recent = useMemo(() => snippets.slice(0, 5), [snippets]);

  return (
    <PageTransition>
      <div className="grid xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-left">
              <h1 className="text-xl font-semibold text-slate-100">Dashboard</h1>
              <p className="mt-1 text-sm text-slate-300">Search, filter and manage your snippets.</p>
            </div>
            <Button as={Link} to="/snippets/new" className="sm:self-start">
              Create snippet
            </Button>
          </div>

          <GlassCard className="mt-5 p-4">
            <div className="grid md:grid-cols-12 gap-3">
              <div className="md:col-span-6">
                <SearchBar value={query} onChange={setQuery} />
              </div>
              <div className="md:col-span-3">
                <LanguageFilter value={language} onChange={setLanguage} />
              </div>
              <div className="md:col-span-3">
                <Select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  options={[
                    { value: "all", label: "All visibility" },
                    { value: "public", label: "Public" },
                    { value: "private", label: "Private" },
                  ]}
                />
              </div>
            </div>
          </GlassCard>

          <div className="mt-5">
            {error ? (
              <EmptyState title="Couldn’t load snippets" description={error} />
            ) : loading ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-28" />
                ))}
              </div>
            ) : snippets.length === 0 ? (
              <EmptyState
                title="No snippets found"
                description="Create your first snippet, or adjust your search and filters."
                actionLabel="Create snippet"
                onAction={() => navigate("/snippets/new")}
              />
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {snippets.map((s) => (
                  <SnippetCard key={s.id} snippet={s} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="xl:col-span-4">
          <GlassCard className="p-4">
            <div className="text-left">
              <div className="text-sm font-semibold text-slate-100">Recent snippets</div>
              <div className="mt-1 text-sm text-slate-300">Quick access to your latest updates.</div>
            </div>
            <div className="mt-4 space-y-3">
              {loading ? (
                <>
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </>
              ) : recent.length ? (
                recent.map((s) => (
                  <a
                    key={s.id}
                    href={`/snippets/${s.id}`}
                    className="block rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-3 text-left"
                  >
                    <div className="truncate text-sm text-slate-100 font-medium">{s.title}</div>
                    <div className="mt-1 text-xs text-slate-400">{s.language}</div>
                  </a>
                ))
              ) : (
                <div className="text-sm text-slate-400">No recent snippets yet.</div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  );
}
