import React from "react";
import {
  Target,
  Tablet,
  Award,
  Clock,
  Users,
  CreditCard,
  Sparkles,
  Smartphone,
  Laptop,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Benefits = () => {
  const benefits = [
    {
      title: "Smart learning",
      subtitle: "Personalized",
      description:
        "Our advanced path recommendations guide you step-by-step toward your professional success.",
      icon: Target,
      className: "md:col-span-2 md:row-span-2 bg-primary/5 border-primary/20",
      iconContainer: "bg-primary/20 text-primary",
      layout: "featured",
    },
    {
      title: "Universal access",
      subtitle: "Multi-platform",
      description: "Real-time synchronization across all your mobile, tablet, and desktop devices.",
      icon: Tablet,
      className: "md:col-span-2 bg-blue-500/5 border-blue-500/20",
      iconContainer: "bg-blue-500/20 text-blue-500",
      content: (
        <div className="flex gap-6 items-end justify-center pt-8 opacity-40 group-hover:opacity-100 transition-opacity">
          <Smartphone className="w-10 h-10 text-blue-400" />
          <Tablet className="w-14 h-14 text-blue-500" />
          <Laptop className="w-18 h-18 text-blue-600" />
        </div>
      ),
      layout: "compact",
    },
    {
      title: "VIP certificates",
      subtitle: "Verified",
      description: "Earn credentials recognized globally by top industry employers.",
      icon: Award,
      className: "bg-amber-500/5 border-amber-500/20",
      iconContainer: "bg-amber-500/20 text-amber-500",
      layout: "mini",
    },
    {
      title: "Zero pressure",
      subtitle: "Self-paced",
      description: "Learn whenever you want, wherever you are, completely on your schedule.",
      icon: Clock,
      className: "bg-pink-500/5 border-pink-500/20",
      iconContainer: "bg-pink-500/20 text-pink-500",
      layout: "mini",
    },
    {
      title: "Global networking",
      subtitle: "Community",
      description:
        "Connect and collaborate with over 1.000+ ambitious students and industry mentors.",
      icon: Users,
      className: "md:col-span-2 bg-emerald-500/5 border-emerald-500/20",
      iconContainer: "bg-emerald-500/20 text-emerald-500",
      layout: "horizontal",
    },
    {
      title: "Zero risk",
      subtitle: "30-Day Trial",
      description: "Start learning for free with no credit card required or financial obligations.",
      icon: CreditCard,
      className: "md:col-span-2 bg-rose-500/5 border-rose-500/20",
      iconContainer: "bg-rose-500/20 text-rose-500",
      layout: "horizontal",
    },
  ];

  return (
    <section
      id="benefits"
      className="py-32 px-4 md:px-12 bg-background relative overflow-hidden transition-colors duration-500"
    >
      {/* Premium Gradient Backgrounds */}
      <div className="absolute top-[-10%] right-[-10%] w-200 h-200 bg-primary/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-150 h-150 bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start md:items-center text-left md:text-center space-y-6 mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest font-mono">
            <Sparkles className="w-3.5 h-3.5 fill-primary/20" /> Exclusive Benefits
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground leading-[1.05] max-w-3xl">
            We reinvented the way <br className="hidden md:block" /> you learn online.
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg font-sans">
            Combining cutting-edge mechanics with a simplified user experience to maximize your career results.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 auto-rows-[240px]">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className={cn(
                "group relative overflow-hidden rounded-xl border shadow-sm transition-all duration-700 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] bg-card/10 backdrop-blur-sm",
                benefit.className,
              )}
            >
              {/* Card Main Content */}
              <div className="relative z-20 p-8 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "p-2.5 rounded-xl shrink-0 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-sm",
                        benefit.iconContainer,
                      )}
                    >
                      <benefit.icon className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest font-mono opacity-60">
                      {benefit.subtitle}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl xl:text-3xl font-bold text-foreground leading-none tracking-tighter">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-sans leading-relaxed max-w-50">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                <div className="mt-auto">
                  {benefit.layout !== "compact" && (
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest font-mono text-primary group-hover:gap-3 transition-all duration-300 hover:cursor-pointer">
                      Learn more <ChevronRight className="w-3 h-3" />
                    </div>
                  )}
                  {benefit.content}
                </div>
              </div>

              {/* Decorative Background Icon */}
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-all duration-700 group-hover:scale-150 rotate-[-15deg] pointer-events-none">
                <benefit.icon className="w-32 h-32" strokeWidth={0.5} />
              </div>

              {/* Shine Overlay Effect */}
              <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;