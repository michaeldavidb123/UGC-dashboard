"use client";

import DashLayout, { PageHeader, SectionCard } from "@/components/DashLayout";
import { DollarSign, Clock, CheckCircle2, Download } from "lucide-react";

const payouts = [
  { id: 1, creator: "Sarah Mitchell", email: "sarah@email.com", amount: "$450.00", method: "PayPal", requested: "Jul 25, 2025", status: "Pending", pill: "pill-amber" },
  { id: 2, creator: "Marcus Lee", email: "marcus@email.com", amount: "$1,200.00", method: "Bank Transfer", requested: "Jul 24, 2025", status: "Processing", pill: "pill-blue" },
  { id: 3, creator: "Emma Chen", email: "emma@email.com", amount: "$320.00", method: "PayPal", requested: "Jul 22, 2025", status: "Completed", pill: "pill-green" },
  { id: 4, creator: "Jake Rodriguez", email: "jake@email.com", amount: "$780.00", method: "Stripe", requested: "Jul 20, 2025", status: "Completed", pill: "pill-green" },
];

export default function AdminPayoutsPage() {
  return (
    <DashLayout title="Payouts">
      <PageHeader
        title="Payout Management"
        subtitle="Review and process creator payout withdrawal requests."
        action={
          <button className="btn btn-ghost btn-sm"><Download style={{ width: 14, height: 14 }} /> Export CSV</button>
        }
      />

      {/* Summary Stats */}
      <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Pending Requests", value: "$450.00", count: "1 request", icon: Clock, color: "#d97706" },
          { label: "Processing", value: "$1,200.00", count: "1 transfer", icon: DollarSign, color: "var(--accent-text)" },
          { label: "Paid Out (This Month)", value: "$1,100.00", count: "2 completed", icon: CheckCircle2, color: "#16a34a" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "24px 28px", display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--icon-bg)", border: "1px solid var(--icon-border)", display: "flex", alignItems: "center", justifyContent: "center", color: s.color, flexShrink: 0 }}>
              <s.icon style={{ width: 20, height: 20 }} />
            </div>
            <div>
              <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>{s.value}</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 3 }}>{s.label} · {s.count}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionCard title="Payout Requests" subtitle="Approve or reject creator withdrawal requests below.">
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {payouts.map(p => (
            <div key={p.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 20px", borderRadius: 14,
              background: "var(--surface-subtle)",
              border: "1px solid var(--border)", gap: 16
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--icon-bg)", border: "1px solid var(--icon-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--icon-color)", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                  {p.creator[0]}
                </div>
                <div>
                  <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 14 }}>{p.creator}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>{p.email} · {p.method} · {p.requested}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
                <span style={{ color: "#16a34a", fontWeight: 800, fontSize: 16 }}>{p.amount}</span>
                <span className={`pill ${p.pill}`}>{p.status}</span>
                {p.status === "Pending" && (
                  <button className="btn btn-primary btn-sm" style={{ fontSize: 12 }}>
                    Approve
                  </button>
                )}
                {p.status === "Processing" && (
                  <button className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>
                    Mark Sent
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </DashLayout>
  );
}
