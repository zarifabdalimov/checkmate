import { ContactUs } from "./parts/contact-us";
import { CTA } from "./parts/cta";
import { Features } from "./parts/features";
import { Footer } from "./parts/footer";
import { HackathonWinners } from "./parts/hackathon-winners";
import { Header } from "./parts/header";
import { Hero } from "./parts/hero";
import { HowItWorks } from "./parts/how-it-works";
import { OurTeam } from "./parts/our-team";
import { Sponsors } from "./parts/sponsors";
import { WhyCheckmate } from "./parts/why-checkmate";

export function LandingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <Header />
      <Hero />
      <WhyCheckmate />
      <Features />
      <HowItWorks />
      <CTA />
      <OurTeam />
      <HackathonWinners />
      <Sponsors />
      <ContactUs />
      <Footer />
    </div>
  );
}
