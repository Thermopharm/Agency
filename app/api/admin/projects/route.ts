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
    const projects = await db.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
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
      description,
      challenge,
      solution,
      results,
      tags,
      faq,
      metaTitle,
      metaDesc,
      status,
    } = body;

    // Validation
    if (!title || !slug || !description || !challenge || !solution) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Slug check
    const existing = await db.project.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists. Choose a unique title." }, { status: 400 });
    }

    const project = await db.project.create({
      data: {
        title,
        slug,
        location: location || "India",
        year: year || new Date().getFullYear().toString(),
        client: client || "Confidential Client",
        category: category || "General",
        image: image || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
        description,
        challenge,
        solution,
        results: JSON.stringify(results || []),
        tags: JSON.stringify(tags || []),
        faq: JSON.stringify(faq || []),
        metaTitle,
        metaDesc,
        status: status || "PUBLISHED",
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("POST project error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
