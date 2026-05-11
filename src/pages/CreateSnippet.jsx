import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import Input from "../components/ui/Input.jsx";
import Select from "../components/ui/Select.jsx";
import Button from "../components/ui/Button.jsx";
import CodeEditor from "../components/CodeEditor.jsx";
import SharePanel from "../components/SharePanel.jsx";
import { LANGUAGES, VISIBILITY } from "../utils/constants";
import { useAuth } from "../hooks/useAuth";
import { useSnippets } from "../hooks/useSnippets";

export default function CreateSnippet() {
  const { user } = useAuth();
  const { createSnippet } = useSnippets();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [visibility, setVisibility] = useState(VISIBILITY.PUBLIC);
  const [code, setCode] = useState(`// Start typing…\n\n`);
  const [saving, setSaving] = useState(false);

  const pseudoSnippet = useMemo(
    () => ({
      id: "new",
      ownerId: user?.id || "",
      title: title || "Untitled Snippet",
      language,
      code,
      visibility,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
    [title, language, code, visibility, user?.id],
  );

  return (
    <PageTransition>
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="text-left">
            <h1 className="text-xl font-semibold text-slate-100">Create snippet</h1>
            <p className="mt-1 text-sm text-slate-300">Write code, choose language, set visibility, then share.</p>
          </div>

          <GlassCard className="p-4">
            <div className="grid sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} label="Title" placeholder="e.g. debounce util" />
              </div>
              <div className="sm:col-span-3">
                <Select
                  label="Language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  options={LANGUAGES.map((l) => ({ value: l.id, label: l.label }))}
                />
              </div>
              <div className="sm:col-span-3">
                <Select
                  label="Visibility"
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  options={[
                    { value: VISIBILITY.PUBLIC, label: "Public" },
                    { value: VISIBILITY.PRIVATE, label: "Private" },
                  ]}
                />
              </div>
            </div>
          </GlassCard>

          <CodeEditor language={language} value={code} onChange={setCode} />
        </div>

        <div className="lg:col-span-4 space-y-4">
          <SharePanel
            snippet={pseudoSnippet}
            canEdit={false}
            onEdit={() => {}}
            onDelete={() => {}}
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
                      const snip = await createSnippet({ ownerId: user.id, title, language, code, visibility });
                      navigate(`/snippets/${snip.id}`);
                    } finally {
                      setSaving(false);
                    }
                  }}
                >
                  {saving ? "Saving…" : "Save snippet"}
                </Button>
                <Button variant="secondary" onClick={() => navigate("/dashboard")}>
                  Cancel
                </Button>
              </div>
              <div className="mt-3 text-xs text-slate-400">Tip: public snippets can be shared without signing in.</div>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  );
}

