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

    const updated = await prisma.industry.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        shortDesc,
        fullDesc,
        image,
        icon,
        specs: typeof specs === "string" ? specs : JSON.stringify(specs || []),
        standards: typeof standards === "string" ? standards : JSON.stringify(standards || []),
        status,
      },
    });

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
    await prisma.industry.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting industry:", error);
    return NextResponse.json({ error: "Failed to delete industry" }, { status: 500 });
  }
}
