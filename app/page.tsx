import { Header } from "../components/ui/vercel-navbar";
import { Hero } from "../components/ui/vercel-hero";
import Pricing from "../components/ui/pricing-base";
import { Footer } from "../components/ui/footer";
import Testimonials from "../components/ui/testimonials";
export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Pricing />
      <Footer />
      <Testimonials />
    </main>
  );
}