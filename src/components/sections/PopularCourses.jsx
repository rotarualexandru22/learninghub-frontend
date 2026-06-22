import React, { useState, useEffect } from "react";
import { Star, ArrowRight, BookOpen } from "lucide-react";
import { API_BASE_URL } from "../../../apiUrl";  // ✅ CORECTAT: Import validat cu cale relativă
import { cn } from "@/lib/utils";
import axios from "axios"; 
import { useAuth } from "@/context/AuthContext"; 

// ✅ CORECTAT: Adus prop-ul setSelectedCourseId pentru a injecta ID-ul corect în player
const PopularCourses = ({ onViewChange, setSelectedCourseId }) => {
  const { user, openLogin } = useAuth(); 
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", "Development"];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/courses/all`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleGeneralAction = () => {
    if (user) {
      if (onViewChange) onViewChange("dashboard"); 
    } else {
      openLogin(); 
    }
  };

  // ✅ CORECTAT: Sincronizat perfect cu arhitectura de stări din App.jsx
  const handleStartCourse = (courseId) => {
    if (user) {
      if (setSelectedCourseId) {
        setSelectedCourseId(courseId); // Salvăm ID-ul global
      }
      if (onViewChange) {
        onViewChange("video-player"); // Deschidem playerul anti-skip
      }
    } else {
      openLogin(); 
    }
  };

  const filteredCourses =
    activeTab === "All"
      ? courses
      : courses.filter((c) => c.category === activeTab);

  return (
    <section id="courses" className="py-32 px-4 md:px-12 bg-background relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border/40 pb-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest font-mono">
              <Star className="w-3 h-3 fill-primary" /> Global Rating 4.9/5
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground leading-[0.9]">
              Courses designed to <br /> transform your career.
            </h2>
          </div>

          <button
            onClick={handleGeneralAction}
            className="w-full md:w-auto h-12 px-6 rounded-xl border border-primary/30 bg-primary/5 text-foreground hover:bg-primary hover:text-primary-foreground font-mono font-black uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-3 group shadow-sm hover:shadow-primary/25 cursor-pointer hover:border-primary active:scale-[0.98]"
          >
            Browse collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-primary group-hover:text-primary-foreground" />
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-5 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all border shrink-0 font-mono hover:cursor-pointer",
                activeTab === cat ? "bg-foreground text-background border-foreground shadow-2xl scale-105" : "bg-card/50 text-muted-foreground border-border hover:border-primary/50",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Ledger */}
        {loading ? (
          <div className="text-center py-12 font-mono text-muted-foreground">Loading premium database material...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course._id} className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-500 group relative flex flex-col">
                
                {/* Media Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest leading-none border border-white/20 shadow-sm">
                      {course.category}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-6 flex flex-col grow">
                  <div className="space-y-4">
                    <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest">
                      <span className="flex items-center gap-1.5 bg-muted/50 w-fit px-2 py-1 rounded">
                        <BookOpen className="w-3.5 h-3.5 text-primary" /> {course.level}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-card-foreground tracking-tighter group-hover:text-primary transition-colors duration-300">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>

                    <div className="flex items-center gap-2 pt-1">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold border border-primary/20 text-primary font-mono">
                        {course.instructor ? course.instructor.split(" ").map((n) => n[0]).join("") : "IN"}
                      </div>
                      <span className="text-xs font-bold text-foreground opacity-70">Taught by {course.instructor}</span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-6 mt-auto border-t border-border/50 flex flex-col gap-4">
                    <button onClick={() => handleStartCourse(course._id)} className="w-full h-12 flex items-center justify-center gap-3 bg-muted text-foreground rounded-xl font-black uppercase tracking-widest text-[10px] font-mono hover:bg-primary hover:text-primary-foreground transition-all group/btn shadow-sm hover:cursor-pointer">
                      Start Course <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularCourses;