"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export function CTA() {
	const t = useTranslations("LandingPage.cta")

	return (
		<section className="container mx-auto px-4 py-20">
			<div className="text-center space-y-8 max-w-3xl mx-auto">
				<h2 className="text-3xl md:text-4xl font-bold">
					{t("title")}
				</h2>
				<p className="text-lg text-muted-foreground">
					{t("subtitle")}
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button size="lg" className="text-lg font-semibold px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all">
						{t("startTrial")}
					</Button>
					<Button variant="outline" size="lg" className="text-lg font-semibold px-8 py-4 h-auto border-2 hover:bg-primary/5 transition-all">
						{t("scheduleDemo")}
					</Button>
				</div>
			</div>
		</section>
	)
}
