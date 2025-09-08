import { CTA } from "./parts/cta";
import { Features } from "./parts/features";
import { Footer } from "./parts/footer";
import { Header } from "./parts/header";
import { Hero } from "./parts/hero";
import { HowItWorks } from "./parts/how-it-works";

export function LandingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}
