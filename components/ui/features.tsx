"use client";

import { motion } from "framer-motion";

import {
  Brain,
  Activity,
  ShieldCheck,
  Globe,
  GitBranch,
  Cpu,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Model Orchestration",
    description:
      "Route requests intelligently across multiple AI models. Automatic fallbacks, load balancing, and cost optimization built in.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/30",
  },
  {
    icon: Activity,
    title: "Real-Time Observability",
    description:
      "Full request tracing, token accounting, latency percentiles, and anomaly detection. Know exactly what your models are doing.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "hover:border-purple-500/30",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II, GDPR, and HIPAA compliant. Role-based access, audit logs, and end-to-end encryption for sensitive workloads.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/30",
  },
  {
    icon: Globe,
    title: "Global Edge Inference",
    description:
      "Deploy models to 40+ edge locations worldwide. Sub-50ms p99 latency from anywhere on the planet.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "hover:border-blue-500/30",
  },
  {
    icon: GitBranch,
    title: "Agent Workflows",
    description:
      "Build complex multi-step AI agents with branching logic, human-in-the-loop checkpoints, and state persistence.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "hover:border-pink-500/30",
  },
  {
    icon: Cpu,
    title: "Cost Intelligence",
    description:
      "Automatic prompt caching, model right-sizing recommendations, and per-team budget controls to keep costs predictable.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "hover:border-amber-500/30",
  },
];

export function Features() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="gradient-text-cyan">Everything you need</span>
            <br />
            <span className="gradient-text">to run AI in production</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From model deployment to cost optimization, Nexus gives your team
            the tools to ship reliable AI faster.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`glass rounded-2xl p-6 border border-white/5 ${feat.border} transition-all duration-300 hover:-translate-y-1 group`}
              >
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${feat.bg} mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon size={20} className={feat.color} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
