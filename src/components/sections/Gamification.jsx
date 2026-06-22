import React from "react";
import { Trophy, Medal, Award, PlayCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Gamification = () => {
  const badges = [
    {
      level: "Beginner",
      requirement: "1 Course Completed",
      icon: Medal,
      color: "bg-slate-100 text-slate-800",
      textColor: "text-slate-600",
      active: true,
    },
    {
      level: "Intermediate",
      requirement: "3 Courses Completed",
      icon: Award,
      color: "bg-primary/20 text-primary",
      textColor: "text-primary",
      active: false,
    },
    {
      level: "Advanced",
      requirement: "5 Courses Completed",
      icon: Trophy,
      color: "bg-primary text-black",
      textColor: "text-black",
      active: false,
    },
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-background overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Visual Content - Dashboard Preview Card Layout */}
        <div className="relative">
          {/* Animated Background Pulse Glow */}
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />

          <div className="bg-card border border-border rounded-2xl shadow-2xl p-6 md:p-10 space-y-8 relative overflow-hidden transition-colors">
            
            {/* Progress Monitoring Visualization Layer */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <PlayCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm md:text-base">
                      Continue UX Design Masterclass
                    </h4>
                    <p className="text-xs text-muted-foreground font-sans">
                      Auto-saved 2 minutes ago
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black italic text-foreground/80 font-mono">
                  65%
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[65%] rounded-full shadow-[0_0_15px_rgba(175,243,62,0.4)]" />
              </div>
            </div>

            {/* Badge Grid Status Section */}
            <div className="space-y-4">
              <h4 className="font-bold text-foreground text-sm flex items-center gap-2 tracking-tight uppercase font-mono opacity-80">
                <Trophy className="w-4 h-4 text-primary" />
                Your Badges & Achievements
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {badges.map((badge, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300",
                      badge.active
                        ? "bg-background border-primary shadow-lg scale-105"
                        : "bg-muted/50 border-border opacity-40",
                    )}
                  >
                    <div className={cn("p-3 rounded-full mb-3", badge.color)}>
                      <badge.icon
                        className={cn(
                          "w-6 h-6",
                          !badge.active && "text-muted-foreground/40",
                        )}
                      />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-center text-foreground font-mono">
                      {badge.level}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Action Badge Achievement Notification */}
            <div className="absolute top-1/2 -right-12 bg-foreground text-background p-4 rounded-xl shadow-2xl rotate-12 flex items-center gap-3 border border-background/10 animate-fade-in sm:flex">
              <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold font-mono">
                Achievement Unlocked!
              </p>
            </div>
          </div>
        </div>

        {/* Informational Text Content Block */}
        <div className="space-y-10">
          <div className="space-y-6">
            <div className="inline-block bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary text-[10px] font-black uppercase tracking-widest leading-none font-mono">
              Core Originality Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground leading-tight">
              Learning becomes an interactive{" "}
              <span className="text-primary italic">game</span> with LearningHub.
            </h2>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              We integrated smart gamification mechanics designed to keep your focus and motivation high. 
              We monitor your video progress second-by-second and reward your milestones as you grow.
            </p>
          </div>

          {/* Core Feature Bullet Layout */}
          <div className="grid gap-6">
            <div className="flex gap-5">
              <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-foreground">
                  3-Tier badge system
                </h4>
                <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                  Evolve naturally from Beginner to Advanced. Every major tier achieved 
                  unlocks special perks, advanced platform capabilities, and peer recognition.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-foreground">
                  Smart video synchronicity
                </h4>
                <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                  Never lose your momentum. Our platform automatically registers and secures 
                  the exact secondary playback timeframe whenever you pause or exit any video lesson.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Gamification;