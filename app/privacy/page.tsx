import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Eye, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  title: "Privacy Policy | Thermopharm Pvt. Ltd.",
  description:
    "Thermopharm Pvt. Ltd. Privacy Policy. Information on data collection, privacy safeguards, technical inquiries, and data protection compliance.",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pt-32 pb-24 selection:bg-blue-600 selection:text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-extrabold uppercase tracking-widest rounded-full mb-4">
            <Shield className="w-3.5 h-3.5" />
            Corporate Governance & Data Protection
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
            Effective Date: January 1, 2026 · Thermopharm Pvt. Ltd. (Mumbai, India)
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-10 text-slate-700 text-sm leading-relaxed">
          {/* Intro */}
          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-600" />
              1. Introduction & Overview
            </h2>
            <p>
              Thermopharm Pvt. Ltd. (&ldquo;Thermopharm&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting the privacy and confidentiality of information provided by our clients, partners, facility managers, and website visitors. This Privacy Policy outlines how we collect, handle, store, and safeguard technical inquiry data and personal information submitted through our web portal.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              2. Information We Collect
            </h2>
            <p>
              When you submit a technical inquiry, request cleanroom engineering specifications, or contact our team, we collect the following categories of information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Contact Information:</strong> Name, professional email address, phone number, company name, and designation.</li>
              <li><strong>Project Specifications:</strong> Facility location, required cleanroom classification (e.g., ISO Class 5 to 8), HVAC thermal parameters, and engineering requirements.</li>
              <li><strong>Technical Metadata:</strong> IP address, browser type, device information, and analytics data collected via cookies or tracking scripts.</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              3. How We Use Your Information
            </h2>
            <p>
              All submitted data is strictly processed for legitimate engineering and commercial operations, including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">Proposal Generation</h3>
                <p className="text-xs text-slate-500">Preparing detailed BOQs, cleanroom layout drawings, and technical HVAC proposals.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">Audit & Validation Support</h3>
                <p className="text-xs text-slate-500">Coordinating WHO-GMP, ISO 14644, and USFDA regulatory compliance validation protocols.</p>
              </div>
            </div>
          </section>

          {/* Data Protection & Non-Disclosure */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              4. Confidentiality & Non-Disclosure
            </h2>
            <p>
              We enforce strict Non-Disclosure Agreement (NDA) protocols for all proprietary client blueprints, process schematics, and pharmaceutical manufacturing layout designs. Thermopharm will never sell, rent, or lease your personal or technical data to third-party marketing entities.
            </p>
          </section>

          {/* Contact Information */}
          <section className="space-y-4 pt-6 border-t border-slate-100 bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
            <h2 className="font-display text-base font-bold text-slate-900">
              Questions Regarding Privacy & Data Protection?
            </h2>
            <p className="text-xs text-slate-600">
              For any questions or requests regarding your data, please contact our Legal & Compliance Officer:
            </p>
            <div className="text-xs font-mono text-slate-800 space-y-1">
              <p>Email: <a href="mailto:info@thermopharm.in" className="text-blue-600 hover:underline">info@thermopharm.in</a></p>
              <p>Phone: +91 98200 12345</p>
              <p>Address: Thermopharm Pvt. Ltd., Mumbai, Maharashtra, India</p>
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
