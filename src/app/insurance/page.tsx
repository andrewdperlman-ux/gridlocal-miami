import type { Metadata } from "next";
import Link from "next/link";
import InsuranceQuoteForm from "@/components/InsuranceQuoteForm";

export const metadata: Metadata = {
  title: "Exotic Car Insurance Quotes — Miami | GridLocal",
  description:
    "Get free exotic car insurance quotes from Miami's top-rated agents. Specialists in Ferrari, Lamborghini, Porsche, McLaren, and luxury vehicle coverage. Average savings: $1,200/year.",
  keywords: [
    "exotic car insurance Miami",
    "Ferrari insurance quote",
    "Lamborghini insurance Miami",
    "luxury car insurance Florida",
    "supercar insurance quote",
    "agreed value insurance Miami",
  ],
};

export default function InsurancePage() {
  return (
    <>
      {/* SEO Hero */}
      <section className="pt-20 pb-10 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container-content max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Exotic Car Insurance in Miami
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Miami has some of the highest auto insurance rates in the country — and insuring an exotic
            is a whole different game. Standard carriers don&apos;t understand agreed-value policies,
            track day coverage, or seasonal storage. We connect you with agents who do.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-slate-800">
        <div className="container-content max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "💰",
                title: "Save $1,200+/yr",
                desc: "Exotic specialists offer better rates than standard carriers for high-value vehicles.",
              },
              {
                icon: "🛡️",
                title: "Agreed Value",
                desc: "Get paid your car's actual market value in a total loss — not a depreciated estimate.",
              },
              {
                icon: "🏎️",
                title: "Track Day Coverage",
                desc: "Optional coverage for HPDE events and track days — most standard policies exclude this.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-xl bg-white/5">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Quiz CTA Banner */}
      <section className="py-10 bg-gradient-to-r from-primary/20 to-orange-500/10 border-y border-primary/30">
        <div className="container-content max-w-3xl mx-auto text-center px-4">
          <div className="text-3xl mb-3">🏎️</div>
          <h2 className="text-2xl font-black text-white mb-2">
            Want to Know What You Should Actually Pay?
          </h2>
          <p className="text-gray-400 mb-5">
            Try our interactive 4-step insurance calculator for an instant personalized premium estimate.
          </p>
          <Link
            href="/insurance-quote"
            className="inline-flex items-center gap-2 bg-primary hover:bg-orange-600 text-white py-3 px-8 rounded-lg font-black text-lg transition-colors shadow-lg shadow-primary/25"
          >
            Take the Insurance Quiz 🚀
          </Link>
        </div>
      </section>

      {/* Quote Form */}
      <InsuranceQuoteForm />

      {/* FAQ / SEO Content */}
      <section className="py-16 bg-white">
        <div className="container-content max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-secondary mb-8 text-center">
            Exotic Car Insurance FAQ
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "How much does exotic car insurance cost in Miami?",
                a: "Expect $4,000–$8,000/year for a typical exotic like a Lamborghini Huracán or Ferrari 488. Factors include your age, driving record, storage situation, and annual mileage. Under-30 drivers or those with incidents can see $10,000+.",
              },
              {
                q: "What's the difference between agreed value and stated value?",
                a: "Agreed value means you and the insurer agree on the car's worth upfront — that's what you get in a total loss. Stated value means the insurer can still depreciate the payout. For exotics, always insist on agreed value.",
              },
              {
                q: "Which insurance companies cover exotic cars in Miami?",
                a: "Specialists like Hagerty, Chubb, and AIG Private Client are the go-to for exotics. Some standard carriers (State Farm, Progressive) will cover them but often with restrictions on mileage and usage.",
              },
              {
                q: "Does my insurance cover track days?",
                a: "Most standard policies explicitly exclude track use. If you do HPDE events or track days at Homestead-Miami Speedway, you'll need a separate track day policy or a carrier that offers it as an add-on.",
              },
              {
                q: "Should I garage my exotic to save on insurance?",
                a: "Yes — garaged vehicles get significantly lower rates in Miami. Street parking or open lots increase risk of theft, vandalism, and weather damage, all of which raise premiums.",
              },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-gray-100 pb-6">
                <h3 className="font-bold text-secondary text-lg mb-2">{faq.q}</h3>
                <p className="text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
