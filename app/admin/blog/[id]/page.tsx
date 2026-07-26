import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import BlogForm from "../BlogForm";

interface EditBlogPostPageProps {
  params: {
    id: string;
  };
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  let post = null;

  try {
    post = await db.blogPost.findUnique({
      where: { id: params.id },
    });
  } catch (error) {
    console.error("Error fetching blog post for edit:", error);
  }

  if (!post) {
    return notFound();
  }

  const initialData = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    image: post.image,
    category: post.category,
    author: post.author,
    date: post.date,
    readTime: post.readTime,
    faq: JSON.parse(post.faq || "[]"),
    metaTitle: post.metaTitle || "",
    metaDesc: post.metaDesc || "",
    status: post.status,
  };

  return <BlogForm initialData={initialData} />;
}
