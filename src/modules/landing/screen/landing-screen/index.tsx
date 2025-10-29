import { CTA } from "./parts/cta";
import { Features } from "./parts/features";
import { Footer } from "./parts/footer";
import { HackathonWinners } from "./parts/hackathon-winners";
import { Header } from "./parts/header";
import { Hero } from "./parts/hero";
import { HowItWorks } from "./parts/how-it-works";
import { OurTeam } from "./parts/our-team";
import { Sponsors } from "./parts/sponsors";

export function LandingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <HackathonWinners />
      <OurTeam />
      <Sponsors />
      <CTA />
      <Footer />
    </div>
  );
}
