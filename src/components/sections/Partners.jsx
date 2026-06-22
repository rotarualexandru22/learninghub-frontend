import React from "react";

const Partners = () => {
  const partners = [
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    },
    {
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    },
    {
      name: "Slack",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
    },
  ];

  // Double the array for seamless infinite scroll execution
  const scrollItems = [...partners, ...partners];

  return (
    <section className="py-12 bg-background border-y border-border overflow-hidden transition-colors duration-500">
      {/* Section Header - Now perfectly centered on ALL devices */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mb-8 text-center">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/60 font-mono">
          Trusted partners worldwide
        </p>
      </div>

      {/* Marquee Wrapper Container */}
      <div className="relative flex overflow-hidden select-none">
        <div className="flex animate-scroll whitespace-nowrap gap-16 md:gap-32 items-center py-4">
          {scrollItems.map((partner, i) => (
            <div
              key={i}
              className="shrink-0 cursor-pointer transition-all duration-500 grayscale opacity-40 dark:opacity-30 dark:brightness-0 dark:invert hover:grayscale-0 hover:opacity-100 hover:brightness-100 hover:invert-0 dark:hover:brightness-100 dark:hover:invert-0"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} corporate logo`}
                className="h-5 md:h-7 w-auto object-contain pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* Gradient Fades for Premium Smooth Edge Scroll masking */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default Partners;