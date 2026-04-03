import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus AI — Manage Your AI Infrastructure at Scale",
  description:
    "Unified platform for deploying, monitoring, and optimizing your AI models, agents, and workflows. Built for teams that move fast.",
  keywords: ["AI infrastructure", "model orchestration", "AI management", "LLM gateway", "AI observability", "agent workflows"],
  openGraph: {
    title: "Nexus AI — Manage Your AI Infrastructure at Scale",
    description: "Unified platform for deploying, monitoring, and optimizing your AI models, agents, and workflows.",
    type: "website",
    url: "https://nexusai.dev",
    siteName: "Nexus AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus AI — Manage Your AI Infrastructure at Scale",
    description: "Unified platform for deploying, monitoring, and optimizing your AI models, agents, and workflows.",
    creator: "@nexusai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <ScrollToTop />
      </body>
    </html>
  );
}
