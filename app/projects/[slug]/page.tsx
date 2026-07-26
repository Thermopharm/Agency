import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MapPin, Calendar } from "lucide-react";
import { getProjectBySlug } from "@/lib/content";
import { generateSeoMetadata } from "@/lib/seo";
import FaqSection from "@/components/FaqSection";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  return generateSeoMetadata({
    title: `${project.title} | Thermopharm Project`,
    description: project.description,
    slug: `projects/${project.slug}`,
    ogImage: project.image,
    keywords: project.tags || [],
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      {/* Dark Hero */}
      <section className="relative pt-32 pb-24 bg-slate-50 text-slate-900 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs uppercase tracking-[0.1em] mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Case Studies
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-blue-600 text-slate-900 text-[10px] font-medium uppercase tracking-[0.08em]">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-[clamp(32px,5vw,60px)] font-bold leading-[1.05] tracking-tight mb-6">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-slate-500 text-xs font-medium uppercase tracking-[0.08em]">
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              {project.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              {project.year}
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
              Client: {project.client}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Case Study details */}
            <div className="lg:col-span-8 space-y-12">
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 border border-gray-200">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-[#0a0a0a] mb-4">
                  Project Summary
                </h2>
                <p className="text-gray-600 leading-relaxed text-base whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>

              {/* Challenge */}
              <div className="border-l-2 border-red-500 bg-[#fafafa] p-8">
                <h2 className="font-display text-xl font-bold text-[#0a0a0a] mb-3">
                  The Technical Challenge
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
                  {project.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="border-l-2 border-blue-600 bg-[#fafafa] p-8">
                <h2 className="font-display text-xl font-bold text-[#0a0a0a] mb-3">
                  Engineering Solution
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
                  {project.solution}
                </p>
              </div>

              {/* Results */}
              <div>
                <h2 className="font-display text-2xl font-bold text-[#0a0a0a] mb-6">
                  Key Outcomes & Deliverables
                </h2>
                <div className="space-y-3">
                  {project.results.map((result, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 border border-gray-200 bg-[#fafafa]">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 text-sm font-medium">{result}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              <div className="border border-gray-200 p-8 bg-[#fafafa]">
                <h3 className="font-display text-lg font-bold text-[#0a0a0a] mb-6">
                  Specifications
                </h3>
                <div className="space-y-4 text-xs font-medium uppercase tracking-[0.06em]">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-400">Client</span>
                    <span className="text-[#0a0a0a] font-semibold">{project.client}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-400">Location</span>
                    <span className="text-[#0a0a0a] font-semibold">{project.location}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-400">Year</span>
                    <span className="text-[#0a0a0a] font-semibold">{project.year}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-400">Category</span>
                    <span className="text-[#0a0a0a] font-semibold">{project.category}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-8 border border-slate-200 text-slate-900">
                <h3 className="font-display text-xl font-bold mb-3">
                  Planning a similar facility?
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-6">
                  Get in touch with our lead project engineers for an initial technical evaluation and feasibility estimate.
                </p>
                <Link
                  href="/contact"
                  className="block text-center bg-blue-600 text-slate-900 py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] hover:bg-blue-700 transition-colors"
                >
                  Request Proposal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {project.faq && project.faq.length > 0 && (
        <FaqSection faqs={project.faq} title="Project FAQs" />
      )}
    </>
  );
}
