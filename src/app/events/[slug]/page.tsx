import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getEventBySlug, getEvents } from "@/lib/ghost";

interface EventPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: "Event Not Found" };

  return {
    title: event.name,
    description: event.description.slice(0, 160),
    openGraph: {
      title: event.name,
      description: event.description.slice(0, 160),
      images: [{ url: event.image }],
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  const date = new Date(event.date);
  const endDate = event.endDate ? new Date(event.endDate) : null;

  const siteUrl = "https://gridlocal.io";
  const eventUrl = `${siteUrl}/events/${event.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    startDate: event.date,
    endDate: event.endDate || event.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.address,
        addressLocality: "Miami",
        addressRegion: "FL",
        addressCountry: "US",
      },
    },
    description: event.description,
    image: event.image,
    url: eventUrl,
    organizer: {
      "@type": "Organization",
      name: event.location,
      url: event.link && event.link !== "#" ? event.link : eventUrl,
    },
    performer: {
      "@type": "Organization",
      name: "Miami Car Community",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: eventUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-background min-h-screen">
        {/* Hero image */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 container-content">
            <span className="badge bg-primary text-white mb-2 inline-block">{event.category}</span>
          </div>
        </div>

        <div className="container-content py-10">
          <div className="max-w-3xl mx-auto">
            <nav className="text-sm text-muted mb-6 flex items-center gap-2">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link href="/events" className="hover:text-primary">Events</Link>
              <span>/</span>
              <span className="text-secondary">{event.name}</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-black text-secondary mb-6">{event.name}</h1>

            {/* Event details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  ),
                  label: "Date",
                  value: date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ),
                  label: "Time",
                  value: `${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}${endDate ? ` – ${endDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}` : ""}`,
                },
                {
                  icon: (
                    <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>
                  ),
                  label: "Location",
                  value: event.location,
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l1.553-4.658A2 2 0 016.447 4h11.105a2 2 0 011.894 1.342L21 10M3 10h18M3 10v8a2 2 0 002 2h14a2 2 0 002-2v-8" />
                  ),
                  label: "Address",
                  value: event.address,
                },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-xs font-bold text-muted uppercase mb-1">{label}</p>
                  <p className="text-sm font-medium text-secondary">{value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
              <h2 className="text-lg font-bold text-secondary mb-4">About This Event</h2>
              <p className="text-secondary leading-relaxed">{event.description}</p>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              {event.link && event.link !== "#" && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Visit Event Page
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Get Directions
              </a>
              <Link href="/events" className="btn-secondary">
                ← All Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
