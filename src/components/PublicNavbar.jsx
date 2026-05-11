import { Link } from "react-router-dom";
import { FiCode, FiLogIn } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import Button from "./ui/Button";

export default function PublicNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/35 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-400/80 to-emerald-400/70 flex items-center justify-center shadow-glow">
              <FiCode className="h-5 w-5 text-slate-950" />
            </div>
            <div className="text-left leading-tight">
              <div className="text-sm font-semibold text-slate-100">CodeShare</div>
              <div className="text-[11px] text-slate-400">VS Code × Pastebin</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <a className="text-sm text-slate-300 hover:text-slate-100 transition" href="#features">
              Features
            </a>
            <a className="text-sm text-slate-300 hover:text-slate-100 transition" href="#testimonials">
              Testimonials
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button as={Link} to="/login" size="sm" variant="primary">
              <FiLogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
