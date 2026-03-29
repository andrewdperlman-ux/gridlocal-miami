import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, carYear, carMake, carModel, estimatedValue, currentInsurance } = data;

    // Validate required fields
    if (!name || !email || !phone || !carYear || !carMake || !carModel) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

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

    // Send email notification via SMTP
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const notifyEmail = process.env.NOTIFY_EMAIL || smtpUser;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"GridLocal Leads" <${smtpUser}>`,
          to: notifyEmail,
          subject: `🚗 New Insurance Lead: ${carYear} ${carMake} ${carModel}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px;">
              <h2 style="color: #ff4500;">🚗 New Insurance Lead</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${phone}">${phone}</a></td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Vehicle</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${carYear} ${carMake} ${carModel}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Est. Value</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${estimatedValue || "Not specified"}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Current Insurance</td><td style="padding: 8px;">${currentInsurance || "Not specified"}</td></tr>
              </table>
              <p style="color: #666; margin-top: 16px; font-size: 12px;">Lead ID: ${lead.id} | ${lead.timestamp}</p>
            </div>
          `,
        });
        console.log("✅ Lead notification email sent");
      } catch (emailErr) {
        console.error("❌ Failed to send lead email:", emailErr);
      }
    }

    // Formspree fallback
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
    if (formspreeEndpoint) {
      await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: `🚗 New Insurance Lead: ${carYear} ${carMake} ${carModel}`,
          name, email, phone,
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
