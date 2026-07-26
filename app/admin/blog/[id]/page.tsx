import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import BlogForm from "../BlogForm";
import { getBlogPostBySlug } from "@/lib/content";

interface EditBlogPostPageProps {
  params: {
    id: string;
  };
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  let post: any = null;

  try {
    post = await db.blogPost.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
    });
  } catch (error) {
    console.error("Error fetching blog post for edit:", error);
  }

  if (!post) {
    post = await getBlogPostBySlug(params.id);
  }

  if (!post) {
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
    id: post.id || post.slug,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
    content: post.content || "",
    image: post.image || "/images/projects/project-3.png",
    imageAlt: post.imageAlt || post.title || "",
    category: post.category || "HVAC Engineering",
    author: post.author || "Ashish Jha",
    authorCredentials: post.authorCredentials || "Senior HVAC Cleanroom Engineer, 15+ years exp",
    technicalReviewer: post.technicalReviewer || "Thermopharm Technical Quality Board",
    date: post.date || new Date().toISOString().split("T")[0],
    lastUpdated: post.lastUpdated || new Date().toISOString().split("T")[0],
    readTime: post.readTime || "5 min read",
    faq: parseJsonField(post.faq, []),
    keyTakeaways: parseJsonField(post.keyTakeaways, []),
    techSpecs: parseJsonField(post.techSpecs, []),
    tableData: parseJsonField(post.tableData, []),
    calloutBoxes: parseJsonField(post.calloutBoxes, []),
    videoUrl: post.videoUrl || "",
    videoTranscript: post.videoTranscript || "",
    downloadableResources: parseJsonField(post.downloadableResources, []),
    gallery: parseJsonField(post.gallery, []),
    schemaType: post.schemaType || "BlogPosting",
    focusKeyword: post.focusKeyword || "",
    secondaryKeywords: post.secondaryKeywords || "",
    ogImage: post.ogImage || post.image || "",
    twitterCard: post.twitterCard || "summary_large_image",
    canonicalUrl: post.canonicalUrl || "",
    robotsMeta: post.robotsMeta || "index, follow",
    relatedServices: parseJsonField(post.relatedServices, []),
    relatedProjects: parseJsonField(post.relatedProjects, []),
    relatedArticles: parseJsonField(post.relatedArticles, []),
    ctaText: post.ctaText || "Request a Custom Cleanroom Engineering Consultation",
    ctaLink: post.ctaLink || "/contact",
    ctaStyle: post.ctaStyle || "button",
    disclaimerText: post.disclaimerText || "This article provides general engineering guidance in compliance with ISO 14644 & GMP standards.",
    sources: parseJsonField(post.sources, []),
    industryTags: parseJsonField(post.industryTags, []),
    standardsMentioned: parseJsonField(post.standardsMentioned, []),
    metaTitle: post.metaTitle || post.title,
    metaDesc: post.metaDesc || post.excerpt,
    status: post.status || "PUBLISHED",
  };

  return <BlogForm initialData={initialData} />;
}
