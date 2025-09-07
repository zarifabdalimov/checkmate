"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, GraduationCap, Linkedin, Mail, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("LandingPage.footer");

  return (
    <footer id="about" className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">CheckMate</span>
            </div>
            <p className="text-muted-foreground max-w-sm">{t("tagline")}</p>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t("product.title")}</h4>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("product.features")}
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("product.pricing")}
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("product.demo")}
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("product.documentation")}
              </a>
            </nav>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t("company.title")}</h4>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("company.about")}
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("company.careers")}
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("company.blog")}
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("company.contact")}
              </a>
            </nav>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t("support.title")}</h4>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("support.helpCenter")}
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("support.tutorials")}
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("support.community")}
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("support.status")}
              </a>
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t("legal.title")}</h4>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("legal.privacy")}
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("legal.terms")}
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("legal.cookies")}
              </a>
            </nav>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">{t("copyright")}</p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {t("social.followUs")}:
            </span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Twitter className="w-4 h-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Linkedin className="w-4 h-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Github className="w-4 h-4" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Mail className="w-4 h-4" />
                <span className="sr-only">Email</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
