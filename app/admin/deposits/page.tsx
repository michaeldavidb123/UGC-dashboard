"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  Search, CreditCard, Building2, Wallet, MoreHorizontal,
  CheckCircle2, XCircle, RotateCcw, TrendingUp, DollarSign, AlertCircle
} from "lucide-react";

const STATUS_STYLES: Record<string, { label: string; pill: string }> = {
  completed:  { label: "Completed",  pill: "pill-green" },
  pending:    { label: "Pending",    pill: "pill-amber" },
  processing: { label: "Processing", pill: "pill-blue"  },
  failed:     { label: "Failed",     pill: "pill-red"   },
  refunded:   { label: "Refunded",   pill: "pill-purple"},
};

const METHOD_ICONS: Record<string, typeof CreditCard> = {
  card: CreditCard, bank: Building2, paypal: Wallet,
};

const deposits = [
  { id: "DEP-0012", user: "Sarah Mitchell",  email: "sarah@email.com",   amount: "$29.00",  method: "card",   card: "Visa •••• 4242",  plan: "Creator Pro",    status: "completed",  date: "Jul 29, 2025" },
  { id: "DEP-0011", user: "GlowBrand Team",  email: "hello@glow.com",    amount: "$2,990",  method: "bank",   card: "Bank Transfer",   plan: "Brand Growth",   status: "completed",  date: "Jul 28, 2025" },
  { id: "DEP-0010", user: "Jake Rodriguez",  email: "jake@email.com",    amount: "$79.00",  method: "card",   card: "MC •••• 1234",    plan: "Creator Elite",  status: "failed",     date: "Jul 27, 2025" },
  { id: "DEP-0009", user: "TechFlow Co.",    email: "team@techflow.com", amount: "$9,990",  method: "bank",   card: "Bank Transfer",   plan: "Brand Enterprise", status: "completed", date: "Jan 1, 2025" },
  { id: "DEP-0008", user: "Mia Patel",       email: "mia@email.com",     amount: "$79.00",  method: "paypal", card: "mia@paypal.com",  plan: "Creator Elite",  status: "completed",  date: "Jul 25, 2025" },
  { id: "DEP-0007", user: "StyleBrand Inc.", email: "info@style.com",    amount: "$99.00",  method: "card",   card: "Visa •••• 8891",  plan: "Brand Starter",  status: "pending",    date: "Jul 24, 2025" },
  { id: "DEP-0006", user: "Marcus Lee",      email: "marcus@email.com",  amount: "$290",    method: "card",   card: "Amex •••• 0099",  plan: "Creator Pro",    status: "refunded",   date: "Jul 20, 2025" },
  { id: "DEP-0005", user: "Emma Chen",       email: "emma@email.com",    amount: "$0.00",   method: "card",   card: "—",               plan: "Creator Free",   status: "completed",  date: "Jul 18, 2025" },
];

const kpis = [
  { label: "Total Revenue (All Time)", value: "$2.41M",  icon: DollarSign,  color: "#10b981" },
  { label: "This Month",               value: "$184,320",icon: TrendingUp,   color: "#0284c7" },
  { label: "Pending Deposits",         value: "$8,240",  icon: AlertCircle, color: "#f59e0b" },
  { label: "Failed / Refunded",        value: "$3,120",  icon: XCircle,     color: "#ef4444" },
];

export default function AdminDepositsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMethod, setFilterMethod] = useState("all");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filtered = deposits.filter(d => {
    const q = search.toLowerCase();
    const matchSearch = d.user.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || d.email.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || d.status === filterStatus;
    const matchMethod = filterMethod === "all" || d.method === filterMethod;
    return matchSearch && matchStatus && matchMethod;
  });

  return (
    <DashLayout title="Admin – Deposits">
      <PageHeader
        title="Manage Deposits"
        subtitle="Track all platform payments, refunds, and deposit statuses."
        action={
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ position: "relative" }}>
              <Search style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", width: 13, height: 13, color: "var(--text-subtle)" }} />
              <input type="text" placeholder="Search user or ID…" value={search} onChange={e => setSearch(e.target.value)} className="input" style={{ paddingLeft: 34, paddingTop: 8, paddingBottom: 8, fontSize: 13, width: 240 }} />
            </div>
            <select className="input" style={{ fontSize: 13, paddingTop: 8, paddingBottom: 8, minWidth: 130 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="all">All Statuses</option>
              {Object.entries(STATUS_STYLES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
            <select className="input" style={{ fontSize: 13, paddingTop: 8, paddingBottom: 8, minWidth: 120 }} value={filterMethod} onChange={e => setFilterMethod(e.target.value)}>
              <option value="all">All Methods</option>
              <option value="card">Card</option>
              <option value="bank">Bank Transfer</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
        }
      />

      {/* KPI Strip */}
      <div className="grid-responsive-4col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {kpis.map(k => (
          <div key={k.label} className="stat-card card-lift" style={{ borderLeft: `3px solid ${k.color}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${k.color}14`, border: `1px solid ${k.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <k.icon style={{ width: 16, height: 16, color: k.color }} />
              </div>
            </div>
            <div style={{ color: "var(--text)", fontWeight: 900, fontSize: 24, letterSpacing: "-0.03em" }}>{k.value}</div>
            <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 3 }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card table-responsive" style={{ borderRadius: 18, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Deposit ID", "User", "Plan", "Amount", "Method", "Status", "Date", ""].map(h => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", background: "var(--surface-subtle)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((dep, i) => {
              const st = STATUS_STYLES[dep.status];
              const MIcon = METHOD_ICONS[dep.method] || CreditCard;
              return (
                <tr key={dep.id} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "var(--surface-subtle)" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ color: "var(--text-subtle)", fontSize: 12, fontFamily: "monospace" }}>{dep.id}</span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{dep.user}</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{dep.email}</div>
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--text-muted)", fontSize: 12 }}>{dep.plan}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ color: "#0284c7", fontWeight: 900, fontSize: 14 }}>{dep.amount}</span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <MIcon style={{ width: 13, height: 13, color: "var(--text-subtle)" }} />
                      <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{dep.card}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span className={`pill ${st.pill}`} style={{ fontSize: 11 }}>{st.label}</span>
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--text-subtle)", fontSize: 12 }}>{dep.date}</td>
                  <td style={{ padding: "14px 16px", position: "relative" }}>
                    <button onClick={() => setActiveMenu(activeMenu === dep.id ? null : dep.id)} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "5px", cursor: "pointer", color: "var(--text-subtle)", display: "flex", alignItems: "center" }}>
                      <MoreHorizontal style={{ width: 15, height: 15 }} />
                    </button>
                    {activeMenu === dep.id && (
                      <div style={{ position: "absolute", right: 12, top: "100%", zIndex: 50, background: "var(--surface)", border: "1px solid var(--border-strong)", borderRadius: 12, padding: "6px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", minWidth: 160 }}>
                        {[
                          { icon: CheckCircle2, label: "Mark Completed", color: "#10b981" },
                          { icon: RotateCcw,    label: "Refund",         color: "#f59e0b" },
                          { icon: XCircle,      label: "Mark Failed",    color: "#ef4444" },
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
          <div style={{ padding: "40px", textAlign: "center", color: "var(--text-subtle)", fontSize: 13 }}>No deposits match your filters.</div>
        )}
      </div>
    </DashLayout>
  );
}
