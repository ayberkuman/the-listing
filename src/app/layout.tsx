import Providers from "@/providers";
import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "The Listing",
  description: "An app for listing things",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, " antialiased dark:bg-none grainy")}>
        <Providers>
          <Toaster />
          <NextTopLoader />
          <Header />
          <div className="container">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
