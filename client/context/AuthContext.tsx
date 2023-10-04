"use client";
import { ReactElement, useEffect, useState } from "react";
import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  token: string | null
  handleLogin: (email: string, token: string) => void;
  handleLogout: () => void;
}

const initialState: AuthContextType = {
  isAuthenticated: false,
  userEmail: null,
  token: null,
  handleLogin: (email: string, token: string) => {},
  handleLogout: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialState);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    setIsAuthenticated(!!token || false);
    setUserEmail(email);
    setToken(token)
  }, [isAuthenticated]);

  const handleLogin = (email: string, token: string) => {
    console.log("email:", email);
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setUserEmail(email);
    setToken(token)
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUserEmail(null);
    setToken(null)
  };
  useEffect(() => {
    console.log(userEmail);
  }, [userEmail]);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userEmail, handleLogin, handleLogout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
