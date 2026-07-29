"use client";

import { Megaphone, Users, FileVideo, Plus, ChevronRight } from "lucide-react";

const campaigns = [
  { title: "Summer Skincare UGC Video Ad",    budget: "$2,500.00", creators: 8,  assets: 14, status: "Active",    pill: "pill-green"  },
  { title: "Mobile App Demo & Walkthrough",   budget: "$4,000.00", creators: 12, assets: 20, status: "Reviewing", pill: "pill-amber"  },
  { title: "Protein Powder Healthy Recipes",  budget: "$1,200.00", creators: 4,  assets: 8,  status: "Completed", pill: "pill-blue"   },
];

export default function NormalHome() {
  return (
    <div>
      {/* Header */}
      <div className="page-header-flex" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 40 }}>
        <div>
          <h1 style={{ color: "var(--text)", fontWeight: 800, fontSize: 28, letterSpacing: "-0.03em", marginBottom: 8 }}>
            GlowBrand Workspace
          </h1>
          <p style={{ color: "var(--text-subtle)", fontSize: 14 }}>
            Manage active UGC campaigns, review deliverables, and hire top creators.
          </p>
        </div>
        <button className="btn btn-primary" style={{ flexShrink: 0 }}>
          <Plus style={{ width: 16, height: 16 }} />
          Create Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
        {[
          { label: "Campaigns Launched", value: "3",  icon: Megaphone },
          { label: "Creators Partnered", value: "24", icon: Users },
          { label: "Deliverables Approved", value: "42", icon: FileVideo },
        ].map((s) => (
          <div key={s.label} className="stat-card card-lift">
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--icon-bg)", border: "1px solid var(--icon-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--icon-color)" }}>
              <s.icon style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 36, letterSpacing: "-0.03em", lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 13, fontWeight: 500, marginTop: 4 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="card" style={{ padding: "28px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 16 }}>Active Campaigns</div>
            <div style={{ color: "var(--text-subtle)", fontSize: 13, marginTop: 4 }}>Overview of live UGC briefs and content delivery</div>
          </div>
          <a href="/my-campaigns" style={{ color: "var(--accent-text)", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
            View all <ChevronRight style={{ width: 14, height: 14 }} />
          </a>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {campaigns.map((c, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 18px", borderRadius: 14,
              background: "var(--surface-subtle)",
              border: "1px solid var(--border)", gap: 12, flexWrap: "wrap"
            }}>
              <div>
                <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 14 }}>{c.title}</div>
                <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 4 }}>{c.creators} creators · {c.assets} deliverables</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                <span className={`pill ${c.pill}`}>{c.status}</span>
                <span style={{ color: "var(--text)", fontWeight: 800, fontSize: 14 }}>{c.budget}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
