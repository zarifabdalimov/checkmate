import { InitAmplify } from "@/modules/amplify/parts/init-amplify";
import { Toaster } from "@/modules/ui/sonner";
import { QueryProvider } from "@/modules/providers/query-provider";
import { METADATA_CONSTANTS } from "@/lib/constants/metadata";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { PropsWithChildren } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${METADATA_CONSTANTS.BRAND_NAME}`,
    default: METADATA_CONSTANTS.BRAND_FULL,
  },
  description: METADATA_CONSTANTS.MAIN_DESCRIPTION,
  keywords: METADATA_CONSTANTS.KEYWORDS,
  authors: [{ name: METADATA_CONSTANTS.AUTHOR }],
  creator: METADATA_CONSTANTS.CREATOR,
  openGraph: {
    type: METADATA_CONSTANTS.OG_TYPE,
    locale: METADATA_CONSTANTS.OG_LOCALE,
    title: METADATA_CONSTANTS.BRAND_FULL,
    description: METADATA_CONSTANTS.MAIN_DESCRIPTION,
    siteName: METADATA_CONSTANTS.BRAND_NAME,
  },
  twitter: {
    card: METADATA_CONSTANTS.TWITTER_CARD,
    title: METADATA_CONSTANTS.BRAND_FULL,
    description: METADATA_CONSTANTS.MAIN_DESCRIPTION,
  },
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable}`}>
        <InitAmplify />
        <QueryProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
