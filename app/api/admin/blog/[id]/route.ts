import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

// GET /api/admin/blog/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const post = await db.blogPost.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("GET blog post by ID error:", error);
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
  }
}

// PUT /api/admin/blog/[id]
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

    // Validate
    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const payload = {
      title,
      slug,
      excerpt,
      content,
      image: image || "/images/projects/project-3.png",
      category: category || "Cleanroom",
      author: author || "Ashish Jha",
      date: date || new Date().toISOString().split("T")[0],
      readTime: readTime || "5 min read",
      faq: typeof faq === "string" ? faq : JSON.stringify(faq || []),
      metaTitle: metaTitle || "",
      metaDesc: metaDesc || "",
      status: status || "PUBLISHED",
    };

    const existing = await db.blogPost.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }, { slug }],
      },
    });

    let post;
    if (existing) {
      post = await db.blogPost.update({
        where: { id: existing.id },
        data: payload,
      });
    } else {
      post = await db.blogPost.create({
        data: payload,
      });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("PUT blog post error:", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

// DELETE /api/admin/blog/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existing = await db.blogPost.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
    });

    if (existing) {
      await db.blogPost.delete({
        where: { id: existing.id },
      });
    }
    return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("DELETE blog post error:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
