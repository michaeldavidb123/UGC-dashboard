"use client";

import { Users, Megaphone, FileVideo, DollarSign, TrendingUp, ChevronRight } from "lucide-react";

const stats = [
  { label: "Total Platform Users", value: "12,481", delta: "+18.4%", icon: Users },
  { label: "Active Campaigns", value: "342", delta: "+7.2%", icon: Megaphone },
  { label: "Content Submitted", value: "8,920", delta: "+24.1%", icon: FileVideo },
  { label: "Total Paid Out", value: "$2.14M", delta: "+31.8%", icon: DollarSign },
];

const activity = [
  { user: "Sarah Mitchell", email: "sarah@email.com", action: "Submitted video for Nike Summer Campaign", time: "2m ago", type: "Submission", pill: "pill-blue" },
  { user: "TechBrand Co.", email: "hello@techbrand.com", action: "Created campaign 'Back to School Review'", time: "12m ago", type: "Campaign", pill: "pill-purple" },
  { user: "Jake Rodriguez", email: "jake@email.com", action: "Requested payout withdrawal of $450.00", time: "34m ago", type: "Payout", pill: "pill-amber" },
  { user: "Emma Watson", email: "emma@email.com", action: "Completed creator onboarding verification", time: "1h ago", type: "New User", pill: "pill-green" },
  { user: "GlowBrand Team", email: "team@glowbrand.com", action: "Approved 14 deliverables on Skincare Campaign", time: "2h ago", type: "Approval", pill: "pill-green" },
];

const queue = [
  { label: "Content Submissions", count: 142, href: "/admin/content", color: "#fbbf24" },
  { label: "Payout Requests",     count: 23,  href: "/admin/payouts", color: "#818cf8" },
  { label: "Creator Onboarding",  count: 8,   href: "/admin/users",   color: "#4ade80" },
];

export default function AdminHome() {
  return (
    <div>
      {/* ── Page Header ─────────────────────────────────── */}
      <div className="page-header-flex" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 40 }}>
        <div>
          <h1 style={{ color: "var(--text)", fontWeight: 800, fontSize: 28, letterSpacing: "-0.03em", marginBottom: 8 }}>
            Admin Overview
          </h1>
          <p style={{ color: "var(--text-subtle)", fontSize: 14, fontWeight: 400 }}>
            Platform analytics, active campaigns, and moderation activities.
          </p>
        </div>
        <span className="pill pill-green" style={{ marginTop: 6, flexShrink: 0 }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: "#16a34a", display: "inline-block" }} />
          System Healthy
        </span>
      </div>

      {/* ── KPI Stat Cards ───────────────────────────────── */}
      <div className="grid-responsive-4col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 32 }}>
        {stats.map((s) => (
          <div key={s.label} className="stat-card card-lift">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--icon-bg)", border: "1px solid var(--icon-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--icon-color)" }}>
                <s.icon style={{ width: 18, height: 18 }} />
              </div>
              <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#16a34a", fontSize: 12, fontWeight: 600, background: "rgba(34,197,94,0.1)", padding: "4px 10px", borderRadius: 999, border: "1px solid rgba(34,197,94,0.2)" }}>
                <TrendingUp style={{ width: 11, height: 11 }} />
                {s.delta}
              </span>
            </div>
            <div>
              <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 32, letterSpacing: "-0.03em", lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 13, fontWeight: 500, marginTop: 4 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom Row ───────────────────────────────────── */}
      <div className="grid-responsive-2col" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>

        {/* Activity Feed */}
        <div className="card" style={{ padding: "28px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 16 }}>Platform Activity Stream</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 13, marginTop: 4 }}>Real-time actions across creators and brands</div>
            </div>
            <span className="pill pill-blue">Live Feed</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {activity.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 16px", borderRadius: 14,
                background: "var(--surface-subtle)",
                border: "1px solid var(--border)",
                gap: 12, flexWrap: "wrap",
                transition: "all 0.15s"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: "var(--icon-bg)", border: "1px solid var(--icon-border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--icon-color)", fontWeight: 700, fontSize: 14
                  }}>
                    {item.user[0]}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.user}</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.action}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                  <span className={`pill ${item.pill}`}>{item.type}</span>
                  <span style={{ color: "var(--text-subtle)", fontSize: 11 }}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Moderation Queue */}
        <div className="card" style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 16 }}>Moderation Queue</div>
            <div style={{ color: "var(--text-subtle)", fontSize: 13, marginTop: 4 }}>Pending items needing your review</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {queue.map((q) => (
              <a key={q.label} href={q.href} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "16px 18px", borderRadius: 14,
                background: "var(--surface-subtle)",
                border: "1px solid var(--border)",
                textDecoration: "none", cursor: "pointer", transition: "all 0.15s"
              }}>
                <span style={{ color: "var(--text)", fontWeight: 500, fontSize: 14 }}>{q.label}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: q.color, fontWeight: 800, fontSize: 18 }}>{q.count}</span>
                  <ChevronRight style={{ width: 15, height: 15, color: "var(--text-subtle)" }} />
                </div>
              </a>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, marginTop: "auto" }}>
            <a href="/admin/settings" className="btn btn-ghost" style={{ width: "100%", fontSize: 13 }}>
              Platform Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
