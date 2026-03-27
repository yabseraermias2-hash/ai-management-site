import { Header } from "../components/ui/vercel-navbar";
import { Hero } from "../components/ui/vercel-hero";
import { Features } from "../components/ui/features";
import Pricing from "../components/ui/pricing-base";
import Testimonials from "../components/ui/testimonials";
import { FAQAccordionBlock } from "../components/ui/faq-accordion-block-shadcnui";
import { Footer } from "../components/ui/footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQAccordionBlock />
      <Footer />
    </main>
  );
}
