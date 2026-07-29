"use client";

import DashLayout, { PageHeader } from "@/components/DashLayout";
import { Search, Plus } from "lucide-react";

const campaigns = [
  { id: 1, title: "Nike – Summer Collection", brand: "Nike Inc.", budget: "$5,000.00", creators: 12, deadline: "Aug 15, 2025", status: "Active", pill: "pill-green" },
  { id: 2, title: "GlowBrand – Skincare Routine", brand: "GlowBrand", budget: "$2,500.00", creators: 6, deadline: "Aug 20, 2025", status: "Active", pill: "pill-green" },
  { id: 3, title: "TechFlow – App Launch", brand: "TechFlow Inc.", budget: "$8,000.00", creators: 20, deadline: "Jul 30, 2025", status: "Reviewing", pill: "pill-amber" },
  { id: 4, title: "NutriLife – Meal Prep", brand: "NutriLife Co.", budget: "$3,000.00", creators: 8, deadline: "Jul 10, 2025", status: "Completed", pill: "pill-blue" },
];

export default function AdminCampaignsPage() {
  return (
    <DashLayout title="Campaigns">
      <PageHeader
        title="Campaign Moderation"
        subtitle="Review all brand campaigns, budgets, and content delivery status."
        action={
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search style={{ position: "absolute", left: 12, width: 14, height: 14, color: "var(--text-subtle)" }} />
              <input type="text" placeholder="Search campaigns..." className="input" style={{ paddingLeft: 36, width: 240, paddingTop: 9, paddingBottom: 9, fontSize: 13 }} />
            </div>
            <button className="btn btn-primary btn-sm"><Plus style={{ width: 14, height: 14 }} /> New Campaign</button>
          </div>
        }
      />

      <div className="card table-responsive" style={{ overflow: "hidden" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Brand</th>
              <th>Budget</th>
              <th>Creators</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id}>
                <td style={{ color: "var(--text)", fontWeight: 600 }}>{c.title}</td>
                <td style={{ color: "var(--text-subtle)" }}>{c.brand}</td>
                <td style={{ color: "#16a34a", fontWeight: 700 }}>{c.budget}</td>
                <td style={{ color: "var(--text-muted)" }}>{c.creators} creators</td>
                <td style={{ color: "var(--text-subtle)", fontSize: 13 }}>{c.deadline}</td>
                <td><span className={`pill ${c.pill}`}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashLayout>
  );
}
