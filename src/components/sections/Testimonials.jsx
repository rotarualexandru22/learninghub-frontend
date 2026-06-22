import React, { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    // PAGE 1
    {
      name: "Alex Mercer",
      role: "UX Designer at TechFlow",
      text: "I landed a full-time role just 3 months after completing the UX Design track on LearningHub. The instructors are incredible and provided actionable insights that helped me build a bulletproof portfolio.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    },
    {
      name: "Chloe Vance",
      role: "Junior Frontend Developer",
      text: "The platform environment is extremely intuitive, and the production quality of the coding lectures is lightyears ahead of anything else I've tried. Highly recommended for anyone looking to transition into tech.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=chloe",
    },
    {
      name: "Marcus Thorne",
      role: "Product Manager at ScaleUp",
      text: "LearningHub provided the exact structural flexibility I required to master advanced product strategy vectors while working full-time. Unquestionably the best investment in my career.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
    },
    // PAGE 2
    {
      name: "Sarah Jenkins",
      role: "Data Analyst at ByteCorp",
      text: "The SQL and Python modules were masterfully executed. The real-world databases we analyzed gave me the confidence to ace my technical interviews without sweating.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      name: "David Kross",
      role: "Cloud Architect at Nexus",
      text: "The anti-skip validation matrix forces you to actually learn, not just skip through content. I passed my AWS certification on the first try thanks to this architecture.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    },
    {
      name: "Elena Rostova",
      role: "Growth Hacker at FinLeap",
      text: "The Marketing Analytics module is gold. It shifts the paradigm from simple creative ideas to pure performance engineering. My conversion rates skyrocketed by 40%.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=elena",
    },
    // PAGE 3
    {
      name: "Jonathan Wright",
      role: "Cybersecurity Analyst",
      text: "The hands-on terminal sandboxes were exceptional. You don't just read about security vectors; you deploy defenses against real simulated payloads.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=jonathan",
    },
    {
      name: "Amara Adebayo",
      role: "AI Engineer at DeepMind",
      text: "The neural network curriculum nodes are unmatched in clarity. Complex linear algebra formulas are broken down into practical code components seamlessly.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=amara",
    },
    {
      name: "William Vance",
      role: "DevOps Engineer at CoreOS",
      text: "The Kubernetes pipeline automation modules saved me weeks of manual research. The instructor ledger blueprints are fully production-ready.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=will",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  // 🚨 LOGICA TOUCHSCREEN DETECTIE SWIPE (Fără librării externe)
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Distanța minimă în pixeli ca să considerăm mișcarea un swipe valid
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEnd(null); // Resetăm finalul ca să evităm bug-urile de dublu tap
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const displayedTestimonials = testimonials.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  return (
    <section className="py-32 px-4 md:px-12 bg-foreground text-background relative transition-colors duration-500 overflow-hidden">
      {/* Premium Ambient Decorative Vector Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Header Block Layout */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-4 text-center sm:text-left">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-background leading-[0.95]">
              What our students say
            </h2>
            <p className="text-background/60 max-w-xl text-lg leading-relaxed font-sans">
              Over 1,000+ ambitious individuals started their transition and upskilling journeys with us.
            </p>
          </div>

          {/* Săgeți de Navigare: HIDDEN pe mobil (unde se dă swipe), vizibile doar de la sm în sus */}
          <div className="hidden sm:flex items-center gap-3 self-end">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl border border-background/10 hover:border-primary/40 hover:bg-background/5 text-background transition-all active:scale-95 hover:cursor-pointer"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl border border-background/10 hover:border-primary/40 hover:bg-background/5 text-background transition-all active:scale-95 hover:cursor-pointer"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Grid container cu Evenimente de Touch legate pentru Mobil */}
        <div 
          key={currentPage} 
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 touch-pan-y"
        >
          {displayedTestimonials.map((test, i) => (
            <div
              key={i}
              className="bg-background/5 border border-background/10 p-10 rounded-xl space-y-8 flex flex-col relative group hover:border-primary/50 transition-all duration-500 shadow-sm select-none"
            >
              {/* Giant Decorative Quote Icon Layout */}
              <Quote className="absolute top-8 right-10 text-primary/10 w-16 h-16 group-hover:text-primary transition-colors duration-500 pointer-events-none" />

              {/* Strict 5-Star Validation Row */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Review Text Area Container */}
              <p className="text-background/80 text-base md:text-lg italic leading-relaxed font-sans grow relative z-10">
                "{test.text}"
              </p>

              {/* Student Metadata Stack Row */}
              <div className="flex items-center gap-4 pt-8 border-t border-background/10">
                <div className="w-14 h-14 rounded-full border-2 border-primary overflow-hidden bg-background/20 shrink-0">
                  <img
                    src={test.image}
                    alt={`${test.name} avatar`}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-background font-bold tracking-tight truncate">
                    {test.name}
                  </h4>
                  <p className="text-background/50 text-[10px] font-bold uppercase tracking-widest leading-none mt-1.5 font-mono truncate">
                    {test.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicatori interactivi (Liniuțele de jos) */}
        <div className="flex justify-center pt-8">
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`h-1.5 rounded-full transition-all duration-300 hover:cursor-pointer ${
                  currentPage === index ? "w-12 bg-primary" : "w-4 bg-background/20 hover:bg-background/40"
                }`}
                aria-label={`Go to testimonial page ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;