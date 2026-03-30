"use client";

import { useState } from "react";

type Step = 1 | 2 | 3 | 4;

export default function AccidentLeadForm() {
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [alreadyRepresented, setAlreadyRepresented] = useState(false);

  const [form, setForm] = useState({
    accidentType: "",
    accidentDate: "",
    injuryDescription: "",
    medicalTreatment: "",
    atFault: "",
    hasAttorney: "",
    insuranceStatus: "",
    name: "",
    email: "",
    phone: "",
  });

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "hasAttorney" && value === "yes") {
      setAlreadyRepresented(true);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/accident-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (alreadyRepresented) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl mx-auto text-center">
        <div className="text-4xl mb-4">⚖️</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">You&apos;re Already Covered</h3>
        <p className="text-gray-600">
          Since you already have an attorney, they&apos;re the best resource for your case.
          If you&apos;re unhappy with your current representation, you have the right to change
          attorneys at any time.
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl mx-auto text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Case Submitted</h3>
        <p className="text-gray-600 mb-4">
          Thank you. A qualified personal injury attorney will review your case details and
          contact you within 24 hours — usually much sooner.
        </p>
        <p className="text-sm text-gray-500">
          <strong>Important:</strong> If you haven&apos;t already, seek medical attention within 14 days
          of your accident to preserve your Florida PIP benefits.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-xl mx-auto">
      {/* Progress bar */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full transition-colors ${
              s <= step ? "bg-blue-600" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Step 1: Accident Type */}
      {step === 1 && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">What type of accident?</h3>
          <p className="text-sm text-gray-500 mb-4">Select the option that best describes your situation.</p>
          <div className="grid grid-cols-1 gap-3">
            {[
              { value: "Car Accident", icon: "🚗", desc: "Car, truck, or SUV collision" },
              { value: "Motorcycle Accident", icon: "🏍️", desc: "Motorcycle crash or collision" },
              { value: "Truck Accident", icon: "🚛", desc: "Commercial truck or 18-wheeler" },
              { value: "Uber/Lyft Accident", icon: "📱", desc: "Rideshare accident (passenger or other driver)" },
              { value: "Pedestrian Accident", icon: "🚶", desc: "Hit by a vehicle while walking" },
              { value: "Bicycle Accident", icon: "🚲", desc: "Hit by a vehicle while cycling" },
              { value: "Hit and Run", icon: "💨", desc: "Other driver fled the scene" },
              { value: "Other", icon: "❓", desc: "Other type of accident" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  update("accidentType", opt.value);
                  setStep(2);
                }}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all hover:border-blue-400 hover:bg-blue-50 ${
                  form.accidentType === opt.value
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <span className="text-2xl">{opt.icon}</span>
                <div>
                  <div className="font-semibold text-gray-900">{opt.value}</div>
                  <div className="text-sm text-gray-500">{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Accident Details */}
      {step === 2 && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Tell us about the accident</h3>
          <p className="text-sm text-gray-500 mb-4">This helps attorneys evaluate your case quickly.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">When did the accident happen?</label>
              <input
                type="date"
                value={form.accidentDate}
                onChange={(e) => update("accidentDate", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Describe your injuries</label>
              <select
                value={form.injuryDescription}
                onChange={(e) => update("injuryDescription", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="Minor (bruises, soreness)">Minor — bruises, soreness, minor cuts</option>
                <option value="Moderate (whiplash, sprains, concussion)">Moderate — whiplash, sprains, possible concussion</option>
                <option value="Serious (broken bones, herniated disc, surgery needed)">Serious — broken bones, herniated disc, surgery needed</option>
                <option value="Severe (hospitalization, TBI, spinal injury)">Severe — hospitalization, TBI, spinal injury</option>
                <option value="Fatal (family member killed)">Fatal — family member killed in accident</option>
                <option value="Not sure yet">Not sure yet — still being evaluated</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Have you received medical treatment?</label>
              <select
                value={form.medicalTreatment}
                onChange={(e) => update("medicalTreatment", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="Yes - ER visit">Yes — went to the emergency room</option>
                <option value="Yes - doctor/urgent care">Yes — visited doctor or urgent care</option>
                <option value="Yes - ongoing treatment">Yes — ongoing treatment (physical therapy, etc.)</option>
                <option value="No - planning to go">No — but planning to go soon</option>
                <option value="No">No — haven&apos;t sought treatment yet</option>
              </select>
            </div>
            <button
              onClick={() => setStep(3)}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Continue →
            </button>
            <button onClick={() => setStep(1)} className="w-full py-2 text-sm text-gray-500 hover:text-gray-700">
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Qualification */}
      {step === 3 && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">A few more details</h3>
          <p className="text-sm text-gray-500 mb-4">This helps match you with the right attorney.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Were you at fault?</label>
              <select
                value={form.atFault}
                onChange={(e) => update("atFault", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="No - other driver at fault">No — the other driver was at fault</option>
                <option value="Partial - shared fault">Partially — fault was shared</option>
                <option value="Not sure">Not sure — fault is being determined</option>
                <option value="Yes - I was at fault">Yes — I was at fault</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Do you currently have an attorney?</label>
              <select
                value={form.hasAttorney}
                onChange={(e) => update("hasAttorney", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="no">No — I need legal help</option>
                <option value="yes">Yes — I already have an attorney</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Insurance situation</label>
              <select
                value={form.insuranceStatus}
                onChange={(e) => update("insuranceStatus", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="I have insurance, other driver has insurance">Both drivers insured</option>
                <option value="I have insurance, other driver uninsured">Other driver was uninsured</option>
                <option value="I have insurance, other driver unknown (hit and run)">Other driver unknown (hit and run)</option>
                <option value="I don't have insurance">I don&apos;t have insurance</option>
                <option value="Not sure">Not sure</option>
              </select>
            </div>
            <button
              onClick={() => setStep(4)}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Almost Done — Get Your Free Evaluation →
            </button>
            <button onClick={() => setStep(2)} className="w-full py-2 text-sm text-gray-500 hover:text-gray-700">
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Contact Info */}
      {step === 4 && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Where should we send your free evaluation?</h3>
          <p className="text-sm text-gray-500 mb-4">An experienced attorney will review your case at no cost.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="John Smith"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="(305) 555-1234"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@email.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting || !form.name || !form.phone || !form.email}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {submitting ? "Submitting..." : "Get My Free Case Evaluation"}
            </button>
            <button onClick={() => setStep(3)} className="w-full py-2 text-sm text-gray-500 hover:text-gray-700">
              ← Back
            </button>

            <p className="text-xs text-gray-400 text-center leading-relaxed">
              By submitting, you agree to be contacted by a licensed attorney regarding your case.
              Your information is confidential and protected. This is a free service with no obligation.
              This site is not a law firm and does not provide legal advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
