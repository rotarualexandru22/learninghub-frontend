import React from "react";
import { BookOpen, Users, GraduationCap, Trophy } from "lucide-react";

const SocialProofBar = () => {
  const stats = [
    {
      label: "Available courses",
      value: "500+",
      icon: BookOpen,
      accent: "bg-primary/10 text-primary",
    },
    {
      label: "Verified instructors",
      value: "120",
      icon: GraduationCap,
      accent: "bg-blue-500/10 text-blue-500",
    },
    {
      label: "Active students",
      value: "50k+",
      icon: Users,
      accent: "bg-violet-500/10 text-violet-500",
    },
    {
      label: "Completion rate",
      value: "95%",
      icon: Trophy,
      accent: "bg-amber-500/10 text-amber-500",
    },
  ];

  return (
    <section className="relative py-10 md:py-14 bg-background border-y border-border transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Adjusted grid system and added clean divider tracking for large screens */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 lg:gap-x-0 lg:divide-x lg:divide-border">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-4 group justify-center px-2 sm:px-6 lg:px-0"
            >
              {/* Icon Container with interactive scaling */}
              <div
                className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center ${stat.accent} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]`}
              >
                <stat.icon
                  className="w-5 h-5 md:w-6 md:h-6"
                  strokeWidth={2.5}
                />
              </div>

              {/* Informational Typographic Stack */}
              <div className="space-y-1 min-w-0">
                <div className="text-2xl md:text-3xl font-black text-foreground tracking-tighter tabular-nums leading-none font-mono">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none font-sans truncate">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofBar;