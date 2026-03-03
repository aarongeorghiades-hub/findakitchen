import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "FindAKitchen.co.uk — Temporary & Mobile Kitchen Hire UK",
    template: "%s | FindAKitchen.co.uk",
  },
  description:
    "Find the right temporary kitchen for your situation. Whether it's a renovation, flood damage, insurance claim, or commercial project — we'll guide you to the perfect solution and connect you with trusted providers.",
  metadataBase: new URL("https://findakitchen.co.uk"),
  openGraph: {
    siteName: "FindAKitchen.co.uk",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
