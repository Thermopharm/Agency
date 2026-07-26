import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: Name, Email, and Message are required." },
        { status: 400 }
      );
    }

    // Save lead to database
    const newLead = await prisma.lead.create({
      data: {
        name,
        company: company || "N/A",
        email,
        phone: phone || "N/A",
        service: service || "General Enquiry",
        message,
        status: "NEW",
      },
    });

    console.log("📧 New lead captured & saved:", newLead.id);

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. Our engineering team will contact you within 24 hours.",
        leadId: newLead.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry. Please try again or email us directly at info@thermopharm.in" },
      { status: 500 }
    );
  }
}
