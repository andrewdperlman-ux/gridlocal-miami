"use client";

import { useState } from "react";

interface NewsletterSignupProps {
  variant?: "default" | "dark" | "minimal";
}

export default function NewsletterSignup({ variant = "default" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setEmail("");
  };

  const isDark = variant === "dark";

  return (
    <section
      id="newsletter"
      className={`py-16 ${isDark ? "bg-secondary" : "bg-gradient-to-r from-primary to-orange-600"}`}
    >
      <div className="container-content">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-2xl">🏎️</span>
            <span className={`text-sm font-bold ${isDark ? "text-gray-300" : "text-white"}`}>
              Join 1,000+ Miami car enthusiasts
            </span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black mb-3 ${isDark ? "text-white" : "text-white"}`}>
            Stay in the Fast Lane
          </h2>
          <p className={`text-base mb-8 ${isDark ? "text-gray-300" : "text-white/90"}`}>
            Weekly roundups of the best Miami car meets, new exotic listings, and market insights.
            No spam. Unsubscribe anytime.
          </p>

          {status === "success" ? (
            <div className="bg-white/20 rounded-xl p-6 text-white">
              <div className="text-3xl mb-2">🎉</div>
              <p className="font-bold text-lg">You're in!</p>
              <p className="text-sm opacity-90">Check your inbox for a welcome email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg text-secondary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors disabled:opacity-60 whitespace-nowrap shadow-sm"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe Free"}
              </button>
            </form>
          )}

          <p className={`text-xs mt-4 ${isDark ? "text-gray-500" : "text-white/60"}`}>
            By subscribing, you agree to our privacy policy.
          </p>
        </div>
      </div>
    </section>
  );
}
