"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateFaqSchema } from "@/lib/seo";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
  title?: string;
  subtitle?: string;
}

function FaqAccordionItem({ faq, index }: { faq: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 bg-[#121212] rounded overflow-hidden">
      <button
        id={`faq-btn-${index}`}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
        aria-expanded={open}
      >
        <span className="font-display text-base font-bold text-slate-900 pr-6">{faq.question}</span>
        <div className="w-7 h-7 flex items-center justify-center bg-white/5 flex-shrink-0 rounded">
          {open ? (
            <Minus className="w-4 h-4 text-blue-400" />
          ) : (
            <Plus className="w-4 h-4 text-slate-500" />
          )}
        </div>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <p className="px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-200">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FaqSection({ faqs, title, subtitle }: FaqSectionProps) {
  const schema = generateFaqSchema(faqs);

  return (
    <section className="py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-3">
            Common Questions
          </p>
          <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-bold text-slate-900">
            {title || "Frequently Asked Questions"}
          </h2>
          {subtitle && (
            <p className="text-slate-500 text-sm mt-3">{subtitle}</p>
          )}
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqAccordionItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
