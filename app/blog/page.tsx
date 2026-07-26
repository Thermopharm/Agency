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
    <div className="bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white min-h-screen">
      {/* Hero Header */}
      <section className="relative pt-36 pb-24 border-b border-slate-200/80 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.08),rgba(255,255,255,0))]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-4 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
              Knowledge & Insights
            </span>
            <h1 className="font-display text-[clamp(40px,5.5vw,72px)] font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6">
              Engineering standards, <br />
              <span className="text-blue-600">guides & technical notes.</span>
            </h1>
            <p className="text-slate-600 text-lg lg:text-xl leading-relaxed">
              In-depth analysis on cleanroom compliance, HVAC design principles, and BMS automation.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                id={`blog-card-${post.id}`}
                className="group block border border-slate-200/80 bg-slate-50/70 hover:bg-white rounded-2xl overflow-hidden hover:border-slate-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 border-b border-slate-200/80">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-blue-600 border border-blue-100 text-[10px] font-extrabold uppercase tracking-[0.06em] rounded-full shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-bold uppercase tracking-[0.08em] mb-3 font-mono">
                      <span>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-display text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200/70">
                    <span className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-blue-600">
                      Read Article
                    </span>
                    <div className="w-9 h-9 flex items-center justify-center bg-blue-50 border border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all rounded-xl">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
