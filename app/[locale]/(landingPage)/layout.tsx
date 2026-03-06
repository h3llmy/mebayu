import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../../globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/floatingButton";
import { Locale } from '@/types';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mebayu.dwikihome.my.id"), // change to your real domain

  title: {
    default: "Mebayu | Handmade Leather Bags from Bali",
    template: "%s | Mebayu Leather Bali",
  },

  description:
    "Mebayu is a Bali-based handmade leather brand crafting timeless bags and accessories. Premium genuine leather, minimalist silhouettes, and artisan craftsmanship.",

  keywords: [
    "Mebayu",
    "Mebayu Bali",
    "Handmade leather bag Bali",
    "Tas kulit Bali",
    "Genuine leather Indonesia",
    "Local leather brand Indonesia",
    "Handcrafted leather bags",
    "Minimalist leather bag",
  ],

  authors: [{ name: "Mebayu" }],
  creator: "Mebayu",
  publisher: "Mebayu",

  openGraph: {
    title: "Mebayu | Handmade Leather Bags from Bali",
    description:
      "Discover handcrafted leather bags made in Bali. Timeless silhouettes, premium materials, and artisan craftsmanship.",
    url: "https://mebayu.dwikihome.my.id", // change to your real domain
    siteName: "Mebayu",
    images: [
      {
        url: "/hero-2.png", // add this in public folder
        width: 1200,
        height: 630,
        alt: "Mebayu Handmade Leather Bags",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mebayu | Handmade Leather Bags from Bali",
    description:
      "Premium handcrafted leather bags made in Bali.",
    images: ["/hero-2.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  category: "fashion",
  alternates: {
    canonical: "https://mebayu.dwikihome.my.id",
    languages: {
      "en": "https://mebayu.dwikihome.my.id/en",
      "id": "https://mebayu.dwikihome.my.id/id",
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual code from Google Search Console
  },
};

export default async function LandingPageLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(typedLocale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <WhatsAppButton phoneNumber="0817085750446" />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
