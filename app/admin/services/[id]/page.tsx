import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ServiceForm from "../ServiceForm";
import { getServiceBySlug } from "@/lib/content";

interface EditServicePageProps {
  params: {
    id: string;
  };
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  let service: any = null;

  try {
    service = await db.service.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
    });
  } catch (error) {
    console.error("Error fetching service for edit:", error);
  }

  if (!service) {
    service = await getServiceBySlug(params.id);
  }

  if (!service) {
    return notFound();
  }

  const initialData = {
    id: service.id || service.slug,
    title: service.title,
    slug: service.slug,
    shortDesc: service.shortDesc || "",
    fullDesc: service.fullDesc || "",
    icon: service.icon || "Layers",
    image: service.image || "/images/projects/project-1.png",
    specs: Array.isArray(service.specs) ? service.specs : JSON.parse(service.specs || "[]"),
    standards: Array.isArray(service.standards) ? service.standards : JSON.parse(service.standards || "[]"),
    faq: Array.isArray(service.faq) ? service.faq : JSON.parse(service.faq || "[]"),
    metaTitle: service.metaTitle || "",
    metaDesc: service.metaDesc || "",
    keywords: service.keywords || "",
    status: service.status || "PUBLISHED",
  };

  return <ServiceForm initialData={initialData} />;
}
