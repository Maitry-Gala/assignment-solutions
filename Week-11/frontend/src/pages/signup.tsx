import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../auth";
import { Zap } from "lucide-react";

export function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signup(form);
      navigate("/signin", { state: { registered: true } });
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Something went wrong";
      setError(msg);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50 p-4">
        <div className="w-full max-w-sm">
            EasyPay
            <div className="mb-8 flex flex-col items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-white shadow-sm ">
                    <Zap size={22} strokeWidth={2.5}/>
                </span>
                <div className="text-center">
                    <h1 className="text-xl font-semibold text-ink-900">Create your account</h1>
                    <p className="mt-0.5 text-sm text-ink-500">Fast, secure peer payments</p>
                </div>
            </div>

            <div>
                hi 
            </div>
        </div>
    </div>
  );
}
