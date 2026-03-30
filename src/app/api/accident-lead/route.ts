import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      name,
      email,
      phone,
      accidentType,
      accidentDate,
      injuryDescription,
      atFault,
      hasAttorney,
      medicalTreatment,
      insuranceStatus,
    } = data;

    // Validate required fields
    if (!name || !email || !phone || !accidentType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Don't accept leads that already have an attorney
    if (hasAttorney === "yes") {
      return NextResponse.json({
        success: true,
        message: "It sounds like you already have legal representation. Your attorney is the best resource for your case.",
      });
    }

    const lead = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type: "personal_injury",
      name,
      email,
      phone,
      accidentType,
      accidentDate: accidentDate || "Not specified",
      injuryDescription: injuryDescription || "Not specified",
      atFault: atFault || "Unknown",
      hasAttorney: hasAttorney || "no",
      medicalTreatment: medicalTreatment || "Not specified",
      insuranceStatus: insuranceStatus || "Not specified",
      status: "new",
      source: "gridlocal.io/accident-claim",
    };

    // Log the lead
    console.log("⚖️ NEW PI LEAD:", JSON.stringify(lead, null, 2));

    // Forward to VPS webhook (reliable SMTP delivery)
    const webhookUrl = process.env.LEAD_WEBHOOK_URL || "http://93.127.216.141:3847/api/lead";
    const webhookSecret = process.env.LEAD_WEBHOOK_SECRET || "gl_pi_webhook_2026";

    try {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${webhookSecret}`,
        },
        body: JSON.stringify(lead),
      });
      if (webhookRes.ok) {
        console.log("✅ Lead forwarded to webhook");
      } else {
        console.error("Webhook failed:", await webhookRes.text());
      }
    } catch (webhookErr) {
      console.error("Webhook error:", webhookErr);
    }

    // Formspree as backup
    try {
      await fetch("https://formspree.io/f/xkopggna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `⚖️ New PI Lead: ${accidentType} — ${name}`,
          ...lead,
        }),
      });
    } catch {
      // Formspree is backup, don't fail the request
    }

    return NextResponse.json({
      success: true,
      message: "Thank you. A qualified attorney will review your case and contact you shortly.",
      leadId: lead.id,
    });
  } catch (error) {
    console.error("PI Lead API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
