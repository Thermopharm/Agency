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
    <div className="border border-slate-200/80 bg-white rounded-2xl overflow-hidden shadow-sm transition-all hover:border-slate-300">
      <button
        id={`faq-btn-${index}`}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50/50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-display text-base font-bold text-slate-900 pr-6">{faq.question}</span>
        <div className="w-8 h-8 flex items-center justify-center bg-blue-50 border border-blue-100 flex-shrink-0 rounded-xl transition-colors">
          {open ? (
            <Minus className="w-4 h-4 text-blue-600" />
          ) : (
            <Plus className="w-4 h-4 text-blue-600" />
          )}
        </div>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <p className="px-6 pb-6 pt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FaqSection({ faqs, title, subtitle }: FaqSectionProps) {
  const schema = generateFaqSchema(faqs);

  return (
    <section className="py-24 bg-slate-50 text-slate-900 border-t border-slate-200/80">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-3 block">
            Common Questions
          </span>
          <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-bold text-slate-900">
            {title || "Frequently Asked Questions"}
          </h2>
          {subtitle && (
            <p className="text-slate-600 text-sm mt-3">{subtitle}</p>
          )}
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FaqAccordionItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
