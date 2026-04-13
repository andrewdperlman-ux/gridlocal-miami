import type { Metadata } from "next";
import AccidentLeadForm from "@/components/AccidentLeadForm";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "https://gridlocal.io/accident-claim" },
  title: "Free Car Accident Case Evaluation — Miami",
  description:
    "Were you injured in a car accident in Miami? Get a free case evaluation from an experienced personal injury attorney. No fees unless you win.",
  keywords: [
    "car accident lawyer Miami",
    "free case evaluation",
    "personal injury attorney Miami",
    "motorcycle accident lawyer Miami",
    "hit and run Miami",
    "auto accident attorney Florida",
  ],
  openGraph: {
    title: "Free Car Accident Case Evaluation — Miami",
    description:
      "Injured in a Miami car accident? Get a free case evaluation from a qualified personal injury attorney. No fees unless you win.",
    type: "website",
    url: "https://gridlocal.io/accident-claim",
    siteName: "GridLocal Miami Cars",
  },
};

export default function AccidentClaimPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-10 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container-content max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Injured in a Miami Car Accident?
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed mb-2">
            Get a <strong className="text-white">free case evaluation</strong> from an experienced
            personal injury attorney. No fees unless you win.
          </p>
          <p className="text-sm text-gray-500">
            Takes less than 2 minutes · 100% confidential · No obligation
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 bg-gray-50 -mt-4">
        <div className="container-content max-w-xl mx-auto">
          <AccidentLeadForm />
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-12 bg-white">
        <div className="container-content max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-bold text-gray-900 mb-1">No Fees Unless You Win</h3>
              <p className="text-sm text-gray-600">
                Personal injury attorneys work on contingency — you pay nothing upfront and nothing
                unless your case is successful.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-bold text-gray-900 mb-1">Fast Response</h3>
              <p className="text-sm text-gray-600">
                Most attorneys respond within 24 hours. For urgent cases, many offer same-day
                consultations.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-bold text-gray-900 mb-1">100% Confidential</h3>
              <p className="text-sm text-gray-600">
                Your information is protected by attorney-client privilege. We never share your
                details without your consent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Info section for SEO */}
      <section className="py-12 bg-gray-50">
        <div className="container-content max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">How much does a consultation cost?</h3>
              <p className="text-gray-600 text-sm">
                Nothing. Initial consultations with personal injury attorneys in Miami are free.
                Attorneys work on contingency, meaning they only get paid if you receive compensation.
                The standard fee is 33% of your settlement.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">How long do I have to file a claim in Florida?</h3>
              <p className="text-gray-600 text-sm">
                Florida&apos;s statute of limitations for personal injury is <strong>2 years</strong> from
                the date of the accident. However, you must seek medical treatment within <strong>14 days</strong> to
                preserve your PIP insurance benefits. Acting sooner is always better — evidence fades
                and witnesses forget.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">What if the other driver was uninsured?</h3>
              <p className="text-gray-600 text-sm">
                Approximately 20-25% of Miami drivers are uninsured. If the at-fault driver has no
                insurance, your own Uninsured Motorist (UM) coverage may apply. An attorney can help
                you navigate your coverage options.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">What types of accidents do you cover?</h3>
              <p className="text-gray-600 text-sm">
                Car accidents, motorcycle accidents, truck accidents, Uber/Lyft accidents, pedestrian
                accidents, bicycle accidents, and hit-and-run incidents throughout Miami-Dade County
                and South Florida.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Learn more: <Link href="/articles/what-to-do-after-car-accident-miami-guide" className="text-blue-600 hover:underline">What to Do After a Car Accident in Miami</Link> ·{" "}
              <Link href="/articles/florida-no-fault-insurance-explained-miami-drivers" className="text-blue-600 hover:underline">Florida No-Fault Insurance Explained</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 bg-white border-t">
        <div className="container-content max-w-3xl mx-auto">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            GridLocal Miami Cars is not a law firm and does not provide legal advice. This page
            connects accident victims with licensed personal injury attorneys in the Miami area.
            Results vary based on the specific facts of each case. Past results do not guarantee
            future outcomes. By submitting this form, you consent to being contacted by a licensed
            attorney regarding your potential case.
          </p>
        </div>
      </section>
    </>
  );
}
