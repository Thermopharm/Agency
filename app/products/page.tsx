import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Package, ShieldCheck, ArrowRight, CheckCircle2, Sliders, Cpu } from "lucide-react";
import { products } from "@/lib/data";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  title: "Products & Cleanroom Equipment — Thermopharm Pvt. Ltd.",
  description:
    "Explore Thermopharm's custom-engineered products: Electrical Panels, Pre-fabricated Ducting, HEPA Cleanroom Filters, Industrial Heater Sections, Diffusers, and Stainless Steel Grills.",
  slug: "products",
  keywords: ["cleanroom filters", "pre-fabricated ducting", "electrical panel HVAC", "pharma diffusers", "industrial heater section"],
});

export default function ProductsPage() {
  return (
    <div className="bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white min-h-screen">
      {/* Hero Header */}
      <section className="relative pt-36 pb-24 border-b border-slate-200/80 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.08),rgba(255,255,255,0))]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-4 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
              <Package className="w-4 h-4 text-blue-600" /> Precision Equipment Catalog
            </span>
            <h1 className="font-display text-[clamp(40px,5.5vw,72px)] font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6">
              Custom Engineered <br />
              <span className="text-blue-600">Cleanroom Products.</span>
            </h1>
            <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-normal">
              Heavy-duty HVAC components, filtration modules, electrical panels, and air distribution systems built specifically for high-spec pharmaceutical and industrial environments.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50/70 border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 border border-slate-200/80">
                    {item.category}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                      {item.manufacturer} Engineering
                    </span>
                    <h3 className="font-display text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                      {item.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-slate-200/60">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900 block mb-2">
                        Technical Specs:
                      </span>
                      {item.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors duration-200"
                  >
                    <span>Request Datasheet & Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
