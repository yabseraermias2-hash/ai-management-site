import { Header } from "../components/ui/vercel-navbar";
import { Hero } from "../components/ui/vercel-hero";
import LogoCloud from "../components/ui/logo-cloud";
import { Features } from "../components/ui/features";
import Pricing from "../components/ui/pricing-base";
import Testimonials from "../components/ui/testimonials";
import { FAQAccordionBlock } from "../components/ui/faq-accordion-block-shadcnui";
import { CTABanner } from "../components/ui/cta-banner";
import { Footer } from "../components/ui/footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <LogoCloud />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQAccordionBlock />
      <CTABanner />
      <Footer />
    </main>
  );
}
