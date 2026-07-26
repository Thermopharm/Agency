import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { Factory, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { BorderBeamCard } from "@/components/ui/BorderBeamCard";

export const metadata = {
  title: "Industries Served | Thermopharm Pvt. Ltd.",
  description:
    "Thermopharm engineers specialized HVAC, cleanroom, and facility solutions across Pharmaceutical, Healthcare, Semiconductor, Chemical, and Food processing industries.",
};

export default async function IndustriesPage() {
  let dbIndustries: any[] = [];
  try {
    dbIndustries = await prisma.industry.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "asc" },
    });
  } catch (e) {
    console.error("Failed to fetch industries:", e);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-slate-900">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))]" />
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-blue-400 uppercase mb-4">
            <Factory className="w-4 h-4" /> Specialized Engineering Sectors
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-slate-900 mb-6">
            Industries <span className="text-blue-500 font-normal">We Transform.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
            From sterile WHO-GMP pharmaceutical suites to ultra-low humidity solar cleanrooms, we deliver precision environmental control across high-compliance industries.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dbIndustries.map((ind) => {
              let specs: string[] = [];
              try {
                specs = typeof ind.specs === "string" ? JSON.parse(ind.specs) : ind.specs;
              } catch {
                specs = [];
              }

              return (
                <BorderBeamCard key={ind.id} className="h-full">
                  <div className="bg-white border border-slate-200 rounded-lg p-8 h-full flex flex-col justify-between hover:border-blue-500/40 transition-all group">
                    <div>
                      <div className="relative w-full h-48 rounded overflow-hidden mb-6 bg-black/40">
                        <Image
                          src={ind.image || "/images/projects/project-1.png"}
                          alt={ind.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80" />
                      </div>

                      <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 block mb-2">
                        {ind.slug.replace("-", " ")}
                      </span>

                      <h3 className="text-xl font-bold font-display text-slate-900 mb-3 group-hover:text-blue-400 transition-colors">
                        {ind.title}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {ind.shortDesc}
                      </p>

                      {specs.length > 0 && (
                        <div className="space-y-2 mb-6 pt-4 border-t border-slate-200">
                          {specs.slice(0, 3).map((spec, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/industries/${ind.slug}`}
                      className="inline-flex items-center justify-between w-full py-3 px-4 bg-white/5 hover:bg-blue-600 text-xs font-semibold uppercase tracking-wider text-slate-900 rounded transition-colors"
                    >
                      <span>Explore Sector Engineering</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </BorderBeamCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Audit Guarantee Banner */}
      <section className="py-16 bg-blue-950/20 border-y border-blue-500/20">
        <div className="container max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Need a Specialized Cleanroom or HVAC Design?</h3>
              <p className="text-sm text-slate-600">Our engineering team designs to USFDA, WHO-GMP, EU-GMP & ISO 14644 standards.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-slate-900 text-xs font-semibold uppercase tracking-wider rounded transition-colors whitespace-nowrap"
          >
            Consult Engineering Team
          </Link>
        </div>
      </section>
    </div>
  );
}
