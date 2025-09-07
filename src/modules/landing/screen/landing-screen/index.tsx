import { Header } from "./parts/header"
import { Hero } from "./parts/hero"
import { Features } from "./parts/features"
import { HowItWorks } from "./parts/how-it-works"
import { CTA } from "./parts/cta"
import { Footer } from "./parts/footer"

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
	)
}
