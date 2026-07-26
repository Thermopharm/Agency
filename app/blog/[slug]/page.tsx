import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, ShieldCheck, CheckCircle2, Award } from "lucide-react";
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

  const keywordsList = post.secondaryKeywords
    ? post.secondaryKeywords.split(",").map((k: string) => k.trim())
    : [post.category, "HVAC", "cleanroom", "engineering", "GMP"];

  return generateSeoMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt,
    slug: `blog/${post.slug}`,
    ogImage: post.ogImage || post.image,
    keywords: keywordsList,
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

  const parseJson = (val: any, fallback: any = []) => {
    if (!val) return fallback;
    if (Array.isArray(val)) return val;
    try {
      return JSON.parse(val);
    } catch {
      return fallback;
    }
  };

  const faqs = parseJson(post.faq, []);
  const keyTakeaways = parseJson(post.keyTakeaways, []);
  const techSpecs = parseJson(post.techSpecs, []);
  const sources = parseJson(post.sources, []);
  const industryTags = parseJson(post.industryTags, []);

  // Schema LD+JSON for Article and FAQPage
  const schemaType = post.schemaType || "BlogPosting";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorCredentials || "HVAC Engineering Consultant",
    },
    reviewer: post.technicalReviewer
      ? { "@type": "Person", name: post.technicalReviewer }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Thermopharm Engineering",
      logo: { "@type": "ImageObject", url: "https://thermopharm.in/logo.png" },
    },
    datePublished: post.date,
    dateModified: post.lastUpdated || post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://thermopharm.in/blog/${post.slug}` },
  };

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f: any) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Header / Hero */}
      <section className="relative pt-32 pb-16 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs uppercase tracking-[0.1em] mb-6 transition-colors font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Engineering Articles
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-[0.08em] rounded-md">
              {post.category}
            </span>
            {industryTags.map((tag: string, i: number) => (
              <span
                key={i}
                className="inline-block px-2.5 py-1 bg-slate-800 text-slate-300 text-[10px] font-medium rounded-md border border-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-[clamp(28px,4.5vw,54px)] font-extrabold leading-[1.1] tracking-tight mb-6">
            {post.title}
          </h1>

          {/* E-E-A-T Author & Reviewer Metadata Box */}
          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 pt-4 border-t border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                {post.author.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-white">{post.author}</p>
                <p className="text-[11px] text-slate-400">{post.authorCredentials || "Senior HVAC Engineer"}</p>
              </div>
            </div>

            {post.technicalReviewer && (
              <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-bold">Reviewed By</span>
                  <span className="text-xs font-semibold text-white">{post.technicalReviewer}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px] ml-auto">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                Updated: {post.lastUpdated || post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="py-16 bg-white text-slate-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 space-y-10">
          {/* Cover Image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 shadow-sm">
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* GEO Key Takeaways Box */}
          {keyTakeaways.length > 0 && (
            <div className="bg-blue-50/70 border-l-4 border-blue-600 p-6 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Key Takeaways (Executive Engineering Summary)
              </h3>
              <ul className="space-y-2">
                {keyTakeaways.map((item: string, i: number) => (
                  <li key={i} className="text-xs text-blue-900 font-medium leading-relaxed flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Specifications Table */}
          {techSpecs.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-slate-700" />
                Technical Specifications Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {techSpecs.map((spec: any, i: number) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-slate-200/80 flex justify-between gap-4">
                    <span className="text-xs font-semibold text-slate-500">{spec.key}</span>
                    <span className="text-xs font-bold text-slate-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Article HTML Content */}
          <div
            className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-blue-600 prose-strong:text-slate-900 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/## (.+)/g, "<h2 class='text-2xl font-bold text-slate-900 mt-10 mb-4'>$1</h2>")
                .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
            }}
          />

          {/* CTA Banner */}
          <div className="bg-slate-900 text-white p-8 rounded-3xl text-center space-y-4 shadow-xl border border-slate-800">
            <h3 className="text-xl font-extrabold tracking-tight">
              {post.ctaText || "Need Expert Cleanroom & HVAC Engineering Solutions?"}
            </h3>
            <p className="text-xs text-slate-300 max-w-xl mx-auto">
              Our engineering team designs turn-key ISO 14644 cleanrooms, AHU systems, and GMP-compliant validation.
            </p>
            <Link
              href={post.ctaLink || "/contact"}
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              Get Engineering Proposal
            </Link>
          </div>

          {/* Regulatory Disclaimer & Sources */}
          <div className="pt-8 border-t border-slate-200 text-xs text-slate-500 space-y-4">
            {post.disclaimerText && (
              <p className="italic bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <strong>Engineering Disclaimer:</strong> {post.disclaimerText}
              </p>
            )}

            {sources.length > 0 && (
              <div>
                <p className="font-bold text-slate-700 uppercase text-[10px] tracking-wider mb-1">
                  References & Standard Guidelines:
                </p>
                <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-slate-600">
                  {sources.map((src: string, i: number) => (
                    <li key={i}>{src}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <FaqSection faqs={faqs} title="Frequently Asked Questions (AEO)" />
      )}

      {/* Related Technical Articles */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">
            Related Engineering Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/blog/${related.slug}`}
                className="group flex gap-5 bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <Image src={related.image} alt={related.title} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-blue-600 font-extrabold uppercase tracking-[0.1em] mb-1">
                    {related.category}
                  </p>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm leading-snug line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-slate-400 font-mono text-[11px] mt-2">{related.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
