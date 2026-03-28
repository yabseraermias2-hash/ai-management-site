"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What AI models does Nexus support?",
    answer: "Nexus supports 200+ models out of the box including OpenAI (GPT-4o, o1), Anthropic (Claude 3.5 Sonnet, Opus), Google (Gemini 1.5 Pro), Meta (Llama 3.1), Mistral, Cohere, and any OpenAI-compatible endpoint. You can also bring your own fine-tuned or self-hosted models via our custom model registry.",
  },
  {
    question: "How does the token usage and billing work?",
    answer: "Billing is based on tokens processed through the Nexus gateway — both input and output tokens. We aggregate usage across all your models and show a unified cost dashboard. Starter is free up to 1M tokens/month. Pro includes 50M tokens. Enterprise is unlimited. Overages are billed at competitive per-token rates with automatic alerts before you exceed budgets.",
  },
  {
    question: "Can I self-host Nexus or run it in my own VPC?",
    answer: "Yes. Enterprise customers can deploy Nexus fully on-premise or into their own AWS/GCP/Azure VPC. The self-hosted version is identical to our cloud offering and includes all features. We also offer a hybrid mode where the control plane is ours but inference stays in your environment for data-residency compliance.",
  },
  {
    question: "What security and compliance certifications do you have?",
    answer: "Nexus is SOC 2 Type II certified, GDPR compliant, and HIPAA eligible. We offer private link connectivity, end-to-end encryption at rest and in transit, fine-grained RBAC, full audit logging, and VPC peering. Our security whitepaper is available on request for Enterprise prospects.",
  },
  {
    question: "How does agent orchestration work?",
    answer: "Nexus provides a declarative workflow engine for multi-step AI agents. You define steps, branching conditions, tool calls, and human-in-the-loop checkpoints. State is persisted automatically so agents can resume after failures. You get full observability into every step — token usage, latency, tool invocations, and final outputs — in one trace view.",
  },
  {
    question: "What happens if a model goes down or degrades?",
    answer: "Nexus continuously health-checks all your connected models. If a model's latency spikes or error rate exceeds your configured threshold, we automatically fail over to your designated backup model — with zero code changes on your side. You'll receive a real-time alert via webhook, email, or Slack with the full incident trace.",
  },
];

export function FAQAccordionBlock() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-gradient-to-b from-background to-muted/30 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <Badge className="mb-4" variant="secondary">
            <HelpCircle className="mr-1 h-3 w-3" />
            FAQ
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            Have a question? We&apos;ve got answers. If you don&apos;t find what you&apos;re looking for, feel free to contact us.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <Card className="overflow-hidden border-border/50 bg-card transition-all hover:border-primary/50 hover:shadow-md">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between p-4 text-left md:p-6"
                  >
                    <span className="pr-4 text-base font-semibold md:text-lg">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/50 p-4 md:p-6">
                          <motion.p
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            className="text-sm text-muted-foreground md:text-base leading-relaxed"
                          >
                            {faq.answer}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center md:mt-16"
        >
          <Card className="border-border/50 bg-gradient-to-br from-card to-muted/30 p-6 md:p-8">
            <MessageCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-bold md:text-2xl">Still have questions?</h3>
            <p className="mb-6 text-sm text-muted-foreground md:text-base">
              Our team is here to help. Get in touch and we&apos;ll respond as soon as possible.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/docs">View Documentation</Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
