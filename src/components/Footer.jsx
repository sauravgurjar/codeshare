export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/25 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row gap-2 items-center justify-between">
        <div className="text-xs text-slate-400">© {new Date().getFullYear()} CodeShare. Built with React + Vite.</div>
        <div className="text-xs text-slate-400">Fast sharing. Clean snippets. Beautiful UI.</div>
      </div>
    </footer>
  );
}

