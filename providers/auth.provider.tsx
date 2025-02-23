"use client";

import { UserDetails } from "@/shared/types/user";
import { createContext, ReactNode, useContext, useMemo } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  user?: UserDetails | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

AuthContext.displayName = "AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({
  user,
  isAuthenticated,
  children,
}: AuthContextType & { children: ReactNode }) {
  const value = useMemo(
    () => ({ isAuthenticated, user }),
    [isAuthenticated, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
