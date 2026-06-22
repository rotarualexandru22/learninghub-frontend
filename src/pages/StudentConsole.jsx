import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Award, GraduationCap, Play, Zap, Target } from "lucide-react";
import axios from "axios";

const StudentConsole = ({ onViewChange, setSelectedCourseId }) => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Preluăm numărul de elemente terminate pentru deblocarea vizuală a insignelor
  const completedCount = user?.completedCourses?.length || 0;

  // Structura sistemului de Gamification (Badges)
  const academicBadges = [
    { id: "first", name: "First Steps", desc: "Enrolled and initialized your first course", icon: Zap, unlocked: true },
    { id: "addict", name: "Knowledge Seeker", desc: "Successfully completed 5 premium courses", icon: Target, unlocked: completedCount >= 5 },
    { id: "master", name: "Elite Champion", desc: "Completed 10 courses (Master Ledger unlocked)", icon: Award, unlocked: completedCount >= 10 },
  ];

  useEffect(() => {
    const fetchHubCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses/all");
        setCourses(response.data);
      } catch (error) {
        console.error("Error loading student hub catalog:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHubCourses();
  }, []);

  // REPARAT CHIRURGICAL: Aliniat la string-ul central din App.jsx ('video-player')
  const handleLaunchPlayer = (courseId) => {
    if (setSelectedCourseId) {
      setSelectedCourseId(courseId); // Salvăm ID-ul cursului pentru contextul global
    }
    if (onViewChange) {
      onViewChange("video-player"); // Îl aruncă corect pe ecranul securizat al playerului
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 md:px-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Panel Header: Identitate Student */}
        <div className="bg-card border border-border p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground">
              Welcome back, {user?.firstName || "Student"}!
            </h1>
            <p className="text-muted-foreground font-medium text-sm">
              Academic Guard: <span className="text-primary font-bold uppercase tracking-widest text-[10px] bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">Verified Student Node</span>
            </p>
          </div>
          <div className="flex gap-4 font-mono">
            <div className="bg-muted px-6 py-4 rounded-xl text-center border border-border min-w-28">
              <p className="text-2xl font-black text-foreground">{courses.length}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Catalog</p>
            </div>
            <div className="bg-muted px-6 py-4 rounded-xl text-center border border-border min-w-28">
              <p className="text-2xl font-black text-primary">{completedCount}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Passed</p>
            </div>
          </div>
        </div>

        {/* Modulul 1: Gamification Engine (Badges Academice) */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-muted-foreground">Unlocked Credentials Ledger</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {academicBadges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <div 
                  key={badge.id}
                  className={`p-6 rounded-2xl border flex items-center gap-4 transition-all duration-300 ${
                    badge.unlocked 
                      ? "bg-card border-primary/20 shadow-md relative overflow-hidden" 
                      : "bg-muted/40 border-border opacity-40 select-none grayscale"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${
                    badge.unlocked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground tracking-tight">{badge.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{badge.desc}</p>
                    <span className={`text-[9px] font-mono font-black uppercase tracking-widest block mt-2 ${badge.unlocked ? "text-primary" : "text-muted-foreground"}`}>
                      {badge.unlocked ? "Active Matrix" : "Locked Node"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modulul 2: Grila de Cursuri Active */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-muted-foreground">Available Academic Tracks</h2>
          </div>

          {loading ? (
            <div className="text-center py-12 font-mono text-muted-foreground">Streaming network ledger...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div 
                  key={course._id}
                  className="bg-card border border-border rounded-xl overflow-hidden flex flex-col group hover:border-primary/30 transition-all duration-300 shadow-sm"
                >
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-background/90 backdrop-blur-sm text-[9px] font-mono font-black uppercase tracking-widest border border-border">
                      {course.category}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col grow space-y-4">
                    <div className="space-y-1.5 grow">
                      <h3 className="font-bold text-lg text-foreground tracking-tight leading-snug line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {course.level}
                      </span>
                      <button 
                        onClick={() => handleLaunchPlayer(course._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-mono font-black uppercase tracking-widest text-[9px] rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                      >
                        <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'><polygon points='5 3 19 12 5 21 5 3'></polygon></svg>" className="w-3 h-3 text-primary-foreground" alt="" /> Launch Stream
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default StudentConsole;