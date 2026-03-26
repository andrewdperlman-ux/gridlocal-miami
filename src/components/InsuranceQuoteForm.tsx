"use client";

import { useState } from "react";

export default function InsuranceQuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carYear: "",
    carMake: "",
    carModel: "",
    estimatedValue: "",
    currentInsurance: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Send to our API route which emails the lead
      const res = await fetch("/api/insurance-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container-content max-w-2xl mx-auto text-center">
          <div className="bg-white/10 rounded-2xl p-10">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-black text-white mb-3">Quote Request Received!</h3>
            <p className="text-gray-300">
              We&apos;ll connect you with Miami&apos;s best exotic car insurance agents within 24 hours.
              Check your email for confirmation.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="insurance-quote" className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container-content max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-xl">🛡️</span>
            <span className="text-sm font-bold text-primary">Free Quote — No Obligation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Get an Exotic Car Insurance Quote
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Miami&apos;s top-rated exotic car insurance agents compete for your business.
            Average savings: $1,200/year vs. standard carriers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Smith"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@email.com"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Phone *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="(305) 555-1234"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Car Year *</label>
            <input
              type="text"
              name="carYear"
              required
              value={formData.carYear}
              onChange={handleChange}
              placeholder="2024"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Make *</label>
            <select
              name="carMake"
              required
              value={formData.carMake}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="" className="bg-slate-800">Select make...</option>
              <option value="Aston Martin" className="bg-slate-800">Aston Martin</option>
              <option value="Bentley" className="bg-slate-800">Bentley</option>
              <option value="BMW" className="bg-slate-800">BMW</option>
              <option value="Bugatti" className="bg-slate-800">Bugatti</option>
              <option value="Ferrari" className="bg-slate-800">Ferrari</option>
              <option value="Lamborghini" className="bg-slate-800">Lamborghini</option>
              <option value="Maserati" className="bg-slate-800">Maserati</option>
              <option value="McLaren" className="bg-slate-800">McLaren</option>
              <option value="Mercedes-AMG" className="bg-slate-800">Mercedes-AMG</option>
              <option value="Pagani" className="bg-slate-800">Pagani</option>
              <option value="Porsche" className="bg-slate-800">Porsche</option>
              <option value="Rolls-Royce" className="bg-slate-800">Rolls-Royce</option>
              <option value="Other" className="bg-slate-800">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Model *</label>
            <input
              type="text"
              name="carModel"
              required
              value={formData.carModel}
              onChange={handleChange}
              placeholder="Huracán EVO"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Estimated Value</label>
            <select
              name="estimatedValue"
              value={formData.estimatedValue}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="" className="bg-slate-800">Select range...</option>
              <option value="50k-100k" className="bg-slate-800">$50,000 – $100,000</option>
              <option value="100k-250k" className="bg-slate-800">$100,000 – $250,000</option>
              <option value="250k-500k" className="bg-slate-800">$250,000 – $500,000</option>
              <option value="500k-1m" className="bg-slate-800">$500,000 – $1,000,000</option>
              <option value="1m+" className="bg-slate-800">$1,000,000+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Current Insurance</label>
            <input
              type="text"
              name="currentInsurance"
              value={formData.currentInsurance}
              onChange={handleChange}
              placeholder="State Farm, Hagerty, etc."
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-primary hover:bg-orange-600 text-white py-4 rounded-lg font-black text-lg transition-colors disabled:opacity-60 shadow-lg shadow-primary/25"
            >
              {status === "loading" ? "Submitting..." : "Get My Free Quote →"}
            </button>
            {status === "error" && (
              <p className="text-red-400 text-sm mt-2 text-center">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-500 text-xs text-center">
              🔒 Your information is secure and never shared without your consent.
              By submitting, you agree to be contacted by licensed insurance agents.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
