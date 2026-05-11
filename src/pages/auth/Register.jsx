import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageTransition from "../../components/PageTransition.jsx";
import GlassCard from "../../components/ui/GlassCard.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <PageTransition>
      <GlassCard className="p-6">
        <div className="text-left">
          <h1 className="text-xl font-semibold text-slate-100">Create account</h1>
          <p className="mt-1 text-sm text-slate-300">Start building your snippet library.</p>
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError("");
            try {
              await register({ name, email, password });
              navigate("/dashboard");
            } catch (err) {
              setError(err?.message || "Registration failed");
            } finally {
              setLoading(false);
            }
          }}
        >
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Developer" required />
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@dev.com" required />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 6 chars" required />
          {error ? <div className="text-left text-sm text-rose-300">{error}</div> : null}
          <Button disabled={loading} className="w-full">
            {loading ? "Creating…" : "Create account"}
          </Button>
        </form>

        <div className="mt-4 text-sm text-left text-slate-300">
          Already have an account?{" "}
          <Link className="text-slate-100 hover:underline" to="/login">
            Login
          </Link>
        </div>
      </GlassCard>
    </PageTransition>
  );
}

