import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/admin/

Sitemap: https://thermopharm.in/api/sitemap.xml
Sitemap: https://thermopharm.in/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
