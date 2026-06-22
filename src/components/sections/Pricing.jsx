import React, { useState } from "react";
import { Check, Info } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const Pricing = () => {
  const { openAuth } = useAuth();
  // State controller managing dynamic billing cycles (Monthly vs Annual subscription)
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      monthlyPrice: 0,
      annualPrice: 0,
      description: "Ideal for curious minds and explorers starting their learning path.",
      features: [
        { text: "50 foundational courses", enabled: true },
        { text: "Full mobile access", enabled: true },
        { text: "Public community access", enabled: true },
        { text: "Verified certificates", enabled: false },
        { text: "24/7 Priority support", enabled: false },
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      monthlyPrice: 49,
      annualPrice: 34, // ~30% discount applied straight to the month value
      description: "Accelerated development track with complete unlimited content access.",
      features: [
        { text: "Access to all 500+ courses", enabled: true },
        { text: "Globally recognized credentials", enabled: true },
        { text: "Priority support 24/7", enabled: true },
        { text: "Guided hands-on projects", enabled: true },
        { text: "Offline offline mobile sync", enabled: true },
      ],
      cta: "Try Pro Track",
      popular: true,
    },
    {
      name: "Team",
      monthlyPrice: 199,
      annualPrice: 139, // ~30% discount calculated
      description: "Complete scalable ecosystem for corporate structures and large groups.",
      features: [
        { text: "Everything included in Pro", enabled: true },
        { text: "Advanced progress analytics", enabled: true },
        { text: "Dedicated account manager", enabled: true },
        { text: "Flexible seats & user licenses", enabled: true },
        { text: "Slack / Teams integration", enabled: true },
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="py-32 px-4 md:px-12 bg-background relative overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Dynamic Header Block with Animated Toggle Component */}
        <div className="text-left md:text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-primary text-xs font-bold uppercase tracking-widest leading-none font-mono">
            Flexible Pricing Plans
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.95]">
            Choose your plan toward success
          </h2>
          
          {/* Working Toggle Switch Engine */}
          <div className="flex items-center md:justify-center gap-4 pt-6 select-none">
            <span className={cn(
              "text-sm font-bold transition-colors duration-300",
              !isAnnual ? "text-foreground" : "text-muted-foreground"
            )}>
              Monthly
            </span>
            
            {/* Interactive Toggle Pill Switch */}
            <div 
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn(
                "w-14 h-8 bg-muted rounded-full p-1 cursor-pointer flex items-center transition-all duration-300 border border-border",
                isAnnual ? "bg-primary/20 border-primary/30" : ""
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded-full transition-all duration-300 transform",
                isAnnual ? "translate-x-6 bg-primary shadow-lg shadow-primary/40" : "bg-foreground"
              )} />
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(
                "text-sm font-bold transition-colors duration-300",
                isAnnual ? "text-foreground" : "text-muted-foreground"
              )}>
                Annually
              </span>
              <span className="bg-primary/20 text-primary text-[10px] font-black px-2 py-1 rounded-md uppercase font-mono tracking-wider animate-pulse">
                Save 30%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Layout Matrix Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={cn(
                "relative p-10 rounded-[2rem] border-2 transition-all duration-500 flex flex-col group bg-card/40 backdrop-blur-sm",
                plan.popular
                  ? "border-primary bg-card shadow-2xl lg:scale-105 z-10"
                  : "border-border shadow-sm hover:border-primary/30",
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg font-mono">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-2 tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-sans min-h-10">
                    {plan.description}
                  </p>
                </div>
                
                {/* Dynamic Price Calculation node */}
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-card-foreground font-mono tracking-tight transition-all duration-300">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground font-bold text-sm">
                    /month
                  </span>
                </div>
              </div>

              {/* Feature Verification Blocks */}
              <div className="mt-10 space-y-5 grow">
                {plan.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-center gap-3 text-sm font-medium transition-colors font-sans",
                      feature.enabled
                        ? "text-card-foreground"
                        : "text-muted-foreground/30 line-through",
                    )}
                  >
                    <div
                      className={cn(
                        "p-1 rounded-full shrink-0",
                        feature.enabled
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground/30",
                      )}
                    >
                      <Check className="w-3 h-3 stroke-[3px]" />
                    </div>
                    {feature.text}
                  </div>
                ))}
              </div>

              {/* Dynamic Action Trigger hooked straight to Register pipeline */}
              <button
                onClick={() => openAuth("register")}
                className={cn(
                  "mt-12 w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all transform hover:scale-[1.02] active:scale-[0.98] hover:cursor-pointer font-mono",
                  plan.popular
                    ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:opacity-95"
                    : "bg-foreground text-background hover:opacity-90",
                )}
              >
                {plan.cta}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest font-mono">
                <Info className="w-3.5 h-3.5" /> No commitment, cancel anytime
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;