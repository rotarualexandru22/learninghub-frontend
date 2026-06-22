import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How fast can I start my first course?",
    answer:
      "Instantly! The moment you create your free account, you unlock immediate access to all foundational courses. Premium tracks can be unlocked with a single click—no waiting times, no delays.",
  },
  {
    question: "Will I receive a certificate upon completion?",
    answer:
      "Yes, absolutely. Every completed course on LearningHub rewards you with a verified, high-resolution digital certificate of completion. You can download it instantly to update your CV or share it directly onto your LinkedIn profile.",
  },
  {
    question: "Is prior tech or programming experience required?",
    answer:
      "Not at all. We host specialized learning tracks curated for all skill levels. If you are starting from absolute scratch, we highly recommend our courses tagged with 'Beginner' to build your core knowledge comfortably.",
  },
  {
    question: "What payment methods do you support for premium tracks?",
    answer:
      "We accept all major secure credit and debit cards (Visa, Mastercard), PayPal, and direct wire transfers. All transactions are fully encrypted and securely processed by our tier-1 financial partners.",
  },
  {
    question: "Can I access my learning materials on mobile or tablet?",
    answer:
      "Definitively. Our entire platform ecosystem is fully responsive and optimized for any mobile, tablet, or desktop viewport. You can also download core text resources and documentation to study offline anywhere.",
  },
];

const FAQ = () => {
  // Safe JavaScript state configuration for accordion toggles
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      id="faq"
      className="py-32 px-4 md:px-12 bg-background relative overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header Block Layout */}
        <div className="text-left md:text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest font-mono">
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.95]">
            Everything you <br className="md:hidden" /> need to know
          </h2>
          <p className="text-muted-foreground max-w-xl md:mx-auto text-lg font-sans leading-relaxed">
            Have questions about how the platform operates? We gathered the most common inquiries to help you jump right in.
          </p>
        </div>

        {/* Dynamic Interactive Accordion Stack */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                "group border border-border/50 rounded-2xl transition-all duration-300",
                openIndex === i
                  ? "bg-card/50 border-primary/20 shadow-lg"
                  : "bg-card/20 hover:bg-card/30",
              )}
            >
              {/* Toggle Trigger Controller Button */}
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl hover:cursor-pointer"
              >
                <span className="text-lg md:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors pr-4">
                  {faq.question}
                </span>
                <div
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center transition-all duration-300",
                    openIndex === i
                      ? "bg-primary border-primary text-primary-foreground rotate-180"
                      : "text-muted-foreground",
                  )}
                >
                  {openIndex === i ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Dynamic Animated Content Panel Container */}
              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  openIndex === i
                    ? "grid-rows-[1fr] opacity-100 pb-8 px-6 md:px-8"
                    : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-sans max-w-3xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ambient Premium Decorative Spheres */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default FAQ;