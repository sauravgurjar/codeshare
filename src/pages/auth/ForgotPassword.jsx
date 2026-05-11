import { useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "../../components/PageTransition.jsx";
import GlassCard from "../../components/ui/GlassCard.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import { useAuth } from "../../hooks/useAuth";

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <PageTransition>
      <GlassCard className="p-6">
        <div className="text-left">
          <h1 className="text-xl font-semibold text-slate-100">Forgot password</h1>
          <p className="mt-1 text-sm text-slate-300">We’ll send a reset link (mock).</p>
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError("");
            try {
              await forgotPassword({ email });
              setEmail("");
            } catch (err) {
              setError(err?.message || "Request failed");
            } finally {
              setLoading(false);
            }
          }}
        >
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="demo@codeshare.dev" required />
          {error ? <div className="text-left text-sm text-rose-300">{error}</div> : null}
          <Button disabled={loading} className="w-full">
            {loading ? "Sending…" : "Send reset link"}
          </Button>
        </form>

        <div className="mt-4 text-sm text-left text-slate-300">
          <Link className="text-slate-100 hover:underline" to="/login">
            Back to login
          </Link>
        </div>
      </GlassCard>
    </PageTransition>
  );
}

