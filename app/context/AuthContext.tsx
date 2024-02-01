"use client";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { createContext } from "react";
import { useCookies } from "react-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  userId: string | null;
  premium: boolean;
  setPremium: (value: boolean) => void;
  handleLogin: (email: string, userId: string, premium: boolean) => void;
  handleLogout: () => void;
}

const initialState: AuthContextType = {
  isAuthenticated: false,
  userEmail: null,
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
  const [premium, setPremium] = useState(false);
  const [cookies] = useCookies(["authenticated"]);

  console.log("cookies", cookies);

  console.log("premium", premium);
  console.log("email", userEmail);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");
    const isAuthenticatedCookie = cookies.authenticated === true;
    if (isAuthenticatedCookie) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    console.log("222", isAuthenticatedCookie);

    setUserId(userId);
    setUserEmail(email);
  }, [isAuthenticated, cookies]);

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

  const handleLogin = (email: string, userId: string, premium: boolean) => {
    setIsAuthenticated(true);
    localStorage.setItem("email", email);
    localStorage.setItem("userId", userId);
    console.log("id", userId);
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

  // Redirect user to home page if logged out in create post page

  const path = usePathname();
  const route = useRouter();

  const handleLogout = () => {
    if (path === "/create") {
      route.push("/");
    }
    setPremium(false);
    setIsAuthenticated(false);
    setUserEmail(null);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
