import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { getAllIndustries } from "@/lib/content";

export async function GET() {
  try {
    const industries = await getAllIndustries();
    return NextResponse.json(industries);
  } catch (error) {
    console.error("Error fetching industries:", error);
    return NextResponse.json({ error: "Failed to fetch industries" }, { status: 500 });
  }
}

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

    if (!title || !shortDesc) {
      return NextResponse.json({ error: "Title and Short Description are required" }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const stringifyIfNeeded = (val: any) =>
      typeof val === "string" ? val : JSON.stringify(val || []);

    const industry = await db.industry.create({
      data: {
        title,
        slug: generatedSlug,
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
      },
    });

    return NextResponse.json(industry, { status: 201 });
  } catch (error: any) {
    console.error("Error creating industry:", error);
    return NextResponse.json({ error: error.message || "Failed to create industry" }, { status: 500 });
  }
}
