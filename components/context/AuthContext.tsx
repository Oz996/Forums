"use client";
import { ReactElement, useEffect, useState } from "react";
import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  token: string | null;
  userId: string | null;
  premium: boolean;
  setPremium: (value: boolean) => void;
  handleLogin: (
    email: string,
    token: string,
    userId: string,
    premium: boolean
  ) => void;
  handleLogout: () => void;
}

const initialState: AuthContextType = {
  isAuthenticated: false,
  userEmail: null,
  token: null,
  userId: null,
  premium: false,
  setPremium: (value: boolean) => {},
  handleLogin: (value: string | boolean) => {},
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
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [premium, setPremium] = useState(false);

  console.log("premium", premium);
  console.log("email", userEmail);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");
    setIsAuthenticated(!!token || false);
    setToken(token);
    setUserId(userId);
    setUserEmail(email);
  }, [isAuthenticated]);

  useEffect(() => {
    if (premium) {
      localStorage.setItem("premium", "true");
    }
  }, [premium]);

  useEffect(() => {
    const isPremium = localStorage.getItem("premium");
    const userPremium = isPremium === "true";
    setPremium(userPremium);
  }, []);

  const handleLogin = (
    email: string,
    token: string,
    userId: string,
    premium: boolean
  ) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("userId", userId);
    console.log("id", userId);
    setToken(token);
    setUserId(userId);
    setUserEmail(email);

    if (premium) {
      setPremium(true);
      localStorage.setItem("premium", "true");
    } else {
      setPremium(false);
      localStorage.removeItem("premium");
    }
  };

  const handleLogout = () => {
    setPremium(false);
    setIsAuthenticated(false);
    setUserEmail(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        premium,
        setPremium,
        isAuthenticated,
        userEmail,
        userId,
        handleLogin,
        handleLogout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
