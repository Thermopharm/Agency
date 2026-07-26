import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ProjectForm from "../ProjectForm";

interface EditProjectPageProps {
  params: {
    id: string;
  };
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  let project = null;

  try {
    project = await db.project.findUnique({
      where: { id: params.id },
    });
  } catch (error) {
    console.error("Error fetching project for edit:", error);
  }

  if (!project) {
    return notFound();
  }

  const initialData = {
    id: project.id,
    title: project.title,
    slug: project.slug,
    location: project.location,
    year: project.year,
    client: project.client,
    category: project.category,
    image: project.image,
    description: project.description,
    challenge: project.challenge,
    solution: project.solution,
    results: JSON.parse(project.results || "[]"),
    tags: JSON.parse(project.tags || "[]"),
    faq: JSON.parse(project.faq || "[]"),
    metaTitle: project.metaTitle || "",
    metaDesc: project.metaDesc || "",
    status: project.status,
  };

  return <ProjectForm initialData={initialData} />;
}
