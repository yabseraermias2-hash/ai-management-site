"use client";

import { useState } from "react";
import { Bot, Plus, Play, Pause, MoreHorizontal, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const agents = [
  { id: 1, name: "customer-support-v3", description: "Handles tier-1 support tickets with escalation", status: "running", runs: 2847, successRate: 98.2, avgTokens: 1240, lastRun: "2m ago" },
  { id: 2, name: "data-pipeline", description: "Extracts, transforms, and loads structured data from raw docs", status: "running", runs: 512, successRate: 99.8, avgTokens: 8450, lastRun: "15m ago" },
  { id: 3, name: "code-reviewer", description: "Reviews PRs and suggests improvements per team standards", status: "paused", runs: 1203, successRate: 96.4, avgTokens: 3200, lastRun: "2h ago" },
  { id: 4, name: "lead-qualifier", description: "Qualifies inbound leads and routes to sales reps", status: "running", runs: 748, successRate: 94.1, avgTokens: 640, lastRun: "5m ago" },
  { id: 5, name: "content-generator", description: "Generates blog posts and social copy from briefs", status: "error", runs: 89, successRate: 71.2, avgTokens: 5600, lastRun: "1h ago" },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  running: { label: "Running", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20", icon: CheckCircle },
  paused: { label: "Paused", color: "bg-amber-500/15 text-amber-400 border-amber-500/20", icon: Clock },
  error: { label: "Error", color: "bg-red-500/15 text-red-400 border-red-500/20", icon: AlertTriangle },
};

export default function AgentsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = agents.filter((a) => filter === "all" || a.status === filter);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2"><Bot size={20} className="text-purple-400" />Agents</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{agents.filter((a) => a.status === "running").length} running · {agents.length} total</p>
        </div>
        <Button size="sm" className="bg-cyan-500 hover:bg-cyan-400 text-black gap-1.5 self-start">
          <Plus size={15} />New agent
        </Button>
      </div>

      <div className="flex items-center gap-2 glass border border-white/10 rounded-lg p-1 w-fit">
        {["all", "running", "paused", "error"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={cn("text-xs px-3 py-1.5 rounded-md transition-colors capitalize", filter === s ? "bg-purple-500/20 text-purple-400" : "text-muted-foreground hover:text-foreground")}>
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map((agent) => {
          const { color, icon: Icon } = statusConfig[agent.status] ?? statusConfig.paused;
          return (
            <div key={agent.id} className="glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-sm font-semibold font-mono">{agent.name}</h3>
                  <span className={cn("text-[11px] px-2 py-0.5 rounded-full border font-medium flex items-center gap-1", color)}>
                    <Icon size={10} />{statusConfig[agent.status]?.label ?? agent.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{agent.description}</p>
              </div>
              <div className="grid grid-cols-3 gap-6 text-center flex-shrink-0">
                <div>
                  <p className="text-sm font-bold">{agent.runs.toLocaleString()}</p>
                  <p className="text-[11px] text-muted-foreground">Total runs</p>
                </div>
                <div>
                  <p className={cn("text-sm font-bold", agent.successRate >= 95 ? "text-emerald-400" : agent.successRate >= 80 ? "text-amber-400" : "text-red-400")}>{agent.successRate}%</p>
                  <p className="text-[11px] text-muted-foreground">Success rate</p>
                </div>
                <div>
                  <p className="text-sm font-bold">{agent.avgTokens.toLocaleString()}</p>
                  <p className="text-[11px] text-muted-foreground">Avg tokens</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[11px] text-muted-foreground">{agent.lastRun}</span>
                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                  {agent.status === "running" ? <Pause size={14} className="text-muted-foreground" /> : <Play size={14} className="text-muted-foreground" />}
                </button>
                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <MoreHorizontal size={14} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
