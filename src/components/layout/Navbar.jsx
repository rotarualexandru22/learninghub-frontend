import React, { useState, useEffect } from "react";
import { Zap, Menu, X, Moon, Sun, Terminal } from "lucide-react"; // Am adăugat și o pictogramă de Terminal pentru vibe
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import NavAuthZone from "./NavAuthZone"; 

const Navbar = ({ onViewChange, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { theme, toggleTheme } = useTheme();
  const authContextProps = useAuth(); 
  const { user } = authContextProps; // Extragem user-ul direct pentru verificări rapide

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ancorele standard care rămân doar pentru Landing Page
  const navLinks = [
    { name: "Courses", href: "#courses" },
    { name: "Instructors", href: "#instructors"},
    { name: "Prices", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onViewChange("home");
    
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12",
        isScrolled || currentView !== "home"
          ? "bg-background/80 backdrop-blur-md shadow-md py-3 border-b border-border"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => {
            setIsMobileMenuOpen(false);
            onViewChange("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-foreground font-mono">
            LearningHub
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {/* Link-ul de Cursuri (Ancoră) */}
          <a
            href="#courses"
            onClick={(e) => handleAnchorClick(e, "#courses")}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              currentView === "home" ? "text-muted-foreground" : "text-foreground/70"
            )}
          >
            Courses
          </a>

          {/* DYNAMIC TRIGGER: Link direct către StudentConsole, vizibil doar când ești LOGAT */}
          {user && (
            <button 
              onClick={() => onViewChange("dashboard")} 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary-foreground text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary cursor-pointer flex items-center gap-1.5 shadow-sm shadow-primary/10",
                currentView === "dashboard" && "bg-primary text-primary-foreground border-primary"
              )}
            >
              <Terminal className="w-3.5 h-3.5" /> Console
            </button>
          )}

          {/* Restul ancorelor din listă */}
          {navLinks.slice(1).map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                currentView === "home" ? "text-muted-foreground" : "text-foreground/70"
              )}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Auth Zone */}
        <div className="hidden md:block">
          <NavAuthZone 
            {...authContextProps} 
            onViewChange={onViewChange} 
            theme={theme} 
            toggleTheme={toggleTheme} 
          />
        </div>

        {/* Mobile Menu Actions Grid */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-foreground hover:cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            className="text-foreground hover:cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay Container */}
      <div
        className={cn(
          "absolute top-full left-0 w-full h-[calc(100vh-100%)] bg-background z-40 md:hidden transition-all duration-300 p-6 flex flex-col gap-6 border-t border-border",
          isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none",
        )}
      >
        {/* Link Cursuri pe Mobil */}
        <a
          href="#courses"
          onClick={(e) => handleAnchorClick(e, "#courses")}
          className="text-2xl font-bold text-foreground"
        >
          Courses
        </a>

        {/* DYNAMIC TRIGGER MOBIL: Devine un link mare text dacă e logat */}
        {user && (
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onViewChange("dashboard"); }}
            className="text-left text-2xl font-black font-mono text-primary uppercase tracking-wide flex items-center gap-2 cursor-pointer"
          >
            ⚡ Student Console
          </button>
        )}

        {/* Restul ancorelor pe Mobil */}
        {navLinks.slice(1).map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => handleAnchorClick(e, link.href)}
            className="text-2xl font-bold text-foreground"
          >
            {link.name}
          </a>
        ))}
        
        {/* Mobile Auth Zone */}
        <NavAuthZone 
          {...authContextProps} 
          onViewChange={onViewChange} 
          theme={theme} 
          toggleTheme={toggleTheme} 
          isMobile={true}
          closeMobileMenu={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </nav>
  );
};

export default Navbar;