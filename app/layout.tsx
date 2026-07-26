import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { generateOrganizationSchema } from "@/lib/seo";
import { companyInfo } from "@/lib/data";

import AnalyticsScripts from "@/components/AnalyticsScripts";

export const metadata: Metadata = {
  title: {
    default: "Thermopharm Pvt. Ltd. | HVAC & Cleanroom Engineering India",
    template: "%s | Thermopharm Pvt. Ltd.",
  },
  description:
    "Leading HVAC, cleanroom design, and pharmaceutical facility engineering company in Mumbai, India. GMP-certified solutions for pharma, biotech, and healthcare since 2018.",
  keywords:
    "HVAC engineering Mumbai, cleanroom design India, pharmaceutical HVAC, GMP cleanroom, ISO 14644, BIM MEP, cleanroom validation, HVAC commissioning",
  metadataBase: new URL("https://thermopharm.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://thermopharm.in",
    siteName: companyInfo.name,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "YOUR_GSC_VERIFICATION_TOKEN",
  },
};

const orgSchema = generateOrganizationSchema();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* @ts-ignore */}
        <AnalyticsScripts />
      </head>
      <body className="antialiased text-[#0a0a0a] bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <SmoothScroll>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
