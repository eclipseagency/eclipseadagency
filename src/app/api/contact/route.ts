import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "secure.emailsrvr.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();

    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_EMAIL || "marketing@eclipseadagency.com";

    await transporter.sendMail({
      from: `"Eclipse Agency Website" <${process.env.SMTP_USER}>`,
      replyTo: body.email,
      to,
      subject: `New Contact Form: ${body.name}${body.service ? ` - ${body.service}` : ""}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#c28a14;border-bottom:2px solid #c28a14;padding-bottom:10px">
            New Contact Form Submission
          </h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;font-weight:bold;color:#666">Name</td><td style="padding:8px 0">${body.name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${body.email}">${body.email}</a></td></tr>
            ${body.company ? `<tr><td style="padding:8px 0;font-weight:bold;color:#666">Company</td><td style="padding:8px 0">${body.company}</td></tr>` : ""}
            ${body.service ? `<tr><td style="padding:8px 0;font-weight:bold;color:#666">Service</td><td style="padding:8px 0">${body.service}</td></tr>` : ""}
            ${body.budget ? `<tr><td style="padding:8px 0;font-weight:bold;color:#666">Budget</td><td style="padding:8px 0">${body.budget}</td></tr>` : ""}
          </table>
          <div style="margin-top:20px;padding:15px;background:#f5f5f5;border-radius:8px">
            <strong style="color:#666">Message:</strong>
            <p style="margin:10px 0 0;line-height:1.6">${body.message.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="margin-top:20px;font-size:12px;color:#999">
            Sent from eclipseagency.net contact form on ${new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" })}
          </p>
        </div>
      `,
      text: `New Contact Form Submission\n\nName: ${body.name}\nEmail: ${body.email}\nCompany: ${body.company || "N/A"}\nService: ${body.service || "N/A"}\nBudget: ${body.budget || "N/A"}\n\nMessage:\n${body.message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form email error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
