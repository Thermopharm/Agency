import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    let settings = await (db as any).siteSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await (db as any).siteSettings.create({
        data: {
          id: "default",
          gaId: "",
          gtmId: "",
          searchConsoleVerification: "",
          clarityId: "",
          customHeadScripts: "",
          customBodyScripts: "",
          seoDefaultTitle: "Thermopharm — Industrial Cleanroom & HVAC Engineering",
          seoDefaultDesc: "Turnkey GMP-certified cleanroom & industrial HVAC engineering solutions across India.",
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error: any) {
    console.error("Error fetching site analytics settings:", error);
    return NextResponse.json(
      { error: error.message || "Failed to load analytics settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      gaId,
      gtmId,
      searchConsoleVerification,
      clarityId,
      customHeadScripts,
      customBodyScripts,
      seoDefaultTitle,
      seoDefaultDesc,
    } = body;

    const settings = await (db as any).siteSettings.upsert({
      where: { id: "default" },
      update: {
        gaId: gaId || "",
        gtmId: gtmId || "",
        searchConsoleVerification: searchConsoleVerification || "",
        clarityId: clarityId || "",
        customHeadScripts: customHeadScripts || "",
        customBodyScripts: customBodyScripts || "",
        seoDefaultTitle: seoDefaultTitle || "",
        seoDefaultDesc: seoDefaultDesc || "",
      },
      create: {
        id: "default",
        gaId: gaId || "",
        gtmId: gtmId || "",
        searchConsoleVerification: searchConsoleVerification || "",
        clarityId: clarityId || "",
        customHeadScripts: customHeadScripts || "",
        customBodyScripts: customBodyScripts || "",
        seoDefaultTitle: seoDefaultTitle || "",
        seoDefaultDesc: seoDefaultDesc || "",
      },
    });

    return NextResponse.json(settings);
  } catch (error: any) {
    console.error("Error saving site analytics settings:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save analytics settings" },
      { status: 500 }
    );
  }
}
