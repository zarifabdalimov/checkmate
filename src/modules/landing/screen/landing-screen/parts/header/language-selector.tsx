"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/modules/ui/select";
import { useLocale } from "next-intl";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
];

export function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const currentLanguage = languages.find((lang) => lang.code === locale);

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-full sm:w-[140px]">
        <div className="flex items-center justify-center sm:justify-start gap-2 w-full">
          <span>{currentLanguage?.flag}</span>
          <span>{currentLanguage?.name}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <span className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
