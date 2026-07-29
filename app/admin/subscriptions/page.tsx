"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  Search, Filter, Crown, Star, Zap, ChevronDown,
  MoreHorizontal, CheckCircle2, AlertCircle, Clock, XCircle, Pause
} from "lucide-react";

const STATUS_STYLES: Record<string, { label: string; pill: string }> = {
  active:    { label: "Active",    pill: "pill-green"  },
  pending:   { label: "Pending",   pill: "pill-amber"  },
  cancelled: { label: "Cancelled", pill: "pill-red"    },
  expired:   { label: "Expired",   pill: "pill-red"    },
  past_due:  { label: "Past Due",  pill: "pill-amber"  },
  trialing:  { label: "Trial",     pill: "pill-blue"   },
};

const PLAN_ICONS: Record<string, { icon: typeof Zap; color: string }> = {
  Free:       { icon: Zap,   color: "#64748b" },
  Pro:        { icon: Star,  color: "#0284c7" },
  Elite:      { icon: Crown, color: "#f59e0b" },
  Starter:    { icon: Zap,   color: "#64748b" },
  Growth:     { icon: Star,  color: "#0284c7" },
  Enterprise: { icon: Crown, color: "#8b5cf6" },
};

const subscriptions = [
  { id: "SUB-001", user: "Sarah Mitchell",   email: "sarah@email.com",   type: "Creator", plan: "Pro",        billing: "Monthly",  price: "$29.00",  status: "active",    starts: "Jul 1, 2025",  ends: "Aug 1, 2025"  },
  { id: "SUB-002", user: "GlowBrand Team",   email: "hello@glow.com",    type: "Brand",   plan: "Growth",     billing: "Yearly",   price: "$2,990",  status: "active",    starts: "Jun 1, 2025",  ends: "Jun 1, 2026"  },
  { id: "SUB-003", user: "Jake Rodriguez",   email: "jake@email.com",    type: "Creator", plan: "Elite",      billing: "Monthly",  price: "$79.00",  status: "past_due",  starts: "Jul 15, 2025", ends: "Aug 15, 2025" },
  { id: "SUB-004", user: "TechFlow Co.",     email: "team@techflow.com", type: "Brand",   plan: "Enterprise", billing: "Yearly",   price: "$9,990",  status: "active",    starts: "Jan 1, 2025",  ends: "Jan 1, 2026"  },
  { id: "SUB-005", user: "Emma Chen",        email: "emma@email.com",    type: "Creator", plan: "Free",       billing: "Monthly",  price: "$0.00",   status: "active",    starts: "Jul 20, 2025", ends: "—"            },
  { id: "SUB-006", user: "Marcus Lee",       email: "marcus@email.com",  type: "Creator", plan: "Pro",        billing: "Yearly",   price: "$290",    status: "cancelled", starts: "May 1, 2025",  ends: "Aug 1, 2025"  },
  { id: "SUB-007", user: "StyleBrand Inc.",  email: "info@style.com",    type: "Brand",   plan: "Starter",    billing: "Monthly",  price: "$99.00",  status: "trialing",  starts: "Jul 22, 2025", ends: "Aug 5, 2025"  },
  { id: "SUB-008", user: "Mia Patel",        email: "mia@email.com",     type: "Creator", plan: "Elite",      billing: "Monthly",  price: "$79.00",  status: "active",    starts: "Jul 1, 2025",  ends: "Aug 1, 2025"  },
];

const kpis = [
  { label: "Active Subscriptions", value: "8,241",  delta: "+12.3%" },
  { label: "Monthly Recurring Revenue", value: "$184,320", delta: "+18.7%" },
  { label: "Churned (30d)", value: "142",    delta: "-3.2%" },
  { label: "Trial Conversions", value: "68.4%",  delta: "+4.1%" },
];

export default function AdminSubscriptionsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filtered = subscriptions.filter(s => {
    const matchSearch = s.user.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    const matchType   = filterType === "all"   || s.type.toLowerCase() === filterType;
    return matchSearch && matchStatus && matchType;
  });

  return (
    <DashLayout title="Admin – Subscriptions">
      <PageHeader
        title="Manage Subscriptions"
        subtitle="View and manage all creator and brand subscriptions on the platform."
        action={
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ position: "relative" }}>
              <Search style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", width: 13, height: 13, color: "var(--text-subtle)" }} />
              <input
                type="text" placeholder="Search user or ID…" value={search}
                onChange={e => setSearch(e.target.value)}
                className="input" style={{ paddingLeft: 34, paddingTop: 8, paddingBottom: 8, fontSize: 13, width: 240 }}
              />
            </div>
            <select className="input" style={{ fontSize: 13, paddingTop: 8, paddingBottom: 8, minWidth: 130 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="all">All Statuses</option>
              {Object.entries(STATUS_STYLES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
            <select className="input" style={{ fontSize: 13, paddingTop: 8, paddingBottom: 8, minWidth: 110 }} value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="creator">Creator</option>
              <option value="brand">Brand</option>
            </select>
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid-responsive-4col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {kpis.map(k => (
          <div key={k.label} className="stat-card card-lift">
            <div style={{ color: "var(--text)", fontWeight: 900, fontSize: 26, letterSpacing: "-0.03em" }}>{k.value}</div>
            <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 3 }}>{k.label}</div>
            <div style={{ color: k.delta.startsWith("-") ? "#ef4444" : "#10b981", fontSize: 12, fontWeight: 700, marginTop: 6 }}>{k.delta} this month</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card table-responsive" style={{ borderRadius: 18, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Sub ID", "User", "Type", "Plan", "Billing", "Amount", "Status", "Period", ""].map(h => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", background: "var(--surface-subtle)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((sub, i) => {
              const st = STATUS_STYLES[sub.status];
              const pi = PLAN_ICONS[sub.plan] || { icon: Zap, color: "#64748b" };
              const PIcon = pi.icon;
              return (
                <tr key={sub.id} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "var(--surface-subtle)" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ color: "var(--text-subtle)", fontSize: 12, fontFamily: "monospace" }}>{sub.id}</span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{sub.user}</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{sub.email}</div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span className={`pill ${sub.type === "Creator" ? "pill-blue" : "pill-purple"}`} style={{ fontSize: 11 }}>{sub.type}</span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <PIcon style={{ width: 13, height: 13, color: pi.color }} />
                      <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{sub.plan}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--text-muted)", fontSize: 12 }}>{sub.billing}</td>
                  <td style={{ padding: "14px 16px", color: "#0284c7", fontWeight: 800, fontSize: 13 }}>{sub.price}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span className={`pill ${st.pill}`} style={{ fontSize: 11 }}>{st.label}</span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ color: "var(--text-muted)", fontSize: 12 }}>{sub.starts}</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>→ {sub.ends}</div>
                  </td>
                  <td style={{ padding: "14px 16px", position: "relative" }}>
                    <button
                      onClick={() => setActiveMenu(activeMenu === sub.id ? null : sub.id)}
                      style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "5px", cursor: "pointer", color: "var(--text-subtle)", display: "flex", alignItems: "center" }}
                    >
                      <MoreHorizontal style={{ width: 15, height: 15 }} />
                    </button>
                    {activeMenu === sub.id && (
                      <div style={{ position: "absolute", right: 12, top: "100%", zIndex: 50, background: "var(--surface)", border: "1px solid var(--border-strong)", borderRadius: 12, padding: "6px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", minWidth: 170 }}>
                        {[
                          { icon: CheckCircle2, label: "Activate",   color: "#10b981" },
                          { icon: Pause,        label: "Suspend",    color: "#f59e0b" },
                          { icon: XCircle,      label: "Cancel Sub", color: "#ef4444" },
                        ].map(a => (
                          <button key={a.label} onClick={() => setActiveMenu(null)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "9px 12px", borderRadius: 8, background: "none", border: "none", color: a.color, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                            <a.icon style={{ width: 13, height: 13 }} /> {a.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--text-subtle)", fontSize: 13 }}>No subscriptions match your filters.</div>
        )}
      </div>
    </DashLayout>
  );
}
