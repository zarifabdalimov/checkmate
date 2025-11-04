"use client";

import { slideInLeft, slideInRight } from "@/lib/animations";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function HackathonWinners() {
  const t = useTranslations("LandingPage.aboutUs");

  return (
    <section id="hackathon" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInLeft}
              className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/team/team-holding-prize.png"
                alt="Team holding prize at BlockJam Hackathon"
                fill
                className="object-cover"
                style={{ objectPosition: "50% 20%" }}
                priority={false}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInRight}
              className="flex flex-col justify-center space-y-6"
            >
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
