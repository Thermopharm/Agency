import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/session";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, shortDesc, fullDesc, image, icon, specs, standards, status } = body;

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
      shortDesc,
      fullDesc: fullDesc || shortDesc,
      image: image || "/images/projects/project-1.png",
      icon: icon || "Factory",
      specs: typeof specs === "string" ? specs : JSON.stringify(specs || []),
      standards: typeof standards === "string" ? standards : JSON.stringify(standards || []),
      status: status || "PUBLISHED",
    };

    const existing = await prisma.industry.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }, { slug: payload.slug }],
      },
    });

    let updated;
    if (existing) {
      updated = await prisma.industry.update({
        where: { id: existing.id },
        data: payload,
      });
    } else {
      updated = await prisma.industry.create({
        data: payload,
      });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating industry:", error);
    return NextResponse.json({ error: "Failed to update industry" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existing = await prisma.industry.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
    });

    if (existing) {
      await prisma.industry.delete({
        where: { id: existing.id },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting industry:", error);
    return NextResponse.json({ error: "Failed to delete industry" }, { status: 500 });
  }
}
