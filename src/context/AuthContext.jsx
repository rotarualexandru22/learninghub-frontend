/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. Core authentication state. Loads user profile straight from localStorage on boot if session exists.
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("learninghub_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Structural modal state controlling visibility
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  // View toggle state determining active form view: "login" or "register"
  const [authMode, setAuthMode] = useState("login");

  // Global trigger actions to smoothly manipulate auth views across any component node
  const openLogin = () => {
    setAuthMode("login");
    setIsAuthOpen(true);
  };

  const openRegister = () => {
    setAuthMode("register");
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  // 2. State wrapper executing token storage and state synchronization on HTTP success
  const loginUser = (userData, token) => {
    if (token) {
      localStorage.setItem("learninghub_token", token);
    }
    localStorage.setItem("learninghub_user", JSON.stringify(userData));
    setUser(userData);
  };

  // 3. Destructor function wiping active storage variables to reset app state (Sign Out)
  const logoutUser = () => {
    localStorage.removeItem("learninghub_token");
    localStorage.removeItem("learninghub_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,             // Exposing state variable globally
        loginUser,        // Exposing execution handler for success responses
        logoutUser,       // Exposing destruction handler for sign out actions
        isAuthOpen,
        authMode,
        setAuthMode,
        openLogin,
        openRegister,
        closeAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};