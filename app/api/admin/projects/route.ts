import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

// GET /api/admin/projects
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const projects = await (db as any).project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error("GET projects error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch projects" }, { status: 500 });
  }
}

// POST /api/admin/projects
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

    // Validation
    if (!title || !slug || !description || !challenge || !solution) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Slug check
    const existing = await (db as any).project.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists. Choose a unique title." }, { status: 400 });
    }

    const project = await (db as any).project.create({
      data: {
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
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error("POST project error:", error);
    return NextResponse.json({ error: error.message || "Failed to create project" }, { status: 500 });
  }
}
