import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://gridlocal.io"),
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
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://gridlocal.io",
    siteName: "GridLocal Miami Cars",
    images: [
      {
        url: "/og-image.jpg",
        width: 1280,
        height: 853,
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
        <meta name="monetag" content="4994e479ef014fa47d8357a2ac63960a" />
        <meta name="impact-site-verification" content="b45cd306-2b85-48b0-858a-69d255a1e9f6" />
        <meta name="fo-verify" content="004f0e07-6dcd-43cd-80c8-f81448b466da" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HYF8GFWD03"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-HYF8GFWD03');gtag('config', 'AW-18041420921');`}
        </Script>
        <Script id="gtag-ads-conversion" strategy="afterInteractive">
          {`gtag('event', 'conversion_event_page_view', {});`}
        </Script>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3399354024239327"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          data-overlays="bottom"
        />
        <Script id="taboola-pixel" strategy="afterInteractive">
          {`window._tfa = window._tfa || [];
window._tfa.push({notify: 'event', name: 'page_view', id: 2023255});
!function (t, f, a, x) {
  if (!document.getElementById(x)) {
    t.async = 1;t.src = a;t.id=x;f.parentNode.insertBefore(t, f);
  }
}(document.createElement('script'),
document.getElementsByTagName('script')[0],
'//cdn.taboola.com/libtrc/unip/2023255/tfa.js',
'tb_tfa_script');`}
        </Script>
        <Script id="monetag-vignette" strategy="afterInteractive">
          {`(function(s){s.dataset.zone='10866796',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
        </Script>
        <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
        <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
        <Script id="infolinks-init" strategy="afterInteractive">
          {`var infolinks_pid = 3444796; var infolinks_wsid = 0;`}
        </Script>
        <Script
          src="//resources.infolinks.com/js/infolinks_main.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
