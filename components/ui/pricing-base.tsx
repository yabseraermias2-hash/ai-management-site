"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/ month",
    description: "Perfect for individuals and small experiments.",
    cta: "Get Started Free",
    ctaVariant: "outline" as const,
    popular: false,
    features: [
      "Up to 3 AI models",
      "1M tokens / month",
      "Basic monitoring dashboard",
      "Community support",
      "REST API access",
      "Standard latency",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/ month",
    description: "For teams shipping production AI features.",
    cta: "Start Pro Trial",
    ctaVariant: "default" as const,
    popular: true,
    features: [
      "Unlimited AI models",
      "50M tokens / month",
      "Advanced analytics & tracing",
      "Priority email support",
      "Webhook integrations",
      "Low-latency inference",
      "Agent orchestration",
      "Custom rate limits",
      "Team collaboration",
      "99.9% uptime SLA",
    ],
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/ month",
    description: "For organizations with mission-critical AI workloads.",
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
    popular: false,
    features: [
      "Everything in Pro",
      "Unlimited token usage",
      "Dedicated infrastructure",
      "24/7 dedicated support",
      "SOC 2 Type II compliance",
      "Custom SLA guarantees",
      "On-premise deployment",
      "Advanced security controls",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-2xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-muted-foreground mb-6 border border-purple-500/20">
            <Sparkles size={14} className="text-purple-400" />
            Simple, transparent pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="gradient-text-cyan">Pricing that</span>{" "}
            <span className="gradient-text">scales with you</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Start free, scale as you grow. No surprise bills, no hidden fees.
            Cancel anytime.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 inset-x-0 flex justify-center z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-1 text-xs font-semibold text-white">
                    <Zap size={10} />
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`h-full flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? "glass border border-cyan-500/30 glow-cyan"
                    : "glass border border-white/5 hover:border-white/10"
                }`}
              >
                {/* Plan header */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-cyan-500/15 flex items-center justify-center">
                        <Check size={10} className="text-cyan-400" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  asChild
                  variant={plan.ctaVariant}
                  className={`w-full rounded-xl h-11 font-medium transition-all duration-300 cursor-pointer ${
                    plan.popular
                      ? "bg-cyan-500 hover:bg-cyan-400 text-black border-0"
                      : "border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5"
                  }`}
                >
                  <Link href="#">{plan.cta}</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          All plans include a 14-day free trial. No credit card required.
        </motion.p>
      </div>
    </section>
  );
}
