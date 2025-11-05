import { routing } from "@/i18n/routing";
import { getMetadataForLocale } from "@/lib/constants/metadata";
import { InitAmplify } from "@/modules/amplify/parts/init-amplify";
import { QueryProvider } from "@/modules/providers/query-provider";
import { Toaster } from "@/modules/ui/sonner";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter, Lora } from "next/font/google";
import { notFound } from "next/navigation";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getMetadataForLocale(locale);

  return {
    title: {
      template: `%s | ${metadata.BRAND_NAME}`,
      default: metadata.BRAND_FULL,
    },
    description: metadata.MAIN_DESCRIPTION,
    keywords: metadata.KEYWORDS,
    authors: [{ name: metadata.AUTHOR }],
    creator: metadata.CREATOR,
    openGraph: {
      type: metadata.OG_TYPE,
      locale: metadata.OG_LOCALE,
      title: metadata.BRAND_FULL,
      description: metadata.MAIN_DESCRIPTION,
      siteName: metadata.BRAND_NAME,
    },
    twitter: {
      card: metadata.TWITTER_CARD,
      title: metadata.BRAND_FULL,
      description: metadata.MAIN_DESCRIPTION,
    },
  };
}

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
