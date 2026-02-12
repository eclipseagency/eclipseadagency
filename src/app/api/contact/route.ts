import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Log the contact form submission server-side
    console.log("──────────────────────────────────");
    console.log("New Contact Form Submission");
    console.log("──────────────────────────────────");
    console.log(`Name:    ${body.name}`);
    console.log(`Email:   ${body.email}`);
    console.log(`Company: ${body.company || "—"}`);
    console.log(`Service: ${body.service || "—"}`);
    console.log(`Budget:  ${body.budget || "—"}`);
    console.log(`Message: ${body.message}`);
    console.log(`Date:    ${new Date().toISOString()}`);
    console.log("──────────────────────────────────");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
