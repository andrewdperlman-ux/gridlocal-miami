import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    // Send email notification
    const smtpUser = process.env.SMTP_USER || "andrew@gridlocal.io";
    const smtpPass = process.env.SMTP_PASS || process.env.GRIDLOCAL_SMTP_PASS;
    const notifyEmail = process.env.NOTIFY_EMAIL || "andrew@gridlocal.io";

    if (smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
          from: `"GridLocal Leads" <${smtpUser}>`,
          to: notifyEmail,
          subject: `⚖️ New PI Lead: ${accidentType} — ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px;">
              <h2 style="color: #1e40af;">⚖️ New Personal Injury Lead</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${phone}">${phone}</a></td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Accident Type</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${accidentType}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Accident Date</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${accidentDate || "Not specified"}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Injuries</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${injuryDescription || "Not specified"}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">At Fault?</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${atFault || "Unknown"}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Has Attorney?</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${hasAttorney || "No"}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Medical Treatment</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${medicalTreatment || "Not specified"}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Insurance</td><td style="padding: 8px;">${insuranceStatus || "Not specified"}</td></tr>
              </table>
              <p style="margin-top: 16px; font-size: 12px; color: #666;">Lead ID: ${lead.id} | ${lead.timestamp}</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Email send failed:", emailErr);
      }
    }

    // Send to Formspree as backup
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
