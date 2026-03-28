"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertCircle, Eye, EyeOff, Triangle, Check, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignupForm() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? "starter";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email) errs.email = "Email is required";
    if (!form.password || form.password.length < 8) errs.password = "Minimum 8 characters";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    window.location.href = "/dashboard";
  };

  const planLabels: Record<string, string> = { starter: "Starter (Free)", pro: "Pro — $29/mo" };

  return (
    <main className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
            <Triangle size={13} className="fill-white text-white" />
          </div>
          <span className="font-bold gradient-text-cyan">Nexus AI</span>
        </Link>
        <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Already have an account? <span className="text-cyan-400">Sign in</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-1">Create your account</h1>
            <p className="text-muted-foreground text-sm">
              Plan: <span className="text-cyan-400 font-medium">{planLabels[plan] ?? "Starter (Free)"}</span>
            </p>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 h-10 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" /></svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 h-10 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                GitHub
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: "name", label: "Full Name", type: "text", placeholder: "Alex Johnson" },
                { name: "email", label: "Work Email", type: "email", placeholder: "you@company.com" },
              ].map((f) => (
                <div key={f.name} className="space-y-1.5">
                  <label className="text-sm font-medium">{f.label}</label>
                  <input name={f.name} type={f.type} value={(form as Record<string, string>)[f.name]} onChange={handleChange} placeholder={f.placeholder}
                    className={`w-full bg-white/5 border ${errors[f.name] ? "border-red-500/50" : "border-white/10 focus:border-cyan-500/50"} rounded-xl px-4 py-2.5 text-sm outline-none transition-colors`} />
                  {errors[f.name] && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} />{errors[f.name]}</p>}
                </div>
              ))}

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <input name="password" type={showPw ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="Min. 8 characters"
                    className={`w-full bg-white/5 border ${errors.password ? "border-red-500/50" : "border-white/10 focus:border-cyan-500/50"} rounded-xl px-4 py-2.5 text-sm outline-none transition-colors pr-10`} />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} />{errors.password}</p>}
              </div>

              <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold gap-2">
                {loading ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <><Zap size={15} />Create account</>}
              </Button>
            </form>

            <div className="space-y-2 pt-2 border-t border-white/5">
              {["14-day free trial, no credit card", "Cancel anytime", "Full Pro access during trial"].map((t) => (
                <p key={t} className="text-xs text-muted-foreground flex items-center gap-2"><Check size={11} className="text-emerald-400 flex-shrink-0" />{t}</p>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By signing up you agree to our{" "}
            <Link href="#" className="text-cyan-400 hover:underline">Terms</Link> and{" "}
            <Link href="#" className="text-cyan-400 hover:underline">Privacy Policy</Link>.
          </p>
        </motion.div>
      </div>
    </main>
  );
}

export default function SignupPage() {
  return <Suspense><SignupForm /></Suspense>;
}
