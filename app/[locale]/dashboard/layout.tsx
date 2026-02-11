import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../../globals.css";
import { DashboardSidebar } from '@/components/sidebar';
import { DashboardNavbar } from '@/components/navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mebayu Dashboard",
  description: "Manage your Mebayu store.",
};

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <NextIntlClientProvider messages={messages}>
          
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col ml-64 transition-all duration-300 ease-in-out">
              <DashboardNavbar />

              <main className="flex-1 p-6 md:p-8 mt-16 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
