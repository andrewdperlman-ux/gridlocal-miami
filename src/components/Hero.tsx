import Link from "next/link";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  imageUrl?: string;
  badge?: string;
}

export default function Hero({
  title = "Miami's Car Culture Hub",
  subtitle = "The definitive source for exotic car spotting, South Florida car meets, exclusive listings, and automotive news — curated daily by AI for Miami's car obsessed.",
  ctaText = "Explore Articles",
  ctaHref = "/articles",
  secondaryCtaText = "Browse Listings",
  secondaryCtaHref = "/listings",
  imageUrl = "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&h=1080&fit=crop",
  badge = "🚗 Miami's #1 Car Culture Hub",
}: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      {/* Overlay — dark gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
      {/* Orange accent glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Content */}
      <div className="relative container-content py-20">
        <div className="max-w-2xl">
          {badge && (
            <span className="inline-block badge bg-primary/20 border border-primary/40 text-primary mb-6 text-xs">
              {badge}
            </span>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            {title.split(", ").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <>
                    ,{" "}
                  </>
                )}
                {i === arr.length - 1 && part.includes("AI") && (
                  <></>
                )}
              </span>
            ))}
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href={ctaHref} className="btn-primary text-base">
              {ctaText}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href={secondaryCtaHref} className="btn-accent text-base">
              {secondaryCtaText}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            {[
              { value: "300+", label: "Articles" },
              { value: "1,200+", label: "Listings" },
              { value: "50+", label: "Events/Year" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-accent">{stat.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
