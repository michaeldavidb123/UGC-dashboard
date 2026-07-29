"use client";

import DashLayout, { PageHeader, SectionCard, ListRow } from "@/components/DashLayout";
import { CheckCircle2, XCircle, Eye, Filter } from "lucide-react";

const items = [
  { id: 1, creator: "Sarah Mitchell", campaign: "Nike – Summer Collection", brand: "Nike Inc.", type: "Video (45s)", submitted: "2h ago", status: "Pending", pill: "pill-amber" },
  { id: 2, creator: "Marcus Lee", campaign: "TechFlow – App Launch", brand: "TechFlow Inc.", type: "Video (62s)", submitted: "4h ago", status: "Pending", pill: "pill-amber" },
  { id: 3, creator: "Emma Chen", campaign: "GlowBrand – Skincare", brand: "GlowBrand", type: "Photo Pack", submitted: "6h ago", status: "Approved", pill: "pill-green" },
  { id: 4, creator: "Jake Rodriguez", campaign: "NutriLife – Meal Prep", brand: "NutriLife Co.", type: "Video (38s)", submitted: "1d ago", status: "Rejected", pill: "pill-rose" },
];

export default function AdminContentPage() {
  return (
    <DashLayout title="Content Review">
      <PageHeader
        title="Content Review Queue"
        subtitle="Moderate and approve submitted UGC content from creators before brand delivery."
        action={
          <button className="btn btn-ghost btn-sm"><Filter style={{ width: 14, height: 14 }} /> Filter by Status</button>
        }
      />

      {/* Stats Row */}
      <div className="grid-responsive-4col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Pending Review", count: 142, color: "#d97706" },
          { label: "Approved Today", count: 38, color: "#16a34a" },
          { label: "Rejected Today", count: 7, color: "#e11d48" },
          { label: "Revision Requests", count: 19, color: "var(--accent-text)" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "20px 24px" }}>
            <div style={{ color: s.color, fontWeight: 800, fontSize: 32, letterSpacing: "-0.03em", marginBottom: 4 }}>{s.count}</div>
            <div style={{ color: "var(--text-subtle)", fontSize: 12, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <SectionCard title="Submission Queue" subtitle="Click actions to approve, reject, or request revision.">
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {items.map(item => (
            <div key={item.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 20px", borderRadius: 14,
              background: "var(--surface-subtle)",
              border: "1px solid var(--border)", gap: 16
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--icon-bg)", border: "1px solid var(--icon-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--icon-color)", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                    {item.creator[0]}
                  </div>
                  <div>
                    <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 14 }}>{item.creator}</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 12 }}>{item.campaign} · {item.brand}</div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                <span style={{ color: "var(--text-subtle)", fontSize: 12 }}>{item.type}</span>
                <span style={{ color: "var(--text-subtle)", fontSize: 12 }}>{item.submitted}</span>
                <span className={`pill ${item.pill}`}>{item.status}</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{ width: 34, height: 34, borderRadius: 10, background: "var(--icon-bg)", border: "1px solid var(--icon-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--icon-color)", cursor: "pointer" }}>
                    <Eye style={{ width: 14, height: 14 }} />
                  </button>
                  <button style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#16a34a", cursor: "pointer" }}>
                    <CheckCircle2 style={{ width: 14, height: 14 }} />
                  </button>
                  <button style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#e11d48", cursor: "pointer" }}>
                    <XCircle style={{ width: 14, height: 14 }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </DashLayout>
  );
}
