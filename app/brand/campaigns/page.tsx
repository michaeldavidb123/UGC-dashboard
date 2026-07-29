"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import { Plus, Clock, CheckCircle2, Megaphone, DollarSign, Users, ChevronRight, X, FileText } from "lucide-react";

interface Campaign {
  id: string; title: string; budget: string; creators: number; deadline: string; status: "active" | "draft" | "completed";
}

const MOCK: Campaign[] = [
  { id: "CP-101", title: "Vitamin C Serum Launch Reel", budget: "$1,000 escrow", creators: 5, deadline: "Aug 10, 2025", status: "active" },
  { id: "CP-102", title: "ANC Headphones Video Reviews", budget: "$1,500 escrow", creators: 5, deadline: "Aug 14, 2025", status: "active" },
  { id: "CP-103", title: "Protein Smoothie Summer Push", budget: "$750 escrow", creators: 5, deadline: "Jul 24, 2025", status: "completed" },
];

export default function BrandCampaignsPage() {
  const [campaigns] = useState<Campaign[]>(MOCK);

  return (
    <DashLayout title="Active Campaigns">
      <PageHeader
        title="Active Brand Campaigns"
        subtitle="Manage your open campaign briefs, track creator submissions, and approve deliverables."
        action={
          <button className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Plus style={{ width: 15, height: 15 }} /> New Campaign Brief
          </button>
        }
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {campaigns.map(c => (
          <div key={c.id} className="card card-lift" style={{ padding: "20px 24px", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span className={`pill ${c.status === "active" ? "pill-green" : c.status === "draft" ? "pill-amber" : "pill-blue"}`} style={{ fontSize: 10 }}>
                  {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                </span>
                <span style={{ color: "var(--text-subtle)", fontSize: 11 }}>{c.id}</span>
              </div>
              <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, margin: "0 0 4px" }}>{c.title}</h3>
              <div style={{ display: "flex", gap: 18, fontSize: 12, color: "var(--text-subtle)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><DollarSign style={{ width: 12, height: 12 }} />{c.budget}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users style={{ width: 12, height: 12 }} />{c.creators} Creators</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock style={{ width: 12, height: 12 }} />Deadline: {c.deadline}</span>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm" style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
              View Submissions <ChevronRight style={{ width: 13, height: 13 }} />
            </button>
          </div>
        ))}
      </div>
    </DashLayout>
  );
}
