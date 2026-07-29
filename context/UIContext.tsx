"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Theme = "dark" | "light";

export const SIDEBAR_FULL = 260;
export const SIDEBAR_MINI = 68;

interface UIContextType {
  theme: Theme;
  toggleTheme: () => void;
  collapsed: boolean;
  toggleSidebar: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  toggleMobileOpen: () => void;
  sidebarW: number;
}

const UIContext = createContext<UIContextType>({
  theme: "dark",
  toggleTheme: () => {},
  collapsed: false,
  toggleSidebar: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
  toggleMobileOpen: () => {},
  sidebarW: SIDEBAR_FULL,
});

export function useUI() {
  return useContext(UIContext);
}

export function UIProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Apply theme to <html> element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
  }, [theme]);

  // Close mobile sidebar on window resize if larger than 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");
  const toggleSidebar = () => setCollapsed(c => !c);
  const toggleMobileOpen = () => setMobileOpen(m => !m);
  const sidebarW = collapsed ? SIDEBAR_MINI : SIDEBAR_FULL;

  return (
    <UIContext.Provider value={{
      theme, toggleTheme,
      collapsed, toggleSidebar,
      mobileOpen, setMobileOpen, toggleMobileOpen,
      sidebarW
    }}>
      {children}
    </UIContext.Provider>
  );
}
