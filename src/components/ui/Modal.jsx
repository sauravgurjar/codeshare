import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";
import Button from "./Button";

export default function Modal({ open, title, description, confirmText = "Confirm", danger, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className={cn("relative w-full max-w-md rounded-2xl border shadow-glow", danger ? "border-rose-400/30" : "border-white/10")}
          >
            <div className="glass rounded-2xl p-5">
              <div className="text-left">
                <div className="text-base font-semibold text-slate-100">{title}</div>
                {description ? <div className="mt-1 text-sm text-slate-300">{description}</div> : null}
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant={danger ? "danger" : "primary"} onClick={onConfirm}>
                  {confirmText}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

