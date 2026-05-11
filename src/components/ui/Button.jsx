import { cn } from "../../utils/cn";

export default function Button({
  as: Comp = "button",
  className,
  variant = "primary",
  size = "md",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-indigo-500/90 hover:bg-indigo-500 text-white shadow-glow",
    secondary: "bg-white/10 hover:bg-white/15 text-slate-100 border border-white/10",
    ghost: "hover:bg-white/10 text-slate-100",
    danger: "bg-rose-500/90 hover:bg-rose-500 text-white",
  };

  const sizes = {
    sm: "text-sm px-3 py-2",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-5 py-3",
  };

  return <Comp className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

