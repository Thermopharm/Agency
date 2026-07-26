import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Shield, ArrowLeft } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default async function DynamicIndustryPage({
  params,
}: {
  params: { slug: string };
}) {
  let industry = null;
  try {
    industry = await prisma.industry.findUnique({
      where: { slug: params.slug },
    });
  } catch (e) {
    console.error(e);
  }

  if (!industry) {
    notFound();
  }

  let specs: string[] = [];
  let standards: string[] = [];

  try {
    specs = typeof industry.specs === "string" ? JSON.parse(industry.specs) : industry.specs;
  } catch {
    specs = [];
  }

  try {
    standards = typeof industry.standards === "string" ? JSON.parse(industry.standards) : industry.standards;
  } catch {
    standards = [];
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-slate-900">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 border-b border-slate-200 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-400 hover:text-slate-900 mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Industries
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-slate-900 mb-6">
            {industry.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            {industry.shortDesc}
          </p>
        </div>
      </section>

      {/* Content Details */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-10">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-slate-200">
              <Image
                src={industry.image || "/images/projects/project-1.png"}
                alt={industry.title}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold font-display text-slate-900 mb-4">
                Engineering Approach & Regulatory Standards
              </h2>
              <p className="text-base text-slate-600 leading-relaxed whitespace-pre-line">
                {industry.fullDesc}
              </p>
            </div>

            {specs.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-lg p-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" /> Sector Key Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {specs.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Form */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Get Technical Proposal</h3>
              <p className="text-xs text-slate-500">
                Contact our specialized engineers for customized designs compliant with your industry standards.
              </p>
              <ContactForm darkMode={true} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
