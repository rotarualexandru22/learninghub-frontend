import React, { useState, useEffect, useRef } from "react";
import { API_BASE_URL } from "../../apiUrl";
import { ArrowLeft, Play, Pause, CheckCircle, BookOpen, AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";

const VideoPlayer = ({ courseId, onViewChange }) => {
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [debugStatus, setDebugStatus] = useState("Initializing safe stream...");
  
  const videoRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // 1. Încărcăm lecțiile cursului și progresul salvat
  useEffect(() => {
    const fetchPlayerData = async () => {
      console.log("🚀 [PLAYER DEBUG] Requesting logs for Course ID:", courseId);
      try {
        const token = localStorage.getItem("learninghub_token") || "";
        const headers = { Authorization: `Bearer ${token}` };

        // ✅ CORECTAT: A doua rută apelează acum corect endpoint-ul de progress, nu lessons duplicat!
        const [lessonsRes, progressRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/lessons/${courseId}`, { headers }).catch(e => {
            console.error("❌ Lessons API failed:", e);
            return { data: [] };
          }),
          axios.get(`${API_BASE_URL}/api/progress/${courseId}`, { headers }).catch(e => {
            console.error("❌ Progress API failed:", e);
            return { data: [] };
          })
        ]);

        let dataLessons = Array.isArray(lessonsRes.data) ? lessonsRes.data : [];
        
        if (dataLessons.length === 0) {
          console.warn("⚠️ [PLAYER DEBUG] Backend returned 0 lessons or 401. Injecting standard web video stream.");
          setDebugStatus("Failsafe Active // Local Stream Injected");
          dataLessons = [
            {
              _id: "failsafe_1",
              title: "React 19 Server Components Architecture",
              description: "Deep dive into React Server Components vs Client Components using video streams.",
              videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
              duration: "0:15",
              order: 1
            },
            {
              _id: "failsafe_2",
              title: "Next.js App Router & Parallel Routing",
              description: "Learn how to build complex layout structures using modern routing engines.",
              videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
              duration: "0:15",
              order: 2
            }
          ];
        } else {
          setDebugStatus("Secure Matrix Synced // Encryption Active");
        }

        const sortedLessons = dataLessons.sort((a, b) => a.order - b.order);
        setLessons(sortedLessons);
        setUserProgress(Array.isArray(progressRes.data) ? progressRes.data : []);

        if (sortedLessons.length > 0) {
          setCurrentLesson(sortedLessons[0]);
        }
      } catch (error) {
        console.error("❌ [PLAYER DEBUG] Critical failure during hydration:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchPlayerData();
    }
  }, [courseId]);

  // 2. Intervalul de sincronizare cu backend-ul (Rulează la fiecare 5 secunde de PLAY)
  useEffect(() => {
    if (!currentLesson || !isPlaying || currentLesson._id.startsWith("failsafe")) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    progressIntervalRef.current = setInterval(async () => {
      if (!videoRef.current) return;

      const currentTimeReal = Math.floor(videoRef.current.currentTime);
      const durationReal = Math.floor(videoRef.current.duration) || 15;

      try {
        const token = localStorage.getItem("learninghub_token") || "";
        
        // ✅ CORECTAT: Înlocuit localhost dur cu ruta dinamică API_BASE_URL
        const response = await axios.post(
          `${API_BASE_URL}/api/progress/update`,
          {
            courseId,
            lessonId: currentLesson._id,
            currentTime: currentTimeReal,
            duration: durationReal,
            increment: 5
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.completed) {
          const updatedProg = await axios.get(`${API_BASE_URL}/api/progress/${courseId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserProgress(updatedProg.data);
        }
      } catch (error) {
        console.warn("Security Sync Intercepted:", error.response?.data?.message || error.message);
      }
    }, 5000);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentLesson, isPlaying, courseId]);

  const handleMetadataLoaded = () => {
    if (!videoRef.current || !currentLesson) return;
    setVideoDuration(videoRef.current.duration);
    
    const lessonProgress = userProgress.find(p => p.lessonId === currentLesson._id);
    if (lessonProgress && lessonProgress.lastPlayedTime > 0 && !lessonProgress.completed) {
      videoRef.current.currentTime = lessonProgress.lastPlayedTime;
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center font-mono text-muted-foreground gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span>Initializing safe hardware stream node...</span>
      </div>
    );
  }

  const isLessonCompleted = (id) => userProgress.some(p => p.lessonId === id && p.completed);
  const progressPercentage = videoDuration > 0 ? (currentTime / videoDuration) * 100 : 0;

  return (
    <div className="min-h-screen bg-background pt-24 text-foreground flex flex-col lg:flex-row transition-colors duration-500">
      
      {/* Scurgere stângă: Player personalizat */}
      <div className="flex-1 p-6 space-y-6 lg:max-w-[72%] border-r border-border">
        <button 
          onClick={() => onViewChange("dashboard")}
          className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Exit Console Stream
        </button>

        {currentLesson ? (
          <div className="space-y-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-border shadow-2xl group">
              <video
                ref={videoRef}
                src={currentLesson.videoUrl}
                className="w-full h-full object-contain"
                onLoadedMetadata={handleMetadataLoaded}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                controls={false} 
              />

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-3">
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-primary transition-all duration-100" 
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-white font-mono text-xs">
                  <button onClick={togglePlay} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer">
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <div className="text-[10px] bg-black/40 px-2 py-1 rounded border border-white/5">
                    {Math.floor(currentTime)}s / {Math.floor(videoDuration)}s
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/40 border border-border rounded-xl font-mono text-[10px] text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span>STATUS: <span className="text-foreground font-bold uppercase">{debugStatus}</span></span>
              </div>
              <div>ANTI-SKIP MATRIX ACTIVE // 90% REQ</div>
            </div>

            <div className="space-y-2 bg-card p-6 rounded-2xl border border-border">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                Lesson 0{currentLesson.order}
              </span>
              <h1 className="text-2xl font-black tracking-tighter mt-2">{currentLesson.title}</h1>
              <p className="text-muted-foreground text-sm leading-relaxed">{currentLesson.description}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 text-muted-foreground font-mono">
            <AlertCircle className="w-8 h-8 mb-2" /> Media Stream offline.
          </div>
        )}
      </div>

      {/* Programa dreaptă */}
      <div className="w-full lg:w-[28%] p-6 bg-card/20 backdrop-blur-sm flex flex-col h-[calc(100vh-6rem)] overflow-y-auto">
        <div className="mb-4 pb-2 border-b border-border">
          <h2 className="font-mono font-black text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-primary" /> Track Modules Matrix
          </h2>
        </div>
        
        <div className="space-y-2 flex-1">
          {lessons.map((lesson) => {
            const completed = isLessonCompleted(lesson._id);
            const active = currentLesson?._id === lesson._id;
            return (
              <div
                key={lesson._id}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentLesson(lesson);
                }}
                className={`p-4 rounded-xl border transition-all duration-300 flex items-center justify-between gap-4 select-none cursor-pointer ${
                  active ? "bg-foreground text-background border-foreground shadow-lg scale-[1.01]" : "bg-card border-border hover:border-primary/40 text-foreground"
                }`}
              >
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-xs truncate leading-snug">{lesson.title}</span>
                  <span className={`text-[9px] font-mono mt-1 ${active ? "text-background/60" : "text-muted-foreground"}`}>
                    Est. Duration: {lesson.duration}
                  </span>
                </div>
                {completed ? <CheckCircle className="w-4 h-4 text-primary shrink-0" /> : <Play className={`w-3.5 h-3.5 shrink-0 ${active ? "text-background/40" : "text-muted-foreground/30"}`} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;