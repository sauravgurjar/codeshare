import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageTransition from "../../components/PageTransition.jsx";
import GlassCard from "../../components/ui/GlassCard.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/dashboard";

  const [email, setEmail] = useState("demo@codeshare.dev");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <PageTransition>
      <GlassCard className="p-6">
        <div className="text-left">
          <h1 className="text-xl font-semibold text-slate-100">Login</h1>
          <p className="mt-1 text-sm text-slate-300">Welcome back. Use the demo credentials prefilled.</p>
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError("");
            try {
              await login({ email, password });
              navigate(redirectTo, { replace: true });
            } catch (err) {
              setError(err?.message || "Login failed");
            } finally {
              setLoading(false);
            }
          }}
        >
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          {error ? <div className="text-left text-sm text-rose-300">{error}</div> : null}
          <Button disabled={loading} className="w-full">
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <Link className="text-slate-300 hover:text-slate-100 transition" to="/forgot-password">
            Forgot password?
          </Link>
          <Link className="text-slate-300 hover:text-slate-100 transition" to="/register">
            Create account
          </Link>
        </div>
      </GlassCard>
    </PageTransition>
  );
}

