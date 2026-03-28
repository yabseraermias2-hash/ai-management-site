"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/ui/vercel-navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Check, X as XIcon, Sparkles, Zap, Shield, HelpCircle, ChevronDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const plans = [
  {
    name: "Starter",
    monthly: 0,
    annual: 0,
    description: "For individuals and experiments.",
    cta: "Start for free",
    href: "/signup",
    popular: false,
    color: "border-white/10",
    features: ["3 AI models", "1M tokens/mo", "Basic dashboard", "REST API", "Community support"],
  },
  {
    name: "Pro",
    monthly: 29,
    annual: 19,
    description: "For teams shipping production AI.",
    cta: "Start free trial",
    href: "/signup?plan=pro",
    popular: true,
    color: "border-cyan-500/40",
    features: ["Unlimited models", "50M tokens/mo", "Advanced analytics", "Agent orchestration", "Priority support", "Webhooks", "Team seats (5)", "99.9% SLA"],
  },
  {
    name: "Enterprise",
    monthly: 99,
    annual: 66,
    description: "Mission-critical AI workloads.",
    cta: "Contact sales",
    href: "/contact",
    popular: false,
    color: "border-purple-500/30",
    features: ["Everything in Pro", "Unlimited tokens", "Dedicated infra", "Custom SLA", "SOC 2 Type II", "On-premise option", "SAML SSO", "24/7 support"],
  },
];

const comparison = [
  {
    category: "Models & Inference",
    rows: [
      { feature: "AI models supported", starter: "3", pro: "Unlimited", enterprise: "Unlimited" },
      { feature: "Tokens per month", starter: "1M", pro: "50M", enterprise: "Unlimited" },
      { feature: "Custom model registry", starter: false, pro: true, enterprise: true },
      { feature: "Edge inference locations", starter: "2", pro: "40+", enterprise: "40+ custom" },
      { feature: "Model fallback & routing", starter: false, pro: true, enterprise: true },
    ],
  },
  {
    category: "Observability",
    rows: [
      { feature: "Real-time dashboard", starter: true, pro: true, enterprise: true },
      { feature: "Request tracing", starter: "7 days", pro: "90 days", enterprise: "1 year" },
      { feature: "Anomaly detection", starter: false, pro: true, enterprise: true },
      { feature: "Custom metrics & alerts", starter: false, pro: true, enterprise: true },
    ],
  },
  {
    category: "Security & Compliance",
    rows: [
      { feature: "SOC 2 Type II", starter: false, pro: false, enterprise: true },
      { feature: "SAML / SSO", starter: false, pro: false, enterprise: true },
      { feature: "Audit logs", starter: false, pro: "30 days", enterprise: "1 year" },
      { feature: "VPC peering", starter: false, pro: false, enterprise: true },
      { feature: "On-premise deployment", starter: false, pro: false, enterprise: true },
    ],
  },
  {
    category: "Support",
    rows: [
      { feature: "Community support", starter: true, pro: true, enterprise: true },
      { feature: "Email support", starter: false, pro: true, enterprise: true },
      { feature: "Priority response", starter: false, pro: "24h", enterprise: "1h" },
      { feature: "Dedicated account manager", starter: false, pro: false, enterprise: true },
    ],
  },
];

const faqs = [
  { q: "What happens when I exceed my token limit?", a: "On Starter, requests will be rate-limited. On Pro and Enterprise, you're billed a small overage fee at our competitive per-token rates. You can set hard budget caps to prevent any overages entirely." },
  { q: "Can I switch plans at any time?", a: "Yes. Upgrades take effect immediately, pro-rated. Downgrades take effect at the end of your billing cycle." },
  { q: "Is there a free trial for Pro?", a: "Yes — 14 days free, no credit card required. You get full Pro access during the trial period." },
  { q: "What does 'Unlimited tokens' mean?", a: "Enterprise customers have no hard monthly token cap. Usage is billed at your contracted per-token rate, giving you predictable costs even at massive scale." },
  { q: "How does annual billing work?", a: "You're billed once per year at the annual rate. Annual plans save you approximately 33% compared to monthly billing." },
];

type CellVal = boolean | string;

function Cell({ val }: { val: CellVal }) {
  if (val === true) return <Check size={16} className="text-emerald-400 mx-auto" />;
  if (val === false) return <XIcon size={16} className="text-muted-foreground/30 mx-auto" />;
  return <span className="text-sm text-foreground">{val}</span>;
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-muted-foreground mb-6 border border-purple-500/20">
              <Sparkles size={14} className="text-purple-400" />
              Simple, transparent pricing
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="gradient-text-cyan">Pricing that</span>
              <br />
              <span className="gradient-text">scales with you</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Start free. Scale as you grow. No surprise bills, no hidden fees. Cancel anytime.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 glass rounded-full px-4 py-2 border border-white/10">
              <span className={`text-sm ${!annual ? "text-foreground font-medium" : "text-muted-foreground"}`}>Monthly</span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${annual ? "bg-cyan-500" : "bg-white/10"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${annual ? "translate-x-5" : ""}`} />
              </button>
              <span className={`text-sm ${annual ? "text-foreground font-medium" : "text-muted-foreground"}`}>Annual</span>
              {annual && <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded-full px-2 py-0.5">Save 33%</span>}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="relative pb-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => {
              const price = annual ? plan.annual : plan.monthly;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-3 inset-x-0 flex justify-center z-10">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-1 text-xs font-semibold text-white">
                        <Zap size={10} /> Most Popular
                      </span>
                    </div>
                  )}
                  <div className={`h-full flex flex-col rounded-2xl p-6 glass border transition-all hover:-translate-y-1 duration-300 ${plan.color} ${plan.popular ? "glow-cyan" : ""}`}>
                    <h3 className="font-semibold text-lg mb-1">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-bold">{price === 0 ? "Free" : `$${price}`}</span>
                      {price > 0 && <span className="text-muted-foreground text-sm">/ mo{annual ? " · billed annually" : ""}</span>}
                    </div>
                    {annual && plan.monthly > 0 && (
                      <p className="text-xs text-emerald-400 mb-2">Save ${(plan.monthly - plan.annual) * 12}/yr</p>
                    )}
                    <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                    <ul className="space-y-2.5 mb-8 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-4 h-4 rounded-full bg-cyan-500/15 flex items-center justify-center flex-shrink-0">
                            <Check size={10} className="text-cyan-400" />
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className={`w-full rounded-xl h-11 font-medium ${plan.popular ? "bg-cyan-500 hover:bg-cyan-400 text-black border-0" : "border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5"}`} variant={plan.popular ? "default" : "outline"}>
                      <Link href={plan.href}>{plan.cta}</Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* Feature comparison */}
      <section className="py-16 border-t border-white/5 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-12">
            <span className="gradient-text">Full feature comparison</span>
          </h2>

          {/* Header row */}
          <div className="grid grid-cols-4 gap-4 mb-2 sticky top-16 bg-background/90 backdrop-blur-sm py-3 z-10 rounded-xl">
            <div />
            {["Starter", "Pro", "Enterprise"].map((p) => (
              <div key={p} className="text-center text-sm font-semibold">{p}</div>
            ))}
          </div>

          {comparison.map((cat) => (
            <div key={cat.category} className="mb-8">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-2 py-3 border-b border-white/5 mb-1">
                {cat.category}
              </p>
              {cat.rows.map((row) => (
                <div key={row.feature} className="grid grid-cols-4 gap-4 items-center px-2 py-3 hover:bg-white/3 rounded-lg transition-colors">
                  <span className="text-sm text-muted-foreground">{row.feature}</span>
                  <div className="text-center"><Cell val={row.starter} /></div>
                  <div className="text-center"><Cell val={row.pro} /></div>
                  <div className="text-center"><Cell val={row.enterprise} /></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-16 border-t border-white/5 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Shield, title: "SOC 2 Type II", desc: "Enterprise-grade security compliance", color: "text-cyan-400", bg: "bg-cyan-500/10" },
              { icon: Zap, title: "99.99% Uptime", desc: "Industry-leading SLA backed by real guarantees", color: "text-purple-400", bg: "bg-purple-500/10" },
              { icon: HelpCircle, title: "14-day free trial", desc: "Full Pro access. No credit card required.", color: "text-emerald-400", bg: "bg-emerald-500/10" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass rounded-2xl p-6 border border-white/5">
                  <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mx-auto mb-3`}>
                    <Icon size={22} className={item.color} />
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-t border-white/5 px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-10"><span className="gradient-text">Pricing FAQ</span></h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass rounded-xl border border-white/5 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-medium hover:bg-white/3 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <ChevronDown size={16} className={`text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-4 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-white/5 pt-4">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/5 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4"><span className="gradient-text">Ready to get started?</span></h2>
          <p className="text-muted-foreground mb-8">Join 12,000+ engineers already running AI in production with Nexus.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full h-12 px-8 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold">
              <Link href="/signup">Start for free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-8 border-white/10 hover:border-cyan-500/30">
              <Link href="/contact">Talk to sales</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
