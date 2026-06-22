import React from "react";
import {
  Star,
  Users,
  ArrowRight,
  BookOpen,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Instructors = () => {
  const instructors = [
    {
      name: "Emma Sterling",
      role: "Senior Product Designer",
      bio: "Good design solves real-world problems — it doesn't just make things look pretty.",
      rating: 4.9,
      students: "15k+",
      courses: 12,
      experience: "8+ years",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
      specialties: ["Figma", "UX Research", "Design Systems"],
      featured: true,
    },
    {
      name: "Andrew Irons",
      role: "Fullstack Developer",
      bio: "Clean code is always the best documentation.",
      rating: 4.8,
      students: "22k+",
      courses: 18,
      experience: "10+ years",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
      specialties: ["React 19", "Next.js", "TypeScript"],
      featured: false,
    },
    {
      name: "Sarah Jenkins",
      role: "Marketing Strategist",
      bio: "Marketing is a structural science, not just an art.",
      rating: 4.7,
      students: "8k+",
      courses: 6,
      experience: "6+ years",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
      specialties: ["Google Ads", "SEO", "Analytics"],
      featured: false,
    },
    {
      name: "Hans Müller",
      role: "German Language Professor",
      bio: "Language is the ultimate gateway to another culture.",
      rating: 4.9,
      students: "10k+",
      courses: 8,
      experience: "12+ years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
      specialties: ["German B1-C1", "Conversation", "Certifications"],
      featured: false,
    },
  ];

  const featured = instructors.find((i) => i.featured);
  const others = instructors.filter((i) => !i.featured);

  return (
    <section
      id="instructors"
      className="py-32 px-4 md:px-12 bg-foreground text-background relative transition-colors duration-500 overflow-hidden"
    >
      {/* Decorative Blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto space-y-16 relative">
        
        {/* Header Block Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/10 border border-background/20 text-background/80 text-[10px] font-black uppercase tracking-widest font-mono">
              <Award className="w-3 h-3" /> Expert Elite Team
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9]">
              Learn directly from <br />
              the absolute best.
            </h2>
            <p className="text-background/50 max-w-xl text-lg leading-relaxed">
              Professionals with years of verified practical industry experience and a passion for teaching, 
              ready to accelerate your career.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-3 font-black uppercase tracking-widest text-[10px] font-mono text-background group transition-all h-fit pb-2 border-b-2 border-primary hover:cursor-pointer">
            Meet all instructors
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-primary" />
          </button>
        </div>

        {/* Grid System Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Featured Instructor — Highlights Large Portrait Card */}
          {featured && (
            <div className="group relative rounded-xl overflow-hidden border border-background/10 hover:border-primary/40 transition-all duration-500 lg:row-span-2">
              <div className="relative h-full min-h-125">
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                {/* Card Floating Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {featured.specialties.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
                      {featured.name}
                    </h3>
                    <p className="text-primary font-bold text-sm uppercase tracking-widest font-mono">
                      {featured.role}
                    </p>
                  </div>

                  <p className="text-white/70 text-base leading-relaxed italic max-w-md">
                    "{featured.bio}"
                  </p>

                  {/* Quantitative Stats Evaluation Bar */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-mono font-bold text-white text-sm">
                        {featured.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/60">
                      <Users className="w-4 h-4" />
                      <span className="font-mono font-bold text-[10px] uppercase tracking-widest">
                        {featured.students} Students
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/60">
                      <BookOpen className="w-4 h-4" />
                      <span className="font-mono font-bold text-[10px] uppercase tracking-widest">
                        {featured.courses} Courses
                      </span>
                    </div>
                    <span className="font-mono font-bold text-[10px] uppercase tracking-widest text-primary">
                      {featured.experience} Exp
                    </span>
                  </div>

                  {/* Social Buttons + Action Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      {/* LinkedIn */}
                      <button
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors hover:cursor-pointer"
                        aria-label={`LinkedIn ${featured.name}`}
                      >
                        <svg className="w-4 h-4 text-white/70 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </button>
                      {/* Twitter */}
                      <button
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors hover:cursor-pointer"
                        aria-label={`Twitter ${featured.name}`}
                      >
                        <svg className="w-3.5 h-3.5 text-white/70 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>

                      </button>
                      {/* REPARAT: Adăugat Instagram */}
                      <button
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors hover:cursor-pointer"
                        aria-label={`Instagram ${featured.name}`}
                      >
                        <svg className="w-4 h-4 text-white/70 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </button>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] font-mono hover:bg-primary/90 transition-all group/btn hover:cursor-pointer">
                      View Profile
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Instructors — Grid Column Cards */}
          {others.map((ins, i) => (
            <div
              key={i}
              className="group relative rounded-xl overflow-hidden border border-background/10 hover:border-primary/40 transition-all duration-500"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={ins.image}
                  alt={ins.name}
                  // REPARAT (Elena Pop / Sarah Jenkins): Am aplicat selectiv object-[center_15%] doar pentru Sarah pentru a urca imaginea în cadru și a-i evidenția chipul complet.
                  className={cn(
                    "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700",
                    ins.name === "Sarah Jenkins" ? "object-[center_15%]" : "object-top"
                  )}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                {/* Compact Content Placement */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {ins.specialties.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest border border-white/10"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold tracking-tighter text-white">
                      {ins.name}
                    </h3>
                    <p className="text-primary font-bold text-[10px] uppercase tracking-widest font-mono">
                      {ins.role}
                    </p>
                  </div>

                  {/* Performance Indicators */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                      <span className="font-mono font-bold text-white text-xs">
                        {ins.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/50">
                      <Users className="w-3.5 h-3.5" />
                      <span className="font-mono font-bold text-[9px] uppercase tracking-widest">
                        {ins.students} Users
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/50">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span className="font-mono font-bold text-[9px] uppercase tracking-widest">
                        {ins.courses} Courses
                      </span>
                    </div>
                    <span className="font-mono font-bold text-[9px] uppercase tracking-widest text-primary">
                      {ins.experience}
                    </span>
                  </div>

                  {/* Interactive Sliding Action Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex items-center gap-2">
                      {/* LinkedIn */}
                      <button
                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors hover:cursor-pointer"
                        aria-label={`LinkedIn ${ins.name}`}
                      >
                        <svg className="w-3.5 h-3.5 text-white/70 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </button>
                      {/* Twitter */}
                      <button
                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors hover:cursor-pointer"
                        aria-label={`Twitter ${ins.name}`}
                      >
                       <svg className="w-3.5 h-3.5 text-white/70 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>

                      </button>
                      {/* REPARAT: Adăugat Instagram și pe cardurile secundare */}
                      <button
                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors hover:cursor-pointer"
                        aria-label={`Instagram ${ins.name}`}
                      >
                        <svg className="w-3.5 h-3.5 text-white/70 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-black uppercase tracking-widest text-[9px] font-mono hover:bg-primary/90 transition-all group/btn hover:cursor-pointer">
                      Profile
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Mobile Screen CTA Button */}
        <div className="flex md:hidden justify-center">
          <button className="flex items-center gap-3 font-black uppercase tracking-widest text-[10px] font-mono text-background group transition-all pb-2 border-b-2 border-primary hover:cursor-pointer">
            Meet all instructors
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Instructors;