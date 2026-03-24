import Link from "next/link";
import type { Event } from "@/types";

const categoryColors: Record<string, string> = {
  "Car Meet": "bg-green-100 text-green-700",
  "Auto Show": "bg-blue-100 text-blue-700",
  "Track Day": "bg-red-100 text-red-700",
  Cruise: "bg-cyan-100 text-cyan-700",
  Auction: "bg-amber-100 text-amber-700",
  Exhibition: "bg-purple-100 text-purple-700",
};

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const date = new Date(event.date);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  return (
    <Link href={`/events/${event.slug}`} className="group block">
      <article className="card flex gap-4 p-4 sm:p-5">
        {/* Date badge */}
        <div className="shrink-0 w-16 h-16 bg-secondary rounded-xl flex flex-col items-center justify-center">
          <span className="text-primary text-xs font-bold uppercase">{month}</span>
          <span className="text-white text-2xl font-black leading-none">{day}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-secondary group-hover:text-primary transition-colors text-base line-clamp-1">
              {event.name}
            </h3>
            <span className={`badge shrink-0 ${categoryColors[event.category] || "bg-gray-100 text-gray-700"}`}>
              {event.category}
            </span>
          </div>
          <p className="text-muted text-sm line-clamp-2 mb-2">{event.description}</p>
          <div className="flex flex-wrap gap-3 text-xs text-muted">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.location}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {time}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
