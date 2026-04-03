"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "OpenAI", text: "OpenAI" },
  { name: "Stripe", text: "Stripe" },
  { name: "Shopify", text: "Shopify" },
  { name: "Linear", text: "Linear" },
  { name: "Vercel", text: "Vercel" },
  { name: "Anthropic", text: "Anthropic" },
  { name: "Resend", text: "Resend" },
  { name: "Supabase", text: "Supabase" },
  { name: "Railway", text: "Railway" },
  { name: "GitHub", text: "GitHub" },
];

export default function LogoCloud() {
  return (
    <section className="relative py-14 overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />

      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm text-muted-foreground tracking-widest uppercase">
          Trusted by teams at
        </p>
      </motion.div>

      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee gap-16 items-center whitespace-nowrap">
          {[...logos, ...logos].map((logo, i) => (
            <span
              key={i}
              className="text-xl font-bold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-300 select-none tracking-tight"
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
