"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Megaphone, FileVideo, DollarSign, Settings,
  Sparkles, ChevronDown, LogOut, Bell, Search, User, ShieldCheck, Check,
  FileText, Upload, SlidersHorizontal, HelpCircle, PanelLeftClose, PanelLeft,
  Sun, Moon, CreditCard, BadgeDollarSign, LayoutList, Crown, Wallet, Gift, MessageSquare
} from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { useUI, SIDEBAR_FULL, SIDEBAR_MINI } from "@/context/UIContext";

const adminNav = [
  { href: "/",                    icon: LayoutDashboard, label: "Overview"        },
  { href: "/admin/users",         icon: Users,           label: "Users"           },
  { href: "/admin/campaigns",     icon: Megaphone,       label: "Campaigns"       },
  { href: "/admin/content",       icon: FileVideo,       label: "Content Review"  },
  { href: "/admin/community",     icon: MessageSquare,   label: "Community Posts" },
  { href: "/admin/payouts",       icon: DollarSign,      label: "Payouts"         },
  { href: "/admin/subscriptions", icon: CreditCard,      label: "Subscriptions"   },
  { href: "/admin/deposits",      icon: BadgeDollarSign, label: "Deposits"        },
  { href: "/admin/referrals",     icon: Gift,            label: "Referrals"       },
  { href: "/admin/plans",         icon: LayoutList,      label: "Plans"           },
  { href: "/admin/settings",      icon: Settings,        label: "Settings"        },
];
const creatorNav = [
  { href: "/",             icon: LayoutDashboard, label: "Overview"        },
  { href: "/briefs",       icon: FileText,        label: "Campaign Briefs" },
  { href: "/submissions",  icon: Upload,          label: "Submissions"     },
  { href: "/earnings",     icon: DollarSign,      label: "Earnings"        },
  { href: "/community",    icon: MessageSquare,   label: "Community Hub"   },
  { href: "/deposits",     icon: BadgeDollarSign, label: "My Deposits"     },
  { href: "/subscription", icon: Crown,           label: "Membership"      },
  { href: "/referrals",    icon: Gift,            label: "Refer & Earn"    },
  { href: "/profile",      icon: User,            label: "My Profile"      },
];
const normalNav = [
  { href: "/",             icon: LayoutDashboard, label: "Overview"        },
  { href: "/browse",       icon: Megaphone,       label: "Browse Creators" },
  { href: "/my-campaigns", icon: FileText,        label: "My Campaigns"    },
  { href: "/community",    icon: MessageSquare,   label: "Community Hub"   },
  { href: "/subscription", icon: Crown,           label: "Plans & Pricing" },
  { href: "/deposit",      icon: CreditCard,      label: "Make Deposit"    },
  { href: "/deposits",     icon: BadgeDollarSign, label: "Deposit History" },
  { href: "/referrals",    icon: Gift,            label: "Refer Program"   },
  { href: "/profile",      icon: User,            label: "Brand Profile"   },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { effectiveView } = useRole();
  const { collapsed, toggleSidebar, sidebarW } = useUI();

  const nav =
    effectiveView === "admin" ? adminNav :
    effectiveView === "creator" ? creatorNav :
    normalNav;

  const section =
    effectiveView === "admin" ? "Platform" :
    effectiveView === "creator" ? "Creator" :
    "Workspace";

  return (
    <aside style={{
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: sidebarW,
      background: "var(--sidebar-bg)",
      borderRight: "1px solid var(--border-strong)",
      display: "flex",
      flexDirection: "column",
      zIndex: 50,
      overflowY: "auto",
      overflowX: "hidden",
      transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
      flexShrink: 0,
    }}>

      {/* ── Logo + Collapse Toggle ── */}
      <div style={{
        height: 68,
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--border-strong)",
        flexShrink: 0,
        overflow: "hidden",
      }}>
        {/* Logo mark always visible */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", minWidth: 0, overflow: "hidden" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(2,132,199,0.35)" }}>
            <Sparkles style={{ width: 17, height: 17, color: "#fff" }} />
          </div>
          <div style={{
            overflow: "hidden",
            opacity: collapsed ? 0 : 1,
            width: collapsed ? 0 : "auto",
            transition: "opacity 0.2s ease, width 0.25s ease",
            whiteSpace: "nowrap",
          }}>
            <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>UGC Studio</div>
            <div style={{ color: "var(--text-subtle)", fontSize: 10, fontWeight: 500, marginTop: 1 }}>
              {effectiveView === "admin" ? "Admin Workspace" : effectiveView === "creator" ? "Creator Portal" : "Brand Portal"}
            </div>
          </div>
        </Link>

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{
            width: 30, height: 30, borderRadius: 8, flexShrink: 0,
            background: "none", border: "1px solid var(--border-strong)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--text-subtle)", cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--nav-hover-bg)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "none"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-subtle)"; }}
        >
          {collapsed
            ? <PanelLeft style={{ width: 15, height: 15 }} />
            : <PanelLeftClose style={{ width: 15, height: 15 }} />
          }
        </button>
      </div>

      {/* ── Nav Links ── */}
      <nav style={{ flex: 1, padding: "20px 10px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto", overflowX: "hidden" }}>
        {!collapsed && (
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 8px", marginBottom: 6 }}>
            {section}
          </div>
        )}
        {nav.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <NavItem
              key={href}
              href={href}
              icon={<Icon style={{ width: 17, height: 17, flexShrink: 0, color: active ? "var(--accent-text)" : "var(--text-muted)" }} />}
              label={label}
              active={active}
              collapsed={collapsed}
            />
          );
        })}
      </nav>

      {/* ── Footer Help Card ── */}
      {!collapsed && (
        <div style={{ padding: "12px 10px 20px", flexShrink: 0 }}>
          <div style={{ padding: "14px 16px", borderRadius: 14, background: "var(--nav-hover-bg)", border: "1px solid var(--border-strong)", display: "flex", alignItems: "center", gap: 12 }}>
            <HelpCircle style={{ width: 16, height: 16, color: "var(--accent-text)", flexShrink: 0 }} />
            <div>
              <div style={{ color: "var(--text)", fontSize: 12, fontWeight: 600 }}>Need help?</div>
              <a href="mailto:support@ugcstudio.com" style={{ color: "var(--accent-text)", fontSize: 11, textDecoration: "none" }}>support@ugcstudio.com</a>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

/* ── Tooltip Nav Item ── */
function NavItem({ href, icon, label, active, collapsed }: {
  href: string; icon: React.ReactNode; label: string; active: boolean; collapsed: boolean;
}) {
  return (
    <div style={{ position: "relative" }} className="sidebar-nav-item">
      <Link
        href={href}
        className={`nav-link${active ? " active" : ""}`}
        style={{ padding: "10px 12px", justifyContent: collapsed ? "center" : "flex-start" }}
        title={collapsed ? label : undefined}
      >
        {icon}
        {!collapsed && <span style={{ overflow: "hidden", whiteSpace: "nowrap" }}>{label}</span>}
      </Link>
    </div>
  );
}

/* ════════════════════════════════════════════
   TOPBAR
════════════════════════════════════════════ */
export function Topbar({ title }: { title: string }) {
  const { role, activeView, setActiveView } = useRole();
  const { theme, toggleTheme } = useUI();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const name = activeView === "admin" ? "Alex Admin" : activeView === "creator" ? "Sarah Mitchell" : "GlowBrand Team";
  const email = activeView === "admin" ? "alex@ugcstudio.com" : activeView === "creator" ? "sarah@mitchell.com" : "brand@glowbrand.com";
  const badge = activeView === "admin" ? "Administrator" : activeView === "creator" ? "Creator" : "Brand Buyer";

  return (
    <header style={{
      height: 68,
      borderBottom: "1px solid var(--border-strong)",
      background: "var(--sidebar-bg)",
      position: "sticky",
      top: 0,
      zIndex: 40,
      padding: "0 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backdropFilter: "blur(12px)",
      transition: "background 0.25s ease",
    }}>
      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h2 style={{ color: "var(--text)", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>{title}</h2>
        <span className={`pill ${activeView === "admin" ? "pill-blue" : activeView === "creator" ? "pill-amber" : "pill-purple"}`}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "currentColor", display: "inline-block" }} />
          {activeView === "admin" ? "Admin Mode" : activeView === "creator" ? "Creator Mode" : "Brand Mode"}
        </span>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Search */}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <Search style={{ position: "absolute", left: 12, width: 14, height: 14, color: "var(--text-subtle)", pointerEvents: "none" }} />
          <input placeholder="Search..." className="input" style={{ paddingLeft: 36, width: 200, paddingTop: 8, paddingBottom: 8, fontSize: 13 }} />
        </div>

        {/* Theme toggle */}
        <button className="btn-icon btn" onClick={toggleTheme} title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
          {theme === "dark"
            ? <Sun style={{ width: 15, height: 15 }} />
            : <Moon style={{ width: 15, height: 15 }} />
          }
        </button>

        {/* Bell */}
        <button className="btn-icon btn" title="Notifications" style={{ position: "relative" }}>
          <Bell style={{ width: 15, height: 15 }} />
          <span style={{ position: "absolute", top: 8, right: 8, width: 6, height: 6, borderRadius: 999, background: "#0284c7" }} />
        </button>

        {/* Profile Dropdown */}
        <div ref={ref} style={{ position: "relative" }}>
          <button
            onClick={() => setOpen(!open)}
            style={{
              display: "flex", alignItems: "center", gap: 9,
              padding: "6px 10px 6px 6px",
              borderRadius: 12,
              background: open ? "var(--nav-hover-bg)" : "transparent",
              border: "1px solid transparent",
              cursor: "pointer",
              transition: "all 0.15s",
              fontFamily: "var(--font-poppins), sans-serif",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--nav-hover-bg)")}
            onMouseLeave={e => { if (!open) e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>
              {name[0]}
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ color: "var(--text)", fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>{name}</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{badge}</div>
            </div>
            <ChevronDown style={{ width: 13, height: 13, color: "var(--text-subtle)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>

          {open && (
            <div style={{
              position: "absolute", right: 0, top: "calc(100% + 8px)",
              width: 300, borderRadius: 18,
              background: "var(--surface)",
              border: "1px solid var(--border-strong)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              padding: 8, zIndex: 60,
            }}>
              {/* User Header */}
              <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", marginBottom: 6, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 17, flexShrink: 0 }}>
                  {name[0]}
                </div>
                <div>
                  <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{name}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 12 }}>{email}</div>
                  <span className="pill pill-blue" style={{ marginTop: 6, display: "inline-flex" }}>{badge}</span>
                </div>
              </div>

              {/* View Switcher */}
              <div style={{ padding: "10px 12px", background: "var(--nav-hover-bg)", borderRadius: 12, margin: "0 4px 6px", border: "1px solid var(--border-strong)" }}>
                <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 600, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <ShieldCheck style={{ width: 12, height: 12, color: "var(--accent-text)" }} />
                  Switch Dashboard Mode
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, background: "var(--input-bg)", padding: 4, borderRadius: 10 }}>
                  {([
                    { id: "admin", label: "Admin" },
                    { id: "creator", label: "Creator" },
                    { id: "normal", label: "Brand" },
                  ] as const).map(m => (
                    <button key={m.id} onClick={() => { setActiveView(m.id); setOpen(false); }}
                      style={{
                        padding: "8px 2px", borderRadius: 8, fontSize: 11, fontWeight: 600,
                        cursor: "pointer", border: "none", transition: "all 0.15s",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 3,
                        background: activeView === m.id ? "#0284c7" : "transparent",
                        color: activeView === m.id ? "#fff" : "var(--text-subtle)",
                        fontFamily: "var(--font-poppins), sans-serif",
                      }}
                    >
                      {activeView === m.id && <Check style={{ width: 10, height: 10 }} />}
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu Links */}
              {[
                { href: "/profile", icon: User, label: "My Profile" },
                { href: "/admin/settings", icon: SlidersHorizontal, label: "Settings" },
              ].map(({ href, icon: Icon, label }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 12, color: "var(--text-muted)", fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "all 0.15s" }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = "var(--nav-hover-bg)"; el.style.color = "var(--text)"; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "var(--text-muted)"; }}
                >
                  <Icon style={{ width: 14, height: 14 }} /> {label}
                </Link>
              ))}

              {/* Theme Toggle in dropdown */}
              <button onClick={() => { toggleTheme(); setOpen(false); }}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 12, color: "var(--text-muted)", fontSize: 13, fontWeight: 500, background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-poppins), sans-serif", transition: "all 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--nav-hover-bg)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; }}
              >
                {theme === "dark" ? <Sun style={{ width: 14, height: 14 }} /> : <Moon style={{ width: 14, height: 14 }} />}
                Switch to {theme === "dark" ? "Light" : "Dark"} Mode
              </button>

              <div style={{ borderTop: "1px solid var(--border)", marginTop: 4, paddingTop: 4 }}>
                <button onClick={() => setOpen(false)}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 12, color: "#f87171", fontSize: 13, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-poppins), sans-serif", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(244,63,94,0.08)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <LogOut style={{ width: 14, height: 14 }} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
