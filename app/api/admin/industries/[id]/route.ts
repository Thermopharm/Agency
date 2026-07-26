import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const industry = await db.industry.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
    });

    if (!industry) {
      return NextResponse.json({ error: "Industry not found" }, { status: 404 });
    }

    return NextResponse.json(industry);
  } catch (error) {
    console.error("Error fetching industry by ID:", error);
    return NextResponse.json({ error: "Failed to fetch industry" }, { status: 500 });
  }
}

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
      image,
      imageAlt,
      icon,
      specs,
      standards,
      challenges,
      solutions,
      relatedServices,
      relatedProjects,
      relatedArticles,
      metaTitle,
      metaDesc,
      focusKeyword,
      canonicalUrl,
      robotsMeta,
      faq,
      status,
    } = body;

    const stringifyIfNeeded = (val: any) =>
      typeof val === "string" ? val : JSON.stringify(val || []);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
      shortDesc,
      fullDesc: fullDesc || shortDesc,
      image: image || "/images/projects/project-1.png",
      imageAlt: imageAlt || title,
      icon: icon || "Factory",
      specs: stringifyIfNeeded(specs),
      standards: stringifyIfNeeded(standards),
      challenges: stringifyIfNeeded(challenges),
      solutions: stringifyIfNeeded(solutions),
      relatedServices: stringifyIfNeeded(relatedServices),
      relatedProjects: stringifyIfNeeded(relatedProjects),
      relatedArticles: stringifyIfNeeded(relatedArticles),
      metaTitle: metaTitle || title,
      metaDesc: metaDesc || shortDesc,
      focusKeyword: focusKeyword || "",
      canonicalUrl: canonicalUrl || "",
      robotsMeta: robotsMeta || "index, follow",
      faq: stringifyIfNeeded(faq),
      status: status || "PUBLISHED",
    };

    const existing = await db.industry.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }, { slug: payload.slug }],
      },
    });

    let updated;
    if (existing) {
      updated = await db.industry.update({
        where: { id: existing.id },
        data: payload,
      });
    } else {
      updated = await db.industry.create({
        data: payload,
      });
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Error updating industry:", error);
    return NextResponse.json({ error: error.message || "Failed to update industry" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existing = await db.industry.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
    });

    if (existing) {
      await db.industry.delete({
        where: { id: existing.id },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting industry:", error);
    return NextResponse.json({ error: "Failed to delete industry" }, { status: 500 });
  }
}
