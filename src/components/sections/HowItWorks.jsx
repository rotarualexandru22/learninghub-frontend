import React from "react";
import { UserPlus, Search, GraduationCap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create a free account",
      description:
        "It only takes about 30 seconds to sign up. Get instant access to our foundational learning tracks and resources.",
      icon: UserPlus,
      accent: "from-blue-500/20 to-blue-600/20",
      iconColor: "text-blue-500",
    },
    {
      number: "02",
      title: "Choose your ideal course",
      description:
        "Filter comprehensively by industry field, skill level, or duration to match your precise evolutionary criteria.",
      icon: Search,
      accent: "from-primary/20 to-primary/30",
      iconColor: "text-primary",
    },
    {
      number: "03",
      title: "Learn and get certified",
      description:
        "Study entirely at your own pace, download custom source assets, and claim your verified digital graduation certificate.",
      icon: GraduationCap,
      accent: "from-violet-500/20 to-violet-600/20",
      iconColor: "text-violet-500",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-32 px-4 md:px-12 bg-background relative overflow-hidden transition-colors duration-500"
    >
      {/* Premium ambient background spots */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Centered Structural Section Header */}
        <div className="text-center space-y-4 mb-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest font-mono">
            Streamlined Process
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.95]">
            3 simple steps <br className="md:hidden" /> toward success
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-sans leading-relaxed">
            We eliminated all friction and technical barriers so you can focus entirely on what truly matters: your career evolution.
          </p>
        </div>

        {/* Responsive Steps Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-12 mt-16 pb-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className={cn(
                "group relative bg-card/60 backdrop-blur-md border border-border/50 p-8 md:p-10 rounded-4xl transition-all duration-500 hover:shadow-2xl hover:border-primary/40",
                i === 1 ? "md:translate-y-12" : "", // Premium structural stagger calculation
              )}
            >
              {/* Backdrop Absolute Indicator Number */}
              <span className="absolute top-4 right-8 text-[8rem] font-black text-foreground/4 leading-none pointer-events-none select-none group-hover:text-primary/10 transition-colors duration-700">
                {step.number}
              </span>

              {/* Floating Dynamic Icon Sphere */}
              <div
                className={cn(
                  "absolute -top-10 left-8 md:left-10 w-20 h-20 rounded-2xl bg-linear-to-br flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 z-20",
                  step.accent,
                )}
              >
                <step.icon
                  className={cn("w-10 h-10", step.iconColor)}
                  strokeWidth={1.5}
                />
              </div>

              {/* Core Information Flow Text Blocks */}
              <div className="pt-8 space-y-6 relative z-10">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-card-foreground tracking-tight group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                {/* Animated action callout revealing smoothly on hover */}
                <div className="flex items-center cursor-pointer gap-2 text-[10px] font-black uppercase tracking-widest font-mono text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                  Learn details <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Decorative internal card light vector */}
              <div className="absolute inset-0 bg-primary/2 rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;