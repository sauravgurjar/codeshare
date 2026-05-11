import { FiSearch } from "react-icons/fi";
import { cn } from "../utils/cn";

export default function SearchBar({ value, onChange, placeholder = "Search snippets…" }) {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-400 outline-none transition",
          "focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/20",
        )}
      />
    </div>
  );
}

