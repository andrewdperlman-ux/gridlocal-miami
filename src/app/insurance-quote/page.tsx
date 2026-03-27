import type { Metadata } from "next";
import InsuranceQuiz from "./InsuranceQuiz";

export const metadata: Metadata = {
  title: "How Much Should You Pay for Exotic Car Insurance? | GridLocal Miami",
  description:
    "Take our 4-step exotic car insurance calculator to get a personalized premium estimate for your Ferrari, Lamborghini, Porsche, or other luxury vehicle in Miami.",
  keywords: [
    "exotic car insurance calculator",
    "how much is exotic car insurance",
    "supercar insurance estimate Miami",
    "luxury car insurance quote Florida",
    "Ferrari insurance cost",
    "Lamborghini insurance calculator",
  ],
};

export default function InsuranceQuotePage() {
  return <InsuranceQuiz />;
}
