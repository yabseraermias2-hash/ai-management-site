"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Brain, Bot, Activity, CreditCard, Settings,
  Triangle, Menu, X, Bell, Search, LogOut, User,
  HelpCircle, Zap, ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Models", icon: Brain, href: "/dashboard/models" },
  { label: "Agents", icon: Bot, href: "/dashboard/agents" },
  { label: "Observability", icon: Activity, href: "/dashboard/observability" },
  { label: "Billing", icon: CreditCard, href: "/dashboard/billing" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const notifications = [
  { id: 1, message: "mistral-large-2 latency spike detected", time: "2m ago", unread: true },
  { id: 2, message: "Monthly budget alert: 80% used", time: "1h ago", unread: true },
  { id: 3, message: "Agent 'data-pipeline' completed successfully", time: "2h ago", unread: false },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-50 w-64 flex flex-col bg-card border-r border-white/5 transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/5 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <Triangle size={13} className="fill-white text-white" />
            </div>
            <span className="font-bold text-base gradient-text-cyan">Nexus AI</span>
          </Link>
          <button className="lg:hidden p-1 rounded hover:bg-white/5" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                <Icon size={17} className={isActive ? "text-cyan-400" : "text-muted-foreground group-hover:text-foreground"} />
                {item.label}
                {isActive && <ChevronRight size={14} className="ml-auto text-cyan-400/50" />}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="p-3 border-t border-white/5 space-y-2 flex-shrink-0">
          <Link href="/docs" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
            <HelpCircle size={17} />
            Documentation
          </Link>
          <div className="glass rounded-xl p-3 border border-cyan-500/10">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-cyan-400" />
              <span className="text-xs font-semibold text-foreground">Starter Plan</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Upgrade for unlimited models and 50M tokens/month.</p>
            <Button asChild size="sm" className="w-full h-7 text-xs bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg">
              <Link href="/pricing">Upgrade to Pro</Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b border-white/5 bg-background/80 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 w-56 md:w-72">
              <Search size={15} className="text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder="Search models, agents..."
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1 min-w-0"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-cyan-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 glass border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                    <span className="text-sm font-semibold">Notifications</span>
                    <button className="text-xs text-cyan-400 hover:text-cyan-300" onClick={() => setNotifOpen(false)}>Mark all read</button>
                  </div>
                  {notifications.map((n) => (
                    <div key={n.id} className={cn("px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer", n.unread && "bg-cyan-500/5")}>
                      {n.unread && <span className="w-2 h-2 bg-cyan-400 rounded-full inline-block mr-2 mb-0.5" />}
                      <p className="text-xs text-foreground">{n.message}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{n.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 border cursor-pointer">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="User" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass" align="end">
                <div className="px-3 py-2 border-b border-white/5">
                  <p className="text-sm font-medium">Alex Johnson</p>
                  <p className="text-xs text-muted-foreground">user@nexusai.dev</p>
                </div>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/dashboard/settings"><User size={14} className="mr-2" />Account Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/pricing"><Zap size={14} className="mr-2 text-cyan-400" />Upgrade Plan</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer text-muted-foreground">
                  <Link href="/"><LogOut size={14} className="mr-2" />Back to Site</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
