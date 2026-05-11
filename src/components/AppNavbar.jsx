import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiPlus, FiUser } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import Button from "./ui/Button";
import { useAuth } from "../hooks/useAuth";

export default function AppNavbar({ onOpenSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/35 backdrop-blur-xl">
      <div className="px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="md:hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 hover:bg-white/10 transition"
              onClick={onOpenSidebar}
              aria-label="Open sidebar"
            >
              Menu
            </button>
            <Link to="/dashboard" className="text-sm font-semibold text-slate-100">
              CodeShare
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button as={Link} to="/snippets/new" size="sm" variant="primary" className="hidden sm:inline-flex">
              <FiPlus className="h-4 w-4" />
              New
            </Button>
            <ThemeToggle />
            <Button as={Link} to="/profile" size="sm" variant="secondary">
              <FiUser className="h-4 w-4" />
              <span className="hidden sm:inline">{user?.name?.split(" ")?.[0] || "Profile"}</span>
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={async () => {
                await logout();
                navigate("/");
              }}
            >
              <FiLogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

