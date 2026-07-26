import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/session";

export async function GET() {
  try {
    const industries = await prisma.industry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(industries);
  } catch (error) {
    console.error("Error fetching industries:", error);
    return NextResponse.json({ error: "Failed to fetch industries" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, shortDesc, fullDesc, image, icon, specs, standards, status } = body;

    if (!title || !shortDesc) {
      return NextResponse.json({ error: "Title and Short Description are required" }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const industry = await prisma.industry.create({
      data: {
        title,
        slug: generatedSlug,
        shortDesc,
        fullDesc: fullDesc || shortDesc,
        image: image || "/images/projects/project-1.png",
        icon: icon || "Factory",
        specs: typeof specs === "string" ? specs : JSON.stringify(specs || []),
        standards: typeof standards === "string" ? standards : JSON.stringify(standards || []),
        status: status || "PUBLISHED",
      },
    });

    return NextResponse.json(industry, { status: 201 });
  } catch (error) {
    console.error("Error creating industry:", error);
    return NextResponse.json({ error: "Failed to create industry" }, { status: 500 });
  }
}
