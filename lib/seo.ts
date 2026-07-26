import type { Metadata } from "next";
import { companyInfo } from "@/lib/data";

interface SeoProps {
  title: string;
  description: string;
  slug?: string;
  ogImage?: string;
  keywords?: string[];
  noIndex?: boolean;
  faq?: { question: string; answer: string }[];
}

const BASE_URL = "https://thermopharm.in";

export function generateSeoMetadata({
  title,
  description,
  slug = "",
  ogImage,
  keywords = [],
  noIndex = false,
}: SeoProps): Metadata {
  const fullTitle = `${title} | Thermopharm Pvt. Ltd.`;
  const canonicalUrl = `${BASE_URL}/${slug}`;
  const defaultImage = `${BASE_URL}/og-default.jpg`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "HVAC engineering Mumbai",
      "cleanroom design India",
      "pharmaceutical HVAC",
      "GMP cleanroom",
      "ISO 14644",
      ...keywords,
    ].join(", "),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: companyInfo.name,
      images: [{ url: ogImage || defaultImage, width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage || defaultImage],
    },
  };
}

export function generateFaqSchema(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyInfo.name,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: companyInfo.phone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office No 319, Infinity Square Building, Chinchpada",
      addressLocality: "Vasai East",
      addressRegion: "Maharashtra",
      postalCode: "401208",
      addressCountry: "IN",
    },
    sameAs: [companyInfo.socialLinks.linkedin],
  };
}
