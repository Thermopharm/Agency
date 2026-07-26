import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { services, projects, blogPosts } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  let dbServices = services;
  let dbProjects = projects;
  let dbBlogs = blogPosts;

  try {
    const s = await prisma.service.findMany({ where: { status: "PUBLISHED" } });
    if (s.length > 0) dbServices = s as any;
    const p = await prisma.project.findMany({ where: { status: "PUBLISHED" } });
    if (p.length > 0) dbProjects = p as any;
    const b = await prisma.blogPost.findMany({ where: { status: "PUBLISHED" } });
    if (b.length > 0) dbBlogs = b as any;
  } catch (e) {
    // fallback
  }

  let markdown = `# Thermopharm Pvt. Ltd. — Comprehensive Technical & Engineering Documentation

## Corporate Identity
Thermopharm Pvt. Ltd. is a premier Indian cleanroom and industrial HVAC engineering organization specializing in WHO-GMP, US-FDA, and ISO 14644 compliance.

---

## 1. Engineering Services & Capabilities

`;

  dbServices.forEach((s) => {
    markdown += `### ${s.title}\n`;
    markdown += `**Description:** ${s.fullDesc || s.shortDesc}\n\n`;
    if (s.specs) {
      markdown += `**Technical Specifications:**\n`;
      const specsList = typeof s.specs === "string" ? JSON.parse(s.specs) : s.specs;
      if (Array.isArray(specsList)) {
        specsList.forEach((spec) => (markdown += `- ${spec}\n`));
      }
    }
    markdown += `\n`;
  });

  markdown += `---\n\n## 2. Project Portfolio & Case Studies\n\n`;
  dbProjects.forEach((p) => {
    markdown += `### ${p.title}\n`;
    markdown += `- **Client:** ${p.client || "Confidential Pharma Facility"}\n`;
    markdown += `- **Category:** ${p.category || "Cleanroom & HVAC"}\n`;
    markdown += `- **Location:** ${p.location || "India"}\n`;
    markdown += `- **Summary:** ${p.description}\n\n`;
  });

  markdown += `---\n\n## 3. Technical Knowledge Base & Articles\n\n`;
  dbBlogs.forEach((b) => {
    markdown += `### ${b.title}\n`;
    markdown += `**Excerpt:** ${b.excerpt}\n\n`;
    markdown += `${b.content || ""}\n\n`;
  });

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
