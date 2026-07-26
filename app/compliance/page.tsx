import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, CheckCircle2, Zap, ArrowRight } from "lucide-react";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  title: "Quality & Compliance Policy | Thermopharm Pvt. Ltd.",
  description:
    "Thermopharm Quality & Regulatory Compliance Policy. WHO-GMP, ISO 14644, USFDA 21 CFR Part 11, and ASHRAE engineering standards.",
});

export default function QualityCompliancePage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pt-32 pb-24 selection:bg-blue-600 selection:text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-extrabold uppercase tracking-widest rounded-full mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            ISO & WHO-GMP Regulatory Standards
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Quality & Regulatory Policy
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
            Thermopharm Engineering Excellence · Zero-Audit-Failure Quality Charter
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-10 text-slate-700 text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              1. Our Quality Management Philosophy
            </h2>
            <p>
              Thermopharm Pvt. Ltd. operates under an uncompromising Quality First mandate. In pharmaceutical cleanrooms, medical device manufacturing, and biotech production, environmental precision directly impacts product purity and patient safety. Our engineering processes are tailored to deliver zero-audit-failure facilities across India.
            </p>
          </section>

          {/* Section 2: Standards Grid */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              2. Governed International Standards
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="text-xs font-extrabold text-blue-600 uppercase tracking-wider mb-1">ISO 14644 Standard</div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Cleanrooms & Controlled Environs</h3>
                <p className="text-xs text-slate-500">Particle count validation, recovery rate testing, and pressure cascade monitoring for ISO 5 through ISO 8 facilities.</p>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider mb-1">WHO-GMP Guidelines</div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Good Manufacturing Practice</h3>
                <p className="text-xs text-slate-500">Laminar air flow design, HEPA filter integrity (PAO/DOP testing), and cross-contamination prevention protocol.</p>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="text-xs font-extrabold text-purple-600 uppercase tracking-wider mb-1">21 CFR Part 11</div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">BMS & Automation Audit Trail</h3>
                <p className="text-xs text-slate-500">Tamper-proof digital data logging, electronic signatures, and automated environmental alarm systems.</p>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="text-xs font-extrabold text-amber-600 uppercase tracking-wider mb-1">ASHRAE Standards</div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">HVAC Thermal & Humidity Design</h3>
                <p className="text-xs text-slate-500">Heavy-duty chiller plant design, low dew-point dehumidification (-40°C), and energy efficiency optimization.</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              3. Full Validation Lifecycle (V-Model)
            </h2>
            <p>
              Every project undergoes full lifecycle documentation:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>DQ (Design Qualification):</strong> Engineering drawings review & airflow simulation validation.</li>
              <li><strong>IQ (Installation Qualification):</strong> Verification of ductwork, HEPA filters, chillers, and AHU components.</li>
              <li><strong>OQ (Operational Qualification):</strong> Air velocity measurement, differential pressure balance, and temperature testing.</li>
              <li><strong>PQ (Performance Qualification):</strong> At-rest and operational state microbial and particle compliance validation.</li>
            </ul>
          </section>

          {/* Contact Box */}
          <section className="space-y-4 pt-6 border-t border-slate-100 bg-emerald-50/60 p-6 rounded-2xl border border-emerald-200/80">
            <h2 className="font-display text-base font-bold text-emerald-900">
              Request Validation Protocols & Audit Certificates
            </h2>
            <p className="text-xs text-emerald-800">
              For regulatory audits or technical validation assistance, contact our Quality Assurance Team:
            </p>
            <div className="text-xs font-mono text-emerald-900 space-y-1">
              <p>Email: <a href="mailto:info@thermopharm.in" className="text-emerald-700 underline font-bold">info@thermopharm.in</a></p>
              <p>Thermopharm Quality Control Division · Mumbai, India</p>
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
