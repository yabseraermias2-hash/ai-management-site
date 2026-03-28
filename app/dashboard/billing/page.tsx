import Link from "next/link";
import { CreditCard, TrendingUp, DollarSign, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const invoices = [
  { id: "INV-2026-03", period: "March 2026", amount: 2979.10, status: "pending", due: "Apr 1, 2026" },
  { id: "INV-2026-02", period: "February 2026", amount: 2241.80, status: "paid", due: "Mar 1, 2026" },
  { id: "INV-2026-01", period: "January 2026", amount: 1892.40, status: "paid", due: "Feb 1, 2026" },
  { id: "INV-2025-12", period: "December 2025", amount: 1540.20, status: "paid", due: "Jan 1, 2026" },
];

const breakdown = [
  { model: "gpt-4o", tokens: "12.4B", cost: 1240.50, pct: 42 },
  { model: "claude-3-5-sonnet", tokens: "8.9B", cost: 890.20, pct: 30 },
  { model: "gemini-1.5-pro", tokens: "5.6B", cost: 562.80, pct: 19 },
  { model: "Others", tokens: "2.8B", cost: 285.60, pct: 9 },
];

export default function BillingPage() {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2"><CreditCard size={20} className="text-emerald-400" />Billing</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your plan, payment methods, and invoices</p>
      </div>

      {/* Current plan */}
      <div className="glass rounded-2xl p-6 border border-cyan-500/20 glow-cyan">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold">Starter Plan</span>
              <span className="text-xs bg-white/10 text-muted-foreground rounded-full px-2 py-0.5">Current</span>
            </div>
            <p className="text-xs text-muted-foreground">Free · 3 models · 1M tokens/month</p>
          </div>
          <Button asChild className="bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl self-start sm:self-auto">
            <Link href="/pricing">Upgrade to Pro — $29/mo</Link>
          </Button>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Token usage this month</span>
            <span>980K / 1M</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" style={{ width: "98%" }} />
          </div>
          <p className="text-xs text-amber-400">98% of monthly token quota used</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "This month", value: "$2,979", icon: DollarSign, color: "text-cyan-400", bg: "bg-cyan-500/10" },
          { label: "Last month", value: "$2,242", icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-500/10" },
          { label: "YTD spend", value: "$8,654", icon: CreditCard, color: "text-emerald-400", bg: "bg-emerald-500/10" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass rounded-2xl p-4 border border-white/5">
              <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                <Icon size={16} className={s.color} />
              </div>
              <p className="text-xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Cost breakdown */}
      <div className="glass rounded-2xl p-5 border border-white/5">
        <h3 className="text-sm font-semibold mb-4">Cost breakdown — March 2026</h3>
        <div className="space-y-3">
          {breakdown.map((item) => (
            <div key={item.model}>
              <div className="flex items-center justify-between mb-1 text-xs">
                <span className="font-medium">{item.model}</span>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span>{item.tokens} tokens</span>
                  <span className="text-foreground font-medium">${item.cost.toFixed(2)}</span>
                </div>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-700" style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices */}
      <div className="glass rounded-2xl border border-white/5 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h3 className="text-sm font-semibold">Invoices</h3>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/5">
              {["Invoice", "Period", "Amount", "Status", "Due date", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                <td className="px-4 py-3 font-mono text-[11px] text-cyan-400">{inv.id}</td>
                <td className="px-4 py-3">{inv.period}</td>
                <td className="px-4 py-3 font-mono font-medium">${inv.amount.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${inv.status === "paid" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" : "bg-amber-500/15 text-amber-400 border-amber-500/20"}`}>
                    {inv.status === "paid" ? <span className="inline-flex items-center gap-1"><Check size={9} />{inv.status}</span> : inv.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{inv.due}</td>
                <td className="px-4 py-3">
                  <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
