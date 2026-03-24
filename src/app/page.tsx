import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import ArticleCard from "@/components/ArticleCard";
import ListingCard from "@/components/ListingCard";
import EventCard from "@/components/EventCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { getPosts, getListings, getEvents } from "@/lib/ghost";

export const metadata: Metadata = {
  title: "GridLocal Miami Cars — Miami's #1 Source for Car Culture, Listings & Events",
  description:
    "Miami's #1 source for exotic car culture, local car meets, vehicle listings, and automotive events. ",
};

export default async function HomePage() {
  const [articles, listings, events] = await Promise.all([
    getPosts(),
    getListings(),
    getEvents(),
  ]);

  const featuredArticles = articles.slice(0, 3);
  const featuredListings = listings.slice(0, 6);
  const upcomingEvents = events.filter((e) => !e.isPast).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GridLocal Miami Cars",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://miami.gridlocal.io",
    description: "Miami's #1 source for car culture, listings, and events",
    potentialAction: {
      "@type": "SearchAction",
      target: `${process.env.NEXT_PUBLIC_SITE_URL || "https://miami.gridlocal.io"}/articles?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <Hero />

      {/* Featured Articles */}
      <section className="py-16 bg-background">
        <div className="container-content">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Latest from Miami</h2>
              <p className="section-subtitle">Car culture news, spotlights, and buyer guides</p>
            </div>
            <Link href="/articles" className="btn-secondary text-sm hidden sm:inline-flex">
              All Articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link href="/articles" className="btn-secondary w-full text-center justify-center">
              All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-white">
        <div className="container-content">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Hot Listings</h2>
              <p className="section-subtitle">The best cars available in Miami right now</p>
            </div>
            <Link href="/listings" className="btn-primary text-sm hidden sm:inline-flex">
              Browse All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link href="/listings" className="btn-primary w-full text-center justify-center">
              Browse All Listings →
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-background">
        <div className="container-content">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Upcoming Events</h2>
              <p className="section-subtitle">Miami's best car culture events, meets, and shows</p>
            </div>
            <Link href="/events" className="btn-secondary text-sm hidden sm:inline-flex">
              All Events →
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link href="/events" className="btn-secondary w-full text-center justify-center">
              All Events →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Why GridLocal */}
      <section className="py-16 bg-white">
        <div className="container-content">
          <div className="text-center mb-12">
            <h2 className="section-title">Why GridLocal?</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              We built the platform Miami's car community deserves
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤖",
                title: "AI-Powered Coverage",
                desc: "Our AI scours the web 24/7 to surface the most interesting cars, meets, and news in Miami — before anyone else.",
              },
              {
                icon: "🏎️",
                title: "Miami-First",
                desc: "We're not a national aggregator that mentions Miami occasionally. We live and breathe South Florida car culture.",
              },
              {
                icon: "💰",
                title: "Real Market Intel",
                desc: "Weekly market analysis on what Miami exotics are actually trading for — not sticker prices, real transaction data.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-secondary mb-2">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
