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
  sidebarW: number;
}

const UIContext = createContext<UIContextType>({
  theme: "dark",
  toggleTheme: () => {},
  collapsed: false,
  toggleSidebar: () => {},
  sidebarW: SIDEBAR_FULL,
});

export function useUI() {
  return useContext(UIContext);
}

export function UIProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [collapsed, setCollapsed] = useState(false);

  // Apply theme to <html> element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");
  const toggleSidebar = () => setCollapsed(c => !c);
  const sidebarW = collapsed ? SIDEBAR_MINI : SIDEBAR_FULL;

  return (
    <UIContext.Provider value={{ theme, toggleTheme, collapsed, toggleSidebar, sidebarW }}>
      {children}
    </UIContext.Provider>
  );
}
