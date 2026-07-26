import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ServiceForm from "../ServiceForm";

interface EditServicePageProps {
  params: {
    id: string;
  };
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  let service = null;

  try {
    service = await db.service.findUnique({
      where: { id: params.id },
    });
  } catch (error) {
    console.error("Error fetching service for edit:", error);
  }

  if (!service) {
    return notFound();
  }

  const initialData = {
    id: service.id,
    title: service.title,
    slug: service.slug,
    shortDesc: service.shortDesc,
    fullDesc: service.fullDesc,
    icon: service.icon,
    image: service.image,
    specs: JSON.parse(service.specs || "[]"),
    standards: JSON.parse(service.standards || "[]"),
    faq: JSON.parse(service.faq || "[]"),
    metaTitle: service.metaTitle || "",
    metaDesc: service.metaDesc || "",
    keywords: service.keywords || "",
    status: service.status,
  };

  return <ServiceForm initialData={initialData} />;
}
