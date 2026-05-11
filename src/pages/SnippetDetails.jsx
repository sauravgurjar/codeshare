import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import PageTransition from "../components/PageTransition.jsx";
import CodeEditor from "../components/CodeEditor.jsx";
import SharePanel from "../components/SharePanel.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import Button from "../components/ui/Button.jsx";
import Modal from "../components/ui/Modal.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { Skeleton } from "../components/ui/Skeleton.jsx";
import { useAuth } from "../hooks/useAuth";
import { snippetService } from "../services/snippetService";
import { mockDb } from "../utils/mockDb";

export default function SnippetDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function run() {
      setLoading(true);
      setError("");
      try {
        const snip = await snippetService.getById(id);
        if (!mounted) return;
        setSnippet(snip);
      } catch (e) {
        if (!mounted) return;
        setError(e?.message || "Failed to load snippet");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    run();
    return () => {
      mounted = false;
    };
  }, [id]);

  const canEdit = useMemo(() => Boolean(snippet && user?.id && snippet.ownerId === user.id), [snippet, user?.id]);
  const canView = useMemo(() => {
    if (!snippet) return false;
    if (snippet.visibility === "public") return true;
    return canEdit;
  }, [snippet, canEdit]);

  if (loading) {
    return (
      <PageTransition>
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <Skeleton className="h-[420px]" />
          </div>
          <div className="lg:col-span-4">
            <Skeleton className="h-64" />
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <EmptyState title="Snippet not found" description={error} actionLabel="Back to home" onAction={() => navigate("/")} />
      </PageTransition>
    );
  }

  if (!snippet || !canView) {
    return (
      <PageTransition>
        <EmptyState
          title="Private snippet"
          description="This snippet is private. Sign in as the owner to view it."
          actionLabel="Login"
          onAction={() => navigate("/login")}
        />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-left">
              <h1 className="text-xl font-semibold text-slate-100">{snippet.title}</h1>
              <p className="mt-1 text-sm text-slate-300">{mockDb.findLanguageLabel(snippet.language)}</p>
            </div>
            <div className="flex items-center gap-2">
              {canEdit ? (
                <Button as={Link} to={`/snippets/${snippet.id}/edit`} variant="secondary" size="sm">
                  Edit
                </Button>
              ) : null}
              <Button
                variant="secondary"
                size="sm"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(snippet.code);
                    toast.success("Code copied");
                  } catch {
                    toast.error("Copy failed");
                  }
                }}
              >
                Copy
              </Button>
            </div>
          </div>

          <div className="mt-5">
            <CodeEditor language={snippet.language} value={snippet.code} readOnly />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <SharePanel
            snippet={snippet}
            canEdit={canEdit}
            onEdit={() => navigate(`/snippets/${snippet.id}/edit`)}
            onDelete={() => setConfirmDelete(true)}
          />

          <GlassCard className="p-4">
            <div className="text-left">
              <div className="text-sm font-semibold text-slate-100">About</div>
              <div className="mt-2 text-sm text-slate-300">
                This is a mock frontend snippet details view with unique URL sharing, copy button, and syntax highlighting.
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <Modal
        open={confirmDelete}
        title="Delete snippet?"
        description="This action cannot be undone."
        danger
        confirmText="Delete"
        onClose={() => setConfirmDelete(false)}
        onConfirm={async () => {
          setConfirmDelete(false);
          await snippetService.remove(snippet.id);
          toast("Snippet deleted");
          navigate("/dashboard");
        }}
      />
    </PageTransition>
  );
}

