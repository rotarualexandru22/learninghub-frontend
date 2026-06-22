import React, { createContext, useContext, useEffect, useState } from "react";

// Creăm contextul fără definiții de tipuri
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Inițializăm starea verificând localStorage
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "light"; // Default pe 'light', sau 'dark' dacă preferi
  });

  // Aplicăm clasa pe <html> (documentElement) ori de câte ori se schimbă tema
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Funcția de toggle
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};