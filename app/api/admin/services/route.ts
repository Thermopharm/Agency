import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

// GET /api/admin/services
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const services = await db.service.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("GET services error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

// POST /api/admin/services
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      slug,
      shortDesc,
      fullDesc,
      icon,
      image,
      specs,
      standards,
      faq,
      metaTitle,
      metaDesc,
      keywords,
      status,
    } = body;

    // Server-side validation
    if (!title || !slug || !shortDesc || !fullDesc) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify slug uniqueness
    const existing = await db.service.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists. Choose a unique title." }, { status: 400 });
    }

    const service = await db.service.create({
      data: {
        title,
        slug,
        shortDesc,
        fullDesc,
        icon: icon || "Layers",
        image: image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
        specs: JSON.stringify(specs || []),
        standards: JSON.stringify(standards || []),
        faq: JSON.stringify(faq || []),
        metaTitle,
        metaDesc,
        keywords,
        status: status || "PUBLISHED",
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("POST service error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
