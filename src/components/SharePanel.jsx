import { FiCopy, FiExternalLink, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import { mockDb } from "../utils/mockDb";

export default function SharePanel({ snippet, canEdit, onDelete, onEdit }) {
  const shareUrl = `${window.location.origin}/snippets/${snippet.id}`;

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
    } catch {
      toast.error("Copy failed");
    }
  }

  return (
    <div className="glass rounded-2xl p-4 text-left">
      <div className="text-sm font-semibold text-slate-100">Share & Details</div>
      <div className="mt-2 flex flex-wrap gap-2">
        <Badge tone="info">{mockDb.findLanguageLabel(snippet.language)}</Badge>
        <Badge tone={snippet.visibility === "private" ? "danger" : "success"}>{snippet.visibility}</Badge>
      </div>

      <div className="mt-4">
        <div className="text-xs font-medium text-slate-300">Unique URL</div>
        <div className="mt-2 flex gap-2">
          <input
            value={shareUrl}
            readOnly
            className="flex-1 min-w-0 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-slate-100 outline-none"
          />
          <Button variant="secondary" size="sm" onClick={() => copy(shareUrl)} aria-label="Copy URL">
            <FiCopy className="h-4 w-4" />
          </Button>
          <Button as="a" href={shareUrl} target="_blank" rel="noreferrer" variant="secondary" size="sm" aria-label="Open">
            <FiExternalLink className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-slate-400">
          Public snippets are shareable. Private snippets require authentication (mock).
        </div>
      </div>

      {canEdit ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="primary" size="sm" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={onDelete}>
            <FiTrash2 className="h-4 w-4" /> Delete
          </Button>
          <Button variant="secondary" size="sm" onClick={() => copy(snippet.code)}>
            <FiCopy className="h-4 w-4" /> Copy Code
          </Button>
        </div>
      ) : (
        <div className="mt-4">
          <Button variant="secondary" size="sm" onClick={() => copy(snippet.code)}>
            <FiCopy className="h-4 w-4" /> Copy Code
          </Button>
        </div>
      )}
    </div>
  );
}

