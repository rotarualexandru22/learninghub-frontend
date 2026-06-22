import React, { useState } from "react";
import { LucideRocket, Star, ArrowRight, Play, Mail, Lock, User, AtSign, Check, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import HowItWorksModal from "../modals/HowItWorksModal";
import axios from "axios";
import { cn } from "@/lib/utils";

const HeroSection = ({ onViewChange }) => {
  // Am extras doar proprietățile de bază din contextul global
  const { openLogin, user } = useAuth();

  // Local state pentru formularul de înregistrare
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // CORECTAT: Adăugat state local pentru controlul deschiderii modalului extern
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  // State pentru gestionarea statusului Axios
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Smooth scroll handler către secțiunea de cursuri
  const handleScrollToCourses = () => {
    const element = document.getElementById("courses");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handler pentru butonul principal din stânga
  const handleMainButtonClick = () => {
    if (user) {
      onViewChange("account"); // Logat -> Dashboard
    } else {
      handleScrollToCourses(); // Nelogat -> Smooth scroll la cursuri (UX curat)
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];
    const emailDomain = email.split("@")[1].toLowerCase();
    const isAllowed = allowedDomains.includes(emailDomain);

    if (!isAllowed) {
      setError("Registration restricted. Only major email providers are accepted (Gmail, Yahoo, Outlook, iCloud).");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/user/register", {
        firstName,
        lastName,
        username,
        email,
        password,
      });

      setSuccess(true);
      setFirstName("");
      setLastName("");
      setUsername("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        setSuccess(false);
        openLogin(); 
      }, 2500);

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-12 bg-background overflow-hidden flex items-center justify-center min-h-[85vh]">
      {/* Decorative Orbs */}
      <div className="absolute top-20 right-[-10%] w-125 h-125 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-100 h-100 bg-primary/10 rounded-full blur-[100px] -z-10" />

      <div className={cn(
        "max-w-7xl mx-auto w-full transition-all duration-500",
        user ? "flex flex-col items-center text-center space-y-12 max-w-3xl" : "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      )}>
        
        {/* TEXT CONTENT INNER GRID MODULE */}
        <div className={cn("space-y-10", user ? "text-center" : "text-center lg:text-left")}>
          
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-primary text-sm font-bold animate-fade-in font-mono">
            <LucideRocket className="w-4 h-4 text-primary animate-pulse" />
            <span>
              {user 
                ? `SYSTEM: READY // Prepared for your next session, ${user.firstName || "Explorer"}?` 
                : "SYSTEM: BOOT // The future of education is here"}
            </span>
          </div>

          <div className="space-y-6">
            <h1 className={cn(
              "font-bold tracking-tighter text-foreground leading-[1.1]",
              user ? "text-6xl md:text-8xl" : "text-5xl md:text-7xl"
            )}>
              {user ? (
                <>Shape your skills. <br /><span className="text-primary italic">Master</span> your path.</>
              ) : (
                <>Learn anything <br /><span className="text-primary italic">Everywhere.</span> <br />At your own pace.</>
              )}
            </h1>
            
            <p className={cn(
              "text-lg md:text-xl text-muted-foreground leading-relaxed font-sans mx-auto",
              user ? "max-w-2xl" : "max-w-xl lg:mx-0"
            )}>
              {user ? (
                `Ready to resume your acceleration matrix? You have active modules waiting. Access your student ledger parameters or continue reviewing enrolled catalog entries below.`
              ) : (
                "Over 500 interactive courses, verified instructors and internationally recognized certificates. Start your transformation today."
              )}
            </p>
          </div>

          {/* Core Action Call Operations */}
          <div className={cn("flex flex-col sm:flex-row items-center gap-4 justify-center", !user && "lg:justify-start")}>
            <button 
              onClick={handleMainButtonClick}
              className="w-full sm:w-auto bg-primary text-primary-foreground font-bold py-4 px-10 rounded-xl flex items-center justify-center gap-2 text-lg hover:shadow-lg hover:shadow-primary/20 transition-all transform hover:-translate-y-1 active:scale-[0.95] hover:cursor-pointer font-mono"
            >
              {user ? (
                <><LayoutDashboard className="w-5 h-5" /> Go to account dashboard</>
              ) : (
                <>Explore courses <ArrowRight className="w-5 h-5" /></>
              )}
            </button>

            <button 
              // CORECTAT: Dacă utilizatorul nu e logat, activăm starea care deschide modalul izolat
              onClick={user ? handleScrollToCourses : () => setIsHowItWorksOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-3 py-4 px-10 rounded-xl border-2 border-foreground font-bold text-foreground hover:bg-foreground hover:text-background transition-all hover:cursor-pointer"
            >
              {user ? (
                <>Browse course grid <ArrowRight className="w-5 h-5" /></>
              ) : (
                <><Play className="w-5 h-5 fill-current" /> How it works?</>
              )}
            </button>
          </div>

          {/* Social Proof Bar Node */}
          <div className={cn("flex flex-col sm:flex-row items-center gap-6 justify-center pt-6 border-t border-border lg:border-none", !user && "lg:justify-start")}>
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-background bg-muted overflow-hidden shadow-sm">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="user profile avatar" />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>4.8/5</span>
              </div>
              <p className="text-muted-foreground">out of 500+ reviews · Free to start</p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT: SECURITY AUTH REGISTER CARD */}
        {!user && (
          <div className="relative group animate-in fade-in slide-in-from-right-12 duration-500">
            <div className="absolute inset-0 bg-primary/20 rounded-3xl rotate-3 scale-105 blur-xl -z-10 transition-transform group-hover:rotate-6 duration-700" />
            <div className="bg-card p-8 md:p-12 rounded-2xl shadow-2xl border border-border relative min-h-145 flex flex-col justify-center">
              <div className="space-y-6">
                
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-card-foreground font-mono">
                    Create your account
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Join 1,000+ students analyzing and mastering core skills today.
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold rounded-xl text-center">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold rounded-xl text-center flex items-center justify-center gap-2 font-mono">
                    <Check className="w-4 h-4 stroke-[3px]" /> Account stored! Opening secure terminal view...
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4" autoComplete="off">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">First Name</label>
                      <div className="relative flex items-center">
                        <User className="absolute left-3 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="John"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Name</label>
                      <div className="relative flex items-center">
                        <User className="absolute left-3 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Doe"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Username</label>
                    <div className="relative flex items-center">
                      <AtSign className="absolute left-3 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="johndoe99"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3 w-4 h-4 text-muted-foreground" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 mt-2 text-sm disabled:opacity-50 font-mono"
                  >
                    {loading ? "Processing..." : "Get started now"}
                    {!loading && <ArrowRight className="w-4 h-4 stroke-[3px]" />}
                  </button>
                </form>

                <div className="flex items-center gap-4 py-1 select-none">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">Or register with</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <button type="button" className="flex items-center justify-center gap-3 w-full py-3.5 px-6 border border-border rounded-xl font-bold bg-muted/30 hover:bg-muted transition-all text-foreground text-sm hover:cursor-pointer font-sans">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Google
                </button>
                  
                <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground font-medium pt-1 select-none">
                  <Star className="w-3 h-3 fill-primary/20 text-primary" />
                  <span>Your personal information is secure • SSL Encrypted</span>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>

      {/* CORECTAT: Răndam noua componentă complet decuplată și izolată aici, la baza tag-ului principal al secțiunii */}
      <HowItWorksModal 
        isOpen={isHowItWorksOpen} 
        onClose={() => setIsHowItWorksOpen(false)} 
        onAction={() => {
          setIsHowItWorksOpen(false);
          handleScrollToCourses();
        }}
      />
    </section>
  );
};

export default HeroSection;