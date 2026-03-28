"use client";

import { Activity, AlertTriangle, CheckCircle, Clock, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

function Sparkline({ data, color = "#06b6d4", gradId }: { data: number[]; color?: string; gradId: string }) {
  const w = 200, h = 50, pad = 3;
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
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const latencyData = [280, 310, 295, 340, 320, 280, 295, 312, 330, 298, 315, 290, 278, 312, 340, 298, 280, 295, 310, 285];
const errorRateData = [0.2, 0.3, 0.2, 0.8, 0.5, 0.2, 0.3, 0.2, 0.4, 0.2, 0.3, 0.2, 0.2, 0.3, 0.5, 0.2, 0.2, 0.3, 0.2, 0.2];
const requestData = [1200, 1450, 1380, 1600, 1520, 1700, 1640, 1820, 1780, 1920, 1850, 2100, 2050, 2200, 2180, 2350, 2300, 2480, 2440, 2600];

const recentTraces = [
  { id: "tr_8f2k9x", model: "gpt-4o", status: "success", duration: 342, tokens: 1247, time: "just now" },
  { id: "tr_7e1j8w", model: "claude-3-5-sonnet", status: "success", duration: 278, tokens: 890, time: "5s ago" },
  { id: "tr_6d0i7v", model: "mistral-large-2", status: "error", duration: 2100, tokens: 0, time: "12s ago" },
  { id: "tr_5c9h6u", model: "llama-3.1-70b", status: "success", duration: 85, tokens: 456, time: "18s ago" },
  { id: "tr_4b8g5t", model: "gpt-4o", status: "success", duration: 298, tokens: 2100, time: "25s ago" },
  { id: "tr_3a7f4s", model: "gemini-1.5-pro", status: "success", duration: 195, tokens: 780, time: "31s ago" },
];

export default function ObservabilityPage() {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2"><Activity size={20} className="text-blue-400" />Observability</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Real-time traces, metrics, and alerts across all models</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Avg Latency (p50)", value: "312ms", sub: "Last 1h", icon: Clock, color: "text-cyan-400", bg: "bg-cyan-500/10", trend: "-8ms", up: true },
          { label: "Error Rate", value: "0.3%", sub: "Last 1h", icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10", trend: "+0.1%", up: false },
          { label: "Req / minute", value: "2,847", sub: "Current", icon: Zap, color: "text-purple-400", bg: "bg-purple-500/10", trend: "+12%", up: true },
          { label: "Success rate", value: "99.7%", sub: "Last 24h", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10", trend: "+0.1%", up: true },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="glass rounded-2xl p-4 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", card.bg)}>
                  <Icon size={16} className={card.color} />
                </div>
                <span className={cn("text-[11px] flex items-center gap-1", card.up ? "text-emerald-400" : "text-red-400")}>
                  <TrendingUp size={11} /> {card.trend}
                </span>
              </div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        {[
          { title: "p50 Latency (ms)", data: latencyData, color: "#06b6d4", gradId: "lat-g", sub: "Last 20 minutes" },
          { title: "Requests / min", data: requestData, color: "#a855f7", gradId: "req-g", sub: "Last 20 minutes" },
          { title: "Error Rate (%)", data: errorRateData, color: "#f59e0b", gradId: "err-g", sub: "Last 20 minutes" },
        ].map((chart) => (
          <div key={chart.title} className="glass rounded-2xl p-5 border border-white/5">
            <h3 className="text-sm font-semibold mb-0.5">{chart.title}</h3>
            <p className="text-xs text-muted-foreground mb-4">{chart.sub}</p>
            <div className="h-24">
              <Sparkline data={chart.data} color={chart.color} gradId={chart.gradId} />
            </div>
          </div>
        ))}
      </div>

      {/* Traces */}
      <div className="glass rounded-2xl border border-white/5 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h3 className="text-sm font-semibold">Live Traces</h3>
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Live
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/5">
                {["Trace ID", "Model", "Status", "Duration", "Tokens", "Time"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-muted-foreground font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTraces.map((trace) => (
                <tr key={trace.id} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors cursor-pointer">
                  <td className="px-4 py-3 font-mono text-cyan-400 text-[11px]">{trace.id}</td>
                  <td className="px-4 py-3 font-medium">{trace.model}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[11px] px-2 py-0.5 rounded-full border font-medium", trace.status === "success" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" : "bg-red-500/15 text-red-400 border-red-500/20")}>
                      {trace.status}
                    </span>
                  </td>
                  <td className={cn("px-4 py-3 font-mono", trace.duration > 1000 ? "text-red-400" : trace.duration > 500 ? "text-amber-400" : "text-foreground")}>{trace.duration}ms</td>
                  <td className="px-4 py-3 font-mono text-foreground">{trace.tokens > 0 ? trace.tokens.toLocaleString() : "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{trace.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
