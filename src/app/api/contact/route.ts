import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// --- Simple in-memory rate limiter ---
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;
const ipMap = new Map<string, number[]>();
let requestCount = 0;

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Periodic cleanup every 100 requests
  requestCount++;
  if (requestCount % 100 === 0) {
    for (const [key, timestamps] of ipMap) {
      const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
      if (valid.length === 0) ipMap.delete(key);
      else ipMap.set(key, valid);
    }
  }

  const timestamps = (ipMap.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW
  );

  if (timestamps.length >= RATE_LIMIT_MAX) return true;

  timestamps.push(now);
  ipMap.set(ip, timestamps);
  return false;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

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
            <tr><td style="padding:8px 0;font-weight:bold;color:#666">Name</td><td style="padding:8px 0">${escapeHtml(body.name)}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${encodeURIComponent(body.email)}">${escapeHtml(body.email)}</a></td></tr>
            ${body.company ? `<tr><td style="padding:8px 0;font-weight:bold;color:#666">Company</td><td style="padding:8px 0">${escapeHtml(body.company)}</td></tr>` : ""}
            ${body.service ? `<tr><td style="padding:8px 0;font-weight:bold;color:#666">Service</td><td style="padding:8px 0">${escapeHtml(body.service)}</td></tr>` : ""}
            ${body.budget ? `<tr><td style="padding:8px 0;font-weight:bold;color:#666">Budget</td><td style="padding:8px 0">${escapeHtml(body.budget)}</td></tr>` : ""}
          </table>
          <div style="margin-top:20px;padding:15px;background:#f5f5f5;border-radius:8px">
            <strong style="color:#666">Message:</strong>
            <p style="margin:10px 0 0;line-height:1.6">${escapeHtml(body.message).replace(/\n/g, "<br>")}</p>
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
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
