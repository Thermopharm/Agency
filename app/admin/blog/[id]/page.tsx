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

  const initialData = {
    id: post.id || post.slug,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
    content: post.content || "",
    image: post.image || "/images/projects/project-3.png",
    category: post.category || "Cleanroom",
    author: post.author || "Ashish Jha",
    date: post.date || "2024-01-15",
    readTime: post.readTime || "5 min read",
    faq: Array.isArray(post.faq) ? post.faq : JSON.parse(post.faq || "[]"),
    metaTitle: post.metaTitle || "",
    metaDesc: post.metaDesc || "",
    status: post.status || "PUBLISHED",
  };

  return <BlogForm initialData={initialData} />;
}
