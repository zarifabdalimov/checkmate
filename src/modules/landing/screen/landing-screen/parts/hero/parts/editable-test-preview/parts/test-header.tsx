"use client";

import { Button } from "@/modules/ui/button";
import { Download, Edit2, Save, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface TestHeaderProps {
  isEditing: boolean;
  onToggleEdit: () => void;
  onExportPDF: () => void;
  onClose?: () => void;
}

export function TestHeader({
  isEditing,
  onToggleEdit,
  onExportPDF,
  onClose,
}: TestHeaderProps) {
  const t = useTranslations("ShowcasePage.preview");

  return (
    <div className="flex justify-between items-start print:hidden">
      <div className="flex gap-2">
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          onClick={onToggleEdit}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4" />
              {t("saveEdits")}
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4" />
              {t("editTest")}
            </>
          )}
        </Button>
        <Button variant="outline" size="sm" onClick={onExportPDF}>
          <Download className="h-4 w-4" />
          {t("exportPdf")}
        </Button>
      </div>
      {onClose && (
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
