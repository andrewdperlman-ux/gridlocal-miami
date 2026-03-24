import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://miami.gridlocal.io"),
  title: {
    default: "GridLocal Miami Cars — Miami's #1 Source for Car Culture, Listings & Events",
    template: "%s | GridLocal Miami Cars",
  },
  description:
    "The definitive source for Miami exotic car culture, local car meets, vehicle listings, and automotive events. AI-powered editorial, updated daily.",
  keywords: ["Miami cars", "exotic cars Miami", "Miami car meets", "car listings Miami", "Miami auto events"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://miami.gridlocal.io",
    siteName: "GridLocal Miami Cars",
    images: [
      {
        url: "https://picsum.photos/seed/og-miami/1200/630",
        width: 1200,
        height: 630,
        alt: "GridLocal Miami Cars",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@gridlocal_miami",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
