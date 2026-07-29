"use client";

import DashLayout, { PageHeader, SectionCard, Field } from "@/components/DashLayout";
import { Search, Filter, Zap, Star } from "lucide-react";

const creators = [
  { name: "Sarah Mitchell", niche: "Lifestyle & Beauty", rate: "$150", posts: 28, rating: "4.9", bio: "Authentic UGC creator based in London. Specialises in beauty, wellness and lifestyle content." },
  { name: "Marcus Lee", niche: "Tech & Gaming", rate: "$250", posts: 45, rating: "5.0", bio: "Tech reviewer and product unboxer. Clear, engaging content that drives purchase decisions." },
  { name: "Emma Chen", niche: "Wellness & Food", rate: "$120", posts: 19, rating: "4.8", bio: "Food & wellness creator. I help brands tell authentic stories through visually stunning content." },
  { name: "Jake Rodriguez", niche: "Fitness", rate: "$180", posts: 33, rating: "4.7", bio: "Certified PT and fitness UGC creator. High-energy workout and supplement content." },
  { name: "Mia Patel", niche: "Travel & Lifestyle", rate: "$200", posts: 41, rating: "4.9", bio: "Travel & lifestyle content that feels real. Authentic storytelling, professional quality." },
  { name: "Leo Kim", niche: "Fashion & Style", rate: "$160", posts: 22, rating: "4.8", bio: "Fashion & street style creator. Clean aesthetics and trend-forward content for clothing brands." },
];

export default function BrowseCreatorsPage() {
  return (
    <DashLayout title="Browse Creators">
      <PageHeader
        title="Creator Directory"
        subtitle="Discover and hire vetted UGC creators across all content categories."
        action={
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search style={{ position: "absolute", left: 12, width: 14, height: 14, color: "#475569" }} />
              <input type="text" placeholder="Search by name or niche..." className="input" style={{ paddingLeft: 36, width: 260, paddingTop: 9, paddingBottom: 9, fontSize: 13 }} />
            </div>
            <button className="btn btn-ghost btn-sm"><Filter style={{ width: 14, height: 14 }} /> Filter</button>
          </div>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {creators.map((c) => (
          <div key={c.name} className="card card-lift" style={{ padding: "24px" }}>
            {/* Creator Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--icon-bg)", border: "1px solid var(--icon-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--icon-color)", fontWeight: 800, fontSize: 18, flexShrink: 0 }}>
                {c.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{c.name}</div>
                <span className="pill pill-purple" style={{ fontSize: 10 }}>{c.niche}</span>
              </div>
            </div>

            {/* Bio */}
            <p style={{ color: "var(--text-subtle)", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>{c.bio}</p>

            {/* Stats Row */}
            <div style={{ display: "flex", alignItems: "center", gap: 0, padding: "14px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: 20 }}>
              {[
                { label: "Rate/video", val: `${c.rate}`, color: "#16a34a" },
                { label: "Rating", val: c.rating, color: "#d97706", icon: true },
                { label: "Completed", val: `${c.posts} posts`, color: "var(--accent-text)" },
              ].map((stat, i) => (
                <div key={stat.label} style={{ flex: 1, textAlign: "center", borderRight: i < 2 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ color: stat.color, fontWeight: 800, fontSize: 15, marginBottom: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                    {stat.icon && <Star style={{ width: 12, height: 12, fill: "#fbbf24", color: "#fbbf24" }} />}
                    {stat.val}
                  </div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <button className="btn btn-primary" style={{ width: "100%", fontSize: 13 }}>
              <Zap style={{ width: 14, height: 14 }} /> Hire Creator
            </button>
          </div>
        ))}
      </div>
    </DashLayout>
  );
}
