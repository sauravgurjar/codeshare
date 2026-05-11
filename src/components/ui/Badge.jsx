import { cn } from "../../utils/cn";

export default function Badge({ className, tone = "neutral", children }) {
  const tones = {
    neutral: "bg-white/10 text-slate-200 border-white/10",
    success: "bg-emerald-500/15 text-emerald-200 border-emerald-400/20",
    info: "bg-indigo-500/15 text-indigo-200 border-indigo-400/20",
    danger: "bg-rose-500/15 text-rose-200 border-rose-400/20",
  };

  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs", tones[tone], className)}>
      {children}
    </span>
  );
}

