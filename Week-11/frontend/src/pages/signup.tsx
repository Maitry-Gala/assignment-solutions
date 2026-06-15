import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../auth";
import { Zap, EyeOff, Eye } from "lucide-react";
import { Alert } from "../components/alert";
import { Input } from "../components/input";
import { Button } from "../components/Button";

export function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", firstName: "", lastName: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signup(form);
      navigate("/signin", { state: { registered: true } });
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-3">
      <div className="flex w-full overflow-hidden rounded-2xl shadow-lg m-30">

        {/* Left — black box placeholder for AI image */}
        <div className="hidden md:flex w-1/2 bg-black items-center justify-center">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9M1gygyd9xoiP__8PiKPqeS2rsAXSW-WJfxrY6VVHdw9y_omnDmvJ&usqp=CAE&s" className="w-full h-150 " alt="home" />
        </div>

        {/* Right — signup form */}
        <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center">

          {/* Brand */}
          <div className="mb-7 flex flex-col items-center gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-sm">
              <Zap size={20} strokeWidth={2.5} />
            </span>
            <p className="text-xs font-bold tracking-[0.2em] text-blue-500 uppercase">EasyPay</p>
            <h1 className="text-xl font-semibold text-slate-800">Create your account</h1>
            <p className="text-sm text-slate-400">Fast, secure peer payments</p>
          </div>

          {error && (
            <div className="mb-4">
              <Alert variant="error" message={error} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label="First name" placeholder="Jane"  value={form.firstName} onChange={set("firstName")} autoComplete="given-name"  required />
              <Input label="Last name"  placeholder="Doe"   value={form.lastName}  onChange={set("lastName")}  autoComplete="family-name" required />
            </div>

            <Input
              label="Email"
              type="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={set("email")}
              autoComplete="email"
              required
            />

            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Min 6 chars, 1 uppercase, 1 symbol"
              value={form.password}
              onChange={set("password")}
              autoComplete="new-password"
              hint="6–8 chars · uppercase · lowercase · symbol (@!$%*?&)"
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-slate-400 hover:text-slate-700 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
              required
            />

            <Button type="submit" loading={loading} size="lg" className="mt-1 w-full">
              Create account
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/signin" className="font-semibold text-blue-500 hover:text-blue-600 hover:underline transition-colors">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}