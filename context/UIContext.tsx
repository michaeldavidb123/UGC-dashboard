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
  isMobile: boolean;
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
  isMobile: false,
  sidebarW: SIDEBAR_FULL,
});

export function useUI() {
  return useContext(UIContext);
}

export function UIProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Apply theme to <html> element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
  }, [theme]);

  // Track responsive screen width (< 1024px)
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileOpen(false);
      }
    };
    handleResize();
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
      isMobile,
      sidebarW
    }}>
      {children}
    </UIContext.Provider>
  );
}
