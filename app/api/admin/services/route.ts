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
    const services = await (db as any).service.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(services);
  } catch (error: any) {
    console.error("GET services error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch services" }, { status: 500 });
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
      gallery,
      brochureUrl,
      specs,
      standards,
      faq,
      industriesServed,
      serviceLocations,
      relatedServices,
      metaTitle,
      metaDesc,
      keywords,
      canonicalUrl,
      robotsMeta,
      publisher,
      author,
      status,
    } = body;

    // Server-side validation
    if (!title || !slug || !shortDesc || !fullDesc) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify slug uniqueness
    const existing = await (db as any).service.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists. Choose a unique title." }, { status: 400 });
    }

    const service = await (db as any).service.create({
      data: {
        title,
        slug,
        shortDesc,
        fullDesc,
        icon: icon || "Layers",
        image: image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
        gallery: typeof gallery === "string" ? gallery : JSON.stringify(gallery || []),
        brochureUrl: brochureUrl || "",
        specs: typeof specs === "string" ? specs : JSON.stringify(specs || []),
        standards: typeof standards === "string" ? standards : JSON.stringify(standards || []),
        faq: typeof faq === "string" ? faq : JSON.stringify(faq || []),
        industriesServed: typeof industriesServed === "string" ? industriesServed : JSON.stringify(industriesServed || []),
        serviceLocations: serviceLocations || "",
        relatedServices: typeof relatedServices === "string" ? relatedServices : JSON.stringify(relatedServices || []),
        metaTitle: metaTitle || "",
        metaDesc: metaDesc || "",
        keywords: keywords || "",
        canonicalUrl: canonicalUrl || "",
        robotsMeta: robotsMeta || "index, follow",
        publisher: publisher || "Thermopharm Engineering",
        author: author || "Thermopharm HVAC Engineering Team",
        status: status || "PUBLISHED",
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error: any) {
    console.error("POST service error:", error);
    return NextResponse.json({ error: error.message || "Failed to create service" }, { status: 500 });
  }
}
