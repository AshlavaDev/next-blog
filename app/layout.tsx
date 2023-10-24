import type { Metadata } from "next";
import { Noto_Sans_Mono, Libre_Franklin } from "next/font/google"

import Navbar from "@/components/navigation/Navbar";
import "./globals.css";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/providers/toast-provider";

export const metadata: Metadata = {
  title: "Next Blogging",
  description: "A Next 13 test blog site",
};

const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-mono",
})

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre-franklin",
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en" className={`${notoSansMono.variable} ${libreFranklin.variable}`}>
      <body className="min-h-screen font-main bg-gray-200 dark:bg-gray-950 text-gray-900 dark:text-gray-200">
        <ToastProvider />
        <Navbar currentUser={currentUser} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
