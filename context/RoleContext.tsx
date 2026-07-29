"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ViewMode = "admin" | "creator" | "normal";

interface RoleContextType {
  role: "admin" | "user";
  userType: "creator" | "normal";
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
  effectiveView: ViewMode;
}

const RoleContext = createContext<RoleContextType>({
  role: "admin",
  userType: "creator",
  activeView: "creator",
  setActiveView: () => {},
  effectiveView: "creator",
});

export function useRole() {
  return useContext(RoleContext);
}

interface RoleProviderProps {
  children: ReactNode;
  role?: "admin" | "user";
  userType?: "creator" | "normal";
}

export function RoleProvider({ children, role = "admin", userType = "creator" }: RoleProviderProps) {
  const [activeView, setActiveView] = useState<ViewMode>(role === "admin" ? "admin" : userType);

  return (
    <RoleContext.Provider value={{ role, userType, activeView, setActiveView, effectiveView: activeView }}>
      {children}
    </RoleContext.Provider>
  );
}
