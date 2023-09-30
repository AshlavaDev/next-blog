import Navbar from "@/components/navigation/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/providers/toast-provider";

export const metadata: Metadata = {
  title: "Next Blog",
  description: "A Next 13 test blog site",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className="min-h-screen">
        <ToastProvider />
        <Navbar currentUser={currentUser} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
