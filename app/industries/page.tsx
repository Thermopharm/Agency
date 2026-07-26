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
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Hero Header */}
      <section className="relative pt-36 pb-24 border-b border-slate-200/80 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.08),rgba(255,255,255,0))]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-4 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
              <Factory className="w-4 h-4 text-blue-600" /> Specialized Engineering Sectors
            </span>
            <h1 className="font-display text-[clamp(40px,5.5vw,72px)] font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6">
              Industries <span className="text-blue-600">We Transform.</span>
            </h1>
            <p className="text-slate-600 text-lg lg:text-xl leading-relaxed">
              From sterile WHO-GMP pharmaceutical suites to ultra-low humidity solar cleanrooms, we deliver precision environmental control across high-compliance industries.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
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
                  <div className="bg-slate-50/70 hover:bg-white border border-slate-200/80 rounded-2xl p-8 h-full flex flex-col justify-between hover:border-slate-300 shadow-sm hover:shadow-lg transition-all duration-300 group">
                    <div>
                      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 bg-slate-100 border border-slate-200/80">
                        <Image
                          src={ind.image || "/images/projects/project-1.png"}
                          alt={ind.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-blue-600 block mb-2">
                        {ind.slug.replace("-", " ")}
                      </span>

                      <h3 className="text-2xl font-bold font-display text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {ind.title}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {ind.shortDesc}
                      </p>

                      {specs.length > 0 && (
                        <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-200/80">
                          {specs.slice(0, 3).map((spec, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/industries/${ind.slug}`}
                      className="inline-flex items-center justify-between w-full py-3.5 px-5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all"
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
      <section className="py-16 bg-blue-50/60 border-y border-blue-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Need a Specialized Cleanroom or HVAC Design?</h3>
              <p className="text-sm text-slate-600 font-medium">Our engineering team designs to USFDA, WHO-GMP, EU-GMP & ISO 14644 standards.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-colors whitespace-nowrap"
          >
            Consult Engineering Team
          </Link>
        </div>
      </section>
    </div>
  );
}
