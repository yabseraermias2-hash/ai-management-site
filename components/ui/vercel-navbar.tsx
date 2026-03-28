"use client";

import * as React from "react";
import Link from "next/link";
import type { ReactElement } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Bot,
  Box,
  Calendar,
  BarChart2,
  Cpu,
  CaseSensitive,
  Globe,
  LayoutGrid,
  PenTool,
  FileText,
  Shield,
  Smile,
  Sparkles,
  BookOpen,
  Briefcase,
  Code,
  Component,
  Network,
  MonitorPlay,
  AppWindow,
  Layers,
  Monitor,
  Moon,
  Sun,
  CirclePlus,
  LogOut,
  Triangle,
  ScanLine,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback, useEffect } from "react";

const cloud: { title: string; icon: ReactElement; href: string; description: string }[] = [
  { title: "AI SDK", href: "/docs", icon: <Box strokeWidth={2} size={16} />, description: "The AI Toolkit for Typescript" },
  { title: "AI Gateway", href: "/docs", icon: <Sparkles strokeWidth={2} size={16} />, description: "One endpoint, all your models" },
  { title: "Nexus Agent", href: "/docs", icon: <CaseSensitive strokeWidth={2} size={16} />, description: "An agent that knows your stack" },
];

const core: { title: string; icon: ReactElement; href: string; description: string }[] = [
  { title: "CI/CD", href: "/docs", icon: <LayoutGrid strokeWidth={2} size={16} />, description: "Helping teams ship 6× faster" },
  { title: "Content Delivery", href: "/docs", icon: <Globe strokeWidth={2} size={16} />, description: "Fast, scalable, and reliable" },
  { title: "Fluid Compute", href: "/docs", icon: <Cpu strokeWidth={2} size={16} />, description: "Servers, in serverless form" },
  { title: "Observability", href: "/dashboard", icon: <BarChart2 strokeWidth={2} size={16} />, description: "Trace every step" },
];

const security: { title: string; icon: ReactElement; href: string; description: string }[] = [
  { title: "Bot Management", href: "/enterprise", icon: <Bot strokeWidth={2} size={16} />, description: "Scalable bot protection" },
  { title: "BotID", href: "/enterprise", icon: <ScanLine strokeWidth={2} size={16} />, description: "Invisible CAPTCHA" },
  { title: "Platform Security", href: "/enterprise", icon: <Shield strokeWidth={2} size={16} />, description: "DDOS Protection, Firewall" },
  { title: "Web Application Firewall", href: "/enterprise", icon: <Calendar strokeWidth={2} size={16} />, description: "Granular, custom protection" },
];

const company: { title: string; icon: ReactElement; href: string; description: string }[] = [
  { title: "Customers", href: "/enterprise", icon: <Smile strokeWidth={2} size={16} />, description: "Trusted by the best teams" },
  { title: "Blog", href: "#", icon: <PenTool strokeWidth={2} size={16} />, description: "The latest posts and changes" },
  { title: "Changelog", href: "#", icon: <BookOpen strokeWidth={2} size={16} />, description: "See what shipped" },
  { title: "Press", href: "#", icon: <Briefcase strokeWidth={2} size={16} />, description: "Read the latest news" },
  { title: "Events", href: "#", icon: <Calendar strokeWidth={2} size={16} />, description: "Join us at an event" },
];

const open: { title: string; icon: ReactElement; href: string; description: string }[] = [
  { title: "Next.js", href: "/docs", icon: <Code strokeWidth={2} size={16} />, description: "The native Next.js platform" },
  { title: "Python SDK", href: "/docs", icon: <Component strokeWidth={2} size={16} />, description: "First-class Python support" },
  { title: "Rust SDK", href: "/docs", icon: <FileText strokeWidth={2} size={16} />, description: "Blazing-fast inference client" },
  { title: "Turborepo", href: "/docs", icon: <Network strokeWidth={2} size={16} />, description: "Speed with Enterprise scale" },
];

const tools: { title: string; icon: ReactElement; href: string; description: string }[] = [
  { title: "Academy", href: "/docs", icon: <Code strokeWidth={2} size={16} />, description: "Learn the ins and outs of Nexus" },
  { title: "Marketplace", href: "#", icon: <Component strokeWidth={2} size={16} />, description: "Extend and automate workflows" },
  { title: "Templates", href: "/docs", icon: <FileText strokeWidth={2} size={16} />, description: "Jumpstart app development" },
  { title: "Guides", href: "/docs", icon: <Network strokeWidth={2} size={16} />, description: "Find help quickly" },
  { title: "Partner Finder", href: "/enterprise", icon: <Network strokeWidth={2} size={16} />, description: "Get help from solution partners" },
];

const cases: { title: string; icon: ReactElement; href: string; description: string }[] = [
  { title: "AI Apps", href: "/enterprise", icon: <Sparkles strokeWidth={2} size={16} />, description: "Deploy at the speed of AI" },
  { title: "Composable Commerce", href: "/enterprise", icon: <Component strokeWidth={2} size={16} />, description: "Power storefronts that convert" },
  { title: "Marketing Sites", href: "/enterprise", icon: <MonitorPlay strokeWidth={2} size={16} />, description: "Jumpstart app development" },
  { title: "Multi-tenant Platforms", href: "/enterprise", icon: <Network strokeWidth={2} size={16} />, description: "Scale apps with one codebase" },
  { title: "Web Apps", href: "/enterprise", icon: <AppWindow strokeWidth={2} size={16} />, description: "Ship features, not infrastructure" },
];

const users: { title: string; icon: ReactElement; href: string; description: string }[] = [
  { title: "Platform Engineers", href: "/enterprise", icon: <Code strokeWidth={2} size={16} />, description: "Automate away repetition" },
  { title: "Design Engineers", href: "/enterprise", icon: <Layers strokeWidth={2} size={16} />, description: "Deploy for every idea" },
];

const mobileNavSections = [
  {
    title: "Products",
    items: [
      { title: "AI SDK", href: "/docs", description: "The AI Toolkit for Typescript" },
      { title: "AI Gateway", href: "/docs", description: "One endpoint, all your models" },
      { title: "Observability", href: "/dashboard", description: "Trace every step" },
      { title: "Platform Security", href: "/enterprise", description: "DDOS Protection, Firewall" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Documentation", href: "/docs", description: "Full API reference" },
      { title: "Templates", href: "/docs", description: "Jumpstart development" },
      { title: "Academy", href: "/docs", description: "Learn Nexus" },
      { title: "Changelog", href: "#", description: "See what shipped" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { title: "Enterprise", href: "/enterprise", description: "For large teams" },
      { title: "AI Apps", href: "/enterprise", description: "Deploy AI fast" },
      { title: "Pricing", href: "/pricing", description: "Plans and billing" },
      { title: "Contact Sales", href: "/contact", description: "Talk to our team" },
    ],
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <div
        className={`flex sticky px-4 z-50 top-0 w-full items-center h-16 justify-between transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
          <div className="flex h-14 items-center justify-center gap-1">
            <Link href="/" className="flex items-center gap-1 flex-shrink-0">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Triangle size={12} className="fill-white text-white" />
              </div>
              <span className="font-bold text-lg gradient-text-cyan">Nexus AI</span>
            </Link>
            <NavigationMenu className="ml-8 hidden lg:flex" viewport={true}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), "rounded-full h-7.5 font-normal text-muted-foreground")}>
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background">
                    <ul className="grid w-[400px] pt-2 grid-cols-3 md:w-[800px]">
                      <div>
                        <span className="p-4 text-muted-foreground text-sm block">AI Cloud</span>
                        {cloud.map((c) => <ListItem key={c.title} title={c.title} icon={c.icon} href={c.href}>{c.description}</ListItem>)}
                      </div>
                      <div>
                        <span className="p-4 text-muted-foreground text-sm block">Core Platform</span>
                        {core.map((c) => <ListItem key={c.title} title={c.title} icon={c.icon} href={c.href}>{c.description}</ListItem>)}
                      </div>
                      <div>
                        <span className="p-4 text-muted-foreground text-sm block">Security</span>
                        {security.map((c) => <ListItem key={c.title} title={c.title} icon={c.icon} href={c.href}>{c.description}</ListItem>)}
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), "rounded-full h-7.5 font-normal text-muted-foreground")}>
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background">
                    <ul className="grid w-[400px] pt-2 grid-cols-3 md:w-[800px]">
                      <div>
                        <span className="p-4 text-muted-foreground text-sm block">Company</span>
                        {company.map((c) => <ListItem key={c.title} title={c.title} icon={c.icon} href={c.href}>{c.description}</ListItem>)}
                      </div>
                      <div>
                        <span className="p-4 text-muted-foreground text-sm block">Open Source</span>
                        {open.map((c) => <ListItem key={c.title} title={c.title} icon={c.icon} href={c.href}>{c.description}</ListItem>)}
                      </div>
                      <div>
                        <span className="p-4 text-muted-foreground text-sm block">Tools</span>
                        {tools.map((c) => <ListItem key={c.title} title={c.title} icon={c.icon} href={c.href}>{c.description}</ListItem>)}
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), "rounded-full h-7.5 font-normal text-muted-foreground")}>
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background">
                    <ul className="grid w-[400px] pt-2 grid-cols-2 md:w-[550px]">
                      <div>
                        <span className="p-4 text-muted-foreground text-sm block">Use Cases</span>
                        {cases.map((c) => <ListItem key={c.title} title={c.title} icon={c.icon} href={c.href}>{c.description}</ListItem>)}
                      </div>
                      <div>
                        <span className="p-4 text-muted-foreground text-sm block">Users</span>
                        {users.map((c) => <ListItem key={c.title} title={c.title} icon={c.icon} href={c.href}>{c.description}</ListItem>)}
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "rounded-full h-7.5 font-normal text-muted-foreground")}>
                    <Link href="/enterprise">Enterprise</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "rounded-full h-7.5 font-normal text-muted-foreground")}>
                    <Link href="/docs">Docs</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "rounded-full h-7.5 font-normal text-muted-foreground")}>
                    <Link href="/pricing">Pricing</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex gap-2 items-center">
            <div className="hidden lg:flex gap-2 items-center">
              <Button asChild variant="outline" size="sm" className="rounded-full border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-200">
                <Link href="/contact">Contact</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-medium transition-all duration-200">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="border cursor-pointer">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="User" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 p-3 rounded-xl glass" align="end">
                  <div className="p-2">
                    <h1 className="font-semibold">My Account</h1>
                    <p className="text-sm text-muted-foreground">user@nexusai.dev</p>
                  </div>
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="py-3 cursor-pointer">
                      <Link href="/dashboard"><LayoutDashboard size={14} className="mr-2" />Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-3 cursor-pointer">Account Settings</DropdownMenuItem>
                    <DropdownMenuItem className="py-3 justify-between cursor-pointer">
                      Create Teams <CirclePlus strokeWidth={2} size={16} />
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="-mx-3" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="py-3 justify-between">
                      Theme <ThemeSwitcher />
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="-mx-3" />
                  <DropdownMenuItem className="py-3 justify-between cursor-pointer">
                    Logout <LogOut strokeWidth={2} size={16} />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="-mx-3" />
                  <DropdownMenuItem className="pt-3">
                    <Button asChild className="w-full">
                      <Link href="/pricing">Upgrade to Pro</Link>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden bg-background/98 backdrop-blur-xl flex flex-col overflow-y-auto">
          {/* Mobile header */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-white/5 flex-shrink-0">
            <Link href="/" className="flex items-center gap-1" onClick={() => setMobileOpen(false)}>
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Triangle size={12} className="fill-white text-white" />
              </div>
              <span className="font-bold text-lg gradient-text-cyan">Nexus AI</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Mobile nav content */}
          <div className="flex-1 px-4 py-6 space-y-2">
            {mobileNavSections.map((section) => (
              <div key={section.title} className="border border-white/5 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedSection(expandedSection === section.title ? null : section.title)}
                >
                  {section.title}
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform duration-200 ${expandedSection === section.title ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedSection === section.title && (
                  <div className="border-t border-white/5">
                    {section.items.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="flex flex-col px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="text-sm font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground mt-0.5">{item.description}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="border border-white/5 rounded-xl overflow-hidden">
              {[
                { label: "Enterprise", href: "/enterprise" },
                { label: "Documentation", href: "/docs" },
                { label: "Pricing", href: "/pricing" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-sm font-medium hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile CTAs */}
          <div className="px-4 py-6 border-t border-white/5 space-y-3 flex-shrink-0">
            <Button asChild className="w-full rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-medium">
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="w-full rounded-full border-white/10">
              <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
            </Button>
            <div className="flex gap-3">
              <Button asChild variant="ghost" className="flex-1 text-sm text-muted-foreground">
                <Link href="/login" onClick={() => setMobileOpen(false)}>Sign in</Link>
              </Button>
              <Button asChild variant="ghost" className="flex-1 text-sm text-muted-foreground">
                <Link href="/signup" onClick={() => setMobileOpen(false)}>Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ListItem({
  title,
  icon,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  icon: ReactElement;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild className="hover:bg-transparent">
        <Link href={href}>
          <div className="flex gap-3 items-start rounded-md p-2 hover:bg-accent transition-colors">
            <div className="border rounded-sm p-2">{icon}</div>
            <div>
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="text-muted-foreground line-clamp-2 pt-1 text-xs leading-snug">{children}</p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

const themes = [
  { key: "system", icon: Monitor, label: "System theme" },
  { key: "light", icon: Sun, label: "Light theme" },
  { key: "dark", icon: Moon, label: "Dark theme" },
];

export type ThemeSwitcherProps = { className?: string };

const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleThemeClick = useCallback((themeKey: "light" | "dark" | "system") => {
    setTheme(themeKey);
  }, [setTheme]);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className={cn("relative isolate flex h-7 rounded-full bg-background p-1 ring-1 ring-border", className)}>
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;
        return (
          <button
            aria-label={label}
            className="relative h-5 w-6 rounded-full"
            key={key}
            onClick={() => handleThemeClick(key as "light" | "dark" | "system")}
            type="button"
          >
            {isActive && <div className="absolute inset-0 rounded-full bg-secondary" />}
            <Icon className={cn("relative z-10 m-auto h-3.5 w-3.5", isActive ? "text-foreground" : "text-muted-foreground")} />
          </button>
        );
      })}
    </div>
  );
};
