"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Zap, ChevronDown } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
}

const QUICK_REPLIES = [
  "How does pricing work?",
  "What AI models are supported?",
  "How do I get started?",
  "Tell me about the dashboard",
];

function getBotResponse(input: string): string {
  const q = input.toLowerCase();

  if (/price|pricing|cost|plan|free|pro|enterprise|billing|subscription/.test(q)) {
    return "Nexus AI has 3 plans:\n\n• **Starter** — Free forever, up to 3 models, 1M tokens/month\n• **Pro** — $29/mo (or $19/mo annual), unlimited models, 50M tokens, agent orchestration\n• **Enterprise** — $99/mo, dedicated infrastructure, SOC 2, unlimited tokens\n\nAll plans start with a 14-day free trial. Want me to help you pick the right one?";
  }
  if (/model|gpt|claude|gemini|llama|mistral|openai|anthropic|support/.test(q)) {
    return "Nexus AI supports 200+ models out of the box, including:\n\n• **OpenAI** — GPT-4o, o1, o3\n• **Anthropic** — Claude 3.5 Sonnet, Opus\n• **Google** — Gemini 1.5 Pro\n• **Meta** — Llama 3.1\n• **Mistral**, **Cohere**, and any OpenAI-compatible endpoint\n\nYou can also bring your own fine-tuned or self-hosted models via our custom model registry.";
  }
  if (/start|begin|setup|get started|sign up|signup|onboard/.test(q)) {
    return "Getting started is super easy:\n\n1. **Sign up** — create a free account (no credit card needed)\n2. **Connect a model** — choose from 200+ supported models\n3. **Deploy** — your first inference is live in under 2 minutes\n\nThe free Starter plan gives you 1M tokens/month to experiment with. Head to /signup to create your account!";
  }
  if (/dashboard|observ|monitor|trace|analytic|latency|token/.test(q)) {
    return "The Nexus AI dashboard gives you full visibility into your AI infrastructure:\n\n• **Real-time tracing** — every request, token, and latency logged\n• **Cost breakdown** — per-model and per-agent spend\n• **Anomaly detection** — automatic alerts for degraded models\n• **Agent runs** — step-by-step traces for multi-step workflows\n\nAll of this is available from your dashboard at /dashboard.";
  }
  if (/agent|workflow|orchestrat|multi.step|automation/.test(q)) {
    return "Nexus AI's agent orchestration engine lets you build complex multi-step AI workflows:\n\n• Branching logic and conditional steps\n• Human-in-the-loop checkpoints\n• Automatic state persistence (agents resume after failures)\n• Full observability — token usage, latency, and tool calls per step\n\nAvailable on the Pro plan and above.";
  }
  if (/security|soc|gdpr|hipaa|compli|encrypt|rbac|audit/.test(q)) {
    return "Nexus AI is enterprise-grade secure:\n\n• **SOC 2 Type II** certified\n• **GDPR** and **HIPAA** compliant\n• End-to-end encryption at rest and in transit\n• Fine-grained RBAC and full audit logs\n• VPC peering and private link available\n\nOur security whitepaper is available on request for Enterprise prospects.";
  }
  if (/enterprise|team|custom|sla|dedicated|on.prem|vpc|self.host/.test(q)) {
    return "Our Enterprise plan is built for mission-critical AI workloads:\n\n• Dedicated infrastructure with custom SLA guarantees\n• On-premise or VPC deployment options\n• 24/7 dedicated support\n• Advanced security controls (RBAC, audit logs, private link)\n• Unlimited token usage and custom rate limits\n\nContact our sales team at /contact to get a custom quote.";
  }
  if (/latency|fast|speed|p99|edge|global/.test(q)) {
    return "Nexus AI delivers sub-50ms p99 latency with our global edge inference network:\n\n• **40+ edge locations** worldwide\n• Automatic request routing to the nearest available instance\n• Intelligent load balancing across model providers\n• Fallback routing if a provider has an outage\n\nYou can monitor real-time latency from the Observability tab in your dashboard.";
  }
  if (/doc|api|sdk|reference|integrate|code/.test(q)) {
    return "Nexus AI has first-class developer tooling:\n\n• **REST API** — simple, OpenAI-compatible endpoints\n• **TypeScript SDK** — fully typed, works with Next.js out of the box\n• **Python SDK** — async & sync support\n• **Docs** — full reference available at /docs\n\nMost teams are making their first inference in under 5 minutes.";
  }
  if (/who made|who built|who created|who develop|who design|your creator|your maker|who are you made by/.test(q)) {
    return "I was created by **YABSERA KEBEDE** 🙌 He built the entire Nexus AI platform. Is there anything I can help you with today?";
  }
  if (/hello|hi|hey|sup|wsg|what.s up|how are/.test(q)) {
    return "Hey! 👋 I'm the Nexus AI assistant. I can help you with pricing, supported models, getting started, security, enterprise plans, and more. What would you like to know?";
  }
  if (/thank|thanks|ty|appreciate/.test(q)) {
    return "Happy to help! 🚀 If you have any other questions about Nexus AI, just ask. You can also check out our full documentation at /docs or contact our team at /contact.";
  }
  if (/uptime|sla|reliab|99/.test(q)) {
    return "Nexus AI guarantees **99.99% uptime** on our Pro and Enterprise plans, backed by:\n\n• Automatic failover to backup models\n• Multi-region redundancy\n• Real-time health monitoring with instant alerts\n\nIf a model degrades or goes down, we automatically route to your configured backup — zero code changes required.";
  }

  return "That's a great question! I'm still learning the details on that one. For the most accurate answer, check our docs at /docs or reach out to our team at /contact — they respond within minutes. Is there anything else about Nexus AI I can help with?";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hey there! 👋 I'm Nexus, your AI assistant. Ask me anything about pricing, models, features, or getting started!",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", text: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
    const response = getBotResponse(text);
    setTyping(false);
    setMessages((m) => [...m, { id: `b-${Date.now()}`, role: "bot", text: response }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Render text with basic **bold** support
  const renderText = (text: string) =>
    text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
      part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part
    );

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg glow-cyan cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={open ? {} : { boxShadow: ["0 0 0px rgba(6,182,212,0.4)", "0 0 20px rgba(6,182,212,0.6)", "0 0 0px rgba(6,182,212,0.4)"] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <ChevronDown size={20} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="bot" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Bot size={20} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.9, y: 20, originX: 0, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 flex flex-col glass border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Zap size={14} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">Nexus Assistant</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="ml-auto p-1 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-cyan-500 text-black font-medium rounded-br-sm"
                        : "glass border border-white/10 text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.role === "bot" ? renderText(msg.text) : msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div className="glass border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && !typing && (
              <div className="px-4 pb-2 flex flex-wrap gap-2 flex-shrink-0">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs glass border border-white/10 hover:border-cyan-500/30 hover:text-cyan-400 rounded-full px-3 py-1.5 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-white/10 flex-shrink-0">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/10 focus:border-cyan-500/50 rounded-xl px-3.5 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="w-9 h-9 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Send size={15} className="text-black" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
