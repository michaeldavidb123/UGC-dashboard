"use client";

import { useState } from "react";
import Image from "next/image";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import { Star, Search, Filter, CheckCircle2, UserCheck, Send, Sparkles } from "lucide-react";

export default function BrandTalentPage() {
  return (
    <DashLayout title="Browse Talent">
      <PageHeader title="Browse Verified UGC Creators" subtitle="Connect with top 1% content creators for your brand campaigns." />
      <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {[
          { name: "Sarah Mitchell", niche: "Beauty & Skincare", rating: "4.92★", reels: "120+ Reels", views: "1.4M Views" },
          { name: "Marcus Lee", niche: "Fitness & Wellness", rating: "4.88★", reels: "85+ Reels", views: "950k Views" },
          { name: "Elena Rostova", niche: "Tech & Audio", rating: "4.95★", reels: "140+ Reels", views: "2.1M Views" },
        ].map((c, i) => (
          <div key={i} className="card card-lift" style={{ borderRadius: 20, padding: 22 }}>
            <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 16 }}>{c.name}</div>
            <div style={{ color: "#0284c7", fontSize: 12, fontWeight: 700, margin: "2px 0 10px" }}>{c.niche}</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-subtle)" }}>
              <span>{c.rating}</span>
              <span>{c.reels}</span>
            </div>
          </div>
        ))}
      </div>
    </DashLayout>
  );
}
