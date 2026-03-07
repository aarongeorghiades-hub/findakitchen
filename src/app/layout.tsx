import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "FindAKitchen — Temporary & Mobile Kitchen Hire UK",
    template: "%s | FindAKitchen",
  },
  description:
    "Compare every temporary kitchen provider in the UK — domestic pods for renovations, commercial hire for businesses. One place, zero hassle.",
  metadataBase: new URL("https://findakitchen.co.uk"),
  openGraph: {
    siteName: "FindAKitchen",
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
    <html lang="en" className={`${instrumentSerif.variable} ${dmSans.variable}`}>
      <body>
        <Nav />
        <main className="pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
