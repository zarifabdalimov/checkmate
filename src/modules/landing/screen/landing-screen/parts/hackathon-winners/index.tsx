"use client";

import { Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export function HackathonWinners() {
  const t = useTranslations("LandingPage.aboutUs");

  return (
    <section id="hackathon" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/team/team-holding-prize.png"
              alt="Team holding prize at BlockJam Hackathon"
              fill
              className="object-cover"
              style={{ objectPosition: "50% 20%" }}
              priority={false}
            />
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <Trophy className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {t("achievement.title")}
              </h2>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t("achievement.description")}
            </p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
