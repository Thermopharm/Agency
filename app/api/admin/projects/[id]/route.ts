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
    const project = await db.project.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("GET project by ID error:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
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

    // Validate
    if (!title || !slug || !description || !challenge || !solution) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Slug check (excluding current project)
    const existing = await db.project.findFirst({
      where: {
        slug,
        id: { not: params.id },
      },
    });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists. Choose a unique title." }, { status: 400 });
    }

    const project = await db.project.update({
      where: { id: params.id },
      data: {
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
        results: JSON.stringify(results),
        tags: JSON.stringify(tags),
        faq: JSON.stringify(faq),
        metaTitle,
        metaDesc,
        status,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("PUT project error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
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
    await db.project.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("DELETE project error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
