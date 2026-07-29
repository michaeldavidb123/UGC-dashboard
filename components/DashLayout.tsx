"use client";

import Sidebar, { Topbar } from "@/components/Sidebar";
import { useUI } from "@/context/UIContext";
import { ReactNode } from "react";

interface DashProps {
  title: string;
  children: ReactNode;
}

export default function DashLayout({ title, children }: DashProps) {
  const { sidebarW, mobileOpen, setMobileOpen } = useUI();
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)", position: "relative" }}>
      {/* Mobile Drawer Overlay Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 90,
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
            transition: "opacity 0.25s"
          }}
        />
      )}

      {/* Sidebar (handles desktop fixed vs mobile drawer internally) */}
      <Sidebar />

      {/* Main area pushed right by sidebar on desktop, 0 margin on mobile */}
      <div
        className="dash-main-area"
        style={{
          flex: 1, display: "flex", flexDirection: "column", minWidth: 0,
          marginLeft: sidebarW,
          transition: "margin-left 0.25s cubic-bezier(0.4,0,0.2,1)"
        }}
      >
        <Topbar title={title} />
        <main className="dash-content-container" style={{ flex: 1, padding: "36px 44px" }}>
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
    <div className="page-header-flex" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
      <div>
        <h1 style={{ color: "var(--text)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.03em", marginBottom: 6 }}>{title}</h1>
        {subtitle && <p style={{ color: "var(--text-subtle)", fontSize: 13, lineHeight: 1.5 }}>{subtitle}</p>}
      </div>
      {action && <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>{action}</div>}
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
    <div className="card" style={{ padding: "24px 28px", ...style }}>
      {(title || action) && (
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
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
      background: "var(--surface-subtle)", border: "1px solid var(--border)",
      flexWrap: "wrap", gap: 12, ...style
    }}>
      {children}
    </div>
  );
}
