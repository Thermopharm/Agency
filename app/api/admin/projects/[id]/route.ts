import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

// GET /api/admin/projects/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const project = await (db as any).project.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error: any) {
    console.error("GET project by ID error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch project" }, { status: 500 });
  }
}

// PUT /api/admin/projects/[id]
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
      location,
      year,
      client,
      category,
      image,
      imageAlt,
      gallery,
      videoUrl,
      description,
      challenge,
      solution,
      results,
      tags,
      faq,
      facilitySize,
      industrySector,
      complianceStandards,
      technologiesUsed,
      testimonialQuote,
      testimonialAuthor,
      relatedServices,
      metaTitle,
      metaDesc,
      keywords,
      ogImage,
      canonicalUrl,
      robotsMeta,
      publisher,
      author,
      status,
    } = body;

    // Validate
    if (!title || !slug || !description || !challenge || !solution) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const payload = {
      title,
      slug,
      location: location || "India",
      year: year || new Date().getFullYear().toString(),
      client: client || "Confidential Client",
      category: category || "General",
      image: image || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      imageAlt: imageAlt || "",
      gallery: typeof gallery === "string" ? gallery : JSON.stringify(gallery || []),
      videoUrl: videoUrl || "",
      description,
      challenge,
      solution,
      results: typeof results === "string" ? results : JSON.stringify(results || []),
      tags: typeof tags === "string" ? tags : JSON.stringify(tags || []),
      faq: typeof faq === "string" ? faq : JSON.stringify(faq || []),
      facilitySize: facilitySize || "",
      industrySector: industrySector || "",
      complianceStandards: typeof complianceStandards === "string" ? complianceStandards : JSON.stringify(complianceStandards || []),
      technologiesUsed: typeof technologiesUsed === "string" ? technologiesUsed : JSON.stringify(technologiesUsed || []),
      testimonialQuote: testimonialQuote || "",
      testimonialAuthor: testimonialAuthor || "",
      relatedServices: typeof relatedServices === "string" ? relatedServices : JSON.stringify(relatedServices || []),
      metaTitle: metaTitle || "",
      metaDesc: metaDesc || "",
      keywords: keywords || "",
      ogImage: ogImage || "",
      canonicalUrl: canonicalUrl || "",
      robotsMeta: robotsMeta || "index, follow",
      publisher: publisher || "Thermopharm Engineering",
      author: author || "Thermopharm HVAC Engineering Team",
      status: status || "PUBLISHED",
    };

    const existing = await (db as any).project.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }, { slug }],
      },
    });

    let project;
    if (existing) {
      project = await (db as any).project.update({
        where: { id: existing.id },
        data: payload,
      });
    } else {
      project = await (db as any).project.create({
        data: payload,
      });
    }

    return NextResponse.json(project);
  } catch (error: any) {
    console.error("PUT project error:", error);
    return NextResponse.json({ error: error.message || "Failed to update project" }, { status: 500 });
  }
}

// DELETE /api/admin/projects/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existing = await (db as any).project.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
    });

    if (existing) {
      await (db as any).project.delete({
        where: { id: existing.id },
      });
    }
    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error: any) {
    console.error("DELETE project error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete project" }, { status: 500 });
  }
}
