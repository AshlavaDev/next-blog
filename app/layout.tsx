import type { Metadata } from "next";
import { Noto_Sans_Mono, Libre_Franklin } from "next/font/google";

import Navbar from "@/components/navigation/Navbar";
import "./globals.css";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/providers/toast-provider";

export const metadata: Metadata = {
  title: "Next Blogging",
  description: "The Next and Last Blogging Site You Will Need!",
};

const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-mono",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre-franklin",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html
      lang="en"
      className={`${notoSansMono.variable} ${libreFranklin.variable}`}
    >
      <body className="min-h-screen bg-gray-200 font-main text-gray-900 dark:bg-gray-950 dark:text-gray-200">
        <ToastProvider />
        <Navbar currentUser={currentUser} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
