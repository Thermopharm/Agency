import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldAlert, Award, ArrowRight, CheckCircle } from "lucide-react";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  title: "Terms of Service | Thermopharm Pvt. Ltd.",
  description:
    "Thermopharm Pvt. Ltd. Terms of Service. Commercial engineering terms, validation commitments, equipment warranties, and project terms.",
});

export default function TermsOfServicePage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pt-32 pb-24 selection:bg-blue-600 selection:text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-extrabold uppercase tracking-widest rounded-full mb-4">
            <FileText className="w-3.5 h-3.5" />
            Engineering & Commercial Governance
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
            Thermopharm Pvt. Ltd. · Commercial Engineering & Turnkey Operations
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-10 text-slate-700 text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              1. Engineering Proposals & Turnkey Contracts
            </h2>
            <p>
              All engineering designs, Cleanroom HVAC schematics, BIM models, and technical BOQs provided by Thermopharm Pvt. Ltd. are subject to formal commercial agreements executed between Thermopharm and the client. Preliminary quotes generated online serve as non-binding estimates until technical site audits are completed.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              2. Standards Compliance & Validation Guarantees
            </h2>
            <p>
              Thermopharm guarantees that turnkey cleanrooms and HVAC installations engineered under signed contracts will comply with the agreed regulatory class (WHO-GMP, ISO 14644 Class 5–8, USFDA 21 CFR Part 11). Design Qualification (DQ), Installation Qualification (IQ), Operational Qualification (OQ), and Performance Qualification (PQ) protocols are executed upon installation completion.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              3. Intellectual Property Rights
            </h2>
            <p>
              All technical documentation, proprietary calculation sheets, BIM CAD files, website content, and custom HVAC layout algorithms developed by Thermopharm remain the exclusive intellectual property of Thermopharm Pvt. Ltd., protected under Indian intellectual property laws.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4 pt-6 border-t border-slate-100 bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
            <h2 className="font-display text-base font-bold text-slate-900">
              Commercial Contact & Legal Notices
            </h2>
            <p className="text-xs text-slate-600">
              For legal inquiries regarding contracts, warranties, or service terms:
            </p>
            <div className="text-xs font-mono text-slate-800 space-y-1">
              <p>Email: <a href="mailto:info@thermopharm.in" className="text-blue-600 hover:underline">info@thermopharm.in</a></p>
              <p>Thermopharm Pvt. Ltd. · Mumbai, Maharashtra, India</p>
            </div>
          </section>
        </div>

        {/* Back Link */}
        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline uppercase tracking-wider"
          >
            Return to Homepage <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
