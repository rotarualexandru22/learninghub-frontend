import React from "react";
import { Terminal, ArrowLeft } from "lucide-react";

export default function NotFound({ onViewChange }) {
  // Dacă folosești funcția ta clasică onViewChange("dashboard") pentru navigare:
  const handleGoHome = () => {
    if (onViewChange) {
      onViewChange("dashboard");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-foreground font-mono">
      <div className="max-w-md w-full space-y-6 text-center border border-border p-8 rounded-2xl bg-card/50 shadow-2xl relative overflow-hidden group">
        
        {/* Efect de scanline în fundal */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.002)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none" />

        {/* Header-ul de eroare */}
        <div className="flex justify-center mb-2">
          <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20 text-red-500 animate-pulse">
            <Terminal className="w-12 h-12" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-black tracking-tighter text-primary">
            404
          </h1>
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            // ERROR: LINK_MATRIX_NOT_FOUND
          </h2>
        </div>

        <p className="text-xs text-muted-foreground/80 bg-muted/50 p-4 rounded-xl border border-border text-left leading-relaxed">
          <span className="text-red-400 font-bold">sys.log:</span> Requested sector could not be retrieved from MongoDB Cluster. The state view may have been corrupted or does not exist.
        </p>

        {/* 🚀 BUTONUL DE RETUR */}
        <div className="pt-2">
          <button 
            onClick={handleGoHome}
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-primary text-background font-bold text-sm transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90 shadow-lg shadow-primary/10 cursor-pointer border-none outline-none"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" /> Return to Safe Terminal
          </button>
        </div>

      </div>
    </div>
  );
}