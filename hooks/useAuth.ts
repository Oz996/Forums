import { AuthContext } from "@/components/context/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Failed to use AuthContext");
  return context;
};
