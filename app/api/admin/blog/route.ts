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
      category,
      author,
      date,
      readTime,
      faq,
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

    const post = await db.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        image: image || "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80",
        category: category || "HVAC Engineering",
        author: author || "Thermopharm Expert",
        date: date || new Date().toISOString(),
        readTime: readTime || "5 min read",
        faq: JSON.stringify(faq || []),
        metaTitle,
        metaDesc,
        status: status || "PUBLISHED",
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("POST blog post error:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
