import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/floatingButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mebayu.id"), // change to your real domain

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
    url: "https://mebayu.id", // change to your real domain
    siteName: "Mebayu",
    images: [
      {
        url: "/favicon.ico", // add this in public folder
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
    images: ["/https://mebayu.id"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  category: "fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </head> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <WhatsAppButton phoneNumber="0817085750446" />
        <Footer />
      </body>
    </html>
  );
}
