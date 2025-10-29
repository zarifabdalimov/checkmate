"use client";

import { Card, CardDescription, CardHeader } from "@/modules/ui/card";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function Sponsors() {
  const t = useTranslations("LandingPage.aboutUs");

  return (
    <section id="sponsors" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("sponsorship.title")}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2">
            <CardHeader className="text-center space-y-6">
              <CardDescription className="text-base">
                {t("sponsorship.description")}
              </CardDescription>

              <div className="space-y-4">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {t("sponsorship.partnersTitle")}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 pt-2">
                  <Link
                    href="https://theta-euro.com/block-jam/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 w-auto flex items-center grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                  >
                    <Image
                      src="/sponzors/block-jam.png"
                      alt="BlockJam"
                      width={100}
                      height={48}
                      className="object-contain max-h-12"
                    />
                  </Link>

                  <Link
                    href="https://www.thetaedgecloud.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 w-auto flex items-center grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                  >
                    <Image
                      src="/sponzors/theta-edge-cloud.png"
                      alt="Theta EdgeCloud"
                      width={140}
                      height={48}
                      className="object-contain"
                    />
                  </Link>

                  <Link
                    href="https://www.thetatoken.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 w-auto flex items-center grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                  >
                    <Image
                      src="/sponzors/theta.png"
                      alt="Theta Network"
                      width={100}
                      height={48}
                      className="object-contain"
                    />
                  </Link>

                  <Link
                    href="https://aws.amazon.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 w-auto flex items-center grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                  >
                    <Image
                      src="/sponzors/aws.png"
                      alt="Amazon Web Services"
                      width={80}
                      height={48}
                      className="object-contain"
                    />
                  </Link>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
