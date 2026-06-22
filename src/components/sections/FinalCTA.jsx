import React from "react";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const FinalCTA = ({ onViewChange }) => {
  // REPARAT: Am extras openRegister din AuthContext pentru a trimite utilizatorul pe formularul corect
  const { user, openRegister, openLogin } = useAuth();

  const trustBadges = [
    "Instant Access",
    "No Credit Card Required",
    "Cancel Anytime"
  ];

  const handleActionClick = () => {
    if (user) {
      if (onViewChange) {
        onViewChange("dashboard");
      } else {
        console.warn("LearningHub Engine System Warning: 'onViewChange' prop is missing or undefined inside FinalCTA component node.");
      }
    } else {
      // REPARAT: Când dă click pe "Create free account", deschidem direct formularul de register, nu login-ul!
      if (openRegister) {
        openRegister();
      } else {
        // Fallback în caz de urgență
        openLogin();
      }
    }
  };

  return (
    <section className="py-24 px-4 md:px-12 bg-primary relative overflow-hidden transition-colors duration-500">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary-foreground/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-background/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]" />

      {/* Animated Blobs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-foreground/10 rounded-full blur-2xl animate-bounce-slow opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary-foreground/5 rounded-full blur-3xl animate-pulse opacity-20" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          
          {/* Floating Sparkle Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full text-primary-foreground text-xs md:text-sm font-bold uppercase tracking-[0.2em] animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
            <span>{user ? "Welcome to your terminal" : "Are you ready to begin?"}</span>
          </div>

          {/* Typographic Hero Header inside CTA */}
          <div className="space-y-6">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-primary-foreground leading-[0.85] text-balance">
              Your first lesson <br />
              is just <span className="italic text-primary-foreground/90">one click</span> <br />
              away.
            </h2>
            <p className="text-lg md:text-2xl font-medium text-primary-foreground/70 max-w-2xl mx-auto font-sans leading-relaxed">
              Join over{" "}
              <span className="text-primary-foreground font-black tabular-nums">
                1,000+
              </span>{" "}
              students who scaled and transformed their career this month.
            </p>
          </div>

          {/* Button Actions and Trust Badges */}
          <div className="flex flex-col items-center gap-10">
            {/* REPARAT: Curățat HTML-ul, lăsat doar un singur tag de button interactiv de la început */}
            <button 
              onClick={handleActionClick}
              className="group relative w-full sm:w-auto bg-background text-foreground text-base font-bold py-4 px-10 rounded-xl flex items-center justify-center transition-all transform hover:-translate-y-1 active:scale-[0.98] active:translate-y-0.5 shadow-xl hover:shadow-2xl hover:cursor-pointer"
            >
              {user ? "Go to student dashboard" : "Create free account"} 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-foreground ml-2"/>
            </button>

            {/* Horizontally distributed checklist validation layout */}
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
              {trustBadges.map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary-foreground/60 font-mono"
                >
                  <div className="w-5 h-5 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                  </div>
                  {badge}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalCTA;