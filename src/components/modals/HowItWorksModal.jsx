import React from "react";
import { createPortal } from "react-dom"; // <--- Importul magic pentru Portals
import { X, HelpCircle, User, GraduationCap, Award, ArrowRight } from "lucide-react";

const HowItWorksModal = ({ isOpen, onClose, onAction }) => {
  if (!isOpen) return null;

  // Codul modalului curat, mutat direct la nivel de document body
  return createPortal(
    <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
      <div className="bg-zinc-900 w-full max-w-xl rounded-2xl border border-zinc-800 p-8 shadow-2xl relative space-y-6 text-zinc-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100 p-1 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Modal */}
        <div className="space-y-2 text-center">
          <HelpCircle className="w-10 h-10 text-primary mx-auto" />
          <h3 className="text-xl font-bold font-mono text-zinc-100">How LearningHub accelerates you</h3>
          <p className="text-xs text-zinc-400">Three core matrices aligned for absolute skill mastery.</p>
        </div>

        {/* Steps Container */}
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-800/40 border border-zinc-800">
            <div className="bg-primary/10 text-primary p-2 rounded-lg font-mono font-bold text-sm shrink-0">01</div>
            <div>
              <h4 className="font-bold text-sm text-zinc-200 flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" /> Account synchronization
              </h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Deploy your profile credentials, configure your premium dashboard entity, and unlock the global education catalog.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-800/40 border border-zinc-800">
            <div className="bg-primary/10 text-primary p-2 rounded-lg font-mono font-bold text-sm shrink-0">02</div>
            <div>
              <h4 className="font-bold text-sm text-zinc-200 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-primary" /> Secure anti-skip player
              </h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Stream curriculum nodes at your own pace. The interactive core logs your timestamp profiles into MongoDB every 5 seconds to guarantee integrity.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-800/40 border border-zinc-800">
            <div className="bg-primary/10 text-primary p-2 rounded-lg font-mono font-bold text-sm shrink-0">03</div>
            <div>
              <h4 className="font-bold text-sm text-zinc-200 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-primary" /> Institutional badges
              </h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Reach 100% video metrics computation, complete the tracking logic, and commit permanent cryptographic badges to your public profile.
              </p>
            </div>
          </div>
        </div>

        {/* Action inside modal */}
        <button 
          onClick={onAction}
          type="button"
          className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl text-sm font-mono flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-primary/20"
        >
          Acknowledge architecture & browse grid <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>,
    document.body // <--- Îl injectăm direct în body, tăiem legătura cu înălțimea de 19.000px!
  );
};

export default HowItWorksModal;