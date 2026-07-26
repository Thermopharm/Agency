import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { getAllBlogPosts } from "@/lib/content";
import { generateSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generateSeoMetadata({
  title: "Blog — HVAC, Cleanroom & Pharmaceutical Engineering Insights",
  description:
    "Expert articles on HVAC design, cleanroom classification, ISO 14644 standards, BIM modelling, and GMP compliance from Thermopharm's engineering team.",
  slug: "blog",
  keywords: ["HVAC blog", "cleanroom standards", "ISO 14644 guide", "pharmaceutical engineering blog"],
});

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      {/* Dark Hero */}
      <section className="relative pt-32 pb-24 bg-slate-50 text-slate-900 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-blue-500 mb-4">
              Knowledge & Insights
            </p>
            <h1 className="font-display text-[clamp(36px,5.5vw,68px)] font-bold leading-[1.05] tracking-tight mb-8">
              Engineering standards, <br />
              <span className="text-blue-500">guides & technical notes.</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              In-depth analysis on cleanroom compliance, HVAC design principles, and BMS automation.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                id={`blog-card-${post.id}`}
                className="group block border border-gray-200 bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-black/80 text-slate-900 text-[10px] font-medium uppercase tracking-[0.06em]">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium uppercase tracking-[0.08em] mb-3">
                    <span>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-600" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-display text-lg font-bold text-[#0a0a0a] mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-blue-600">
                      Read Article
                    </span>
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 group-hover:bg-blue-600 group-hover:text-slate-900 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
