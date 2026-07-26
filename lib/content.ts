import { db } from "./db";
import { services as staticServices, projects as staticProjects, blogPosts as staticBlogPosts } from "./data";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceType {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  image: string;
  specs: string[];
  standards: string[];
  faq?: FAQItem[];
  metaTitle?: string | null;
  metaDesc?: string | null;
  keywords?: string | null;
  status?: string;
}

export interface ProjectType {
  id: string;
  slug: string;
  title: string;
  location: string;
  year: string;
  client: string;
  category: string;
  image: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
  faq?: FAQItem[];
  metaTitle?: string | null;
  metaDesc?: string | null;
  status?: string;
}

export interface BlogPostType {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  faq?: FAQItem[];
  metaTitle?: string | null;
  metaDesc?: string | null;
  status?: string;
}

function safeParse<T>(jsonStr: string, fallback: T): T {
  try {
    return JSON.parse(jsonStr) as T;
  } catch (e) {
    return fallback;
  }
}

// SERVICES
export async function getAllServices(): Promise<ServiceType[]> {
  try {
    const dbServices = await db.service.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });

    const parsedDb: ServiceType[] = dbServices.map((s) => ({
      ...s,
      specs: safeParse<string[]>(s.specs, []),
      standards: safeParse<string[]>(s.standards, []),
      faq: safeParse<FAQItem[]>(s.faq, []),
    }));

    // Merge static and DB, letting DB overwrite static slugs
    const merged: ServiceType[] = [...parsedDb];
    for (const stat of staticServices) {
      if (!merged.some((m) => m.slug === stat.slug)) {
        merged.push({ ...stat, status: "PUBLISHED" });
      }
    }
    return merged;
  } catch (e) {
    return staticServices.map((s) => ({ ...s, status: "PUBLISHED" }));
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceType | null> {
  try {
    const dbSvc = await db.service.findUnique({ where: { slug } });
    if (dbSvc) {
      return {
        ...dbSvc,
        specs: safeParse<string[]>(dbSvc.specs, []),
        standards: safeParse<string[]>(dbSvc.standards, []),
        faq: safeParse<FAQItem[]>(dbSvc.faq, []),
      } as ServiceType;
    }
  } catch (e) {}

  const stat = staticServices.find((s) => s.slug === slug);
  return stat ? { ...stat, status: "PUBLISHED" } : null;
}

// PROJECTS
export async function getAllProjects(): Promise<ProjectType[]> {
  try {
    const dbProjects = await db.project.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });

    const parsedDb: ProjectType[] = dbProjects.map((p) => ({
      ...p,
      results: safeParse<string[]>(p.results, []),
      tags: safeParse<string[]>(p.tags, []),
      faq: safeParse<FAQItem[]>(p.faq, []),
    }));

    const merged: ProjectType[] = [...parsedDb];
    for (const stat of staticProjects) {
      if (!merged.some((m) => m.slug === stat.slug)) {
        merged.push({ ...stat, status: "PUBLISHED" });
      }
    }
    return merged;
  } catch (e) {
    return staticProjects.map((p) => ({ ...p, status: "PUBLISHED" }));
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectType | null> {
  try {
    const dbProj = await db.project.findUnique({ where: { slug } });
    if (dbProj) {
      return {
        ...dbProj,
        results: safeParse<string[]>(dbProj.results, []),
        tags: safeParse<string[]>(dbProj.tags, []),
        faq: safeParse<FAQItem[]>(dbProj.faq, []),
      } as ProjectType;
    }
  } catch (e) {}

  const stat = staticProjects.find((p) => p.slug === slug);
  return stat ? { ...stat, status: "PUBLISHED" } : null;
}

// BLOG POSTS
export async function getAllBlogPosts(): Promise<BlogPostType[]> {
  try {
    const dbPosts = await db.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });

    const parsedDb: BlogPostType[] = dbPosts.map((p) => ({
      ...p,
      faq: safeParse<FAQItem[]>(p.faq, []),
    }));

    const merged: BlogPostType[] = [...parsedDb];
    for (const stat of staticBlogPosts) {
      if (!merged.some((m) => m.slug === stat.slug)) {
        merged.push({ ...stat, status: "PUBLISHED" });
      }
    }
    return merged;
  } catch (e) {
    return staticBlogPosts.map((b) => ({ ...b, status: "PUBLISHED" }));
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostType | null> {
  try {
    const dbPost = await db.blogPost.findUnique({ where: { slug } });
    if (dbPost) {
      return {
        ...dbPost,
        faq: safeParse<FAQItem[]>(dbPost.faq, []),
      } as BlogPostType;
    }
  } catch (e) {}

  const stat = staticBlogPosts.find((b) => b.slug === slug);
  return stat ? { ...stat, status: "PUBLISHED" } : null;
}
