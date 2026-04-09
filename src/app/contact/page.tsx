import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "https://gridlocal.io/contact" },
  title: "Contact Us",
  description:
    "Get in touch with GridLocal Miami Cars. Reach out for editorial inquiries, advertising partnerships, event submissions, or general questions.",
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-secondary text-white py-12">
        <div className="container-content">
          <h1 className="text-3xl sm:text-4xl font-black mb-2">Contact Us</h1>
          <p className="text-gray-300">
            We&rsquo;d love to hear from you — whether it&rsquo;s a tip, a question, or a
            partnership opportunity.
          </p>
        </div>
      </div>

      <div className="container-content py-12">
        <div className="max-w-3xl mx-auto">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: "✉️",
                title: "General Inquiries",
                email: "hello@gridlocal.io",
                desc: "Questions, feedback, or just want to say hi.",
              },
              {
                icon: "📰",
                title: "Editorial & Press",
                email: "press@gridlocal.io",
                desc: "Story tips, press releases, and media inquiries.",
              },
              {
                icon: "🤝",
                title: "Partnerships & Advertising",
                email: "partners@gridlocal.io",
                desc: "Sponsorships, dealer features, and ad placements.",
              },
              {
                icon: "🔒",
                title: "Privacy & Legal",
                email: "privacy@gridlocal.io",
                desc: "Data requests, CCPA inquiries, and legal matters.",
              },
            ].map(({ icon, title, email, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h2 className="text-lg font-bold text-secondary mb-1">{title}</h2>
                <p className="text-muted text-sm mb-3">{desc}</p>
                <a
                  href={`mailto:${email}`}
                  className="text-primary font-semibold text-sm hover:underline"
                >
                  {email}
                </a>
              </div>
            ))}
          </div>

          {/* Submit Event */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-bold text-secondary mb-3">📅 Submit a Car Event</h2>
            <p className="text-muted text-sm mb-4">
              Organizing a car meet, show, cruise, or track day in the Miami area? We&rsquo;ll add
              it to our{" "}
              <Link href="/events" className="text-primary hover:underline">
                events calendar
              </Link>{" "}
              and promote it to thousands of South Florida car enthusiasts — for free.
            </p>
            <a
              href="mailto:hello@gridlocal.io?subject=Event%20Submission"
              className="btn-primary text-sm inline-block"
            >
              Submit Your Event →
            </a>
          </div>

          {/* Dealer CTA */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-bold text-secondary mb-3">🏢 Dealer Spotlight</h2>
            <p className="text-muted text-sm mb-4">
              Are you a Miami-area dealer or collector? Get featured on GridLocal with an editorial
              spotlight, inventory showcase, and permanent listing on our platform. We work with
              independent dealers, luxury consignment shops, and private collections.
            </p>
            <a
              href="mailto:partners@gridlocal.io?subject=Dealer%20Spotlight%20Inquiry"
              className="btn-primary text-sm inline-block"
            >
              Get Featured →
            </a>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-secondary mb-4">📍 About GridLocal</h2>
            <div className="text-muted text-sm space-y-2">
              <p>
                <strong>Operated by:</strong> Flaming Go LLC
              </p>
              <p>
                <strong>Based in:</strong> Miami, Florida
              </p>
              <p>
                <strong>Coverage area:</strong> Miami-Dade County, Broward County, and South Florida
              </p>
              <p className="pt-2">
                GridLocal Miami Cars is a digital media platform covering Miami&rsquo;s car culture
                scene. We publish daily editorial content, aggregate local car listings, and maintain
                the most comprehensive automotive events calendar in South Florida.
              </p>
              <p className="pt-2 text-xs text-gray-400">
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
                {" · "}
                <Link href="/terms" className="hover:underline">
                  Terms & Conditions
                </Link>
                {" · "}
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
