import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Play, Pause, CheckCircle, BookOpen, Volume2, VolumeX, Maximize } from "lucide-react";

const VideoPlayer = ({ onViewChange }) => {
  const videoPoster = "https://i.ytimg.com/vi/hIh2O9OL69o/maxresdefault.jpg";
  const cloudVideoUrl = "https://www.dropbox.com/scl/fi/zaoagczw5acfdxvik1rmu/coding.mp4?rlkey=m3yd2mqd7ruuawpuvp3jv2cvs&raw=1";

  const lessons = [
    { _id: "local_1", title: "01. AI Agent core concepts & architecture blueprint", description: "Learning how to build an AI agent with Cursor and Next.js.", videoUrl: cloudVideoUrl, duration: "25:00 mins", startTimestamp: 0, endTimestamp: 1500, order: 1, thumbnail: videoPoster },
    { _id: "local_2", title: "02. Context engineering & multi-toolkit handlers", description: "Utilizing Vercel AI SDK and managing model tokens efficiently.", videoUrl: cloudVideoUrl, duration: "30:00 mins", startTimestamp: 1500, endTimestamp: 3300, order: 2, thumbnail: videoPoster },
    { _id: "local_3", title: "03. Local workspace calibration & schema initialization", description: "Setting up serverless PostgreSQL with Neon and Upstash Redis.", videoUrl: cloudVideoUrl, duration: "25:00 mins", startTimestamp: 3300, endTimestamp: 4800, order: 3, thumbnail: videoPoster },
    { _id: "local_4", title: "04. Super memory implementation & persistent data layers", description: "Integrating Super Memory for long-term storage and fact recall.", videoUrl: cloudVideoUrl, duration: "25:00 mins", startTimestamp: 4800, endTimestamp: 6300, order: 4, thumbnail: videoPoster },
    { _id: "local_5", title: "05. Messaging tunneling, webhooks & production deployment", description: "Setting up Telegram botfather and webhooks validation.", videoUrl: cloudVideoUrl, duration: "20:00 mins", startTimestamp: 6300, endTimestamp: 7500, order: 5, thumbnail: videoPoster }
  ];

  const [currentLesson, setCurrentLesson] = useState(lessons[0]);
  
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem("completed_lessons");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  
  const [currentTime, setCurrentTime] = useState(() => {
    const savedTime = localStorage.getItem(`lesson_time_${lessons[0]._id}`);
    return savedTime ? parseFloat(savedTime) : lessons[0].startTimestamp;
  });
  
  const [watchedSecondsMap, setWatchedSecondsMap] = useState(() => {
    const savedMap = localStorage.getItem("watched_seconds_map");
    return savedMap ? JSON.parse(savedMap) : {};
  });

  const [centerIcon, setCenterIcon] = useState({ visible: false, type: "play" });
  
  const videoRef = useRef(null);
  const containerRef = useRef(null); 
  const progressIntervalRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleLessonChange = (lesson) => {
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setCurrentLesson(lesson);

    const savedTime = localStorage.getItem(`lesson_time_${lesson._id}`);
    const targetPos = savedTime ? parseFloat(savedTime) : lesson.startTimestamp;
    
    setCurrentTime(targetPos);

    if (videoRef.current) {
      videoRef.current.currentTime = targetPos;
    }
  };

    const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const savedTime = localStorage.getItem(`lesson_time_${currentLesson._id}`);
      if (savedTime) {
        const targetTime = parseFloat(savedTime);
        videoRef.current.currentTime = targetTime;
        setCurrentTime(targetTime);
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
      setCenterIcon({ visible: true, type: "play" });
      setTimeout(() => setCenterIcon(prev => ({ ...prev, visible: false })), 600);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setCenterIcon({ visible: true, type: "pause" });
      setTimeout(() => setCenterIcon(prev => ({ ...prev, visible: false })), 600);
    }
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const percentage = parseFloat(e.target.value);
    const segmentDuration = currentLesson.endTimestamp - currentLesson.startTimestamp;
    const targetTime = currentLesson.startTimestamp + (segmentDuration * (percentage / 100));
    
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
    localStorage.setItem(`lesson_time_${currentLesson._id}`, targetTime);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value) / 100;
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      const fallbackVolume = volume > 0 ? volume : 0.5;
      videoRef.current.volume = fallbackVolume;
      setVolume(fallbackVolume);
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const currentReal = videoRef.current.currentTime;
    
    if (currentReal < currentLesson.startTimestamp) {
      videoRef.current.currentTime = currentLesson.startTimestamp;
      return;
    }
    if (currentReal > currentLesson.endTimestamp) {
      videoRef.current.currentTime = currentLesson.endTimestamp;
      setIsPlaying(false);
      videoRef.current.pause();
      return;
    }

    setCurrentTime(currentReal);
    localStorage.setItem(`lesson_time_${currentLesson._id}`, currentReal);
  };

 // ⌨️ HOTKEYS IMPLEMENTATION (Space, F, ArrowLeft, ArrowRight)
useEffect(() => {
  const handleKeyDown = (event) => {
    // Dacă utilizatorul scrie într-un input sau textarea (ex: comentarii pe viitor), oprim hotkeys
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) return;
    
    if (!videoRef.current) return;

    // Tasta F / f -> Fullscreen
    if (event.key === "f" || event.key === "F") {
      event.preventDefault();
      handleFullscreen();
    }
    // Tasta Space -> Play / Pause
    if (event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      togglePlay();
    }
    // Săgeată Stânga -> Înapoi 5 secunde
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      // Ne asigurăm că nu scădem sub timpul de start al lecției curente
      const targetTime = Math.max(videoRef.current.currentTime - 5, currentLesson.startTimestamp);
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
    // Săgeată Dreapta -> Înainte 5 secunde
    if (event.key === "ArrowRight") {
      event.preventDefault();
      // Ne asigurăm că nu depășim timpul de final al lecției curente
      const targetTime = Math.min(videoRef.current.currentTime + 5, currentLesson.endTimestamp);
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
}, [isPlaying, currentLesson, currentTime]); // 👈 Am adăugat dependințele ca React să știe exact timpii lecției curente

  useEffect(() => {
    if (!isPlaying) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    progressIntervalRef.current = setInterval(() => {
      setWatchedSecondsMap((prevMap) => {
        const currentSeconds = prevMap[currentLesson._id] || 0;
        const updatedSeconds = currentSeconds + 1;
        const newMap = { ...prevMap, [currentLesson._id]: updatedSeconds };
        
        localStorage.setItem("watched_seconds_map", JSON.stringify(newMap));

        const totalLessonDuration = currentLesson.endTimestamp - currentLesson.startTimestamp;
        const effectiveProgressRatio = updatedSeconds / totalLessonDuration;

        if (effectiveProgressRatio >= 0.80 && !userProgress.includes(currentLesson._id)) {
          const newProgress = [...userProgress, currentLesson._id];
          setUserProgress(newProgress);
          localStorage.setItem("completed_lessons", JSON.stringify(newProgress));
        }

        return newMap;
      });
    }, 1000);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, currentLesson, userProgress]);

  const currentStart = currentLesson.startTimestamp;
  const currentEnd = currentLesson.endTimestamp;
  const elapsedSegmentTime = currentTime - currentStart;
  const segmentDuration = currentEnd - currentStart;
  const progressPercentage = segmentDuration > 0 ? (elapsedSegmentTime / segmentDuration) * 100 : 0;

  const totalSecondsWatchedInCurrent = watchedSecondsMap[currentLesson._id] || 0;
  const currentLessonTotalDuration = currentEnd - currentStart;
  const currentWatchedPercentage = currentLessonTotalDuration > 0 
    ? Math.min(Math.floor((totalSecondsWatchedInCurrent / currentLessonTotalDuration) * 100), 100)
    : 0;

  // Calcul dinamic pentru stilul bării ca pe YouTube (stânga verde, dreapta gri transparent)
   const progressTrackStyle = {
    background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${progressPercentage}%, rgba(255,255,255,0.2) ${progressPercentage}%, rgba(255,255,255,0.2) 100%)`
  };

   const volumePercentage = isMuted ? 0 : volume * 100;
   const volumeTrackStyle = {
    background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${volumePercentage}%, rgba(255,255,255,0.2) ${volumePercentage}%, rgba(255,255,255,0.2) 100%)`
  };

  return (
    <div className="min-h-screen bg-background pt-24 text-foreground flex flex-col lg:flex-row">
      <div className="flex-1 p-6 space-y-6 lg:max-w-[72%] border-r border-border">
        <button onClick={() => onViewChange("dashboard")} className="flex items-center gap-2 text-sm font-mono font-bold text-muted-foreground hover:text-primary cursor-pointer bg-none border-none outline-none">
          <ArrowLeft className="w-4 h-4" /> Exit console stream
        </button>

        <div className="space-y-6">
          <div ref={containerRef} className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-border shadow-2xl group cursor-pointer">
            <video
              ref={videoRef}
              src={currentLesson.videoUrl}
              poster={videoPoster}
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
              controls={false} 
            />

            {centerIcon.visible && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/10 z-20">
                <div className="p-5 rounded-full bg-black/60 text-white animate-ping duration-500">
                  {centerIcon.type === "play" ? <Play className="w-8 h-8 fill-white" /> : <Pause className="w-8 h-8 fill-white" />}
                </div>
              </div>
            )}

            {/* Control HUD */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-3 z-10">
              
              {/* 📺 BARA STIL YOUTUBE (VERDE / GRI IN FATĂ) */}
              <input 
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progressPercentage}
                onChange={handleSeek}
                style={progressTrackStyle}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-primary outline-none transition-all duration-75"
              />

              <div className="flex items-center justify-between text-white font-mono text-sm">
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border-none cursor-pointer text-white flex items-center justify-center">
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  
                  {/* 🔊 ZONE VOLUM CURĂȚATĂ COMPLET DE FUNDALUL VERDE TRANDAFIRIU */}
                  <div className="flex items-center gap-1 group/volume h-8">
                    <button onClick={toggleMute} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border-none cursor-pointer text-white flex items-center justify-center">
                      {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={volumePercentage}
                      onChange={handleVolumeChange}
                      style={volumeTrackStyle}
                      className="w-0 group-hover/volume:w-20 opacity-0 group-hover/volume:opacity-100 transition-all duration-300 h-1 rounded-full appearance-none cursor-pointer accent-primary bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-xs bg-black/40 px-3 py-1 rounded border border-white/5 font-bold">
                    {formatTime(Math.max(currentTime - currentStart, 0))} / {formatTime(segmentDuration)}
                  </div>
                  <button onClick={handleFullscreen} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border-none cursor-pointer text-white flex items-center justify-center" title="Toggle Fullscreen (F)">
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Console Output Log Terminal */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-4 bg-muted/40 border border-border rounded-xl font-mono text-muted-foreground text-xs">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping shrink-0" />
              <span>Status <span className="text-foreground/40 font-normal">//</span> <span className="text-foreground font-black">LIVE LINK</span></span>
            </div>
            <div className="font-bold tracking-wider text-right uppercase text-primary">
              {userProgress.includes(currentLesson._id) ? "Module completed // 100% Verified" : `Progress: ${currentWatchedPercentage}% / Necessary 80%`}
            </div>
          </div>

          <div className="space-y-2 bg-card p-6 rounded-2xl border border-border">
            <span className="text-xs font-mono font-black text-primary bg-primary/10 px-3 py-1 rounded border border-primary/20">
              Lesson 0{currentLesson.order}
            </span>
            <h1 className="text-2xl font-black tracking-tight mt-2">{currentLesson.title}</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">{currentLesson.description}</p>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-[28%] p-6 bg-card/20 flex flex-col h-[calc(100vh-6rem)] overflow-y-auto">
        <div className="mb-4 pb-3 border-b border-border">
          <h2 className="font-mono text-xs text-muted-foreground flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" /> Track modules matrix
          </h2>
        </div>
        
        <div className="space-y-3 flex-1">
          {lessons.map((lesson) => {
            const completed = userProgress.includes(lesson._id);
            const active = currentLesson._id === lesson._id;
            return (
              <div
                key={lesson._id}
                onClick={() => handleLessonChange(lesson)}
                className={`p-4 rounded-xl border transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer ${
                  active ? "bg-foreground text-background border-foreground shadow-lg scale-[1.01]" : "bg-card border-border hover:border-primary/40 text-foreground"
                }`}
              >
                <div className="w-16 h-10 rounded-md overflow-hidden bg-muted shrink-0 border border-border/10">
                  <img src={lesson.thumbnail} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col min-w-0 space-y-1 grow">
                  <span className="font-black text-xs truncate">{lesson.title}</span>
                  <span className={`text-[10px] font-mono ${active ? "text-background/70" : "text-muted-foreground"}`}>
                    Est. Duration: {lesson.duration}
                  </span>
                </div>
                {completed ? <CheckCircle className="w-4 h-4 text-emerald-500 font-bold shrink-0" /> : <Play className="w-3 h-3 text-muted-foreground/30" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;