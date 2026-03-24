import type { Metadata } from "next";
import Link from "next/link";
import EventCard from "@/components/EventCard";
import { getEvents } from "@/lib/ghost";

export const metadata: Metadata = {
  title: "Car Events",
  description: "Miami's best car meets, auto shows, track days, and automotive events. Your complete guide to South Florida car culture events.",
};

export default async function EventsPage() {
  const events = await getEvents();

  const now = new Date();
  const upcoming = events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = events
    .filter((e) => new Date(e.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const jsonLd = upcoming.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    startDate: event.date,
    endDate: event.endDate,
    location: {
      "@type": "Place",
      name: event.location,
      address: event.address,
    },
    description: event.description,
    image: event.image,
    url: event.link,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-background min-h-screen">
        {/* Page header */}
        <div className="bg-secondary text-white py-12">
          <div className="container-content">
            <h1 className="text-3xl sm:text-4xl font-black mb-2">Miami Car Events</h1>
            <p className="text-gray-300">
              Car meets, auto shows, track days, and more — your guide to South Florida's automotive calendar
            </p>
          </div>
        </div>

        <div className="container-content py-10">
          {/* Upcoming Events */}
          <section>
            <h2 className="text-2xl font-bold text-secondary mb-2">Upcoming Events</h2>
            <p className="text-muted mb-6">Don't miss these upcoming Miami car culture events</p>

            {upcoming.length === 0 ? (
              <p className="text-muted">No upcoming events yet. Check back soon!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcoming.map((event) => (
                  <Link key={event.id} href={`/events/${event.slug}`} className="group block">
                    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative aspect-[16/7] overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="badge bg-primary text-white">{event.category}</span>
                        </div>
                        {/* Date overlay */}
                        <div className="absolute top-3 right-3 bg-secondary/90 rounded-xl px-3 py-2 text-center min-w-[56px]">
                          <div className="text-primary text-xs font-bold uppercase">
                            {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                          </div>
                          <div className="text-white text-2xl font-black leading-none">
                            {new Date(event.date).toLocaleDateString("en-US", { day: "numeric" })}
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-secondary group-hover:text-primary transition-colors mb-2">
                          {event.name}
                        </h3>
                        <p className="text-muted text-sm line-clamp-2 mb-4">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-muted">
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {new Date(event.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Past Events */}
          {past.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-secondary mb-2">Past Events</h2>
              <p className="text-muted mb-6">Recaps and coverage from past Miami car events</p>
              <div className="flex flex-col gap-4">
                {past.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}

          {/* Submit event CTA */}
          <div className="mt-16 bg-secondary rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Got an Event?</h2>
            <p className="text-gray-300 mb-6">
              Organizing a Miami car meet, show, or track day? Submit it to our calendar and reach
              thousands of South Florida car enthusiasts.
            </p>
            <Link href="/about#contact" className="btn-accent">
              Submit Your Event
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
