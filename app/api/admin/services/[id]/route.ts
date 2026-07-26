import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

// GET /api/admin/services/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const service = await (db as any).service.findUnique({
      where: { id: params.id },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error: any) {
    console.error("GET service by ID error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch service" }, { status: 500 });
  }
}

// PUT /api/admin/services/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Validate
    if (!title || !slug || !shortDesc || !fullDesc) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify slug uniqueness (excluding current service)
    const existing = await (db as any).service.findFirst({
      where: {
        slug,
        id: { not: params.id },
      },
    });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists. Choose a unique title." }, { status: 400 });
    }

    const service = await (db as any).service.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        shortDesc,
        fullDesc,
        icon,
        image,
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

    return NextResponse.json(service);
  } catch (error: any) {
    console.error("PUT service error:", error);
    return NextResponse.json({ error: error.message || "Failed to update service" }, { status: 500 });
  }
}

// DELETE /api/admin/services/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await (db as any).service.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: "Service deleted successfully" });
  } catch (error: any) {
    console.error("DELETE service error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete service" }, { status: 500 });
  }
}
