"use client";

import DashLayout, { PageHeader } from "@/components/DashLayout";
import { Play, Eye, Sparkles, Star } from "lucide-react";

const videos = [
  { title: "GlowBrand Vitamin C Serum Morning Routine", views: "420k", rating: "4.9★", niche: "Beauty", thumb: "GB" },
  { title: "TechFlow ANC Headphones Unboxing & Review", views: "310k", rating: "4.8★", niche: "Tech", thumb: "TF" },
  { title: "NutriLife High-Protein Smoothie Prep Reel", views: "290k", rating: "4.7★", niche: "Fitness", thumb: "NL" },
];

export default function PortfolioView() {
  return (
    <DashLayout title="Public Portfolio">
      <PageHeader title="Public Creator Portfolio" subtitle="Showcase your best content to attract premium brand partnerships." />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {videos.map((v, i) => (
          <div key={i} className="card card-lift" style={{ borderRadius: 20, overflow: "hidden" }}>
            <div style={{ height: 180, background: "linear-gradient(135deg, #0f172a, #1e3a5f)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "#0284c7", color: "#fff", fontWeight: 900, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>{v.thumb}</div>
                <div style={{ width: 40, height: 40, borderRadius: 999, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                  <Play style={{ width: 18, height: 18, fill: "#fff", color: "#fff" }} />
                </div>
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <span className="pill pill-blue" style={{ fontSize: 10, marginBottom: 6, display: "inline-flex" }}>{v.niche}</span>
              <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 14, margin: "4px 0 10px", lineHeight: 1.3 }}>{v.title}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-subtle)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Eye style={{ width: 13, height: 13 }} /> {v.views}</span>
                <span style={{ color: "#f59e0b", fontWeight: 700 }}>{v.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashLayout>
  );
}
