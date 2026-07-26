import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import IndustryForm from "../IndustryForm";
import { getIndustryBySlug } from "@/lib/content";

interface EditIndustryPageProps {
  params: {
    id: string;
  };
}

export default async function EditIndustryPage({ params }: EditIndustryPageProps) {
  let industry: any = null;

  try {
    industry = await db.industry.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
    });
  } catch (error) {
    console.error("Error fetching industry for edit:", error);
  }

  if (!industry) {
    industry = await getIndustryBySlug(params.id);
  }

  if (!industry) {
    return notFound();
  }

  const parseJsonField = (val: any, fallback: any = []) => {
    if (!val) return fallback;
    if (Array.isArray(val)) return val;
    try {
      return JSON.parse(val);
    } catch {
      return fallback;
    }
  };

  const initialData = {
    id: industry.id || industry.slug,
    title: industry.title,
    slug: industry.slug,
    shortDesc: industry.shortDesc || "",
    fullDesc: industry.fullDesc || "",
    icon: industry.icon || "Factory",
    image: industry.image || "/images/projects/project-1.png",
    imageAlt: industry.imageAlt || industry.title || "",
    specs: parseJsonField(industry.specs, []),
    standards: parseJsonField(industry.standards, []),
    challenges: parseJsonField(industry.challenges, []),
    solutions: parseJsonField(industry.solutions, []),
    relatedServices: parseJsonField(industry.relatedServices, []),
    relatedProjects: parseJsonField(industry.relatedProjects, []),
    metaTitle: industry.metaTitle || industry.title,
    metaDesc: industry.metaDesc || industry.shortDesc,
    focusKeyword: industry.focusKeyword || "",
    canonicalUrl: industry.canonicalUrl || "",
    robotsMeta: industry.robotsMeta || "index, follow",
    faq: parseJsonField(industry.faq, []),
    status: industry.status || "PUBLISHED",
  };

  return <IndustryForm initialData={initialData} />;
}
