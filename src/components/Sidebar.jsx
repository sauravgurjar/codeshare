import { NavLink } from "react-router-dom";
import { FiCode, FiHome, FiPlusSquare, FiSettings, FiUser } from "react-icons/fi";
import { cn } from "../utils/cn";

const linkClass = ({ isActive }) =>
  cn(
    "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition",
    isActive ? "bg-white/10 text-slate-100" : "text-slate-300 hover:bg-white/5 hover:text-slate-100",
  );

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="h-full flex flex-col gap-3 p-3">
      <div className="glass rounded-2xl p-3">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-400/80 to-emerald-400/70 flex items-center justify-center">
            <FiCode className="h-5 w-5 text-slate-950" />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-slate-100">Workspace</div>
            <div className="text-[11px] text-slate-400">Your snippets</div>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-2">
        <nav className="flex flex-col gap-1">
          <NavLink to="/dashboard" className={linkClass} onClick={onNavigate}>
            <FiHome className="h-4 w-4" /> Dashboard
          </NavLink>
          <NavLink to="/snippets/new" className={linkClass} onClick={onNavigate}>
            <FiPlusSquare className="h-4 w-4" /> Create Snippet
          </NavLink>
          <NavLink to="/profile" className={linkClass} onClick={onNavigate}>
            <FiUser className="h-4 w-4" /> Profile
          </NavLink>
          <NavLink to="/settings" className={linkClass} onClick={onNavigate}>
            <FiSettings className="h-4 w-4" /> Settings
          </NavLink>
        </nav>
      </div>

      <div className="mt-auto glass rounded-2xl p-3 text-left">
        <div className="text-xs text-slate-300">Tip</div>
        <div className="mt-1 text-xs text-slate-400">
          Use <span className="text-slate-200">public</span> visibility for shareable URLs.
        </div>
      </div>
    </aside>
  );
}

