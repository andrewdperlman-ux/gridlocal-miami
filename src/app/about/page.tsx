import type { Metadata } from "next";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "About GridLocal Miami Cars",
  description: "Learn about GridLocal Miami Cars — Miami's AI-powered car culture media site and listing aggregator. Including our AI editorial disclosure.",
};

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-secondary text-white py-12">
        <div className="container-content">
          <h1 className="text-3xl sm:text-4xl font-black mb-2">About GridLocal Miami Cars</h1>
          <p className="text-gray-300">Miami's AI-powered car culture platform</p>
        </div>
      </div>

      <div className="container-content py-12">
        <div className="max-w-3xl mx-auto">
          {/* What is GridLocal */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-4">What is GridLocal?</h2>
            <p className="text-secondary leading-relaxed mb-4">
              GridLocal Miami Cars is the definitive digital home for Miami's car culture. We combine AI-powered editorial coverage with a curated listing aggregator to create the most comprehensive automotive resource in South Florida.
            </p>
            <p className="text-secondary leading-relaxed mb-4">
              We cover everything: weekly Supercar Saturday recaps, Wynwood car meet highlights, exotic car market analysis, buyer guides for first-time exotic owners, and a constantly updated inventory of the most interesting cars for sale in the Miami area.
            </p>
            <p className="text-secondary leading-relaxed">
              Whether you're a lifelong gearhead, a weekend car spotter, or looking to buy your next vehicle, GridLocal Miami is your guide to the South Florida automotive scene.
            </p>
          </section>

          {/* Mission */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-4">Our Mission</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: "🚗",
                  title: "Celebrate Miami's Car Culture",
                  desc: "Miami has one of the most vibrant car scenes in the world. We're dedicated to documenting and celebrating it.",
                },
                {
                  icon: "📊",
                  title: "Market Transparency",
                  desc: "Real pricing data, honest reviews, and market analysis so enthusiasts can make smart buying decisions.",
                },
                {
                  icon: "🤝",
                  title: "Build the Community",
                  desc: "Connecting car enthusiasts across South Florida — from first-time buyers to serious collectors.",
                },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-secondary mb-2">{item.title}</h3>
                  <p className="text-muted text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* AI Disclosure — FTC Compliance */}
          <section className="bg-amber-50 border border-amber-200 rounded-2xl p-8 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">🤖</span>
              <div>
                <h2 className="text-xl font-bold text-secondary mb-1">AI Editorial Disclosure</h2>
                <p className="text-sm text-amber-700 font-medium">In accordance with FTC guidelines on AI-generated content</p>
              </div>
            </div>
            <div className="space-y-3 text-secondary text-sm leading-relaxed">
              <p>
                <strong>GridLocal Miami Cars uses artificial intelligence to generate editorial content.</strong> Articles, event descriptions, market analyses, and other editorial copy on this site are produced using large language model AI technology.
              </p>
              <p>
                While our AI is trained to be accurate and draws from publicly available information, <strong>AI-generated content may contain errors, inaccuracies, or omissions.</strong> We recommend verifying any factual claims — particularly pricing, specifications, and event details — through official sources.
              </p>
              <p>
                <strong>Listings aggregated on this site are sourced from third-party platforms</strong> (dealers, auction houses, private sellers). GridLocal does not independently verify listing accuracy. Always conduct your own due diligence before any vehicle purchase.
              </p>
              <p>
                <strong>Affiliate relationships:</strong> Some listing links may contain affiliate codes. GridLocal may earn a commission when users click through to partner platforms. This does not influence which listings are featured.
              </p>
              <p>
                By using this site, you acknowledge that you understand our content is AI-generated and agree to our terms of service.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-6">Get in Touch</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: "✉️", label: "General Inquiries", value: "hello@gridlocal.io" },
                { icon: "📰", label: "Editorial / Press", value: "press@gridlocal.io" },
                { icon: "🤝", label: "Partnerships & Advertising", value: "partners@gridlocal.io" },
                { icon: "📍", label: "Based In", value: "Miami, Florida" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="text-xs font-bold text-muted uppercase mb-0.5">{label}</p>
                    <p className="text-secondary font-medium text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t">
              <h3 className="font-bold text-secondary mb-3">Submit an Event</h3>
              <p className="text-sm text-muted mb-4">
                Organizing a Miami car event? We'll add it to our calendar and promote it to our audience.
              </p>
              <a
                href="mailto:hello@gridlocal.io?subject=Event Submission"
                className="btn-primary text-sm"
              >
                Submit Your Event →
              </a>
            </div>
          </section>

          {/* Legal */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-secondary mb-4">Legal</h2>
            <div className="space-y-3 text-sm text-muted">
              <p>© {new Date().getFullYear()} GridLocal Miami Cars. All rights reserved.</p>
              <p>GridLocal Miami Cars is operated independently and is not affiliated with any car manufacturer, dealer, or auction house unless explicitly noted.</p>
              <p>Vehicle listings are aggregated from publicly available third-party sources. GridLocal makes no warranties regarding the accuracy of listings.</p>
              <p>All AI-generated editorial content is original to GridLocal and protected by copyright. Reproduction without permission is prohibited.</p>
            </div>
          </section>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterSignup variant="dark" />
    </div>
  );
}
