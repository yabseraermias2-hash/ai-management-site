"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  MapPin,
  Monitor,
  Clock,
  Wifi,
  RefreshCw,
  CheckCircle,
  Globe,
} from "lucide-react";

interface LoginRecord {
  id: string;
  email: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  isp: string;
  org: string;
  lat: number;
  lon: number;
  timezone: string;
  userAgent: string;
  browser: string;
  os: string;
  timestamp: string;
  success: boolean;
}

function countryFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode === "LO" || countryCode === "XX") return "🌐";
  return countryCode
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function SecurityPage() {
  const [records, setRecords] = useState<LoginRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRecords = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    try {
      const res = await fetch("/api/login-tracker");
      const data = await res.json();
      setRecords(data.records || []);
    } catch {
      setRecords([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20 flex items-center justify-center">
              <Shield size={18} className="text-cyan-400" />
            </div>
            <h1 className="text-2xl font-bold">Login History</h1>
          </div>
          <p className="text-sm text-muted-foreground ml-12">
            Every login to your account — with IP address and location
          </p>
        </div>
        <button
          onClick={() => fetchRecords(true)}
          disabled={refreshing}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground glass border border-white/10 rounded-xl px-4 py-2 transition-colors"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Stats bar */}
      {records.length > 0 && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {[
            { label: "Total Logins", value: records.length, icon: CheckCircle, color: "text-cyan-400" },
            { label: "Unique IPs", value: new Set(records.map((r) => r.ip)).size, icon: Wifi, color: "text-purple-400" },
            { label: "Countries", value: new Set(records.map((r) => r.country)).size, icon: Globe, color: "text-emerald-400" },
            { label: "Last Login", value: timeAgo(records[0]?.timestamp), icon: Clock, color: "text-amber-400" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass rounded-xl p-4 border border-white/5">
                <Icon size={16} className={`${stat.color} mb-2`} />
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* Records list */}
      {loading ? (
        <div className="flex items-center justify-center py-24 text-muted-foreground">
          <RefreshCw size={20} className="animate-spin mr-3" />
          Loading login records...
        </div>
      ) : records.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="w-16 h-16 rounded-2xl glass border border-white/10 flex items-center justify-center mb-4">
            <Shield size={28} className="text-muted-foreground" />
          </div>
          <p className="text-lg font-semibold mb-1">No logins recorded yet</p>
          <p className="text-sm text-muted-foreground max-w-xs">
            Every time someone logs in through your site, it'll show up here with their IP and location.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {records.map((record, i) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className={`glass rounded-2xl border p-5 transition-all duration-200 hover:border-white/15 ${
                i === 0
                  ? "border-cyan-500/25 bg-cyan-500/3"
                  : "border-white/5"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Country flag + location */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="text-3xl leading-none mt-0.5 flex-shrink-0">
                    {countryFlagEmoji(record.countryCode)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono text-sm font-semibold text-foreground">
                        {record.ip}
                      </span>
                      {i === 0 && (
                        <span className="inline-flex items-center gap-1 text-xs bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 rounded-full px-2 py-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          Current Session
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                      <MapPin size={12} />
                      <span>
                        {record.city === "Localhost"
                          ? "Local — Development"
                          : `${record.city}, ${record.region}, ${record.country}`}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground/70">
                      <span className="flex items-center gap-1">
                        <Wifi size={10} />
                        {record.isp}
                      </span>
                      <span className="flex items-center gap-1">
                        <Monitor size={10} />
                        {record.browser} on {record.os}
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe size={10} />
                        {record.timezone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side: email + time */}
                <div className="flex flex-col items-start md:items-end gap-1 flex-shrink-0">
                  <span className="text-xs text-muted-foreground font-mono">
                    {record.email}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={10} />
                    {formatTime(record.timestamp)}
                  </span>
                  <span className="text-xs text-muted-foreground/50">
                    {timeAgo(record.timestamp)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
