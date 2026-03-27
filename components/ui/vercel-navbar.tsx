"use client";

import * as React from "react";
import Link from "next/link";
import type { ReactElement } from "react";
import { useTheme } from "next-themes";

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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback, useEffect } from "react";

const cloud: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "AI SDK",
    href: "#",
    icon: <Box strokeWidth={2} size={16} />,
    description: "The AI Toolkit for Typescript",
  },
  {
    title: "AI Gateway",
    href: "#",
    icon: <Sparkles strokeWidth={2} size={16} />,
    description: "One endpoint, all your models",
  },
  {
    title: "Vercel Agent",
    href: "#",
    icon: <CaseSensitive strokeWidth={2} size={16} />,
    description: "An agent that knows your stack",
  },
];

const core: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "CI/CD",
    href: "#",
    icon: <LayoutGrid strokeWidth={2} size={16} />,
    description: "Helping teams ship 6× faster",
  },
  {
    title: "Content Delivery",
    href: "#",
    icon: <Globe strokeWidth={2} size={16} />,
    description: "Fast, scalable, and reliable",
  },
  {
    title: "Fluid Compute",
    href: "#",
    icon: <Cpu strokeWidth={2} size={16} />,
    description: "Servers, in serverless form",
  },
  {
    title: "Observability",
    href: "#",
    icon: <BarChart2 strokeWidth={2} size={16} />,
    description: "Trace every step",
  },
];

const security: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "Bot Management",
    href: "#",
    icon: <Bot strokeWidth={2} size={16} />,
    description: "Scalable bot protection",
  },
  {
    title: "BotID",
    href: "#",
    icon: <ScanLine strokeWidth={2} size={16} />,
    description: "Invisible CAPTCHA",
  },
  {
    title: "Platform Security",
    href: "#",
    icon: <Shield strokeWidth={2} size={16} />,
    description: "DDOS Protection, Firewall",
  },
  {
    title: "Web Application Firewall",
    href: "#",
    icon: <Calendar strokeWidth={2} size={16} />,
    description: "Granular, custom protection",
  },
];

const company: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "Customers",
    href: "#",
    icon: <Smile strokeWidth={2} size={16} />,
    description: "Trusted by the best teams",
  },
  {
    title: "Blog",
    href: "#",
    icon: <PenTool strokeWidth={2} size={16} />,
    description: "The latest posts and changes",
  },
  {
    title: "Changelog",
    href: "#",
    icon: <BookOpen strokeWidth={2} size={16} />,
    description: "See what shipped",
  },
  {
    title: "Press",
    href: "#",
    icon: <Briefcase strokeWidth={2} size={16} />,
    description: "Read the latest news",
  },
  {
    title: "Events",
    href: "#",
    icon: <Calendar strokeWidth={2} size={16} />,
    description: "Join us at an event",
  },
];

const open: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "Next.js",
    href: "#",
    icon: <Code strokeWidth={2} size={16} />,
    description: "The native Next.js platform",
  },
  {
    title: "Nuxt",
    href: "#",
    icon: <Component strokeWidth={2} size={16} />,
    description: "The progressive web framework",
  },
  {
    title: "Svelte",
    href: "#",
    icon: <FileText strokeWidth={2} size={16} />,
    description: "The web's efficient UI framework",
  },
  {
    title: "Turborepo",
    href: "#",
    icon: <Network strokeWidth={2} size={16} />,
    description: "Speed with Enterprise scale",
  },
];

const tools: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "Academy",
    href: "#",
    icon: <Code strokeWidth={2} size={16} />,
    description: "Learn the ins and outs of Vercel",
  },
  {
    title: "Marketplace",
    href: "#",
    icon: <Component strokeWidth={2} size={16} />,
    description: "Extend and automate workflows",
  },
  {
    title: "Templates",
    href: "#",
    icon: <FileText strokeWidth={2} size={16} />,
    description: "Jumpstart app development",
  },
  {
    title: "Guides",
    href: "#",
    icon: <Network strokeWidth={2} size={16} />,
    description: "Find help quickly",
  },
  {
    title: "Partner Finder",
    href: "#",
    icon: <Network strokeWidth={2} size={16} />,
    description: "Get help from solution partners",
  },
];

const cases: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "AI Apps",
    href: "#",
    icon: <Sparkles strokeWidth={2} size={16} />,
    description: "Deploy at the speed of AI",
  },
  {
    title: "Composable Commerce",
    href: "#",
    icon: <Component strokeWidth={2} size={16} />,
    description: "Power storefronts that convert",
  },
  {
    title: "Marketing Sites",
    href: "#",
    icon: <MonitorPlay strokeWidth={2} size={16} />,
    description: "Jumpstart app development",
  },
  {
    title: "Multi-tenant Platforms",
    href: "#",
    icon: <Network strokeWidth={2} size={16} />,
    description: "Scale apps with one codebase",
  },
  {
    title: "Web Apps",
    href: "#",
    icon: <AppWindow strokeWidth={2} size={16} />,
    description: "Ship features, not infrastructure",
  },
];

const users: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "Platform Engineers",
    href: "#",
    icon: <Code strokeWidth={2} size={16} />,
    description: "Automate away repetition",
  },
  {
    title: "Design Engineers",
    href: "#",
    icon: <Layers strokeWidth={2} size={16} />,
    description: "Deploy for every idea",
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`flex sticky px-4 z-50 top-0 w-full items-center h-16 justify-between transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
        <div className="flex h-14 items-center justify-center gap-1">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
            <Triangle size={12} className="fill-white text-white" />
          </div>
          <span className="font-bold text-lg gradient-text-cyan">Nexus AI</span>
          <NavigationMenu className="ml-8 hidden lg:flex" viewport={true}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-7.5 font-normal text-muted-foreground"
                  )}
                >
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background">
                  <ul className="grid w-[400px] pt-2 grid-cols-3 md:w-[800px]">
                    <div>
                      <span className="p-4 text-muted-foreground text-sm block">
                        AI Cloud
                      </span>
                      {cloud.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </div>
                    <div>
                      <span className="p-4 text-muted-foreground text-sm block">
                        Core Platform
                      </span>
                      {core.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </div>
                    <div>
                      <span className="p-4 text-muted-foreground text-sm block">
                        Security
                      </span>
                      {security.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </div>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-7.5 font-normal text-muted-foreground"
                  )}
                >
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background">
                  <ul className="grid w-[400px] pt-2 grid-cols-3 md:w-[800px]">
                    <div>
                      <span className="p-4 text-muted-foreground text-sm block">Company</span>
                      {company.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </div>
                    <div>
                      <span className="p-4 text-muted-foreground text-sm block">
                        Open Source
                      </span>
                      {open.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </div>
                    <div>
                      <span className="p-4 text-muted-foreground text-sm block">Tools</span>
                      {tools.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </div>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-7.5 font-normal text-muted-foreground"
                  )}
                >
                  Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background">
                  <ul className="grid w-[400px] pt-2 grid-cols-2 md:w-[550px]">
                    <div>
                      <span className="p-4 text-muted-foreground text-sm block">
                        Use Cases
                      </span>
                      {cases.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </div>
                    <div>
                      <span className="p-4 text-muted-foreground text-sm block">Users</span>
                      {users.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </div>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-7.5 font-normal text-muted-foreground"
                  )}
                >
                  <Link href="#">Enterprise</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-7.5 font-normal text-muted-foreground"
                  )}
                >
                  <Link href="#">Docs</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-7.5 font-normal text-muted-foreground"
                  )}
                >
                  <Link href="#">Pricing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            variant={"outline"}
            size={"sm"}
            className="rounded-full border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-200"
          >
            Contact
          </Button>
          <Button
            size={"sm"}
            className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-medium transition-all duration-200"
          >
            Dashboard
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="border cursor-pointer">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  alt="User"
                />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 p-3 rounded-xl glass" align="end">
              <div className="p-2">
                <h1 className="font-semibold">My Account</h1>
                <p className="text-sm text-muted-foreground">
                  user@nexusai.dev
                </p>
              </div>
              <DropdownMenuGroup>
                <DropdownMenuItem className="py-3">Dashboard</DropdownMenuItem>
                <DropdownMenuItem className="py-3">
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3 justify-between">
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
              <DropdownMenuItem className="py-3 justify-between">
                Logout <LogOut strokeWidth={2} size={16} />
              </DropdownMenuItem>
              <DropdownMenuSeparator className="-mx-3" />
              <DropdownMenuItem className="pt-3">
                <Button className="w-full">Upgrade to Pro</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
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
              <p className="text-muted-foreground line-clamp-2 pt-1 text-xs leading-snug">
                {children}
              </p>
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

export type ThemeSwitcherProps = {
  className?: string;
};

const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleThemeClick = useCallback(
    (themeKey: "light" | "dark" | "system") => {
      setTheme(themeKey);
    },
    [setTheme]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "relative isolate flex h-7 rounded-full bg-background p-1 ring-1 ring-border",
        className
      )}
    >
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
            {isActive && (
              <div className="absolute inset-0 rounded-full bg-secondary" />
            )}
            <Icon
              className={cn(
                "relative z-10 m-auto h-3.5 w-3.5",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
