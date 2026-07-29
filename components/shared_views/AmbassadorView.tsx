"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  HeartHandshake, Crown, Sparkles, DollarSign, Package, TrendingUp,
  CheckCircle2, Clock, Gift, ArrowRight, ShieldCheck, UserCheck, Search,
  Award, Star, ExternalLink, Plus, Filter, X, Send, Truck
} from "lucide-react";

interface AmbassadorProgram {
  id: string; brand: string; brandLogo: string; title: string; niche: string;
  monthlyRetainer: string; productBoxValue: string; affiliateCommission: string;
  contractLength: string; monthlyQuota: string; perks: string[]; applied?: boolean;
}

const INITIAL_PROGRAMS: AmbassadorProgram[] = [
  {
    id: "AMB-101", brand: "GlowBrand Skincare", brandLogo: "GB", title: "Official Skincare Brand Ambassador 2025", niche: "Beauty & Skincare",
    monthlyRetainer: "$1,500 / month", productBoxValue: "$250 free products / month", affiliateCommission: "15% sales rev-share",
    contractLength: "6 Months", monthlyQuota: "4 Reels / month",
    perks: ["Guaranteed $1,500 monthly retainer", "Free monthly VIP skincare package", "Custom 15% discount promo code"], applied: false
  },
  {
    id: "AMB-102", brand: "TechFlow Labs", brandLogo: "TF", title: "Lead Audio & Gadgets Ambassador", niche: "Tech & Audio",
    monthlyRetainer: "$2,200 / month", productBoxValue: "$400 free tech / month", affiliateCommission: "20% sales rev-share",
    contractLength: "12 Months", monthlyQuota: "5 Videos / month",
    perks: ["$2,200 monthly cash retainer", "Free flagship headphones & accessories sent quarterly"], applied: true
  }
];

export default function AmbassadorView() {
  const [viewMode, setViewMode] = useState<"creator" | "brand">("creator");
  const [programs] = useState<AmbassadorProgram[]>(INITIAL_PROGRAMS);

  return (
    <DashLayout title="Brand Ambassador Program">
      <PageHeader title="Brand Ambassador Program" subtitle="Connect for long-term monthly retainers, receive recurring product shipments, and earn affiliate commissions." />
      <div className="card" style={{ padding: 24, borderRadius: 20 }}>
        <h2 style={{ color: "var(--text)", fontWeight: 800, fontSize: 18 }}>Open Ambassador Retainer Programs</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
          {programs.map(p => (
            <div key={p.id} style={{ padding: 16, borderRadius: 14, background: "var(--surface-subtle)", border: "1px solid var(--border)" }}>
              <div style={{ color: "#0284c7", fontWeight: 800, fontSize: 16 }}>{p.brand}</div>
              <h3 style={{ color: "var(--text)", fontWeight: 700, fontSize: 14, margin: "2px 0 6px" }}>{p.title}</h3>
              <div style={{ color: "#10b981", fontWeight: 900, fontSize: 16 }}>{p.monthlyRetainer} <span style={{ fontSize: 11, color: "var(--text-subtle)" }}>+ {p.affiliateCommission}</span></div>
            </div>
          ))}
        </div>
      </div>
    </DashLayout>
  );
}
