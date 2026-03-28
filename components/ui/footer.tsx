import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Zap } from "lucide-react";

const footerLinks = {
  Product: [
    { title: "Features", href: "/#features" },
    { title: "Pricing", href: "/pricing" },
    { title: "Changelog", href: "#" },
    { title: "Roadmap", href: "#" },
    { title: "Status", href: "#" },
  ],
  Developers: [
    { title: "Documentation", href: "/docs" },
    { title: "API Reference", href: "/docs" },
    { title: "SDK", href: "/docs" },
    { title: "Templates", href: "/docs" },
    { title: "Examples", href: "/docs" },
  ],
  Company: [
    { title: "About", href: "/enterprise" },
    { title: "Blog", href: "#" },
    { title: "Careers", href: "#" },
    { title: "Press", href: "#" },
    { title: "Partners", href: "/enterprise" },
  ],
  Legal: [
    { title: "Privacy Policy", href: "#" },
    { title: "Terms of Service", href: "#" },
    { title: "Cookie Policy", href: "#" },
    { title: "Security", href: "/enterprise" },
    { title: "Compliance", href: "/enterprise" },
  ],
};

const socials = [
  { name: "Twitter / X", href: "#" },
  { name: "GitHub", href: "#" },
  { name: "Discord", href: "#" },
  { name: "LinkedIn", href: "#" },
];

export function Footer({ className, ...props }: React.ComponentProps<"footer">) {
  return (
    <footer className={cn("relative border-t border-white/5 overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-cyan-500/30 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="py-16 grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Zap size={14} className="text-white" />
              </div>
              <span className="font-bold text-lg">Nexus AI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              The AI infrastructure platform built for engineers who demand reliability and performance.
            </p>
            <div className="flex flex-col gap-2">
              {socials.map((s) => (
                <a key={s.name} href={s.href} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group">
                  {s.name}
                  <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-4">{group}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.title}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Nexus AI, Inc. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Built for engineers who move fast.</p>
        </div>
      </div>
    </footer>
  );
}
