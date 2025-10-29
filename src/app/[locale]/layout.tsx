import { InitAmplify } from "@/modules/amplify/parts/init-amplify";
import { Toaster } from "@/modules/ui/sonner";
import { QueryProvider } from "@/modules/providers/query-provider";
import { METADATA_CONSTANTS } from "@/lib/constants/metadata";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter, Lora } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { PropsWithChildren } from "react";
import "../globals.css";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<PropsWithChildren<Props>>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${lora.variable}`}>
        <InitAmplify />
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}

