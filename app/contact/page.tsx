import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FaqSection from "@/components/FaqSection";
import { companyInfo, homepageFaq } from "@/lib/data";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  title: "Contact Thermopharm — Get a Free Engineering Consultation",
  description:
    "Contact Thermopharm Pvt. Ltd. for HVAC, cleanroom, and pharmaceutical facility engineering. Based in Mumbai. Reach us by phone, email, or through our enquiry form.",
  slug: "contact",
  keywords: ["contact Thermopharm", "HVAC consultation Mumbai", "cleanroom engineering quote"],
});

const officeHours = [
  { day: "Monday – Friday", hours: "9:00 AM – 6:30 PM" },
  { day: "Saturday", hours: "9:00 AM – 2:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export default function ContactPage() {
  return (
    <div className="bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-slate-900">
      {/* Dark Hero */}
      <section className="relative pt-32 pb-20 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))]" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-4">
              <MessageSquare className="w-4 h-4" /> Technical Advisory & Project Enquiries
            </div>
            <h1 className="font-display text-[clamp(38px,5.5vw,68px)] font-bold text-slate-900 leading-[1.05] tracking-tight mb-6">
              Discuss your <br />
              <span className="text-blue-500">engineering project.</span>
            </h1>
            <p className="text-slate-600 text-base lg:text-lg leading-relaxed">
              Share your facility specifications with our lead HVAC and cleanroom consultants. We deliver preliminary proposals within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Info Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              <div className="border border-slate-200 p-8 bg-[#121212] rounded-lg">
                <h2 className="font-display text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-400" /> Direct Contact Channels
                </h2>
                <div className="space-y-6">
                  <a
                    href={`tel:${companyInfo.phone}`}
                    id="contact-page-phone"
                    className="flex items-start gap-4 group hover:text-blue-400 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-slate-900 transition-colors rounded">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Phone</p>
                      <p className="font-semibold text-slate-900 text-sm group-hover:text-blue-400 transition-colors mt-0.5 font-mono">
                        {companyInfo.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="flex items-start gap-4 group hover:text-blue-400 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-slate-900 transition-colors rounded">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Email</p>
                      <p className="font-semibold text-slate-900 text-sm group-hover:text-blue-400 transition-colors mt-0.5 font-mono">
                        {companyInfo.email}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 rounded">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Head Office</p>
                      <p className="font-medium text-slate-700 text-xs leading-relaxed mt-0.5">
                        {companyInfo.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 p-8 bg-[#121212] rounded-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <h2 className="font-display text-lg font-bold text-slate-900">Business Hours</h2>
                </div>
                <div className="space-y-3">
                  {officeHours.map((item) => (
                    <div key={item.day} className="flex justify-between text-xs border-b border-slate-200 pb-2 last:border-0">
                      <span className="text-slate-500 uppercase tracking-wider">{item.day}</span>
                      <span className="text-slate-900 font-semibold">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map embed */}
              <div className="border border-slate-200 aspect-[4/3] relative rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.7896413068077!2d72.84!3d19.36!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDIxJzM2LjAiTiA3MsKwNTAnMjQuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                  title="Thermopharm Office Location"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="border border-slate-200 p-8 lg:p-10 bg-[#121212] rounded-lg">
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
                  Send Project Specification
                </h2>
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-8">
                  Fill out the details below for an engineering review & proposal.
                </p>
                <ContactForm darkMode />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection faqs={homepageFaq} title="Frequently Asked Questions" />
    </div>
  );
}
