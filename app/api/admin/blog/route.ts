import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

// GET /api/admin/blog
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await db.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET blog posts error:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

// POST /api/admin/blog
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
      excerpt,
      content,
      image,
      imageAlt,
      category,
      author,
      authorCredentials,
      technicalReviewer,
      date,
      lastUpdated,
      readTime,
      faq,
      keyTakeaways,
      techSpecs,
      tableData,
      calloutBoxes,
      videoUrl,
      videoTranscript,
      downloadableResources,
      gallery,
      schemaType,
      focusKeyword,
      secondaryKeywords,
      ogImage,
      twitterCard,
      canonicalUrl,
      robotsMeta,
      relatedServices,
      relatedProjects,
      relatedArticles,
      ctaText,
      ctaLink,
      ctaStyle,
      disclaimerText,
      sources,
      industryTags,
      standardsMentioned,
      metaTitle,
      metaDesc,
      status,
    } = body;

    // Validation
    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Slug check
    const existing = await db.blogPost.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists. Choose a unique title." }, { status: 400 });
    }

    const stringifyIfNeeded = (val: any) =>
      typeof val === "string" ? val : JSON.stringify(val || []);

    const post = await db.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        image: image || "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80",
        imageAlt: imageAlt || title,
        category: category || "HVAC Engineering",
        author: author || "Ashish Jha",
        authorCredentials: authorCredentials || "Senior HVAC Cleanroom Engineer, 15+ years exp",
        technicalReviewer: technicalReviewer || "Thermopharm Technical Quality Board",
        date: date || new Date().toISOString().split("T")[0],
        lastUpdated: lastUpdated || new Date().toISOString().split("T")[0],
        readTime: readTime || "5 min read",
        faq: stringifyIfNeeded(faq),
        keyTakeaways: stringifyIfNeeded(keyTakeaways),
        techSpecs: stringifyIfNeeded(techSpecs),
        tableData: stringifyIfNeeded(tableData),
        calloutBoxes: stringifyIfNeeded(calloutBoxes),
        videoUrl: videoUrl || "",
        videoTranscript: videoTranscript || "",
        downloadableResources: stringifyIfNeeded(downloadableResources),
        gallery: stringifyIfNeeded(gallery),
        schemaType: schemaType || "BlogPosting",
        focusKeyword: focusKeyword || "",
        secondaryKeywords: secondaryKeywords || "",
        ogImage: ogImage || image || "",
        twitterCard: twitterCard || "summary_large_image",
        canonicalUrl: canonicalUrl || "",
        robotsMeta: robotsMeta || "index, follow",
        relatedServices: stringifyIfNeeded(relatedServices),
        relatedProjects: stringifyIfNeeded(relatedProjects),
        relatedArticles: stringifyIfNeeded(relatedArticles),
        ctaText: ctaText || "Request a Custom Cleanroom Engineering Consultation",
        ctaLink: ctaLink || "/contact",
        ctaStyle: ctaStyle || "button",
        disclaimerText: disclaimerText || "This article provides general engineering guidance in compliance with ISO 14644 & GMP standards.",
        sources: stringifyIfNeeded(sources),
        industryTags: stringifyIfNeeded(industryTags),
        standardsMentioned: stringifyIfNeeded(standardsMentioned),
        metaTitle: metaTitle || title,
        metaDesc: metaDesc || excerpt,
        status: status || "PUBLISHED",
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error("POST blog post error:", error);
    return NextResponse.json({ error: error.message || "Failed to create blog post" }, { status: 500 });
  }
}
