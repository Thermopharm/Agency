import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { services, projects, blogPosts } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = "https://thermopharm.in";

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
    // fallback to static data
  }

  const staticUrls = [
    "",
    "/about",
    "/services",
    "/industries",
    "/projects",
    "/clients",
    "/blog",
    "/contact",
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls
    .map(
      (path) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === "" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("")}
  ${dbServices
    .map(
      (s) => `
  <url>
    <loc>${baseUrl}/services/${s.slug}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}
  ${dbProjects
    .map(
      (p) => `
  <url>
    <loc>${baseUrl}/projects/${p.slug}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}
  ${dbBlogs
    .map(
      (b) => `
  <url>
    <loc>${baseUrl}/blog/${b.slug}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
