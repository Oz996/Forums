"use client";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { CookiesProvider } from "react-cookie";

const client = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthContextProvider>
        <CookiesProvider>
          <QueryClientProvider client={client}>
            <NextUIProvider>
              <NextThemesProvider attribute="class" defaultTheme="light">
                {children}
              </NextThemesProvider>
            </NextUIProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </CookiesProvider>
      </AuthContextProvider>
      <ToastContainer position="top-center" autoClose={1500} hideProgressBar />
    </>
  );
}
