import React, { useState } from "react";
import { LogOut, ShieldAlert, ArrowRight, Sun, Moon } from "lucide-react";

const NavAuthZone = ({ 
  user, 
  openLogin, 
  openRegister, 
  logoutUser, 
  onViewChange, 
  theme, 
  toggleTheme,
  isMobile = false,
  closeMobileMenu
}) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleFinalSignOut = () => {
    setShowLogoutConfirm(false);
    if (closeMobileMenu) closeMobileMenu();
    logoutUser();
    onViewChange("home");
  };

  // --- VARIANTĂ PENTRU MENIUL DE MOBIL ---
  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 mt-auto">
        {user ? (
          <div className="flex flex-col gap-3 p-4 bg-muted/40 rounded-xl border border-border">
            <div 
              onClick={() => { if (closeMobileMenu) closeMobileMenu(); onViewChange("account"); }}
              className="flex items-center justify-between hover:cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold font-mono group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    user.firstName ? user.firstName.substring(0, 2).toUpperCase() : "U"
                  )}
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">View Profile</p>
                  <p className="text-base font-bold text-foreground">{user.firstName}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full py-3 mt-2 flex items-center justify-center gap-2 rounded-xl bg-destructive/10 text-destructive font-bold text-sm hover:bg-destructive/20 transition-colors hover:cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Sign out session
            </button>
          </div>
        ) : (
          <>
            <button 
              onClick={() => { if (closeMobileMenu) closeMobileMenu(); openLogin(); }}
              className="w-full py-4 text-center text-lg font-bold border border-zinc-400 dark:border-border rounded-xl text-foreground hover:cursor-pointer"
            >
              Sign in
            </button>
            <button 
              onClick={() => { if (closeMobileMenu) closeMobileMenu(); openRegister(); }}
              className="w-full py-4 flex items-center justify-center gap-2 text-lg font-bold bg-primary text-primary-foreground rounded-xl"
            >
              Start free <ArrowRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Modalul de Confirmare injectat local */}
        {showLogoutConfirm && <ConfirmModal onConfirm={handleFinalSignOut} onCancel={() => setShowLogoutConfirm(false)} />}
      </div>
    );
  }

  // --- VARIANTĂ PENTRU DESKTOP ---
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-muted transition-colors text-foreground hover:cursor-pointer"
        aria-label="Toggle Theme"
      >
        {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </button>
      
      {user ? (
        <div className="flex items-center gap-4 animate-fade-in">
          <div className="text-right hidden sm:block select-none">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider leading-none">Welcome,</p>
            <p className="text-sm font-bold text-foreground tracking-tight mt-1">{user.firstName || "User"}!</p>
          </div>

          <div 
            onClick={() => onViewChange('account')}
            className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center font-bold text-sm font-mono cursor-pointer overflow-hidden bg-primary/10 text-primary select-none shrink-0 hover:border-primary transition-colors"
          >
            {user.avatar ? (
              <img src={user.avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
            ) : (
              user.firstName ? user.firstName.substring(0, 2).toUpperCase() : "U"
            )}
          </div>

          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="p-2.5 rounded-xl bg-destructive/5 border border-destructive/10 text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-all hover:cursor-pointer"
            title="Sign out session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <button 
            onClick={openLogin}
            className="text-sm font-medium text-foreground hover:text-primary hover:cursor-pointer py-2 px-4 transition-colors"
          >
            Sign in
          </button>
          <button 
            onClick={openRegister}
            className="bg-primary text-primary-foreground text-sm font-bold py-2.5 px-6 rounded-lg hover:opacity-90 transition-all transform hover:scale-105 hover:cursor-pointer active:scale-95 flex items-center gap-2"
          >
            Start for free 
            <ArrowRight className="w-4 h-4 stroke-[3px]"/>
          </button>
        </>
      )}

      {/* Modalul de Confirmare injectat local */}
      {showLogoutConfirm && <ConfirmModal onConfirm={handleFinalSignOut} onCancel={() => setShowLogoutConfirm(false)} />}
    </div>
  );
};

// Sub-componentă internă reparată structural pentru fixare absolută pe ecran
const ConfirmModal = ({ onConfirm, onCancel }) => (
  // REPARAT: Adăugat explicit coordinates top-0 left-0, w-screen, h-screen și clasa z-[100] arbitrară din Tailwind
  <div className="fixed top-0 left-0 w-screen h-screen z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
    <div className="w-full max-w-sm bg-background border border-border rounded-2xl p-6 shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-200 relative z-[110]">
      <div className="w-14 h-14 bg-destructive/10 border border-destructive/20 text-destructive rounded-full flex items-center justify-center mx-auto shadow-inner">
        <ShieldAlert className="w-7 h-7" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-bold font-mono tracking-tight text-foreground">Are you sure you want to sign out?</h3>
        <p className="text-xs text-muted-foreground max-w-70 mx-auto">Your active security core token will be destroyed. You will need to re-authenticate.</p>
      </div>
      <div className="flex flex-col gap-2.5">
        <button onClick={onConfirm} className="w-full bg-destructive text-destructive-foreground font-bold py-2.5 px-4 rounded-xl text-sm transition-all hover:opacity-90 active:scale-[0.99] cursor-pointer">
          Yes, sign out
        </button>
        <button onClick={onCancel} className="w-full bg-muted text-muted-foreground border border-border font-medium py-2.5 px-4 rounded-xl text-xs hover:bg-muted/80 hover:text-foreground transition-all cursor-pointer">
          No, remain logged in
        </button>
      </div>
    </div>
  </div>
);

export default NavAuthZone;