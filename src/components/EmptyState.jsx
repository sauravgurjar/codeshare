import { FiInbox } from "react-icons/fi";
import Button from "./ui/Button";

export default function EmptyState({ title = "Nothing here yet", description, actionLabel, onAction }) {
  return (
    <div className="glass rounded-2xl p-6 text-left">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-slate-300">
          <FiInbox className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-slate-100">{title}</div>
          {description ? <div className="mt-1 text-sm text-slate-300">{description}</div> : null}
          {actionLabel && onAction ? (
            <div className="mt-4">
              <Button variant="primary" onClick={onAction}>
                {actionLabel}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

