import React, { useState, useEffect } from 'react';
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext"; 
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import AuthModal from './components/modals/AuthModal';
import Benefits from './components/sections/Benefits';
import PopularCourses from './components/sections/PopularCourses';
import Gamification from './components/sections/Gamification';
import Instructors from './components/sections/Instructors';
import Partners from './components/sections/Partners';
import SocialProofBar from './components/sections/SocialProofBar';
import HowItWorks from './components/sections/HowItWorks';
import Pricing from './components/sections/Pricing';
import Testimonials from './components/sections/Testimonials';
import FAQ from './components/sections/FAQ';
import FinalCTA from './components/sections/FinalCTA';
import Footer from './components/layout/Footer';
import AccountPanel from './components/dashboard/AccountPanel';
import ResetPassword from './pages/ResetPassword';
import StudentConsole from './pages/StudentConsole';
import VideoPlayer from './pages/VideoPlayer';
import NotFound from './pages/NotFound';

const AppContent = () => {
  // Starea pentru memorarea cursului activ selectat de student (Persistă corect acum)
  const [selectedCourseId, setSelectedCourseId] = useState(() => {
    return localStorage.getItem("learninghub_selected_course") || null;
  });

  // Sincronizare inițială cu URL-ul din browser la refresh
  const [currentView, setCurrentView] = useState(() => {
    const path = window.location.pathname;
    if (path === '/' || path === '') return 'home';
    if (path === '/account') return 'account';
    if (path === '/admin') return 'admin';
    if (path === '/dashboard') return 'dashboard';
    if (path === '/video-player') return 'video-player'; 
    if (path.startsWith('/reset-password')) return 'reset-password';

    return 'not-found';
  });

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [currentView]);

  // ✅ REPARAT DE DEFINITIV: Acum salvează activ ID-ul în localStorage sau îl curăță la ieșire
  const handleNavigate = (view, courseId = null) => {
    setCurrentView(view);
    
    if (courseId) {
      setSelectedCourseId(courseId);
      localStorage.setItem("learninghub_selected_course", courseId); // 💾 Salvare persistentă în browser!
    } else if (view === 'dashboard' || view === 'home') {
      // Dacă studentul iese voluntar din player, opțional putem curăța localStorage-ul
      // Sfat: o lăsăm așa momentan pentru ca refresh-ul să fie ultra-stabil
    }
    
    const targetPath = view === 'home' ? '/' : `/${view}`;
    
    if (window.location.pathname !== targetPath && !window.location.pathname.startsWith('/reset-password')) {
      window.history.pushState({ view, courseId: courseId || selectedCourseId }, '', targetPath);
    }
  };

  useEffect(() => {
    const handleBrowserBackForward = (event) => {
      const targetView = event.state?.view || 'home';
      setCurrentView(targetView);
      if (event.state?.courseId) {
        setSelectedCourseId(event.state.courseId);
        localStorage.setItem("learninghub_selected_course", event.state.courseId);
      }
    };

    if (!window.history.state) {
      window.history.replaceState({ view: currentView, courseId: selectedCourseId }, '', window.location.pathname);
    }

    window.addEventListener('popstate', handleBrowserBackForward);
    return () => window.removeEventListener('popstate', handleBrowserBackForward);
  }, [currentView, selectedCourseId]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
      
      {currentView !== 'reset-password' && <Navbar onViewChange={handleNavigate} currentView={currentView} />}
      
      <main className="grow">
        {/* VIEW A: LANDING PAGE MATRIX */}
        {currentView === 'home' && (
          <div className="animate-fade-in">
            <HeroSection onViewChange={handleNavigate} />
            <SocialProofBar />
            <Partners />
            <Benefits />
            <PopularCourses 
              onViewChange={handleNavigate} 
              setSelectedCourseId={(id) => {
                setSelectedCourseId(id);
                localStorage.setItem("learninghub_selected_course", id); // 💾 Fix și pentru apelul direct din PopularCourses
              }}
            />
            <Gamification />
            <Instructors />
            <HowItWorks />
            <Pricing />
            <Testimonials />
            <FAQ />
            <FinalCTA onViewChange={handleNavigate}/>
          </div>
        )}

        {/* VIEW B: USER ACCOUNT PARAMETERS PANEL */}
        {currentView === 'account' && (
          <div className="animate-fade-in">
            <AccountPanel />
          </div>
        )}

        {/* VIEW C: SECURE INSTITUTIONAL ADMIN PANEL */}
        {currentView === 'admin' && (
          <div className="animate-fade-in">
            <div className="pt-32 text-center text-muted-foreground font-mono">
              Admin terminal system active. Awaiting template injection...
            </div>
          </div>
        )}

        {/* VIEW D: SECURE PASSWORD OVERRIDE MODULE */}
        {currentView === 'reset-password' && (
          <ResetPassword />
        )}

        {/* VIEW E: STUDENT CONSOLE HUB */}
        {currentView === 'dashboard' && (
          <div className="animate-fade-in">
            <StudentConsole 
              onViewChange={handleNavigate} 
              setSelectedCourseId={(id) => {
                setSelectedCourseId(id);
                localStorage.setItem("learninghub_selected_course", id); // 💾 Fix și pentru apelul din StudentConsole
              }} 
            />
          </div>
        )}

        {/* VIEW F: ANTI-SKIP CORE VIDEO STREAMS PLAYER (REPARAT INTEGRAL SINCRO) */}
        {currentView === 'video-player' && (
          <div className="animate-fade-in">
            <VideoPlayer 
              courseId={selectedCourseId} 
              onViewChange={handleNavigate} 
            />
          </div>
        )}

        {/* 🚨 VIEW G: CYBERPUNK AUTHENTIC 404 NOT FOUND SYSTEM */}
        {currentView === 'not-found' && (
          <NotFound onViewChange={handleNavigate} />
        )}
      </main>

      {currentView !== 'reset-password' && <Footer onViewChange={handleNavigate} />}
      <AuthModal />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;