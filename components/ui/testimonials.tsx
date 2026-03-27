"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    handle: "@sarahchen_ml",
    role: "ML Engineer, Stripe",
    avatar: "SC",
    color: "from-cyan-500 to-blue-500",
    text: "Nexus AI cut our model deployment time from days to minutes. The observability tools alone are worth the price — we caught a silent model degradation before it hit production.",
    stars: 5,
  },
  {
    name: "Marcus Webb",
    handle: "@mwebb_dev",
    role: "CTO, Veritas Labs",
    avatar: "MW",
    color: "from-purple-500 to-pink-500",
    text: "We moved our entire AI infrastructure to Nexus and saved 40% on compute costs. The agent orchestration framework is genuinely the best I've used.",
    stars: 5,
  },
  {
    name: "Priya Nair",
    handle: "@priyanair_ai",
    role: "AI Lead, Shopify",
    avatar: "PN",
    color: "from-emerald-500 to-cyan-500",
    text: "The real-time monitoring dashboards are phenomenal. I can track every token, every inference, every cost in one place. My team went from drowning in data to making confident decisions.",
    stars: 5,
  },
  {
    name: "James Okafor",
    handle: "@jokafor_eng",
    role: "Principal Engineer, Linear",
    avatar: "JO",
    color: "from-orange-500 to-red-500",
    text: "Switching to Nexus was the best infrastructure decision we made in 2025. The API is clean, the docs are excellent, and the support team actually responds in minutes.",
    stars: 5,
  },
  {
    name: "Elena Vasquez",
    handle: "@elenav_tech",
    role: "Head of AI, Resend",
    avatar: "EV",
    color: "from-pink-500 to-purple-500",
    text: "I've tried every AI management platform out there. Nothing comes close to Nexus for reliability and developer experience. It's the Vercel moment for AI infrastructure.",
    stars: 5,
  },
  {
    name: "David Kim",
    handle: "@dkim_builds",
    role: "Founder, Beam AI",
    avatar: "DK",
    color: "from-blue-500 to-indigo-500",
    text: "We scaled from 0 to 10M API calls per day without changing a single line of infrastructure code. Nexus handles the hard parts so we can focus on the product.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-muted-foreground mb-6 border border-pink-500/20">
            <Quote size={14} className="text-pink-400" />
            Trusted by 12,000+ engineers
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="gradient-text-cyan">What teams</span>{" "}
            <span className="gradient-text">are saying</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From startups to scale-ups, engineering teams trust Nexus to power
            their most critical AI workloads.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star
                    key={si}
                    size={12}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
