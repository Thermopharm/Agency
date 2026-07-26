import { db, dbRetry } from "@/lib/db";
import { notFound } from "next/navigation";
import ProjectForm from "../ProjectForm";
import { getProjectBySlug } from "@/lib/content";

interface EditProjectPageProps {
  params: {
    id: string;
  };
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  let project: any = null;

  try {
    project = await dbRetry((client) =>
      client.project.findFirst({
        where: {
          OR: [{ id: params.id }, { slug: params.id }],
        },
      })
    );
  } catch (error) {
    console.error("Error fetching project from DB:", error);
  }

  if (!project) {
    project = await getProjectBySlug(params.id);
  }

  if (!project) {
    return notFound();
  }

  const initialData = {
    id: project.id || project.slug,
    title: project.title,
    slug: project.slug,
    location: project.location || "India",
    year: project.year || "2024",
    client: project.client || "Confidential Client",
    category: project.category || "Cleanrooms",
    image: project.image || "/images/projects/project-1.png",
    description: project.description || "",
    challenge: project.challenge || "",
    solution: project.solution || "",
    results: Array.isArray(project.results) ? project.results : JSON.parse(project.results || "[]"),
    tags: Array.isArray(project.tags) ? project.tags : JSON.parse(project.tags || "[]"),
    faq: Array.isArray(project.faq) ? project.faq : JSON.parse(project.faq || "[]"),
    metaTitle: project.metaTitle || "",
    metaDesc: project.metaDesc || "",
    status: project.status || "PUBLISHED",
  };

  return <ProjectForm initialData={initialData} />;
}
