import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = `# Thermopharm Pvt. Ltd. — Cleanroom & HVAC Engineering
> Pan-India turnkey engineering execution for Pharmaceutical, Biotech, Healthcare, and High-Tech Manufacturing.

## Overview
Thermopharm Pvt. Ltd. delivers WHO-GMP, USFDA (21 CFR Part 11), and ISO 14644 compliant HVAC and cleanroom engineering solutions across India.

## Key Services
- **HVAC Systems**: Precision temperature and dew point control down to -40°C with HEPA H14 filtration.
- **Cleanroom Solutions**: ISO 5 to ISO 8 modular cleanroom design, installation, and qualification.
- **BIM Modelling**: LOD 400 3D MEP coordination and clash detection.
- **BMS & Controls**: Automated environmental monitoring and SCADA audit trails.
- **Pharmaceutical Engineering**: Process piping, water-for-injection (WFI) systems, and facility design.

## Core Pages
- Homepage: https://thermopharm.in/
- About Us: https://thermopharm.in/about
- Services: https://thermopharm.in/services
- Industries Served: https://thermopharm.in/industries
- Project Portfolio: https://thermopharm.in/projects
- Client Partners: https://thermopharm.in/clients
- Technical Blog: https://thermopharm.in/blog
- Contact & Enquiries: https://thermopharm.in/contact

## Compliance Standards
WHO-GMP TRS 961, US-FDA 21 CFR Part 210/211, EU-GMP Annex 1, ISO 14644-1/2, ISHRAE/ASHRAE 62.1.
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
