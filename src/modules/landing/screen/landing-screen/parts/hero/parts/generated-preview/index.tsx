"use client";

import { Card } from "@/modules/ui/card";
import { Button } from "@/modules/ui/button";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Download, Share2, FileText } from "lucide-react";

interface GeneratedPreviewProps {
  content: string;
}

export function GeneratedPreview({ content }: GeneratedPreviewProps) {
  const t = useTranslations("ShowcasePage.preview");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-12"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium mb-4">
          <FileText className="h-4 w-4" />
          {t("badge")}
        </div>
        <h2 className="text-2xl font-semibold mb-2">{t("title")}</h2>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <Card className="p-8 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="p-6 rounded-lg bg-muted/50 border">
              <p className="text-sm text-muted-foreground mb-2 font-medium">
                {t("yourPrompt")}
              </p>
              <p className="text-base">{content}</p>
            </div>

            <div className="mt-8 p-6 rounded-lg border-2 border-primary/20 bg-primary/5">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold m-0">
                  {t("generatedTest")}
                </h3>
              </div>
              <div className="space-y-4 text-sm">
                <p className="text-muted-foreground italic">
                  {t("previewPlaceholder")}
                </p>
                <div className="text-muted-foreground">
                  <p>{t("apiNotice")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" className="gap-2" disabled>
              <Download className="h-4 w-4" />
              {t("download")}
            </Button>
            <Button variant="outline" className="gap-2" disabled>
              <Share2 className="h-4 w-4" />
              {t("share")}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
