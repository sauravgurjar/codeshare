import { Component } from "react";
import { FiAlertTriangle } from "react-icons/fi";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch() {}

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="min-h-screen bg-app flex items-center justify-center p-6">
        <div className="glass rounded-2xl p-6 max-w-lg w-full shadow-glow">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-rose-300">
              <FiAlertTriangle className="h-6 w-6" />
            </div>
            <div className="text-left">
              <h1 className="text-lg font-semibold text-slate-100">Something went wrong</h1>
              <p className="mt-1 text-sm text-slate-300">
                {this.state.error?.message || "Unexpected UI error."}
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2 text-sm"
                onClick={() => window.location.reload()}
              >
                Reload
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

