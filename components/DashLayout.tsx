"use client";

import Sidebar, { Topbar } from "@/components/Sidebar";
import { useUI } from "@/context/UIContext";
import { ReactNode } from "react";

interface DashProps {
  title: string;
  children: ReactNode;
}

export default function DashLayout({ title, children }: DashProps) {
  const { sidebarW } = useUI();
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar />
      {/* Main area pushed right by fixed sidebar width */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, marginLeft: sidebarW, transition: "margin-left 0.25s cubic-bezier(0.4,0,0.2,1)" }}>
        <Topbar title={title} />
        <main style={{ flex: 1, padding: "40px 48px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

/* ── Reusable primitives ─────────────────────────── */

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 40 }}>
      <div>
        <h1 style={{ color: "var(--text)", fontWeight: 800, fontSize: 28, letterSpacing: "-0.03em", marginBottom: 8 }}>{title}</h1>
        {subtitle && <p style={{ color: "var(--text-subtle)", fontSize: 14 }}>{subtitle}</p>}
      </div>
      {action && <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 12 }}>{action}</div>}
    </div>
  );
}

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  style?: React.CSSProperties;
  action?: ReactNode;
}

export function SectionCard({ title, subtitle, children, style, action }: SectionCardProps) {
  return (
    <div className="card" style={{ padding: "28px 32px", ...style }}>
      {(title || action) && (
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            {title && <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 16, marginBottom: subtitle ? 4 : 0 }}>{title}</div>}
            {subtitle && <div style={{ color: "var(--text-subtle)", fontSize: 13 }}>{subtitle}</div>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

interface FieldProps {
  label: string;
  children: ReactNode;
  hint?: string;
}

export function Field({ label, children, hint }: FieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ color: "var(--text-muted)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </label>
      {children}
      {hint && <span style={{ color: "var(--text-subtle)", fontSize: 12 }}>{hint}</span>}
    </div>
  );
}

interface ListRowProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export function ListRow({ children, style }: ListRowProps) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 20px", borderRadius: 14,
      background: "var(--nav-hover-bg)",
      border: "1px solid var(--border-strong)",
      gap: 16, ...style,
    }}>
      {children}
    </div>
  );
}
