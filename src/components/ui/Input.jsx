import { cn } from "../../utils/cn";

export default function Input({ className, label, hint, error, ...props }) {
  return (
    <label className="block text-left">
      {label ? <div className="mb-1.5 text-xs font-medium text-slate-300">{label}</div> : null}
      <input
        className={cn(
          "w-full rounded-xl border bg-white/5 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-400 outline-none transition",
          "border-white/10 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/20",
          "dark:bg-white/5",
          error ? "border-rose-400/50 focus:border-rose-400/60 focus:ring-rose-400/20" : "",
          className,
        )}
        {...props}
      />
      {error ? <div className="mt-1.5 text-xs text-rose-300">{error}</div> : null}
      {!error && hint ? <div className="mt-1.5 text-xs text-slate-400">{hint}</div> : null}
    </label>
  );
}

