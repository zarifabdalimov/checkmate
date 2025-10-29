"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/modules/ui/avatar";
import { Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function OurTeam() {
  const t = useTranslations("LandingPage.aboutUs");

  const team = [
    {
      name: "Zarif Abdalimov",
      photo: "/team/zarif.png",
      position: "frontend",
      linkedin: "https://www.linkedin.com/in/zarif-abdalimov/",
    },
    {
      name: "Kaylee Reed",
      photo: "/team/kaylee.png",
      position: "backendDevops",
      linkedin: "https://www.linkedin.com/in/kiwipetal/",
    },
    {
      name: "Filip Ohanka",
      photo: "/team/filip.png",
      position: "backendBusiness",
      linkedin: "https://www.linkedin.com/in/filip-ohanka-bb1419200/",
    },
    {
      name: "Honza Zabloudil",
      photo: "/team/honza.png",
      position: "backendProduct",
      linkedin: "https://www.linkedin.com/in/jan-zabloudil/",
    },
  ];

  return (
    <section id="team" className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("team.title")}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("team.subtitle")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-12 pt-4">
          {team.map((member) => (
            <Link
              key={member.name}
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-4 transition-all duration-300"
            >
              <Avatar className="w-48 h-48 border-4 border-primary/20 group-hover:border-primary/50 transition-all group-hover:scale-105">
                <AvatarImage src={member.photo} alt={member.name} />
                <AvatarFallback className="text-5xl font-bold text-primary">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center space-y-1">
                <h4 className="font-semibold text-xl group-hover:text-primary transition-colors">
                  {member.name}
                </h4>
                <p className="text-base text-muted-foreground max-w-[220px]">
                  {t(`team.positions.${member.position}`)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
