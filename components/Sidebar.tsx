"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Megaphone, FileVideo, DollarSign, Settings,
  Sparkles, ChevronDown, LogOut, Bell, Search, User, ShieldCheck, Check,
  FileText, Upload, SlidersHorizontal, HelpCircle, PanelLeftClose, PanelLeft,
  Sun, Moon, CreditCard, BadgeDollarSign, LayoutList, Crown, Wallet, Gift, MessageSquare, Menu, CheckCircle2, Clock
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
  { href: "/briefs",       icon: Megaphone,       label: "Browse Briefs"   },
  { href: "/my-campaigns", icon: FileText,        label: "My Briefs"       },
  { href: "/submissions",  icon: Upload,          label: "Uploads"         },
  { href: "/community",    icon: MessageSquare,   label: "Community Hub"   },
  { href: "/subscription", icon: Crown,           label: "My Subscription" },
  { href: "/earnings",     icon: Wallet,          label: "Earnings & Fees" },
  { href: "/deposits",     icon: BadgeDollarSign, label: "Deposit History" },
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
  const { collapsed, toggleSidebar, sidebarW, mobileOpen, setMobileOpen, isMobile } = useUI();

  const nav =
    effectiveView === "admin" ? adminNav :
    effectiveView === "creator" ? creatorNav :
    normalNav;

  const section =
    effectiveView === "admin" ? "Platform" :
    effectiveView === "creator" ? "Creator" :
    "Workspace";

  return (
    <aside className={`app-sidebar ${mobileOpen ? "mobile-open" : ""}`} style={{
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: "var(--sidebar-w, 260px)",
      background: "var(--sidebar-bg)",
      borderRight: "1px solid var(--border-strong)",
      display: "flex",
      flexDirection: "column",
      zIndex: 1000,
      overflowY: "auto",
      overflowX: "hidden",
      transition: "width 0.25s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1)",
      flexShrink: 0,
      "--sidebar-w": `${sidebarW}px`,
    } as React.CSSProperties}>

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
              setMobileOpen={setMobileOpen}
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
function NavItem({ href, icon, label, active, collapsed, setMobileOpen }: {
  href: string; icon: React.ReactNode; label: string; active: boolean; collapsed: boolean; setMobileOpen?: (open: boolean) => void;
}) {
  return (
    <div style={{ position: "relative" }} className="sidebar-nav-item">
      <Link
        href={href}
        className={`nav-link${active ? " active" : ""}`}
        onClick={() => setMobileOpen?.(false)}
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
  const { theme, toggleTheme, toggleMobileOpen, isMobile } = useUI();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const containerRef = useRef<HTMLDivElement>(null);

  /* Initial Mock Notifications */
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Submission Approved", desc: "Nike Summer Skincare Reel approved (+$150.00 earned)", time: "5m ago", unread: true, color: "#10b981" },
    { id: 2, title: "New Campaign Brief", desc: "TechFlow Labs posted a new $400 Tech Review brief", time: "1h ago", unread: true, color: "#0284c7" },
    { id: 3, title: "Payout Dispatched", desc: "Withdrawal request of $450.00 sent to your bank account", time: "3h ago", unread: true, color: "#f59e0b" },
    { id: 4, title: "Community Like", desc: "Sarah Mitchell liked your post '5 Lighting Hacks'", time: "5h ago", unread: false, color: "#8b5cf6" },
  ]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    setUnreadCount(0);
  };

  const name = activeView === "admin" ? "Alex Admin" : activeView === "creator" ? "Sarah Mitchell" : "GlowBrand Team";
  const email = activeView === "admin" ? "alex@ugcstudio.com" : activeView === "creator" ? "sarah@mitchell.com" : "brand@glowbrand.com";
  const badge = activeView === "admin" ? "Administrator" : activeView === "creator" ? "Creator" : "Brand Buyer";

  return (
    <header className="topbar-header" style={{
      height: 64,
      borderBottom: "1px solid var(--border-strong)",
      background: "var(--sidebar-bg)",
      position: "sticky",
      top: 0,
      zIndex: 40,
      padding: isMobile ? "0 14px" : "0 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backdropFilter: "blur(12px)",
      transition: "background 0.25s ease",
    }}>
      {/* Left side: Hamburger menu button + Logo mark (No titles crowding header) */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {isMobile ? (
          <button
            onClick={toggleMobileOpen}
            className="btn-icon btn mobile-menu-btn"
            title="Open Navigation"
            style={{ display: "inline-flex", flexShrink: 0 }}
          >
            <Menu style={{ width: 18, height: 18 }} />
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Sparkles style={{ width: 14, height: 14, color: "#fff" }} />
            </div>
            <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em" }}>UGC Studio</span>
          </div>
        )}
      </div>

      {/* Right side controls (Search, Theme, Notifications Dropdown, Profile Dropdown) */}
      <div ref={containerRef} style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
        
        {/* Search (hidden on mobile to keep topbar ultra clean) */}
        {!isMobile && (
          <div className="topbar-search" style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Search style={{ position: "absolute", left: 12, width: 14, height: 14, color: "var(--text-subtle)", pointerEvents: "none" }} />
            <input placeholder="Search..." className="input" style={{ paddingLeft: 36, width: 180, paddingTop: 7, paddingBottom: 7, fontSize: 13 }} />
          </div>
        )}

        {/* Theme toggle */}
        <button className="btn-icon btn" onClick={toggleTheme} title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
          {theme === "dark"
            ? <Sun style={{ width: 15, height: 15 }} />
            : <Moon style={{ width: 15, height: 15 }} />
          }
        </button>

        {/* 🔔 Notification Icon + Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            className="btn-icon btn"
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            title="Notifications"
            style={{ position: "relative" }}
          >
            <Bell style={{ width: 15, height: 15 }} />
            {unreadCount > 0 && (
              <span style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, borderRadius: 999, background: "#0284c7", boxShadow: "0 0 0 2px var(--sidebar-bg)" }} />
            )}
          </button>

          {notifOpen && (
            <div style={{
              position: "absolute",
              right: isMobile ? -50 : 0,
              top: "calc(100% + 10px)",
              width: isMobile ? "calc(100vw - 28px)" : 340,
              maxWidth: 360,
              borderRadius: 18,
              background: "var(--surface)",
              border: "1px solid var(--border-strong)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              padding: "16px", zIndex: 70,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Bell style={{ width: 15, height: 15, color: "#0284c7" }} />
                  <span style={{ color: "var(--text)", fontWeight: 800, fontSize: 14 }}>Notifications</span>
                  {unreadCount > 0 && (
                    <span style={{ background: "rgba(2,132,199,0.15)", color: "#0284c7", fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 999 }}>{unreadCount} New</span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} style={{ background: "none", border: "none", color: "var(--accent-text)", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                    Mark all read
                  </button>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 280, overflowY: "auto" }}>
                {notifications.map(n => (
                  <div key={n.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 12, background: n.unread ? "var(--surface-subtle)" : "transparent", border: `1px solid ${n.unread ? "var(--border-strong)" : "transparent"}` }}>
                    <div style={{ width: 8, height: 8, borderRadius: 999, background: n.unread ? n.color : "transparent", marginTop: 5, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 12 }}>{n.title}</div>
                      <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2, lineHeight: 1.4 }}>{n.desc}</div>
                      <div style={{ color: "var(--text-subtle)", fontSize: 10, marginTop: 4, display: "flex", alignItems: "center", gap: 3 }}>
                        <Clock style={{ width: 10, height: 10 }} /> {n.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 👤 Profile Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "4px 8px 4px 4px",
              borderRadius: 12,
              background: profileOpen ? "var(--nav-hover-bg)" : "transparent",
              border: "1px solid transparent",
              cursor: "pointer",
              transition: "all 0.15s",
              fontFamily: "var(--font-poppins), sans-serif",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--nav-hover-bg)")}
            onMouseLeave={e => { if (!profileOpen) e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
              {name[0]}
            </div>
            {!isMobile && (
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "var(--text)", fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}>{name}</div>
                <div style={{ color: "var(--text-subtle)", fontSize: 10 }}>{badge}</div>
              </div>
            )}
            <ChevronDown style={{ width: 12, height: 12, color: "var(--text-subtle)", transform: profileOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>

          {profileOpen && (
            <div style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 10px)",
              width: isMobile ? "calc(100vw - 28px)" : 290,
              maxWidth: 320,
              borderRadius: 18,
              background: "var(--surface)",
              border: "1px solid var(--border-strong)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              padding: 8, zIndex: 70,
            }}>
              {/* User Header */}
              <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)", marginBottom: 6, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
                  {name[0]}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{email}</div>
                  <span className="pill pill-blue" style={{ marginTop: 4, display: "inline-flex", fontSize: 10 }}>{badge}</span>
                </div>
              </div>

              {/* View Switcher */}
              <div style={{ padding: "8px 10px", background: "var(--nav-hover-bg)", borderRadius: 12, margin: "0 2px 6px", border: "1px solid var(--border-strong)" }}>
                <div style={{ color: "var(--text-subtle)", fontSize: 10, fontWeight: 600, marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>
                  <ShieldCheck style={{ width: 11, height: 11, color: "var(--accent-text)" }} />
                  Switch Dashboard Mode
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, background: "var(--input-bg)", padding: 3, borderRadius: 8 }}>
                  {([
                    { id: "admin", label: "Admin" },
                    { id: "creator", label: "Creator" },
                    { id: "normal", label: "Brand" },
                  ] as const).map(m => (
                    <button key={m.id} onClick={() => { setActiveView(m.id); setProfileOpen(false); }}
                      style={{
                        padding: "7px 2px", borderRadius: 6, fontSize: 10, fontWeight: 600,
                        cursor: "pointer", border: "none", transition: "all 0.15s",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 3,
                        background: activeView === m.id ? "#0284c7" : "transparent",
                        color: activeView === m.id ? "#fff" : "var(--text-subtle)",
                        fontFamily: "var(--font-poppins), sans-serif",
                      }}
                    >
                      {activeView === m.id && <Check style={{ width: 9, height: 9 }} />}
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
                <Link key={href} href={href} onClick={() => setProfileOpen(false)}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderRadius: 10, color: "var(--text-muted)", fontSize: 12, fontWeight: 500, textDecoration: "none", transition: "all 0.15s" }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = "var(--nav-hover-bg)"; el.style.color = "var(--text)"; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "var(--text-muted)"; }}
                >
                  <Icon style={{ width: 14, height: 14 }} /> {label}
                </Link>
              ))}

              {/* Theme Toggle in dropdown */}
              <button onClick={() => { toggleTheme(); setProfileOpen(false); }}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderRadius: 10, color: "var(--text-muted)", fontSize: 12, fontWeight: 500, background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-poppins), sans-serif", transition: "all 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--nav-hover-bg)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; }}
              >
                {theme === "dark" ? <Sun style={{ width: 14, height: 14 }} /> : <Moon style={{ width: 14, height: 14 }} />}
                Switch to {theme === "dark" ? "Light" : "Dark"} Mode
              </button>

              <div style={{ borderTop: "1px solid var(--border)", marginTop: 4, paddingTop: 4 }}>
                <button onClick={() => setProfileOpen(false)}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderRadius: 10, color: "#f87171", fontSize: 12, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-poppins), sans-serif", transition: "background 0.15s" }}
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
