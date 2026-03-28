"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/ui/vercel-navbar";
import { Footer } from "@/components/ui/footer";
import { Search, ChevronRight, Book, Code, Zap, Shield, Bot, BarChart2, ArrowUpRight } from "lucide-react";

const sidebar = [
  {
    group: "Getting Started",
    items: [
      { label: "Introduction", id: "intro", active: true },
      { label: "Quick Start", id: "quickstart" },
      { label: "Core Concepts", id: "concepts" },
      { label: "Authentication", id: "auth" },
    ],
  },
  {
    group: "Models",
    items: [
      { label: "Supported Models", id: "models" },
      { label: "Custom Registry", id: "registry" },
      { label: "Model Routing", id: "routing" },
      { label: "Fallback Config", id: "fallback" },
    ],
  },
  {
    group: "Agents",
    items: [
      { label: "Agent Workflows", id: "agents" },
      { label: "Tool Calling", id: "tools" },
      { label: "State & Memory", id: "state" },
    ],
  },
  {
    group: "Observability",
    items: [
      { label: "Tracing", id: "tracing" },
      { label: "Metrics", id: "metrics" },
      { label: "Alerts", id: "alerts" },
    ],
  },
  {
    group: "API Reference",
    items: [
      { label: "REST API", id: "rest" },
      { label: "Webhooks", id: "webhooks" },
      { label: "SDKs", id: "sdks" },
    ],
  },
];

const content: Record<string, { title: string; body: React.ReactNode }> = {
  intro: {
    title: "Introduction",
    body: (
      <div className="space-y-6">
        <p className="text-muted-foreground text-base leading-relaxed">
          Nexus AI is a unified platform for deploying, monitoring, and optimizing AI models, agents, and workflows at scale. It acts as an intelligent gateway between your application and any AI provider.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Zap, title: "Model Orchestration", desc: "Route requests across 200+ models with automatic fallback and load balancing.", color: "text-cyan-400", bg: "bg-cyan-500/10" },
            { icon: BarChart2, title: "Real-Time Observability", desc: "Trace every request. Monitor latency, cost, and errors in one dashboard.", color: "text-purple-400", bg: "bg-purple-500/10" },
            { icon: Bot, title: "Agent Workflows", desc: "Build multi-step AI agents with persistent state and tool-calling support.", color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { icon: Shield, title: "Enterprise Security", desc: "SOC 2 Type II, VPC isolation, audit logs, and SAML SSO out of the box.", color: "text-amber-400", bg: "bg-amber-500/10" },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="glass rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all">
                <div className={`w-8 h-8 rounded-lg ${f.bg} flex items-center justify-center mb-3`}>
                  <Icon size={15} className={f.color} />
                </div>
                <h3 className="text-sm font-semibold mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="glass rounded-xl p-5 border border-cyan-500/20">
          <p className="text-sm font-semibold mb-1">Next step</p>
          <p className="text-sm text-muted-foreground mb-3">Follow the Quick Start guide to deploy your first model in under 5 minutes.</p>
          <button className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors" onClick={() => {}}>Quick Start <ChevronRight size={14} /></button>
        </div>
      </div>
    ),
  },
  quickstart: {
    title: "Quick Start",
    body: (
      <div className="space-y-6">
        <p className="text-muted-foreground">Get your first AI model running in production in under 5 minutes.</p>
        <div className="space-y-4">
          {[
            { step: "1", title: "Install the SDK", code: "npm install @nexusai/sdk" },
            { step: "2", title: "Initialize the client", code: `import { NexusAI } from '@nexusai/sdk';\n\nconst client = new NexusAI({\n  apiKey: process.env.NEXUS_API_KEY,\n});` },
            { step: "3", title: "Make your first request", code: `const response = await client.chat.completions.create({\n  model: 'gpt-4o',\n  messages: [{ role: 'user', content: 'Hello!' }],\n});` },
          ].map((s) => (
            <div key={s.step} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-bold flex items-center justify-center flex-shrink-0">{s.step}</span>
                <h3 className="text-sm font-semibold">{s.title}</h3>
              </div>
              <pre className="bg-white/3 border border-white/10 rounded-xl p-4 text-xs font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap">{s.code}</pre>
            </div>
          ))}
        </div>
        <div className="glass rounded-xl p-4 border border-emerald-500/20 bg-emerald-500/5">
          <p className="text-sm text-emerald-400 font-medium mb-1">That&apos;s it!</p>
          <p className="text-sm text-muted-foreground">Your request is now routed through Nexus with automatic fallback, rate limiting, and full observability. Check your <Link href="/dashboard" className="text-cyan-400 hover:underline">dashboard</Link> to see the trace.</p>
        </div>
      </div>
    ),
  },
  sdks: {
    title: "SDKs",
    body: (
      <div className="space-y-6">
        <p className="text-muted-foreground">Nexus provides first-class SDKs for the most popular languages and frameworks.</p>
        <div className="space-y-4">
          {[
            { lang: "TypeScript / Node.js", install: "npm install @nexusai/sdk", status: "Stable" },
            { lang: "Python", install: "pip install nexusai", status: "Stable" },
            { lang: "Go", install: "go get github.com/nexusai/go-sdk", status: "Beta" },
            { lang: "Rust", install: "cargo add nexusai", status: "Beta" },
          ].map((sdk) => (
            <div key={sdk.lang} className="glass rounded-xl p-4 border border-white/5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium">{sdk.lang}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${sdk.status === "Stable" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`}>{sdk.status}</span>
                </div>
                <pre className="text-xs font-mono text-muted-foreground">{sdk.install}</pre>
              </div>
              <ArrowUpRight size={14} className="text-muted-foreground flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  rest: {
    title: "REST API",
    body: (
      <div className="space-y-6">
        <p className="text-muted-foreground">All Nexus features are available via REST. The API is fully compatible with the OpenAI API spec.</p>
        <div className="space-y-3">
          <p className="text-sm font-semibold">Base URL</p>
          <pre className="bg-white/3 border border-white/10 rounded-xl p-4 text-xs font-mono text-cyan-400">https://api.nexusai.dev/v1</pre>
          <p className="text-sm font-semibold mt-4">Authentication</p>
          <pre className="bg-white/3 border border-white/10 rounded-xl p-4 text-xs font-mono text-muted-foreground whitespace-pre-wrap">{`Authorization: Bearer YOUR_API_KEY`}</pre>
          <p className="text-sm font-semibold mt-4">Example: Chat completion</p>
          <pre className="bg-white/3 border border-white/10 rounded-xl p-4 text-xs font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap">{`POST /v1/chat/completions\n\n{\n  "model": "gpt-4o",\n  "messages": [\n    { "role": "user", "content": "Hello!" }\n  ]\n}`}</pre>
        </div>
      </div>
    ),
  },
};

const defaultContent = {
  title: "Documentation",
  body: <p className="text-muted-foreground">Select a topic from the sidebar to get started.</p>,
};

export default function DocsPage() {
  const [active, setActive] = useState("intro");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const current = content[active] ?? defaultContent;

  const filtered = sidebar.map((group) => ({
    ...group,
    items: group.items.filter((item) => !search || item.label.toLowerCase().includes(search.toLowerCase())),
  })).filter((group) => group.items.length > 0);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8 gap-8">
        {/* Sidebar */}
        <aside className="w-60 flex-shrink-0 hidden md:block">
          <div className="sticky top-24 space-y-6">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <Search size={14} className="text-muted-foreground" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search docs..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
            </div>
            {filtered.map((group) => (
              <div key={group.group}>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">{group.group}</p>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActive(item.id)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all flex items-center justify-between group ${active === item.id ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
                    >
                      {item.label}
                      {active === item.id && <ChevronRight size={12} className="text-cyan-400/50" />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Mobile breadcrumb */}
          <div className="flex items-center gap-2 mb-6 md:hidden">
            <Book size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Docs</span>
            <ChevronRight size={14} className="text-muted-foreground" />
            <span className="text-sm">{current.title}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span>Docs</span>
            <ChevronRight size={12} />
            <span className="text-foreground">{current.title}</span>
          </div>

          <h1 className="text-3xl font-bold mb-6">
            <span className="gradient-text">{current.title}</span>
          </h1>
          <div className="prose-sm max-w-none">{current.body}</div>

          {/* Navigation */}
          <div className="flex justify-between mt-12 pt-6 border-t border-white/5">
            <button onClick={() => {}} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">← Previous</button>
            <button onClick={() => {}} className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors">Next →</button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
