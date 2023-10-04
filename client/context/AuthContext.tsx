"use client";
import { Token } from "@/types/types";
import { ReactElement, useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext(null);

// const initialState = {
// }
export const AuthContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    setIsAuthenticated(!!token || false);
    setUserEmail(email);
  }, [isAuthenticated]);

  const handleLogin = (email: string, token: string) => {
    console.log("email:", email);
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUserEmail(null);
  };
  useEffect(() => {
    console.log(userEmail);
  }, [userEmail]);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userEmail, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
