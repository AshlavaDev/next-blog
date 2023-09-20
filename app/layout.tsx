import Navbar from "@/components/navigation/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";

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
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
