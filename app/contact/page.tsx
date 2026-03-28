"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/ui/vercel-navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import {
  Mail, MessageSquare, Building2, Send, CheckCircle,
  AlertCircle, MapPin, Clock, Zap,
} from "lucide-react";

const subjects = [
  "General Inquiry",
  "Sales & Pricing",
  "Technical Support",
  "Enterprise Plans",
  "Partnership",
  "Press & Media",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 20) e.message = "Message must be at least 20 characters";
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setServerMsg(data.message);
        setForm({ name: "", email: "", company: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setServerMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setServerMsg("Network error. Please try again.");
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <section className="relative flex-1 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-muted-foreground mb-6 border border-cyan-500/20">
              <MessageSquare size={14} className="text-cyan-400" />
              We respond within 24 hours
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="gradient-text-cyan">Get in</span>{" "}
              <span className="gradient-text">touch</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Have a question, want a demo, or ready to scale? Our team is ready to help.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Info cards */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {[
                { icon: Mail, title: "Email us", value: "hello@nexusai.dev", sub: "We reply within 24h", color: "text-cyan-400", bg: "bg-cyan-500/10" },
                { icon: Clock, title: "Response time", value: "< 2 hours", sub: "For Pro & Enterprise", color: "text-purple-400", bg: "bg-purple-500/10" },
                { icon: Building2, title: "Enterprise sales", value: "sales@nexusai.dev", sub: "Custom contracts & SLAs", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                { icon: MapPin, title: "Headquarters", value: "San Francisco, CA", sub: "Remote-first team", color: "text-amber-400", bg: "bg-amber-500/10" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="glass rounded-2xl p-5 border border-white/5 flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bg}`}>
                      <Icon size={18} className={item.color} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">{item.title}</p>
                      <p className="text-sm font-semibold text-foreground">{item.value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                );
              })}

              <div className="glass rounded-2xl p-5 border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={16} className="text-cyan-400" />
                  <span className="text-sm font-semibold">Need a demo?</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">See Nexus AI in action with a personalized walkthrough for your team.</p>
                <Button asChild size="sm" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl">
                  <Link href="/signup">Book a Demo</Link>
                </Button>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="glass rounded-2xl p-6 md:p-8 border border-white/5">
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle size={32} className="text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Message sent!</h3>
                    <p className="text-muted-foreground mb-6">{serverMsg}</p>
                    <Button onClick={() => setStatus("idle")} variant="outline" className="border-white/10">Send another message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField label="Name *" error={errors.name}>
                        <input
                          name="name" value={form.name} onChange={handleChange}
                          placeholder="Alex Johnson"
                          className={inputCls(!!errors.name)}
                        />
                      </FormField>
                      <FormField label="Work Email *" error={errors.email}>
                        <input
                          name="email" type="email" value={form.email} onChange={handleChange}
                          placeholder="alex@company.com"
                          className={inputCls(!!errors.email)}
                        />
                      </FormField>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField label="Company" error={errors.company}>
                        <input
                          name="company" value={form.company} onChange={handleChange}
                          placeholder="Acme Inc."
                          className={inputCls(false)}
                        />
                      </FormField>
                      <FormField label="Subject" error={errors.subject}>
                        <select
                          name="subject" value={form.subject} onChange={handleChange}
                          className={inputCls(false) + " appearance-none"}
                        >
                          <option value="">Select a subject...</option>
                          {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </FormField>
                    </div>

                    <FormField label="Message *" error={errors.message}>
                      <textarea
                        name="message" value={form.message} onChange={handleChange}
                        placeholder="Tell us about your AI infrastructure needs, team size, or any questions you have..."
                        rows={6}
                        className={inputCls(!!errors.message) + " resize-none"}
                      />
                    </FormField>

                    {status === "error" && (
                      <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                        <AlertCircle size={15} />
                        {serverMsg}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full h-12 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-all gap-2"
                    >
                      {status === "loading" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting, you agree to our{" "}
                      <Link href="#" className="text-cyan-400 hover:underline">Privacy Policy</Link>{" "}
                      and{" "}
                      <Link href="#" className="text-cyan-400 hover:underline">Terms of Service</Link>.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

const inputCls = (hasError: boolean) =>
  `w-full bg-white/5 border ${hasError ? "border-red-500/50 focus:border-red-400" : "border-white/10 focus:border-cyan-500/50"} rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors`;
