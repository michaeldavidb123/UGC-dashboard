"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  BarChart3, Eye, TrendingUp, DollarSign, Users, Award,
  Sparkles, Globe, Calendar, ArrowUpRight, PlayCircle, Filter, Zap, Target
} from "lucide-react";

export default function AnalyticsView() {
  const [viewMode, setViewMode] = useState<"creator" | "brand">("creator");
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <DashLayout title="Analytics Dashboard">
      <PageHeader
        title="Analytics & Performance"
        subtitle="Track content impressions, engagement metrics, campaign ROAS, and audience growth."
        action={
          <div style={{ display: "flex", gap: 10 }}>
            {/* View Switcher: Creator vs Brand */}
            <div style={{ display: "flex", background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", borderRadius: 12, padding: 3 }}>
              <button
                onClick={() => setViewMode("creator")}
                style={{
                  padding: "6px 14px", borderRadius: 9, fontSize: 12, fontWeight: 700,
                  background: viewMode === "creator" ? "#0284c7" : "transparent",
                  color: viewMode === "creator" ? "#fff" : "var(--text-subtle)",
                  border: "none", cursor: "pointer", fontFamily: "inherit"
                }}
              >
                Creator View
              </button>
              <button
                onClick={() => setViewMode("brand")}
                style={{
                  padding: "6px 14px", borderRadius: 9, fontSize: 12, fontWeight: 700,
                  background: viewMode === "brand" ? "#8b5cf6" : "transparent",
                  color: viewMode === "brand" ? "#fff" : "var(--text-subtle)",
                  border: "none", cursor: "pointer", fontFamily: "inherit"
                }}
              >
                Brand View
              </button>
            </div>

            <select
              value={timeRange}
              onChange={e => setTimeRange(e.target.value)}
              className="input"
              style={{ fontSize: 12, padding: "6px 12px", width: "auto", borderRadius: 10 }}
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        }
      />

      {/* ── KPI METRICS STRIP ── */}
      <div className="grid-responsive-4col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: 28 }}>
        {viewMode === "creator" ? (
          <>
            {[
              { label: "Total Video Views", value: "1,420,500", delta: "+28.4%", color: "#0284c7", icon: Eye },
              { label: "Avg Engagement Rate", value: "4.82%", delta: "+1.2%", color: "#10b981", icon: TrendingUp },
              { label: "Conversion Rate", value: "3.25%", delta: "+0.8%", color: "#f59e0b", icon: Target },
              { label: "Total Earnings Growth", value: "$4,250.00", delta: "+34.1%", color: "#8b5cf6", icon: DollarSign },
            ].map(k => (
              <div key={k.label} className="stat-card card-lift" className="card card-lift">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }}>{k.label.toUpperCase()}</span>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: `${k.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <k.icon style={{ width: 15, height: 15, color: k.color }} />
                  </div>
                </div>
                <div style={{ color: "var(--text)", fontWeight: 900, fontSize: 26, letterSpacing: "-0.03em" }}>{k.value}</div>
                <div style={{ color: "#10b981", fontSize: 12, fontWeight: 700, marginTop: 4, display: "flex", alignItems: "center", gap: 3 }}>
                  <ArrowUpRight style={{ width: 12, height: 12 }} /> {k.delta} vs last period
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {[
              { label: "Campaign Impressions", value: "5,840,000", delta: "+42.1%", color: "#8b5cf6", icon: Eye },
              { label: "Return on Ad Spend (ROAS)", value: "4.5x", delta: "+0.7x", color: "#10b981", icon: TrendingUp },
              { label: "Total Deliverables Approved", value: "84 Reels", delta: "+18 new", color: "#0284c7", icon: Award },
              { label: "Cost Per Acquisition (CPA)", value: "$14.20", delta: "-$2.10", color: "#f59e0b", icon: DollarSign },
            ].map(k => (
              <div key={k.label} className="stat-card card-lift" className="card card-lift">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }}>{k.label.toUpperCase()}</span>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: `${k.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <k.icon style={{ width: 15, height: 15, color: k.color }} />
                  </div>
                </div>
                <div style={{ color: "var(--text)", fontWeight: 900, fontSize: 26, letterSpacing: "-0.03em" }}>{k.value}</div>
                <div style={{ color: "#10b981", fontSize: 12, fontWeight: 700, marginTop: 4, display: "flex", alignItems: "center", gap: 3 }}>
                  <ArrowUpRight style={{ width: 12, height: 12 }} /> {k.delta} vs last period
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* ── CHARTS & BREAKDOWNS ── */}
      <div className="grid-responsive-2col" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24, marginBottom: 28 }}>
        
        {/* Left: Monthly Trend Progress Bars */}
        <div className="card" style={{ padding: "24px", borderRadius: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, margin: 0 }}>
                {viewMode === "creator" ? "Monthly Earnings & Views Growth" : "Campaign ROAS & Conversion Performance"}
              </h3>
              <p style={{ color: "var(--text-subtle)", fontSize: 12, margin: "2px 0 0" }}>Historical performance over past 6 months</p>
            </div>
            <span className="pill pill-blue">Updated Live</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { month: "Jan 2025", value: viewMode === "creator" ? "$2,100" : "3.2x ROAS", progress: 55, color: "#0284c7" },
              { month: "Feb 2025", value: viewMode === "creator" ? "$2,850" : "3.6x ROAS", progress: 68, color: "#0284c7" },
              { month: "Mar 2025", value: viewMode === "creator" ? "$3,400" : "3.9x ROAS", progress: 78, color: "#0284c7" },
              { month: "Apr 2025", value: viewMode === "creator" ? "$3,920" : "4.2x ROAS", progress: 88, color: "#10b981" },
              { month: "May 2025 (Current)", value: viewMode === "creator" ? "$4,250" : "4.5x ROAS", progress: 96, color: "#10b981" },
            ].map(row => (
              <div key={row.month} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700 }}>
                  <span style={{ color: "var(--text)" }}>{row.month}</span>
                  <span style={{ color: row.color }}>{row.value}</span>
                </div>
                <div style={{ height: 8, background: "var(--surface-subtle)", borderRadius: 999, overflow: "hidden", border: "1px solid var(--border)" }}>
                  <div style={{ height: "100%", width: `${row.progress}%`, background: `linear-gradient(90deg, ${row.color}, #38bdf8)`, borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Platform Distribution */}
        <div className="card" style={{ padding: "24px", borderRadius: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <Globe style={{ width: 18, height: 18, color: "#0284c7" }} />
            <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, margin: 0 }}>Platform Distribution</h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { platform: "TikTok Video Ads", share: "54%", color: "#00f2fe", posts: "46 Videos" },
              { platform: "Instagram Reels", share: "32%", color: "#e1306c", posts: "28 Videos" },
              { platform: "YouTube Shorts", share: "14%", color: "#ff0000", posts: "10 Videos" },
            ].map(p => (
              <div key={p.platform} style={{ padding: "12px 14px", borderRadius: 14, background: "var(--surface-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 999, background: p.color }} />
                  <div>
                    <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{p.platform}</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{p.posts}</div>
                  </div>
                </div>
                <span style={{ color: "var(--text)", fontWeight: 900, fontSize: 16 }}>{p.share}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── TOP PERFORMING CONTENT LEADERBOARD ── */}
      <div className="card table-responsive" style={{ padding: "24px", borderRadius: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div>
            <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, margin: 0 }}>Top Performing Deliverables</h3>
            <p style={{ color: "var(--text-subtle)", fontSize: 12, margin: "2px 0 0" }}>Highest converting reels and video campaigns</p>
          </div>
          <span className="pill pill-green">Top 10% Creators</span>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Deliverable Title", "Brand / Client", "Platform", "Views", "Engagement", "Earnings / Payout", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", background: "var(--surface-subtle)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { title: "Nike Skincare Glow Reel", brand: "GlowBrand Team", platform: "TikTok", views: "480,200", rate: "5.4%", payout: "$450.00", status: "Active" },
              { title: "Noise-Canceling Headphones Review", brand: "TechFlow Labs", platform: "IG Reels", views: "320,000", rate: "4.9%", payout: "$400.00", status: "Active" },
              { title: "Protein Powder Recipe Reel", brand: "FitNutrition Co", platform: "Shorts", views: "290,100", rate: "4.2%", payout: "$350.00", status: "Completed" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <PlayCircle style={{ width: 16, height: 16, color: "#0284c7", flexShrink: 0 }} />
                    <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{row.title}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 16px", color: "var(--text-muted)", fontSize: 12 }}>{row.brand}</td>
                <td style={{ padding: "14px 16px" }}><span className="pill pill-purple" style={{ fontSize: 10 }}>{row.platform}</span></td>
                <td style={{ padding: "14px 16px", color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{row.views}</td>
                <td style={{ padding: "14px 16px", color: "#10b981", fontWeight: 700, fontSize: 13 }}>{row.rate}</td>
                <td style={{ padding: "14px 16px", color: "#0284c7", fontWeight: 900, fontSize: 14 }}>{row.payout}</td>
                <td style={{ padding: "14px 16px" }}><span className="pill pill-green" style={{ fontSize: 10 }}>{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashLayout>
  );
}
