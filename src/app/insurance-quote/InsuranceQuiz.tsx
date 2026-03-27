"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = {
  // Step 1 – Vehicle
  year: string;
  make: string;
  model: string;
  estimatedValue: string;
  // Step 2 – Coverage
  coverageTypes: string[];
  storedWhere: string;
  tracksCarStr: string;
  // Step 3 – About You
  zipCode: string;
  ageRange: string;
  drivingRecord: string;
  numVehicles: string;
  // Step 4 – Contact
  fullName: string;
  email: string;
  phone: string;
  currentInsurer: string;
};

const EMPTY_FORM: FormData = {
  year: "",
  make: "",
  model: "",
  estimatedValue: "",
  coverageTypes: [],
  storedWhere: "",
  tracksCarStr: "",
  zipCode: "",
  ageRange: "",
  drivingRecord: "",
  numVehicles: "",
  fullName: "",
  email: "",
  phone: "",
  currentInsurer: "",
};

// ─── Premium Calculation ──────────────────────────────────────────────────────

function calcPremium(data: FormData): [number, number] {
  // Base rates by value bracket (annual, low/high)
  const baseRates: Record<string, [number, number]> = {
    "50k-100k":   [1200, 2400],
    "100k-250k":  [2400, 4800],
    "250k-500k":  [4800, 9600],
    "500k-1m":    [9600, 19200],
    "1m+":        [19200, 38400],
  };

  let [low, high] = baseRates[data.estimatedValue] ?? [2400, 4800];

  // Make modifier
  const hyperMakes = ["Bugatti", "Pagani", "Koenigsegg"];
  const premiumMakes = ["Ferrari", "Lamborghini", "McLaren", "Rolls-Royce", "Aston Martin"];
  if (hyperMakes.includes(data.make)) { low *= 1.5; high *= 1.5; }
  else if (premiumMakes.includes(data.make)) { low *= 1.2; high *= 1.2; }

  // Storage modifier
  if (data.storedWhere === "Outdoor") { low *= 1.35; high *= 1.35; }
  else if (data.storedWhere === "Covered Parking") { low *= 1.15; high *= 1.15; }
  else if (data.storedWhere === "Shared Garage") { low *= 1.05; high *= 1.05; }
  // Private Garage = no modifier (baseline)

  // Track day modifier
  if (data.tracksCarStr === "Yes") { low *= 1.25; high *= 1.25; }

  // Driving record modifier
  if (data.drivingRecord === "1-2 minor incidents") { low *= 1.3; high *= 1.3; }
  else if (data.drivingRecord === "Major incident") { low *= 1.7; high *= 1.7; }

  // Age modifier
  if (data.ageRange === "21-30") { low *= 1.4; high *= 1.4; }
  else if (data.ageRange === "31-40") { low *= 1.1; high *= 1.1; }
  else if (data.ageRange === "51-60") { low *= 0.95; high *= 0.95; }
  else if (data.ageRange === "60+") { low *= 0.9; high *= 0.9; }

  // Multi-vehicle discount
  if (data.coverageTypes.includes("Multi-Vehicle Discount") || data.numVehicles === "4+") {
    low *= 0.9; high *= 0.9;
  } else if (data.numVehicles === "2-3") {
    low *= 0.95; high *= 0.95;
  }

  // Track day coverage add-on
  if (data.coverageTypes.includes("Track Day Coverage")) { low += 800; high += 1200; }
  // Storage/Transport add-on
  if (data.coverageTypes.includes("Storage/Transport")) { low += 300; high += 600; }

  return [Math.round(low / 100) * 100, Math.round(high / 100) * 100];
}

// ─── Shared input style ───────────────────────────────────────────────────────

const inputCls =
  "w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";
const selectCls =
  "w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";
const labelCls = "block text-sm font-medium text-gray-400 mb-1";

// ─── Step Components ──────────────────────────────────────────────────────────

function Step1({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  const years = Array.from({ length: 12 }, (_, i) => String(2026 - i));
  const makes = [
    "Ferrari", "Lamborghini", "McLaren", "Porsche", "Bentley", "Rolls-Royce",
    "Aston Martin", "Bugatti", "Maserati", "Mercedes-AMG", "BMW M", "Audi RS",
    "Pagani", "Koenigsegg", "Other",
  ];
  return (
    <div className="space-y-5">
      <div>
        <label className={labelCls}>Year *</label>
        <select className={selectCls} value={data.year} onChange={e => onChange({ year: e.target.value })}>
          <option value="" className="bg-slate-800">Select year…</option>
          {years.map(y => <option key={y} value={y} className="bg-slate-800">{y}</option>)}
        </select>
      </div>
      <div>
        <label className={labelCls}>Make *</label>
        <select className={selectCls} value={data.make} onChange={e => onChange({ make: e.target.value })}>
          <option value="" className="bg-slate-800">Select make…</option>
          {makes.map(m => <option key={m} value={m} className="bg-slate-800">{m}</option>)}
        </select>
      </div>
      <div>
        <label className={labelCls}>Model *</label>
        <input
          type="text"
          className={inputCls}
          placeholder="e.g. Huracán EVO, 911 GT3, SF90…"
          value={data.model}
          onChange={e => onChange({ model: e.target.value })}
        />
      </div>
      <div>
        <label className={labelCls}>Estimated Value *</label>
        <select className={selectCls} value={data.estimatedValue} onChange={e => onChange({ estimatedValue: e.target.value })}>
          <option value="" className="bg-slate-800">Select value range…</option>
          <option value="50k-100k" className="bg-slate-800">$50,000 – $100,000</option>
          <option value="100k-250k" className="bg-slate-800">$100,000 – $250,000</option>
          <option value="250k-500k" className="bg-slate-800">$250,000 – $500,000</option>
          <option value="500k-1m" className="bg-slate-800">$500,000 – $1,000,000</option>
          <option value="1m+" className="bg-slate-800">$1,000,000+</option>
        </select>
      </div>
    </div>
  );
}

function Step2({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  const coverageOptions = ["Agreed Value", "Comprehensive", "Track Day Coverage", "Storage/Transport", "Multi-Vehicle Discount"];
  const storageOptions = ["Private Garage", "Shared Garage", "Covered Parking", "Outdoor"];

  const toggleCoverage = (val: string) => {
    const current = data.coverageTypes;
    if (current.includes(val)) {
      onChange({ coverageTypes: current.filter(v => v !== val) });
    } else {
      onChange({ coverageTypes: [...current, val] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className={labelCls}>Coverage types you&apos;re interested in</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {coverageOptions.map(opt => (
            <label
              key={opt}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                data.coverageTypes.includes(opt)
                  ? "border-primary bg-primary/10 text-white"
                  : "border-white/20 bg-white/5 text-gray-300 hover:border-white/40"
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={data.coverageTypes.includes(opt)}
                onChange={() => toggleCoverage(opt)}
              />
              <span className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 ${
                data.coverageTypes.includes(opt) ? "bg-primary border-primary" : "border-gray-500"
              }`}>
                {data.coverageTypes.includes(opt) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-sm font-medium">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>Where is the car kept? *</label>
        <select className={selectCls} value={data.storedWhere} onChange={e => onChange({ storedWhere: e.target.value })}>
          <option value="" className="bg-slate-800">Select storage…</option>
          {storageOptions.map(s => <option key={s} value={s} className="bg-slate-800">{s}</option>)}
        </select>
      </div>

      <div>
        <label className={labelCls}>Do you track your car? *</label>
        <div className="flex gap-4 mt-2">
          {["Yes", "No"].map(opt => (
            <label
              key={opt}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border cursor-pointer transition-all font-semibold ${
                data.tracksCarStr === opt
                  ? "border-primary bg-primary/10 text-white"
                  : "border-white/20 bg-white/5 text-gray-300 hover:border-white/40"
              }`}
            >
              <input
                type="radio"
                className="sr-only"
                name="tracksCar"
                value={opt}
                checked={data.tracksCarStr === opt}
                onChange={() => onChange({ tracksCarStr: opt })}
              />
              {opt === "Yes" ? "🏁 Yes" : "🚗 No"}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step3({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <label className={labelCls}>ZIP Code *</label>
        <input
          type="text"
          className={inputCls}
          placeholder="e.g. 33101"
          maxLength={10}
          value={data.zipCode}
          onChange={e => onChange({ zipCode: e.target.value })}
        />
      </div>
      <div>
        <label className={labelCls}>Your Age Range *</label>
        <select className={selectCls} value={data.ageRange} onChange={e => onChange({ ageRange: e.target.value })}>
          <option value="" className="bg-slate-800">Select age range…</option>
          {["21-30", "31-40", "41-50", "51-60", "60+"].map(a => (
            <option key={a} value={a} className="bg-slate-800">{a}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelCls}>Driving Record *</label>
        <select className={selectCls} value={data.drivingRecord} onChange={e => onChange({ drivingRecord: e.target.value })}>
          <option value="" className="bg-slate-800">Select driving record…</option>
          <option value="Clean" className="bg-slate-800">Clean — no incidents</option>
          <option value="1-2 minor incidents" className="bg-slate-800">1–2 minor incidents</option>
          <option value="Major incident" className="bg-slate-800">Major incident / DUI</option>
        </select>
      </div>
      <div>
        <label className={labelCls}>How many vehicles do you insure? *</label>
        <select className={selectCls} value={data.numVehicles} onChange={e => onChange({ numVehicles: e.target.value })}>
          <option value="" className="bg-slate-800">Select…</option>
          <option value="1" className="bg-slate-800">Just 1</option>
          <option value="2-3" className="bg-slate-800">2–3 vehicles</option>
          <option value="4+" className="bg-slate-800">4+ vehicles</option>
        </select>
      </div>
    </div>
  );
}

function Step4({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <label className={labelCls}>Full Name *</label>
        <input type="text" className={inputCls} placeholder="John Smith" value={data.fullName} onChange={e => onChange({ fullName: e.target.value })} />
      </div>
      <div>
        <label className={labelCls}>Email *</label>
        <input type="email" className={inputCls} placeholder="john@email.com" value={data.email} onChange={e => onChange({ email: e.target.value })} />
      </div>
      <div>
        <label className={labelCls}>Phone *</label>
        <input type="tel" className={inputCls} placeholder="(305) 555-1234" value={data.phone} onChange={e => onChange({ phone: e.target.value })} />
      </div>
      <div>
        <label className={labelCls}>Current Insurer <span className="text-gray-500">(optional)</span></label>
        <input type="text" className={inputCls} placeholder="Hagerty, State Farm, etc." value={data.currentInsurer} onChange={e => onChange({ currentInsurer: e.target.value })} />
      </div>
      <p className="text-gray-500 text-xs">
        🔒 Your information is secure and never shared without your consent. By submitting, you agree to be contacted by licensed insurance agents.
      </p>
    </div>
  );
}

// ─── Results Screen ───────────────────────────────────────────────────────────

function Results({ data }: { data: FormData }) {
  const [low, high] = calcPremium(data);
  const fmt = (n: number) => `$${n.toLocaleString()}`;

  const tips = [
    {
      icon: "🏦",
      title: "Always Choose Agreed Value",
      body: "Standard \"stated value\" policies allow insurers to depreciate your payout. For exotics, always insist on agreed value — you and the insurer lock in the car's worth upfront.",
    },
    {
      icon: "🏎️",
      title: "Track Day Coverage is Separate",
      body: "Most standard policies explicitly exclude on-track use. If you take your car to Homestead or any HPDE event, add dedicated track day coverage or a specialty endorsement.",
    },
    {
      icon: "🏠",
      title: "Garage It to Save",
      body: "Miami's theft and weather risk is real. A dedicated private garage can reduce your exotic car premium by 20–35% vs. street or open-lot parking — sometimes covering the cost of the garage itself.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-16">
      <div className="container-content max-w-3xl mx-auto px-4">
        {/* Hero result */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-green-400 font-bold text-sm">✅ Your Estimate is Ready!</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Based on your {data.year} {data.make} {data.model},
          </h1>
          <p className="text-gray-400 text-lg mb-6">we estimate your annual exotic car insurance premium at:</p>
          <div className="bg-gradient-to-r from-primary/20 to-orange-500/10 border border-primary/40 rounded-2xl px-8 py-8 mb-6 inline-block w-full">
            <div className="text-5xl sm:text-6xl font-black text-white mb-2">
              {fmt(low)} – {fmt(high)}
            </div>
            <div className="text-primary font-semibold text-lg">per year</div>
          </div>
          <p className="text-gray-300 text-lg font-medium">
            🤝 Our partner agents will contact you within <span className="text-white font-bold">24 hours</span> with personalized quotes.
          </p>
        </div>

        {/* Tips */}
        <div className="mb-12">
          <h2 className="text-xl font-black text-white mb-6 text-center">3 Tips for Exotic Car Insurance</h2>
          <div className="grid gap-5">
            {tips.map(tip => (
              <div key={tip.title} className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4">
                <span className="text-3xl flex-shrink-0">{tip.icon}</span>
                <div>
                  <h3 className="text-white font-bold mb-1">{tip.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{tip.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/insurance" className="btn-primary text-center py-3 px-8 text-lg font-bold rounded-lg">
            Learn More About Coverage →
          </Link>
          <Link href="/" className="btn-secondary text-center py-3 px-8 text-lg font-bold rounded-lg">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const STEPS = [
  { label: "Your Vehicle", emoji: "🚗" },
  { label: "Coverage Needs", emoji: "🛡️" },
  { label: "About You", emoji: "👤" },
  { label: "Get Your Estimate", emoji: "📋" },
];

function isStep1Valid(data: FormData) {
  return data.year && data.make && data.model.trim() && data.estimatedValue;
}
function isStep2Valid(data: FormData) {
  return data.storedWhere && data.tracksCarStr;
}
function isStep3Valid(data: FormData) {
  return data.zipCode.trim() && data.ageRange && data.drivingRecord && data.numVehicles;
}
function isStep4Valid(data: FormData) {
  return data.fullName.trim() && data.email.trim() && data.phone.trim();
}

export default function InsuranceQuiz() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "error">("idle");

  const update = (partial: Partial<FormData>) => setFormData(prev => ({ ...prev, ...partial }));

  const canNext = () => {
    if (step === 1) return isStep1Valid(formData);
    if (step === 2) return isStep2Valid(formData);
    if (step === 3) return isStep3Valid(formData);
    if (step === 4) return isStep4Valid(formData);
    return false;
  };

  const handleSubmit = async () => {
    setSubmitStatus("loading");
    try {
      const payload = {
        // All fields with readable labels
        "Vehicle Year": formData.year,
        "Vehicle Make": formData.make,
        "Vehicle Model": formData.model,
        "Estimated Value": formData.estimatedValue,
        "Coverage Interests": formData.coverageTypes.join(", "),
        "Vehicle Storage": formData.storedWhere,
        "Tracks Car": formData.tracksCarStr,
        "ZIP Code": formData.zipCode,
        "Age Range": formData.ageRange,
        "Driving Record": formData.drivingRecord,
        "Number of Vehicles": formData.numVehicles,
        "Full Name": formData.fullName,
        "Email": formData.email,
        "Phone": formData.phone,
        "Current Insurer": formData.currentInsurer,
        // Pre-calculated estimate
        "Estimated Annual Premium": (() => {
          const [lo, hi] = calcPremium(formData);
          return `$${lo.toLocaleString()} – $${hi.toLocaleString()}/year`;
        })(),
      };

      const res = await fetch("https://formspree.io/f/xkopggna", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  if (submitted) return <Results data={formData} />;

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* Hero */}
      <section className="pt-16 pb-6 text-center px-4">
        <div className="inline-flex items-center gap-2 bg-primary/20 rounded-full px-4 py-1.5 mb-4">
          <span className="text-xl">🏎️</span>
          <span className="text-sm font-bold text-primary">Free Estimate — No Obligation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 max-w-3xl mx-auto">
          How Much Should You Pay for Exotic Car Insurance?
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Answer 4 quick questions and we'll calculate your estimated annual premium — then connect you with Miami's top exotic car insurance specialists.
        </p>
      </section>

      {/* Card */}
      <div className="container-content max-w-2xl mx-auto px-4 pb-20">
        <div className="bg-slate-800/80 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Progress bar */}
          <div className="bg-slate-900/60 px-6 pt-5 pb-4">
            <div className="flex justify-between items-center mb-3">
              {STEPS.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                    i + 1 === step ? "text-primary" : i + 1 < step ? "text-green-400" : "text-gray-600"
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 transition-all ${
                    i + 1 < step
                      ? "bg-green-500 border-green-500 text-white"
                      : i + 1 === step
                      ? "border-primary text-primary bg-primary/10"
                      : "border-gray-700 text-gray-600"
                  }`}>
                    {i + 1 < step ? "✓" : i + 1}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-primary to-orange-400 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(progress, 4)}%` }}
              />
            </div>
            <p className="text-gray-500 text-xs mt-2">Step {step} of {STEPS.length}</p>
          </div>

          {/* Step content */}
          <div className="px-6 py-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{STEPS[step - 1].emoji}</span>
              <div>
                <h2 className="text-xl font-black text-white">{STEPS[step - 1].label}</h2>
                {step === 1 && <p className="text-gray-400 text-sm">Tell us about the vehicle you want to insure.</p>}
                {step === 2 && <p className="text-gray-400 text-sm">Help us understand your coverage needs.</p>}
                {step === 3 && <p className="text-gray-400 text-sm">A few details help us refine your estimate.</p>}
                {step === 4 && <p className="text-gray-400 text-sm">Where should we send your personalized quotes?</p>}
              </div>
            </div>

            {step === 1 && <Step1 data={formData} onChange={update} />}
            {step === 2 && <Step2 data={formData} onChange={update} />}
            {step === 3 && <Step3 data={formData} onChange={update} />}
            {step === 4 && <Step4 data={formData} onChange={update} />}

            {submitStatus === "error" && (
              <p className="mt-4 text-red-400 text-sm text-center">
                Something went wrong. Please try again.
              </p>
            )}
          </div>

          {/* Nav buttons */}
          <div className="px-6 pb-6 flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 py-3 px-6 rounded-lg border border-white/20 text-gray-300 hover:text-white hover:border-white/40 font-semibold transition-all"
              >
                ← Back
              </button>
            )}
            {step < STEPS.length ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canNext()}
                className="flex-1 py-3 px-6 rounded-lg bg-primary hover:bg-orange-600 text-white font-black text-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canNext() || submitStatus === "loading"}
                className="flex-1 py-3 px-6 rounded-lg bg-primary hover:bg-orange-600 text-white font-black text-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
              >
                {submitStatus === "loading" ? "Calculating…" : "Get My Personalized Quote 🚀"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
