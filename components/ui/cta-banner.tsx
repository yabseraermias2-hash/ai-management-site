"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none pulse-glow" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[200px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[200px] bg-pink-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-muted-foreground mb-8 border border-cyan-500/20">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            No credit card required · Cancel anytime
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-6">
            <span className="gradient-text-cyan">Your AI infrastructure,</span>
            <br />
            <span className="gradient-text">reimagined.</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Join 12,000+ engineers already shipping production AI with confidence.
            Start free — scale to enterprise in minutes.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="rounded-full h-14 px-10 text-base bg-cyan-500 hover:bg-cyan-400 text-black font-semibold glow-cyan transition-all duration-300"
              >
                <Zap size={18} className="mr-2" />
                Start for Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-14 px-10 text-base border-muted-foreground/20 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300"
              >
                Talk to Sales
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>

          {/* Trust bar */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {["SOC 2 Type II", "GDPR Compliant", "99.99% Uptime SLA", "14-day free trial"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-cyan-400" />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
