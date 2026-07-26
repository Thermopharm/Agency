import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/content";
import { generateSeoMetadata } from "@/lib/seo";
import FaqSection from "@/components/FaqSection";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};
  return generateSeoMetadata({
    title: post.title,
    description: post.excerpt,
    slug: `blog/${post.slug}`,
    ogImage: post.image,
    keywords: [post.category, "HVAC", "cleanroom", "engineering", "GMP"],
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Thermopharm Pvt. Ltd.",
      logo: { "@type": "ImageObject", url: "https://thermopharm.in/logo.png" },
    },
    datePublished: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://thermopharm.in/blog/${post.slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Dark Hero */}
      <section className="relative pt-32 pb-24 bg-slate-50 text-slate-900 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs uppercase tracking-[0.1em] mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
          </Link>
          <span className="inline-block px-3 py-1 bg-blue-600 text-slate-900 text-[10px] font-medium uppercase tracking-[0.08em] mb-4">
            {post.category}
          </span>
          <h1 className="font-display text-[clamp(32px,5vw,60px)] font-bold leading-[1.05] tracking-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-slate-500 text-xs font-medium uppercase tracking-[0.08em]">
            <span className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-blue-500" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 mb-12 border border-gray-200">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div
            className="prose prose-lg prose-gray max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-blue-600 prose-strong:text-gray-900 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/## (.+)/g, "<h2 class='text-2xl font-bold text-[#0a0a0a] mt-10 mb-4'>$1</h2>")
                .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
            }}
          />
        </div>
      </section>

      {post.faq && post.faq.length > 0 && (
        <FaqSection faqs={post.faq} title="Frequently Asked Questions" />
      )}

      {/* Related Posts */}
      <section className="py-20 bg-[#fafafa] border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <h2 className="font-display text-2xl font-bold text-[#0a0a0a] mb-8">Related Technical Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/blog/${related.slug}`}
                className="group flex gap-5 bg-white p-6 border border-gray-200 hover:border-gray-300 transition-all"
              >
                <div className="relative w-24 h-24 bg-gray-100 flex-shrink-0">
                  <Image src={related.image} alt={related.title} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-[11px] text-blue-600 font-medium uppercase tracking-[0.1em] mb-1">{related.category}</p>
                  <h3 className="font-display font-bold text-[#0a0a0a] group-hover:text-blue-600 transition-colors text-base leading-snug line-clamp-2">
                    {related.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
