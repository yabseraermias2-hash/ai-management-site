"use client";

import { useState } from "react";
import Link from "next/link";
import { Brain, Plus, Search, Filter, MoreHorizontal, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const models = [
  { id: 1, name: "gpt-4o", provider: "OpenAI", status: "active", rpm: 2840, p50: 312, cost: 1240.50, version: "2024-11-20" },
  { id: 2, name: "claude-3-5-sonnet", provider: "Anthropic", status: "active", rpm: 1920, p50: 278, cost: 890.20, version: "20241022" },
  { id: 3, name: "gemini-1.5-pro", provider: "Google", status: "active", rpm: 1240, p50: 195, cost: 562.80, version: "002" },
  { id: 4, name: "llama-3.1-70b", provider: "Meta / Groq", status: "active", rpm: 3840, p50: 85, cost: 210.40, version: "3.1" },
  { id: 5, name: "mistral-large-2", provider: "Mistral", status: "degraded", rpm: 420, p50: 890, cost: 180.10, version: "2407" },
  { id: 6, name: "phi-3-medium", provider: "Microsoft", status: "active", rpm: 980, p50: 68, cost: 95.60, version: "4k-instruct" },
  { id: 7, name: "o1-preview", provider: "OpenAI", status: "inactive", rpm: 0, p50: 0, cost: 0, version: "2024-09-12" },
];

export default function ModelsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = models.filter((m) => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.provider.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2"><Brain size={20} className="text-cyan-400" />Models</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{models.length} models configured · {models.filter((m) => m.status === "active").length} active</p>
        </div>
        <Button size="sm" className="bg-cyan-500 hover:bg-cyan-400 text-black gap-1.5 self-start">
          <Plus size={15} />Add model
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 flex-1 min-w-48">
          <Search size={14} className="text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search models..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2 glass border border-white/10 rounded-lg p-1">
          {["all", "active", "degraded", "inactive"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={cn("text-xs px-3 py-1.5 rounded-md transition-colors capitalize", statusFilter === s ? "bg-cyan-500/20 text-cyan-400" : "text-muted-foreground hover:text-foreground")}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/5">
              {["Model", "Status", "RPM", "p50 latency", "Monthly cost", "Version", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((model) => (
              <tr key={model.id} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors group">
                <td className="px-4 py-3.5">
                  <p className="font-medium text-sm text-foreground">{model.name}</p>
                  <p className="text-muted-foreground text-[11px]">{model.provider}</p>
                </td>
                <td className="px-4 py-3.5">
                  <span className={cn("text-[11px] px-2 py-0.5 rounded-full border font-medium flex items-center gap-1 w-fit", {
                    "bg-emerald-500/15 text-emerald-400 border-emerald-500/20": model.status === "active",
                    "bg-amber-500/15 text-amber-400 border-amber-500/20": model.status === "degraded",
                    "bg-white/5 text-muted-foreground border-white/10": model.status === "inactive",
                  })}>
                    {model.status === "active" && <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />}
                    {model.status === "degraded" && <AlertTriangle size={10} />}
                    {model.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 font-mono text-foreground">{model.rpm > 0 ? model.rpm.toLocaleString() : "—"}</td>
                <td className="px-4 py-3.5 font-mono text-foreground">{model.p50 > 0 ? `${model.p50}ms` : "—"}</td>
                <td className="px-4 py-3.5 font-mono text-foreground">{model.cost > 0 ? `$${model.cost.toFixed(2)}` : "—"}</td>
                <td className="px-4 py-3.5 text-muted-foreground font-mono text-[11px]">{model.version}</td>
                <td className="px-4 py-3.5">
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
  );
}
