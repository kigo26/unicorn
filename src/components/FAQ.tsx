import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is included in the commercial license?",
    answer: "The commercial license includes full access to the source code, lifetime updates, and standard email support for one year. You are permitted to use this software in multiple commercial projects."
  },
  {
    question: "Do you offer technical support?",
    answer: "Yes, we provide 12 months of technical support with every purchase. This covers bug fixes, general inquiries, and assistance with initial deployment."
  },
  {
    question: "How long does deployment usually take?",
    answer: "With our automated deployment scripts and comprehensive documentation, most users can have the software running in production within 15-30 minutes."
  },
  {
    question: "Are there any recurring fees?",
    answer: "No, this is a one-time purchase. You get lifetime access to the version you bought along with any minor and major updates released during your 1-year support period."
  },
  {
    question: "Can I upgrade my license later?",
    answer: "Yes, if you need enterprise-level features or extended priority support, you can upgrade your license by paying the difference."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-display font-bold mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className="border border-border-glass bg-glass/20 rounded-xl overflow-hidden transition-colors hover:border-white/20"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-6 flex flex-col md:flex-row md:items-center justify-between text-left focus:outline-none"
              >
                <span className="font-medium text-lg pr-4">{faq.question}</span>
                <div 
                  className={cn(
                    "mt-4 md:mt-0 flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-300",
                    isOpen ? "rotate-180" : ""
                  )}
                >
                  <ChevronDown className="w-5 h-5 text-white/70" />
                </div>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-6 pt-0 text-white/70 leading-relaxed border-t border-border-glass/50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
