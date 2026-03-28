"use client";

import { useState } from "react";
import { Settings, User, Key, Bell, Shield, Trash2, Copy, Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const apiKeys = [
  { id: 1, name: "Production", key: "nxs_live_sk_a8f2k9x1m4b7e3d6c0", created: "Jan 15, 2026", lastUsed: "2m ago" },
  { id: 2, name: "Development", key: "nxs_test_sk_p3q7r2s8t5u9v4w1x6", created: "Feb 3, 2026", lastUsed: "1h ago" },
];

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [showKey, setShowKey] = useState<number | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const [profile, setProfile] = useState({ name: "Alex Johnson", email: "user@nexusai.dev", company: "Acme Inc." });
  const [notifications, setNotifications] = useState({ latency: true, cost: true, agent: false, deploy: true });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopy = (id: number, key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2"><Settings size={20} className="text-muted-foreground" />Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your account, API keys, and preferences</p>
      </div>

      {/* Profile */}
      <Section icon={User} title="Profile" color="text-cyan-400">
        <div className="flex items-center gap-4 mb-5 p-4 bg-white/3 rounded-xl">
          <Avatar className="w-14 h-14 border-2 border-white/10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{profile.name}</p>
            <p className="text-xs text-muted-foreground">{profile.email}</p>
            <button className="text-xs text-cyan-400 hover:underline mt-1">Change avatar</button>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { key: "name", label: "Full Name", type: "text" },
            { key: "email", label: "Email", type: "email" },
            { key: "company", label: "Company", type: "text" },
          ].map((f) => (
            <div key={f.key} className="space-y-1.5">
              <label className="text-sm font-medium">{f.label}</label>
              <input
                type={f.type}
                value={(profile as Record<string, string>)[f.key]}
                onChange={(e) => setProfile((p) => ({ ...p, [f.key]: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
              />
            </div>
          ))}
        </div>
        <Button onClick={handleSave} className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl h-10 gap-2">
          {saved ? <><Check size={14} />Saved!</> : "Save changes"}
        </Button>
      </Section>

      {/* API Keys */}
      <Section icon={Key} title="API Keys" color="text-purple-400">
        <div className="space-y-3 mb-4">
          {apiKeys.map((k) => (
            <div key={k.id} className="flex items-center gap-3 p-3 bg-white/3 rounded-xl border border-white/5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{k.name}</p>
                <p className="text-xs font-mono text-muted-foreground mt-0.5">
                  {showKey === k.id ? k.key : `${k.key.slice(0, 16)}${"•".repeat(16)}`}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Created {k.created} · Last used {k.lastUsed}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => setShowKey(showKey === k.id ? null : k.id)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  {showKey === k.id ? <EyeOff size={13} className="text-muted-foreground" /> : <Eye size={13} className="text-muted-foreground" />}
                </button>
                <button onClick={() => handleCopy(k.id, k.key)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  {copied === k.id ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} className="text-muted-foreground" />}
                </button>
                <button className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors">
                  <Trash2 size={13} className="text-muted-foreground hover:text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5 gap-1.5">
          <Key size={13} />Generate new key
        </Button>
      </Section>

      {/* Notifications */}
      <Section icon={Bell} title="Notifications" color="text-amber-400">
        <div className="space-y-3">
          {[
            { key: "latency", label: "Latency alerts", desc: "When p99 latency exceeds your threshold" },
            { key: "cost", label: "Budget alerts", desc: "When monthly spend reaches 80% of budget" },
            { key: "agent", label: "Agent completions", desc: "When agent workflows complete or fail" },
            { key: "deploy", label: "Deployment events", desc: "Model deploys, scale events, and rollbacks" },
          ].map((n) => (
            <div key={n.key} className="flex items-center justify-between p-3 bg-white/3 rounded-xl">
              <div>
                <p className="text-sm font-medium">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <button
                onClick={() => setNotifications((p) => ({ ...p, [n.key]: !p[n.key as keyof typeof p] }))}
                className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${(notifications as Record<string, boolean>)[n.key] ? "bg-cyan-500" : "bg-white/10"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${(notifications as Record<string, boolean>)[n.key] ? "translate-x-5" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* Danger zone */}
      <Section icon={Shield} title="Danger Zone" color="text-red-400">
        <div className="border border-red-500/20 rounded-xl p-4 bg-red-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Delete account</p>
            <p className="text-xs text-muted-foreground">Permanently delete your account and all data. This cannot be undone.</p>
          </div>
          <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 self-start sm:self-auto flex-shrink-0">
            <Trash2 size={13} className="mr-1.5" />Delete account
          </Button>
        </div>
      </Section>
    </div>
  );
}

function Section({ icon: Icon, title, color, children }: { icon: React.ElementType; title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-5 border border-white/5">
      <h2 className="text-sm font-semibold flex items-center gap-2 mb-5">
        <Icon size={16} className={color} />{title}
      </h2>
      {children}
    </div>
  );
}
