import { cn } from "../../utils/cn";

export default function GlassCard({ className, children }) {
  return <div className={cn("glass rounded-2xl shadow-glow", className)}>{children}</div>;
}

