import Link from "next/link";
import { Header } from "@/components/ui/vercel-navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Globe, Lock, Users, BarChart2, Check, ArrowRight } from "lucide-react";

const features = [
  { icon: Shield, title: "SOC 2 Type II", desc: "Certified security & compliance out of the box. Full audit logs, encryption at rest and in transit.", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { icon: Globe, title: "Global Edge Network", desc: "Deploy AI inference across 40+ regions with sub-50ms latency. Automatic geo-routing included.", color: "text-purple-400", bg: "bg-purple-500/10" },
  { icon: Lock, title: "VPC & On-Premise", desc: "Run Nexus fully inside your own cloud or on-premise. Data never leaves your environment.", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: Users, title: "Unlimited Seats", desc: "No per-seat pricing. Add your entire engineering org without watching the bill explode.", color: "text-amber-400", bg: "bg-amber-500/10" },
  { icon: BarChart2, title: "Advanced Observability", desc: "1-year trace retention, custom dashboards, anomaly detection, and Slack/PagerDuty alerts.", color: "text-blue-400", bg: "bg-blue-500/10" },
  { icon: Zap, title: "99.99% SLA", desc: "Backed by real contractual guarantees and financial credits if we miss the mark.", color: "text-rose-400", bg: "bg-rose-500/10" },
];

const logos = ["Stripe", "Shopify", "Linear", "Resend", "Vercel", "Figma"];

const testimonials = [
  { quote: "We moved 40 models onto Nexus in a week. The observability alone saved us 20 hours of debugging per sprint.", name: "Sarah Chen", role: "Staff ML Eng, Stripe" },
  { quote: "The enterprise SLA and on-premise option were the deciding factors. Security team approved it in 2 days.", name: "Marcus O.", role: "Platform Lead, Shopify" },
  { quote: "Nexus pays for itself. We cut our inference spend by 34% in the first month through their cost intelligence.", name: "Priya K.", role: "CTO, Beam AI" },
];

export default function EnterprisePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-80 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-muted-foreground mb-6 border border-cyan-500/20">
            <Shield size={14} className="text-cyan-400" />Enterprise
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="gradient-text-cyan">AI infrastructure</span>
            <br /><span className="gradient-text">built for the enterprise</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            The security, compliance, and scale that mission-critical AI workloads demand. Trusted by engineering teams at the world&apos;s fastest-growing companies.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full h-12 px-8 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold">
              <Link href="/contact">Talk to sales</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-8 border-white/10 hover:border-cyan-500/30">
              <Link href="/dashboard">View demo <ArrowRight size={16} className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="py-12 border-y border-white/5">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8">Trusted by engineering teams at</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {logos.map((l) => (
              <span key={l} className="text-muted-foreground/40 font-bold text-lg hover:text-muted-foreground/70 transition-colors cursor-default">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4"><span className="gradient-text">Enterprise-grade everything</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Everything your security and compliance teams need, built in from day one.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 duration-300">
                  <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                    <Icon size={20} className={f.color} />
                  </div>
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 border-t border-white/5 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="glass rounded-2xl p-6 border border-white/5">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 border-t border-white/5 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-10"><span className="gradient-text">What&apos;s included in Enterprise</span></h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Unlimited AI models & tokens", "Dedicated infrastructure", "Custom SLA (up to 99.99%)",
              "SOC 2 Type II certification", "SAML / SSO integration", "VPC peering & private link",
              "On-premise deployment option", "24/7 dedicated support", "1-year audit log retention",
              "Custom contract & billing", "Unlimited team seats", "Security whitepaper & DPA",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors">
                <div className="w-5 h-5 rounded-full bg-cyan-500/15 flex items-center justify-center flex-shrink-0">
                  <Check size={11} className="text-cyan-400" />
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4"><span className="gradient-text">Ready to scale your AI?</span></h2>
          <p className="text-muted-foreground mb-8">Our enterprise team will get you set up with a custom contract, dedicated onboarding, and your first models running in production within days.</p>
          <Button asChild size="lg" className="rounded-full h-12 px-10 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold">
            <Link href="/contact">Contact enterprise sales</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
