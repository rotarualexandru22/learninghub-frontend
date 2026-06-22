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

const AppContent = () => {
  // Starea pentru memorarea cursului activ selectat de student
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // REPARAT: Sincronizare inițială cu URL-ul din browser la refresh (Aliniat pe 'video-player')
  const [currentView, setCurrentView] = useState(() => {
    const path = window.location.pathname;
    if (path === '/account') return 'account';
    if (path === '/admin') return 'admin';
    if (path === '/dashboard') return 'dashboard';
    if (path === '/video-player') return 'video-player'; // REPARAT INTEGRAL
    if (path.startsWith('/reset-password')) return 'reset-password'; 
    return 'home';
  });

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [currentView]);

  // REPARAT CHIRURGICAL: Acum acceptă și stochează courseId-ul trimis din PopularCourses sau StudentConsole
  const handleNavigate = (view, courseId = null) => {
    setCurrentView(view);
    if (courseId) {
      setSelectedCourseId(courseId);
    }
    
    const targetPath = view === 'home' ? '/' : `/${view}`;
    
    if (window.location.pathname !== targetPath && !window.location.pathname.startsWith('/reset-password')) {
      window.history.pushState({ view, courseId }, '', targetPath);
    }
  };

  useEffect(() => {
    const handleBrowserBackForward = (event) => {
      const targetView = event.state?.view || 'home';
      setCurrentView(targetView);
      if (event.state?.courseId) {
        setSelectedCourseId(event.state.courseId);
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
            <PopularCourses onViewChange={handleNavigate} />
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
              setSelectedCourseId={setSelectedCourseId} 
            />
          </div>
        )}

        {/* VIEW F: ANTI-SKIP CORE VIDEO STREAMS PLAYER (REPARAT INTEGRAL SINCRO) */}
        {currentView === 'video-player' && selectedCourseId && (
          <div className="animate-fade-in">
            <VideoPlayer 
              courseId={selectedCourseId} 
              onViewChange={handleNavigate} 
            />
          </div>
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