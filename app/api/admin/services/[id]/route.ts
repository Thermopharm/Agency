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
    const service = await db.service.findUnique({
      where: { id: params.id },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("GET service by ID error:", error);
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
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
      specs,
      standards,
      faq,
      metaTitle,
      metaDesc,
      keywords,
      status,
    } = body;

    // Validate
    if (!title || !slug || !shortDesc || !fullDesc) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify slug uniqueness (excluding current service)
    const existing = await db.service.findFirst({
      where: {
        slug,
        id: { not: params.id },
      },
    });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists. Choose a unique title." }, { status: 400 });
    }

    const service = await db.service.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        shortDesc,
        fullDesc,
        icon,
        image,
        specs: JSON.stringify(specs),
        standards: JSON.stringify(standards),
        faq: JSON.stringify(faq),
        metaTitle,
        metaDesc,
        keywords,
        status,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("PUT service error:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
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
    await db.service.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    console.error("DELETE service error:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
