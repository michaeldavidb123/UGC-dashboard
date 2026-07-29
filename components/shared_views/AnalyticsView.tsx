"use client";

import DashLayout, { PageHeader } from "@/components/DashLayout";
import { BarChart3, TrendingUp, Eye, Play, Users, MousePointerClick } from "lucide-react";

const stats = [
  { label: "Total Video Views", value: "1.4M", trend: "+12%", color: "#0284c7" },
  { label: "Avg Watch Time", value: "28s", trend: "+5%", color: "#8b5cf6" },
  { label: "Total Reach", value: "520k", trend: "+18%", color: "#10b981" },
  { label: "Engagement Rate", value: "6.8%", trend: "+2%", color: "#f59e0b" },
];

const topContent = [
  { title: "GlowBrand Vitamin C Serum Reel", views: "420k", ctr: "9.2%", revenue: "$200" },
  { title: "TechFlow ANC Headphones Unboxing", views: "310k", ctr: "7.8%", revenue: "$300" },
  { title: "NutriLife Protein Smoothie Prep", views: "290k", ctr: "8.1%", revenue: "$150" },
];

export default function AnalyticsView() {
  return (
    <DashLayout title="Analytics">
      <PageHeader title="Content Performance Analytics" subtitle="Track your video views, engagement rates, earnings and brand campaign performance." />

      <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} className="card" style={{ padding: 20, borderRadius: 18, borderLeft: `4px solid ${s.color}` }}>
            <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>{s.label.toUpperCase()}</div>
            <div style={{ color: s.color, fontWeight: 900, fontSize: 26, marginTop: 4 }}>{s.value}</div>
            <div style={{ color: "#10b981", fontSize: 12, marginTop: 2 }}>{s.trend} this month</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 24, borderRadius: 20 }}>
        <h2 style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, marginBottom: 16 }}>Top Performing Content</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {topContent.map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderRadius: 14, background: "var(--surface-subtle)", border: "1px solid var(--border)" }}>
              <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>{c.title}</div>
              <div style={{ display: "flex", gap: 20, fontSize: 13 }}>
                <span style={{ color: "#0284c7", fontWeight: 700 }}>{c.views} views</span>
                <span style={{ color: "#8b5cf6", fontWeight: 700 }}>{c.ctr} CTR</span>
                <span style={{ color: "#10b981", fontWeight: 700 }}>{c.revenue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashLayout>
  );
}
