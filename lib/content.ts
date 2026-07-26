import { db } from "./db";
import { services as staticServices, projects as staticProjects, blogPosts as staticBlogPosts, industries as staticIndustries } from "./data";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface IndustryType {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  image: string;
  imageAlt?: string | null;
  specs: string[];
  standards: string[];
  challenges?: string[];
  solutions?: string[];
  relatedServices?: string[];
  relatedProjects?: string[];
  relatedArticles?: string[];
  metaTitle?: string | null;
  metaDesc?: string | null;
  focusKeyword?: string | null;
  canonicalUrl?: string | null;
  robotsMeta?: string | null;
  faq?: FAQItem[];
  status?: string;
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
  imageAlt?: string | null;
  category: string;
  author: string;
  authorCredentials?: string | null;
  technicalReviewer?: string | null;
  date: string;
  lastUpdated?: string | null;
  readTime: string;
  faq?: FAQItem[] | string;
  keyTakeaways?: string[] | string | null;
  techSpecs?: any;
  schemaType?: string | null;
  focusKeyword?: string | null;
  secondaryKeywords?: string | null;
  ogImage?: string | null;
  twitterCard?: string | null;
  canonicalUrl?: string | null;
  robotsMeta?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
  ctaStyle?: string | null;
  disclaimerText?: string | null;
  sources?: string[] | string | null;
  industryTags?: string[] | string | null;
  standardsMentioned?: string[] | string | null;
  metaTitle?: string | null;
  metaDesc?: string | null;
  status?: string;
}

function safeParse<T>(jsonStr: string | null | undefined, fallback: T): T {
  if (!jsonStr) return fallback;
  if (typeof jsonStr !== "string") return jsonStr as T;
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
      keyTakeaways: safeParse<string[]>(p.keyTakeaways, []),
      techSpecs: safeParse<any[]>(p.techSpecs, []),
      sources: safeParse<string[]>(p.sources, []),
      industryTags: safeParse<string[]>(p.industryTags, []),
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
        keyTakeaways: safeParse<string[]>(dbPost.keyTakeaways, []),
        techSpecs: safeParse<any[]>(dbPost.techSpecs, []),
        sources: safeParse<string[]>(dbPost.sources, []),
        industryTags: safeParse<string[]>(dbPost.industryTags, []),
      } as BlogPostType;
    }
  } catch (e) {}

  const stat = staticBlogPosts.find((b) => b.slug === slug);
  return stat ? { ...stat, status: "PUBLISHED" } : null;
}

// INDUSTRIES
export async function getAllIndustries(): Promise<IndustryType[]> {
  try {
    const dbIndustries = await db.industry.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "asc" },
    });

    const parsedDb: IndustryType[] = dbIndustries.map((ind) => ({
      ...ind,
      specs: safeParse<string[]>(ind.specs, []),
      standards: safeParse<string[]>(ind.standards, []),
      challenges: safeParse<string[]>(ind.challenges, []),
      solutions: safeParse<string[]>(ind.solutions, []),
      relatedServices: safeParse<string[]>(ind.relatedServices, []),
      relatedProjects: safeParse<string[]>(ind.relatedProjects, []),
      relatedArticles: safeParse<string[]>(ind.relatedArticles, []),
      faq: safeParse<FAQItem[]>(ind.faq, []),
    }));

    const merged: IndustryType[] = [...parsedDb];
    for (const stat of staticIndustries) {
      if (!merged.some((m) => m.slug === stat.slug)) {
        merged.push({ ...stat, status: "PUBLISHED" });
      }
    }
    return merged;
  } catch (e) {
    return staticIndustries.map((i) => ({ ...i, status: "PUBLISHED" }));
  }
}

export async function getIndustryBySlug(slug: string): Promise<IndustryType | null> {
  try {
    const dbInd = await db.industry.findUnique({ where: { slug } });
    if (dbInd) {
      return {
        ...dbInd,
        specs: safeParse<string[]>(dbInd.specs, []),
        standards: safeParse<string[]>(dbInd.standards, []),
        challenges: safeParse<string[]>(dbInd.challenges, []),
        solutions: safeParse<string[]>(dbInd.solutions, []),
        relatedServices: safeParse<string[]>(dbInd.relatedServices, []),
        relatedProjects: safeParse<string[]>(dbInd.relatedProjects, []),
        relatedArticles: safeParse<string[]>(dbInd.relatedArticles, []),
        faq: safeParse<FAQItem[]>(dbInd.faq, []),
      } as IndustryType;
    }
  } catch (e) {}

  const stat = staticIndustries.find((i) => i.slug === slug);
  return stat ? { ...stat, status: "PUBLISHED" } : null;
}
