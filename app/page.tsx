import Navbar from "../components/ui/vercel-navbar";
import Hero from "../components/ui/vercel-hero";
import Features from "../components/ui/core-features";
import Testimonials from "../components/ui/testimonial-card";
import Pricing from "../components/ui/pricing-base";
import Footer from "../components/ui/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
}