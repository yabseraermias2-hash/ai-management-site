"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Activity, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Models Deployed", value: "12,400+", icon: Cpu },
  { label: "Uptime SLA", value: "99.99%", icon: Activity },
  { label: "Avg Latency", value: "< 50ms", icon: Zap },
];

const floatingCards = [
  {
    title: "Model Health",
    value: "Optimal",
    change: "+2.4%",
    positive: true,
    top: "10%",
    left: "2%",
  },
  {
    title: "Active Agents",
    value: "1,847",
    change: "+124 today",
    positive: true,
    top: "60%",
    left: "1%",
  },
  {
    title: "Token Usage",
    value: "4.2B",
    change: "this month",
    positive: true,
    top: "20%",
    right: "2%",
  },
  {
    title: "Cost Saved",
    value: "$18,200",
    change: "vs last month",
    positive: true,
    top: "65%",
    right: "1%",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pulse-glow pointer-events-none" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating stat cards */}
      {floatingCards.map((card, i) => (
        <motion.div
          key={card.title}
          className="absolute hidden xl:block glass rounded-xl p-3 min-w-[160px] z-10"
          style={{
            top: card.top,
            left: card.left,
            right: card.right,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
        >
          <p className="text-xs text-muted-foreground mb-1">{card.title}</p>
          <p className="text-lg font-bold text-foreground">{card.value}</p>
          <p className={`text-xs ${card.positive ? "text-emerald-400" : "text-red-400"}`}>
            {card.change}
          </p>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-muted-foreground mb-8 border border-cyan-500/20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Now in public beta — AI Orchestration v2.0 is live
          <ArrowRight size={14} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          <span className="gradient-text-cyan">Manage Your</span>
          <br />
          <span className="gradient-text">AI Infrastructure</span>
          <br />
          <span className="text-foreground">at Scale.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Unified platform for deploying, monitoring, and optimizing your AI
          models, agents, and workflows. Ship faster. Scale smarter. Spend less.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <Link href="#">
            <Button
              size="lg"
              className="rounded-full h-12 px-8 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold glow-cyan transition-all duration-300 cursor-pointer"
            >
              <Zap size={16} className="mr-2" />
              Start Free
            </Button>
          </Link>
          <Link href="#">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-12 px-8 border-muted-foreground/20 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 cursor-pointer"
            >
              View Demo
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="glass rounded-xl p-4 border border-white/5 hover:border-cyan-500/20 transition-colors group"
              >
                <Icon
                  size={16}
                  className="text-cyan-400 mb-2 group-hover:scale-110 transition-transform"
                />
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
