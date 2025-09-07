"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Brain, CheckCircle, Users, Sparkles, BookOpen, GraduationCap } from "lucide-react"
import { useTranslations } from "next-intl"

export function Features() {
	const t = useTranslations("LandingPage.features")

	return (
		<section id="features" className="container mx-auto px-4 py-16">
			<div className="text-center space-y-4 mb-16">
				<h2 className="text-3xl md:text-4xl font-bold">
					{t("title")}
				</h2>
				<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
					{t("subtitle")}
				</p>
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{/* Teacher Features */}
				<Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
					<CardHeader>
						<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
							<Brain className="w-6 h-6 text-primary" />
						</div>
						<CardTitle>{t("aiTestGeneration.title")}</CardTitle>
						<CardDescription>
							{t("aiTestGeneration.description")}
						</CardDescription>
					</CardHeader>
				</Card>

				<Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
					<CardHeader>
						<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
							<CheckCircle className="w-6 h-6 text-primary" />
						</div>
						<CardTitle>{t("automatedGrading.title")}</CardTitle>
						<CardDescription>
							{t("automatedGrading.description")}
						</CardDescription>
					</CardHeader>
				</Card>

				<Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
					<CardHeader>
						<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
							<Users className="w-6 h-6 text-primary" />
						</div>
						<CardTitle>{t("studentInsights.title")}</CardTitle>
						<CardDescription>
							{t("studentInsights.description")}
						</CardDescription>
					</CardHeader>
				</Card>

				{/* Student Features */}
				<Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
					<CardHeader>
						<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
							<Sparkles className="w-6 h-6 text-primary" />
						</div>
						<CardTitle>{t("personalAiTutor.title")}</CardTitle>
						<CardDescription>
							{t("personalAiTutor.description")}
						</CardDescription>
					</CardHeader>
				</Card>

				<Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
					<CardHeader>
						<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
							<BookOpen className="w-6 h-6 text-primary" />
						</div>
						<CardTitle>{t("interactiveResults.title")}</CardTitle>
						<CardDescription>
							{t("interactiveResults.description")}
						</CardDescription>
					</CardHeader>
				</Card>

				<Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
					<CardHeader>
						<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
							<GraduationCap className="w-6 h-6 text-primary" />
						</div>
						<CardTitle>{t("studyMaterials.title")}</CardTitle>
						<CardDescription>
							{t("studyMaterials.description")}
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		</section>
	)
}
