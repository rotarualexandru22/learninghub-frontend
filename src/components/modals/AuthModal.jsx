import React, { useState, useEffect } from "react";
import { X, Mail, Lock, User, AtSign, ArrowRight, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { cn } from "@/lib/utils";

const AuthModal = () => {
  const { isAuthOpen, authMode, setAuthMode, closeAuth, loginUser, logoutUser } = useAuth();
  
  // STATS PENTRU DECLANȘAREA ANIMAȚIEI DE INTRODUCERE
  const [animate, setAnimate] = useState(false);

  // Isolated Login States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Isolated Register States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  
  // System flow states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const resetFormFields = () => {
    setLoginEmail("");
    setLoginPassword("");
    setFirstName("");
    setLastName("");
    setUsername("");
    setRegisterEmail("");
    setRegisterPassword("");
    setError("");
  };

  // Trigger pentru rularea animației la deschidere
  useEffect(() => {
    if (isAuthOpen) {
      // Îi oferim browserului 10 milisecunde să asimileze elementul în DOM înainte de a activa opacitatea
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [isAuthOpen]);

  // Șterge inputurile la switch între moduri
  useEffect(() => {
    resetFormFields();
  }, [isAuthOpen, authMode]);

  // Automatic Session Timeout (2 ore)
  useEffect(() => {
    const checkSessionExpiration = () => {
      const loginTime = localStorage.getItem("auth-login-time");
      if (loginTime) {
        const twoHoursInMs = 2 * 60 * 60 * 1000;
        const now = new Date().getTime();

        if (now - parseInt(loginTime, 10) > twoHoursInMs) {
          localStorage.removeItem("auth-login-time");
          logoutUser();
        }
      }
    };
    checkSessionExpiration();
  }, [isAuthOpen, logoutUser]);

  if (!isAuthOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const targetEmail = authMode === "login" ? loginEmail : registerEmail;
    
    if (authMode !== "forgot") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(targetEmail)) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
      }

      if (authMode === "register") {
        const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];
        const emailDomain = targetEmail.split("@")[1].toLowerCase();
        
        if (!allowedDomains.includes(emailDomain)) {
          setError("Registration restricted. Only major email providers are accepted (Gmail, Yahoo, Outlook, iCloud).");
          setLoading(false);
          return;
        }
      }
    }

    try {
      if (authMode === "login") {
        const response = await axios.post("http://localhost:5000/api/user/login", { 
          email: loginEmail, 
          password: loginPassword 
        });
        
        if (response.data && response.data.token) {
          const profileData = response.data.user || response.data;
          localStorage.setItem("auth-login-time", new Date().getTime().toString());
          
          loginUser(profileData, response.data.token);
          closeAuth();
        } else {
          throw new Error("Invalid server token payload configuration");
        }
        
      } else if (authMode === "register") {
        await axios.post("http://localhost:5000/api/user/register", { 
          firstName, 
          lastName, 
          username, 
          email: registerEmail, 
          password: registerPassword 
        });
        
        setIsSuccess(true);
        
        setTimeout(() => {
          setAuthMode("login"); 
          setIsSuccess(false); 
        }, 2500);
      }
      
    } catch (err) {
      setError(err.response?.data?.message || "Authentication credentials failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // LAYER 1: BACKDROP - Schimbă opacitatea dinamic în funcție de starea locală `animate`
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-black/0 backdrop-blur-none p-4 transition-all duration-300 ease-out",
      animate && "bg-black/60 backdrop-blur-sm"
    )}>
      
      {/* LAYER 2: THE MODAL BOX - Crește fluid în dimensiune și opacitate */}
      <div className={cn(
        "relative w-full max-w-md bg-background text-foreground border border-border rounded-2xl p-8 shadow-2xl overflow-hidden min-h-115 flex flex-col justify-center",
        "opacity-0 scale-95 translate-y-4 transition-all duration-300 ease-out",
        animate && "opacity-100 scale-100 translate-y-0"
      )}>
        
        {!isSuccess && (
          <button
            onClick={closeAuth}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors hover:cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center space-y-5 py-8 text-center select-none animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-500/20 animate-bounce">
              <Check className="w-10 h-10 stroke-[3.5px]" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-2xl font-black tracking-tight text-foreground font-mono">
                {authMode === "forgot" ? "Link Deployed!" : "Successfully Registered!"}
              </h3>
              <p className="text-sm text-muted-foreground font-sans">
                {authMode === "forgot" ? (
                  <>E-mail sent, please check your inbox.<br />Redirecting to sign-in terminal...</>
                ) : (
                  <>Your credentials have been securely stored.<br />Redirecting to sign-in terminal...</>
                )}
              </p>
            </div>
          </div>
        ) : (
          <>
            {authMode !== "forgot" && (
              <div key={authMode} className="animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out w-full">
                <div className="mb-6 text-center select-none">
                  <h2 className="text-2xl font-bold font-mono tracking-tight text-foreground">
                    {authMode === "login" ? "Welcome back!" : "Create account"}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {authMode === "login" ? "Sign in to continue your journey" : "Get started with your free account"}
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold rounded-xl text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                  {authMode === "register" && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">First Name</label>
                          <div className="relative flex items-center">
                            <User className="absolute left-3 w-4 h-4 text-muted-foreground" />
                            <input
                              type="text"
                              autoComplete="off"
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
                              autoComplete="off"
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
                            autoComplete="off"
                            placeholder="johndoe99"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        autoComplete="off"
                        placeholder="you@example.com"
                        value={authMode === "login" ? loginEmail : registerEmail}
                        onChange={(e) => authMode === "login" ? setLoginEmail(e.target.value) : setRegisterEmail(e.target.value)}
                        required
                        className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
                      {authMode === "login" && (
                        <button
                          type="button"
                          onClick={() => setAuthMode("forgot")}
                          className="text-xs text-primary font-semibold hover:underline bg-transparent border-none p-0 hover:cursor-pointer font-mono"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3 w-4 h-4 text-muted-foreground" />
                      <input
                        type="password"
                        autoComplete="off"
                        placeholder="••••••••"
                        value={authMode === "login" ? loginPassword : registerPassword}
                        onChange={(e) => authMode === "login" ? setLoginPassword(e.target.value) : setRegisterPassword(e.target.value)}
                        required
                        className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground font-bold py-3.5 px-6 rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 mt-6 hover:cursor-pointer text-sm disabled:opacity-50 font-mono"
                  >
                    {loading ? "Processing..." : authMode === "login" ? "Sign in" : "Register account"}
                    {!loading && <ArrowRight className="w-4 h-4 stroke-[3px]" />}
                  </button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground select-none">
                  {authMode === "login" ? (
                    <>
                      Don't have an account?{" "}
                      <button onClick={() => setAuthMode("register")} className="text-primary font-semibold hover:underline bg-transparent border-none p-0 hover:cursor-pointer font-mono">
                        Start for free
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button onClick={() => setAuthMode("login")} className="text-primary font-semibold hover:underline bg-transparent border-none p-0 hover:cursor-pointer font-mono">
                        Sign in
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* REAL ASYNC FORGOT PASSWORD VIEW STATE */}
            {authMode === "forgot" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out w-full">
                <div className="text-center space-y-2 select-none">
                  <h2 className="text-2xl font-bold font-mono text-foreground">Reset Password</h2>
                  <p className="text-sm text-muted-foreground">Enter your email and we'll process an institutional reset vector.</p>
                </div>
                
                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold rounded-xl text-center">
                    {error}
                  </div>
                )}

                <form 
                  onSubmit={async (e) => { 
                    e.preventDefault(); 
                    setError("");
                    setIsSuccess(false);
                    setLoading(true);
                    
                    const targetForgotEmail = e.target.elements.forgotEmail.value;

                    try {
                      await axios.post("http://localhost:5000/api/user/forgot-password", { 
                        email: targetForgotEmail 
                      });
                      
                      setIsSuccess(true);
                      e.target.reset();
                      
                      setTimeout(() => {
                        setAuthMode("login");
                        setIsSuccess(false);
                      }, 3000);

                    } catch (err) {
                      setError(err.response?.data?.message || "Failed to trigger password recovery request.");
                    } finally {
                      setLoading(false);
                    }
                  }} 
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3 w-4 h-4 text-muted-foreground" />
                      <input
                        name="forgotEmail"
                        type="email"
                        required
                        placeholder="registered-email@hub.com"
                        className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                      />
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground font-bold py-3.5 px-4 rounded-xl text-sm font-mono tracking-wide hover:opacity-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? "Deploying link..." : "Send reset trigger"}
                    {!loading && <ArrowRight className="w-4 h-4 stroke-[3px]" />}
                  </button>
                  <button 
                    type="button" 
                    disabled={loading}
                    onClick={() => setAuthMode("login")} 
                    className="w-full text-center text-xs text-muted-foreground hover:text-foreground font-semibold font-mono cursor-pointer disabled:opacity-30"
                  >
                    Back to Sign in
                  </button>
                </form>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default AuthModal;