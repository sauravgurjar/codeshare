import { cn } from "../../utils/cn";

export default function Select({ className, label, options, ...props }) {
  return (
    <label className="block text-left">
      {label ? <div className="mb-1.5 text-xs font-medium text-slate-300">{label}</div> : null}
      <select
        className={cn(
          "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-100 outline-none transition",
          "focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/20",
          className,
        )}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

