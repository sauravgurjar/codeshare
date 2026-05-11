import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageTransition from "../components/PageTransition.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import Input from "../components/ui/Input.jsx";
import Select from "../components/ui/Select.jsx";
import Button from "../components/ui/Button.jsx";
import CodeEditor from "../components/CodeEditor.jsx";
import SharePanel from "../components/SharePanel.jsx";
import Modal from "../components/ui/Modal.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { LANGUAGES, VISIBILITY } from "../utils/constants";
import { useAuth } from "../hooks/useAuth";
import { snippetService } from "../services/snippetService";

export default function EditSnippet() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [saving, setSaving] = useState(false);

  const canEdit = useMemo(() => Boolean(snippet && user?.id && snippet.ownerId === user.id), [snippet, user?.id]);

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

  if (loading) {
    return (
      <PageTransition>
        <EmptyState title="Loading…" description="Fetching snippet" />
      </PageTransition>
    );
  }

  if (error || !snippet) {
    return (
      <PageTransition>
        <EmptyState title="Snippet not found" description={error || "Missing snippet"} actionLabel="Back" onAction={() => navigate("/dashboard")} />
      </PageTransition>
    );
  }

  if (!canEdit) {
    return (
      <PageTransition>
        <EmptyState title="No access" description="You don’t have permission to edit this snippet." actionLabel="Back" onAction={() => navigate("/dashboard")} />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="text-left">
            <h1 className="text-xl font-semibold text-slate-100">Edit snippet</h1>
            <p className="mt-1 text-sm text-slate-300">Update code and metadata, then save.</p>
          </div>

          <GlassCard className="p-4">
            <div className="grid sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6">
                <Input
                  value={snippet.title}
                  onChange={(e) => setSnippet((s) => ({ ...s, title: e.target.value }))}
                  label="Title"
                  placeholder="e.g. debounce util"
                />
              </div>
              <div className="sm:col-span-3">
                <Select
                  label="Language"
                  value={snippet.language}
                  onChange={(e) => setSnippet((s) => ({ ...s, language: e.target.value }))}
                  options={LANGUAGES.map((l) => ({ value: l.id, label: l.label }))}
                />
              </div>
              <div className="sm:col-span-3">
                <Select
                  label="Visibility"
                  value={snippet.visibility}
                  onChange={(e) => setSnippet((s) => ({ ...s, visibility: e.target.value }))}
                  options={[
                    { value: VISIBILITY.PUBLIC, label: "Public" },
                    { value: VISIBILITY.PRIVATE, label: "Private" },
                  ]}
                />
              </div>
            </div>
          </GlassCard>

          <CodeEditor
            language={snippet.language}
            value={snippet.code}
            onChange={(v) => setSnippet((s) => ({ ...s, code: v }))}
          />
        </div>

        <div className="lg:col-span-4 space-y-4">
          <SharePanel
            snippet={snippet}
            canEdit
            onEdit={() => {}}
            onDelete={() => setConfirmDelete(true)}
          />

          <GlassCard className="p-4">
            <div className="text-left">
              <div className="text-sm font-semibold text-slate-100">Actions</div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  disabled={saving}
                  onClick={async () => {
                    setSaving(true);
                    try {
                      const updated = await snippetService.update(snippet.id, {
                        title: snippet.title,
                        language: snippet.language,
                        visibility: snippet.visibility,
                        code: snippet.code,
                      });
                      navigate(`/snippets/${updated.id}`);
                    } finally {
                      setSaving(false);
                    }
                  }}
                >
                  {saving ? "Saving…" : "Save changes"}
                </Button>
                <Button variant="secondary" onClick={() => navigate(`/snippets/${snippet.id}`)}>
                  Cancel
                </Button>
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
          navigate("/dashboard");
        }}
      />
    </PageTransition>
  );
}

