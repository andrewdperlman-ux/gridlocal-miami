import type { Metadata } from "next";
import Script from "next/script";
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
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Ferrari_Testarossa_%281990%29_%2852864606105%29.jpg/1280px-Ferrari_Testarossa_%281990%29_%2852864606105%29.jpg",
        width: 1200,
        height: 630,
        alt: "GridLocal Miami Cars — White Ferrari Testarossa, Miami Vice Style",
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
      <head>
        <meta name="impact-site-verification" content="b45cd306-2b85-48b0-858a-69d255a1e9f6" />
        <meta name="fo-verify" content="004f0e07-6dcd-43cd-80c8-f81448b466da" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HYF8GFWD03"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-HYF8GFWD03');`}
        </Script>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3399354024239327"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
        <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
