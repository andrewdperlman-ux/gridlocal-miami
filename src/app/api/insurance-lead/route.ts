import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, carYear, carMake, carModel, estimatedValue, currentInsurance } = data;

    // Validate required fields
    if (!name || !email || !phone || !carYear || !carMake || !carModel) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Store lead in a JSON file (simple storage for now)
    const lead = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      name,
      email,
      phone,
      car: `${carYear} ${carMake} ${carModel}`,
      estimatedValue: estimatedValue || "Not specified",
      currentInsurance: currentInsurance || "Not specified",
      status: "new",
    };

    // Log the lead (visible in Vercel function logs)
    console.log("🚗 NEW INSURANCE LEAD:", JSON.stringify(lead, null, 2));

    // Send notification email via a simple webhook or email service
    // For now, we'll use a free service - Formspree or similar
    // TODO: Replace with direct email when SMTP is configured on Vercel
    
    // Try to forward to Formspree (free tier: 50 submissions/month)
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
    if (formspreeEndpoint) {
      await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: `🚗 New Insurance Lead: ${carYear} ${carMake} ${carModel}`,
          name,
          email,
          phone,
          car: `${carYear} ${carMake} ${carModel}`,
          estimatedValue: estimatedValue || "Not specified",
          currentInsurance: currentInsurance || "Not specified",
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
