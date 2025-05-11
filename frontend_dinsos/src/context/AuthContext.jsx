// src/context/AuthProvider.jsx
import { createContext, useContext, useState, useEffect } from "react";

// 1. Buat context
const AuthContext = createContext();

// 2. Buat provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(status);
  }, []);

  const login = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Biar gampang akses context di komponen lain
export const useAuth = () => useContext(AuthContext);
