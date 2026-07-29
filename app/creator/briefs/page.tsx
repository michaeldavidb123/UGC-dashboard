"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { ChangeEvent, DragEvent } from "react";
import Link from "next/link";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  Search, Filter, Clock, DollarSign, CheckCircle2, AlertCircle,
  XCircle, FileText, Download, Upload, ExternalLink, Play, Eye,
  Sparkles, ChevronRight, X, ShieldCheck, Check, ArrowRight, Video, Image as ImageIcon,
  ArrowUpDown, ChevronDown
} from "lucide-react";

type SortType = "deadline" | "newest" | "highest_pay";
export type CampaignStatusType = "active" | "waiting_for_review" | "revision_requested" | "completed";

export interface CampaignItem {
  id: string; image: string; brand: string; brandLogo: string; title: string; payment: string; deadline: string;
  status: CampaignStatusType; niche: string; overview: string; deliverables: string[]; requiredShots: string[];
  dos: string[]; donts: string[]; brandAssets: { name: string; type: string; size: string; url: string }[];
  referenceFiles: { name: string; type: string; duration: string; url: string }[];
}

const mockCampaigns: CampaignItem[] = [
  {
    id: "c1", image: "/onboarding-brand.png", brand: "GlowBrand", brandLogo: "GB", title: "Skincare Morning Routine Reel", payment: "$200.00", deadline: "Aug 10, 2025", status: "active", niche: "Beauty & Skincare",
    overview: "We're launching our new Hydrating Vitamin C Serum! We need authentic 30s reels.", deliverables: ["1x 30s Vertical Reel (9:16)"], requiredShots: ["Clear unboxing", "Dropper application"], dos: ["Natural light"], donts: ["No heavy makeup"], brandAssets: [], referenceFiles: []
  },
  {
    id: "c2", image: "/onboarding-creator.png", brand: "TechFlow Labs", brandLogo: "TF", title: "ANC Headphones Video Review", payment: "$300.00", deadline: "Aug 14, 2025", status: "active", niche: "Tech & Audio",
    overview: "Showcase active noise cancellation in action.", deliverables: ["1x 45s Review Reel"], requiredShots: ["Unboxing", "ANC Test"], dos: ["High quality audio"], donts: ["No background noise"], brandAssets: [], referenceFiles: []
  }
];

export default function CreatorBriefsPage() {
  const [selectedNiche, setSelectedNiche] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignItem | null>(null);

  const filtered = mockCampaigns.filter(c => {
    if (selectedNiche !== "all" && c.niche !== selectedNiche) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <DashLayout title="Browse Brands">
      <PageHeader title="Browse Brand Opportunities" subtitle="Apply to open UGC brand briefs with guaranteed escrow payment protection." />
      
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <input placeholder="Search brand deals..." value={search} onChange={e => setSearch(e.target.value)} className="input" style={{ width: 280 }} />
      </div>

      <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {filtered.map(c => (
          <div key={c.id} className="card card-lift" style={{ borderRadius: 20, padding: 20, cursor: "pointer" }} onClick={() => setSelectedCampaign(c)}>
            <div style={{ color: "#0284c7", fontWeight: 800, fontSize: 16 }}>{c.brand}</div>
            <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 15, margin: "4px 0 10px" }}>{c.title}</h3>
            <div style={{ color: "#10b981", fontWeight: 900, fontSize: 18 }}>{c.payment} <span style={{ fontSize: 11, color: "var(--text-subtle)" }}>Escrow</span></div>
          </div>
        ))}
      </div>
    </DashLayout>
  );
}
