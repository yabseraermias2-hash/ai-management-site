"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp, TrendingDown, Brain, Bot, DollarSign, Zap,
  AlertTriangle, CheckCircle, Clock, ArrowUpRight, MoreHorizontal,
  RefreshCw, Filter, ChevronUp, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Mock data ────────────────────────────────────────────────────────────────

const tokenData30d = [
  1.2, 1.4, 1.3, 1.6, 1.5, 1.8, 1.7, 2.0, 1.9, 2.1,
  2.0, 2.4, 2.3, 2.6, 2.5, 2.8, 2.7, 3.0, 2.9, 3.2,
  3.1, 3.4, 3.3, 3.6, 3.5, 3.8, 3.7, 4.0, 3.9, 4.2,
];

const costData30d = [
  980, 1050, 1020, 1180, 1140, 1320, 1280, 1450, 1380, 1520,
  1490, 1720, 1680, 1850, 1800, 1980, 1940, 2100, 2060, 2240,
  2200, 2380, 2340, 2520, 2480, 2660, 2620, 2800, 2760, 2940,
];

const models = [
  { id: 1, name: "gpt-4o", provider: "OpenAI", status: "active", rpm: 2840, p50: 312, p99: 680, cost: 1240.50, requests: 24500, trend: "up" },
  { id: 2, name: "claude-3-5-sonnet", provider: "Anthropic", status: "active", rpm: 1920, p50: 278, p99: 520, cost: 890.20, requests: 18200, trend: "up" },
  { id: 3, name: "gemini-1.5-pro", provider: "Google", status: "active", rpm: 1240, p50: 195, p99: 380, cost: 562.80, requests: 12800, trend: "stable" },
  { id: 4, name: "llama-3.1-70b", provider: "Meta / Groq", status: "active", rpm: 3840, p50: 85, p99: 160, cost: 210.40, requests: 9400, trend: "up" },
  { id: 5, name: "mistral-large-2", provider: "Mistral", status: "degraded", rpm: 420, p50: 890, p99: 2100, cost: 180.10, requests: 4200, trend: "down" },
  { id: 6, name: "phi-3-medium", provider: "Microsoft", status: "active", rpm: 980, p50: 68, p99: 120, cost: 95.60, requests: 7800, trend: "stable" },
];

const activities = [
  { id: 1, type: "deploy", icon: CheckCircle, color: "text-emerald-400", message: "gpt-4o deployed to production edge", detail: "3 regions · v2.4.1", time: "2m ago" },
  { id: 2, type: "alert", icon: AlertTriangle, color: "text-amber-400", message: "mistral-large-2 latency spike", detail: "p99 > 2000ms · auto-failover active", time: "8m ago" },
  { id: 3, type: "agent", icon: Bot, color: "text-purple-400", message: "Agent workflow 'data-pipeline' completed", detail: "1,247 steps · 3.2M tokens", time: "15m ago" },
  { id: 4, type: "cost", icon: DollarSign, color: "text-cyan-400", message: "Monthly budget alert: 80% used", detail: "$2,352 of $3,000 budget", time: "1h ago" },
  { id: 5, type: "scale", icon: Zap, color: "text-blue-400", message: "claude-3-5-sonnet auto-scaled", detail: "3 → 10 replicas · high traffic", time: "2h ago" },
  { id: 6, type: "agent", icon: Bot, color: "text-purple-400", message: "Agent 'customer-support-v3' updated", detail: "New system prompt deployed", time: "3h ago" },
];

const costByModel = [
  { name: "gpt-4o", cost: 1240.50, pct: 44, color: "bg-cyan-500" },
  { name: "claude-3-5-sonnet", cost: 890.20, pct: 31, color: "bg-purple-500" },
  { name: "gemini-1.5-pro", cost: 562.80, pct: 20, color: "bg-blue-500" },
  { name: "others", cost: 486.10, pct: 17, color: "bg-muted-foreground/30" },
];

// ─── Sparkline SVG ────────────────────────────────────────────────────────────

function Sparkline({ data, color = "#06b6d4", gradId }: { data: number[]; color?: string; gradId: string }) {
  const w = 200, h = 60, pad = 4;
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const toX = (i: number) => pad + (i / (data.length - 1)) * (w - pad * 2);
  const toY = (v: number) => pad + (1 - (v - min) / range) * (h - pad * 2);
  const pts = data.map((v, i) => `${toX(i)},${toY(v)}`);
  const line = `M ${pts.join(" L ")}`;
  const area = `${line} L ${toX(data.length - 1)},${h} L ${toX(0)},${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    degraded: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    inactive: "bg-white/5 text-muted-foreground border-white/10",
    error: "bg-red-500/15 text-red-400 border-red-500/20",
  };
  return (
    <span className={cn("text-[11px] px-2 py-0.5 rounded-full border font-medium capitalize", map[status] ?? map.inactive)}>
      {status === "active" && <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block mr-1 animate-pulse" />}
      {status === "degraded" && <span className="w-1.5 h-1.5 bg-amber-400 rounded-full inline-block mr-1" />}
      {status}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [sortField, setSortField] = useState<string>("rpm");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [timeRange, setTimeRange] = useState("30d");

  const sorted = [...models].sort((a, b) => {
    const aVal = (a as Record<string, unknown>)[sortField] as number;
    const bVal = (b as Record<string, unknown>)[sortField] as number;
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDir === "desc" ? bVal - aVal : aVal - bVal;
    }
    return 0;
  });

  const toggleSort = (field: string) => {
    if (sortField === field) setSortDir(sortDir === "desc" ? "asc" : "desc");
    else { setSortField(field); setSortDir("desc"); }
  };

  const SortIcon = ({ field }: { field: string }) =>
    sortField === field
      ? sortDir === "desc" ? <ChevronDown size={12} className="text-cyan-400" /> : <ChevronUp size={12} className="text-cyan-400" />
      : <ChevronDown size={12} className="text-muted-foreground/40" />;

  const now = new Date();
  const greeting = now.getHours() < 12 ? "Good morning" : now.getHours() < 18 ? "Good afternoon" : "Good evening";
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">{greeting}, Yabsera 👋</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{dateStr} · Starter Plan</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center glass border border-white/10 rounded-lg p-1 gap-1">
            {["7d", "30d", "90d"].map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={cn("text-xs px-3 py-1 rounded-md transition-colors", timeRange === r ? "bg-cyan-500/20 text-cyan-400" : "text-muted-foreground hover:text-foreground")}
              >
                {r}
              </button>
            ))}
          </div>
          <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5 gap-1.5 text-xs">
            <RefreshCw size={13} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Alert banner */}
      <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
        <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-amber-300 font-medium">Latency degradation on mistral-large-2</p>
          <p className="text-xs text-amber-400/70 mt-0.5">p99 latency spiked to 2,100ms — auto-failover redirecting to claude-3-5-sonnet</p>
        </div>
        <button className="text-xs text-amber-400 hover:text-amber-300 flex-shrink-0 transition-colors">Dismiss</button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Models", value: "6", sub: "3 providers", icon: Brain, color: "text-cyan-400", bg: "bg-cyan-500/10", trend: "+2 this week", up: true },
          { label: "Token Usage", value: "4.2B", sub: "this month", icon: Zap, color: "text-purple-400", bg: "bg-purple-500/10", trend: "+18% vs last month", up: true },
          { label: "Monthly Cost", value: "$2,979", sub: "of $3,000 budget", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10", trend: "80% used", up: false },
          { label: "Active Agents", value: "1,847", sub: "running now", icon: Bot, color: "text-amber-400", bg: "bg-amber-500/10", trend: "+124 today", up: true },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="glass rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", card.bg)}>
                  <Icon size={16} className={card.color} />
                </div>
                <span className={cn("text-[11px] flex items-center gap-1", card.up ? "text-emerald-400" : "text-amber-400")}>
                  {card.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {card.trend}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Token usage chart */}
        <div className="lg:col-span-2 glass rounded-2xl p-5 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold">Token Usage</h3>
              <p className="text-xs text-muted-foreground">Billions of tokens · {timeRange}</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 text-xs">
              <TrendingUp size={13} />
              +250% vs 30d ago
            </div>
          </div>
          <div className="h-32 w-full">
            <Sparkline data={tokenData30d} color="#06b6d4" gradId="tok-grad" />
          </div>
          <div className="flex justify-between mt-2 text-[11px] text-muted-foreground">
            <span>Mar 1</span>
            <span>Mar 15</span>
            <span>Mar 27</span>
          </div>
        </div>

        {/* Cost by model */}
        <div className="glass rounded-2xl p-5 border border-white/5">
          <h3 className="text-sm font-semibold mb-1">Cost by Model</h3>
          <p className="text-xs text-muted-foreground mb-4">This month · $2,979 total</p>
          <div className="space-y-3">
            {costByModel.map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs capitalize">{item.name}</span>
                  <span className="text-xs text-muted-foreground">${item.cost.toFixed(2)}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all duration-700", item.color)} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="h-24 w-full">
              <Sparkline data={costData30d} color="#a855f7" gradId="cost-grad" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 text-center">Daily spend trend</p>
          </div>
        </div>
      </div>

      {/* Models table + Activity */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Models table */}
        <div className="lg:col-span-2 glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h3 className="text-sm font-semibold">Models</h3>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground">
                <Filter size={12} />
                Filter
              </Button>
              <Button asChild size="sm" className="h-7 text-xs bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20">
                <Link href="/dashboard/models">View All</Link>
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5">
                  {[
                    { label: "Model", field: "name" },
                    { label: "Status", field: "status" },
                    { label: "RPM", field: "rpm" },
                    { label: "p50 (ms)", field: "p50" },
                    { label: "p99 (ms)", field: "p99" },
                    { label: "Cost", field: "cost" },
                  ].map((col) => (
                    <th
                      key={col.field}
                      className="text-left px-4 py-3 text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors select-none"
                      onClick={() => toggleSort(col.field)}
                    >
                      <span className="flex items-center gap-1">
                        {col.label}
                        <SortIcon field={col.field} />
                      </span>
                    </th>
                  ))}
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {sorted.map((model) => (
                  <tr key={model.id} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors group">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-foreground">{model.name}</p>
                        <p className="text-muted-foreground text-[11px]">{model.provider}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={model.status} /></td>
                    <td className="px-4 py-3 text-foreground font-mono">{model.rpm.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={cn("font-mono", model.p50 > 400 ? "text-amber-400" : "text-foreground")}>{model.p50}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("font-mono", model.p99 > 1000 ? "text-red-400" : model.p99 > 500 ? "text-amber-400" : "text-foreground")}>{model.p99}</span>
                    </td>
                    <td className="px-4 py-3 text-foreground font-mono">${model.cost.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10">
                        <MoreHorizontal size={14} className="text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity feed */}
        <div className="glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h3 className="text-sm font-semibold">Recent Activity</h3>
            <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
              All events <ArrowUpRight size={11} />
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {activities.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.id} className="flex gap-3 px-4 py-3 hover:bg-white/3 transition-colors">
                  <div className={cn("w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5")}>
                    <Icon size={14} className={a.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground leading-relaxed">{a.message}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{a.detail}</p>
                  </div>
                  <span className="text-[11px] text-muted-foreground flex-shrink-0">{a.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
