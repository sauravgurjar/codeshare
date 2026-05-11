import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClock, FiLock, FiShare2 } from "react-icons/fi";
import Badge from "./ui/Badge";
import { formatDateTime } from "../utils/format";
import { mockDb } from "../utils/mockDb";

export default function SnippetCard({ snippet }) {
  const isPrivate = snippet.visibility === "private";

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 240, damping: 18 }}>
      <Link to={`/snippets/${snippet.id}`} className="block glass rounded-2xl p-4 hover:bg-white/[0.07] transition">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 text-left">
            <div className="truncate text-sm font-semibold text-slate-100">{snippet.title}</div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge tone="info">{mockDb.findLanguageLabel(snippet.language)}</Badge>
              <Badge tone={isPrivate ? "danger" : "success"}>{isPrivate ? "Private" : "Public"}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            {isPrivate ? <FiLock className="h-4 w-4" /> : <FiShare2 className="h-4 w-4" />}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
          <FiClock className="h-3.5 w-3.5" />
          Updated {formatDateTime(snippet.updatedAt)}
        </div>
      </Link>
    </motion.div>
  );
}

