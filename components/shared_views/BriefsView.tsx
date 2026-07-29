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

/* ── Status Types ────────────────────────────────── */
export type CampaignStatusType = "active" | "waiting_for_review" | "revision_requested" | "completed";

export interface CampaignItem {
  id: string;
  image: string;
  brand: string;
  brandLogo: string;
  title: string;
  payment: string;
  deadline: string;
  status: CampaignStatusType;
  niche: string;
  overview: string;
  deliverables: string[];
  requiredShots: string[];
  dos: string[];
  donts: string[];
  brandAssets: { name: string; type: string; size: string; url: string }[];
  referenceFiles: { name: string; type: string; duration: string; url: string }[];
}

const mockCampaigns: CampaignItem[] = [
  {
    id: "c1",
    image: "/onboarding-brand.png",
    brand: "GlowBrand",
    brandLogo: "GB",
    title: "Skincare Morning Routine Reel",
    payment: "$200.00",
    deadline: "Aug 10, 2025",
    status: "active",
    niche: "Beauty & Skincare",
    overview: "We're launching our new Hydrating Vitamin C Serum! We need authentic, high-energy 30-second reels showcasing your real morning routine, opening the product, applying the serum to your face, and sharing your genuine reaction to its lightweight texture and citrus scent.",
    deliverables: [
      "1x 30-Second Vertical Reel (9:16 format)",
      "3x High-Resolution Still Photos (Product in hand, texture shot, smiling result)"
    ],
    requiredShots: [
      "Clear unboxing or opening the serum bottle",
      "Close-up of serum dropper dispensing 2–3 drops on skin",
      "Gently massaging product into face in natural light",
      "Final glowing skin look + smiling at camera"
    ],
    dos: [
      "Film in bright, natural daylight near a window or outdoors",
      "Speak clearly and naturally about your real skin feeling",
      "Mention discount code GLOW20 in your caption",
      "Show the product bottle clearly in the first 3 seconds"
    ],
    donts: [
      "Do not use heavy beauty filters that smooth skin texture",
      "No competitor skincare products in background",
      "Do not use copyrighted music track"
    ],
    brandAssets: [
      { name: "GlowBrand_Logo_PNG.png", type: "PNG Logo", size: "1.2 MB", url: "#" },
      { name: "Brand_Color_Palette_Guide.pdf", type: "PDF Guide", size: "3.4 MB", url: "#" },
      { name: "Serum_Product_Overlays.png", type: "PNG Overlay", size: "850 KB", url: "#" }
    ],
    referenceFiles: [
      { name: "Example_Top_Performing_Reel.mp4", type: "Video Sample", duration: "0:30", url: "#" },
      { name: "Moodboard_Natural_Lighting.png", type: "Moodboard", duration: "Image", url: "#" }
    ]
  },
  {
    id: "c2",
    image: "/onboarding-creator.png",
    brand: "TechFlow",
    brandLogo: "TF",
    title: "Noise-Canceling Headphones Unboxing",
    payment: "$300.00",
    deadline: "Aug 14, 2025",
    status: "waiting_for_review",
    niche: "Tech & Audio",
    overview: "Demonstrate our new TechFlow Pro ANC Wireless Headphones. Highlight active noise cancellation in a noisy environment (coffee shop or street), battery life, and comfortable ear cushion design.",
    deliverables: [
      "1x 45-Second Product Review Video (9:16 Vertical)",
      "2x Lifestyle Photos wearing headphones"
    ],
    requiredShots: [
      "Unboxing slide box opening moment",
      "Close-up of premium metallic earcups and soft cushions",
      "Tapping the ANC touch control button",
      "Reaction shot when ANC turns on and blocks background noise"
    ],
    dos: [
      "Test ANC in an actual noisy spot (café, bus stop, gym)",
      "Highlight 40-hour battery life feature",
      "Use crisp microphone audio"
    ],
    donts: [
      "Do not compare directly to named competitor brands",
      "Avoid dark or blurry indoor lighting"
    ],
    brandAssets: [
      { name: "TechFlow_Vector_Logo.svg", type: "SVG Logo", size: "420 KB", url: "#" },
      { name: "Product_Spec_Sheet.pdf", type: "PDF Spec", size: "2.1 MB", url: "#" }
    ],
    referenceFiles: [
      { name: "Reference_Unboxing_Style.mp4", type: "Video Sample", duration: "0:45", url: "#" }
    ]
  },
  {
    id: "c3",
    image: "/slide-2.png",
    brand: "NutriLife",
    brandLogo: "NL",
    title: "High-Protein Meal Prep Recipe",
    payment: "$120.00",
    deadline: "Aug 05, 2025",
    status: "revision_requested",
    niche: "Fitness & Nutrition",
    overview: "Feature NutriLife Vanilla Whey Protein in a delicious, healthy morning smoothie bowl recipe. Keep it fast-paced, appetizing, and easy to follow for busy fitness enthusiasts.",
    deliverables: [
      "1x 30-Second Recipe Video (9:16)",
      "5x High-Res Food Photography Stills"
    ],
    requiredShots: [
      "Scooping protein powder into blender",
      "Adding frozen berries and almond milk",
      "Blending until smooth and creamy",
      "Pouring into bowl and adding toppings (granola, chia seeds)",
      "Tasting first spoon with enthusiastic smile"
    ],
    dos: [
      "Show exact measurement of 1 scoop protein powder",
      "List ingredients on screen in text overlays",
      "Keep kitchen counter clean and organized"
    ],
    donts: [
      "Do not show messy blender spills",
      "Avoid showing unbranded protein tubs"
    ],
    brandAssets: [
      { name: "NutriLife_Badge_Logo.png", type: "PNG Badge", size: "900 KB", url: "#" }
    ],
    referenceFiles: [
      { name: "Smoothie_Recipe_Reference.mp4", type: "Video Sample", duration: "0:30", url: "#" }
    ]
  },
  {
    id: "c4",
    image: "/slide-1.png",
    brand: "Nike",
    brandLogo: "NK",
    title: "Summer Collection Running Promo",
    payment: "$150.00",
    deadline: "Jul 24, 2025",
    status: "completed",
    niche: "Sportswear & Fitness",
    overview: "Showcase the Summer Dri-FIT Running Gear during an outdoor morning run session. Focus on moisture-wicking fabric, flexibility, and athletic movement.",
    deliverables: [
      "1x 45-Second High-Energy Workout Reel",
      "3x Athletic Action Shots"
    ],
    requiredShots: [
      "Lacing up running shoes outdoors",
      "Slow-motion running stride in sunrise light",
      "Sweat-resistant fabric close-up",
      "Post-run hydration & smile"
    ],
    dos: [
      "Film outdoors in Golden Hour light",
      "Maintain high energy music beat"
    ],
    donts: [
      "No visible logos from other sportswear brands"
    ],
    brandAssets: [
      { name: "Nike_Swoosh_Guidelines.pdf", type: "Brand Guide", size: "1.8 MB", url: "#" }
    ],
    referenceFiles: [
      { name: "Running_Promo_Moodboard.pdf", type: "Moodboard", duration: "PDF", url: "#" }
    ]
  },
  {
    id: "c5",
    image: "/slide-3.png",
    brand: "AuraFit",
    brandLogo: "AF",
    title: "Yoga Mat & Activewear Testimonial",
    payment: "$250.00",
    deadline: "Aug 18, 2025",
    status: "active",
    niche: "Wellness & Mindfulness",
    overview: "Share a peaceful morning yoga routine featuring the AuraFit Eco-Friendly Non-Slip Yoga Mat. Focus on grip stability, eco-materials, and serene home aesthetics.",
    deliverables: [
      "1x 60-Second Yoga Flow & Voiceover Reel",
      "4x High-Res Aesthetic Stills"
    ],
    requiredShots: [
      "Unrolling mat smoothly on hardwood floor",
      "Close-up of non-slip texture pattern",
      "30-second continuous flow sequence",
      "Closing pose with deep breath relaxation"
    ],
    dos: [
      "Calm, soothing voiceover explaining mat features",
      "Natural warm indoor lighting with houseplants in view"
    ],
    donts: [
      "Avoid sudden chaotic video transitions"
    ],
    brandAssets: [
      { name: "AuraFit_Logo_Transparent.png", type: "PNG Logo", size: "750 KB", url: "#" }
    ],
    referenceFiles: [
      { name: "Serene_Yoga_Reference.mp4", type: "Video Sample", duration: "1:00", url: "#" }
    ]
  }
];

const parsePayment = (val: string) => parseFloat(val.replace(/[^0-9.]/g, ""));
const parseDeadline = (val: string) => new Date(val).getTime();

export default function BriefsView() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortType>("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const [selectedBrief, setSelectedBrief] = useState<CampaignItem | null>(null);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [submitFile, setSubmitFile] = useState<File | null>(null);
  const [isSubmitDragging, setIsSubmitDragging] = useState(false);
  const submitFileRef = useRef<HTMLInputElement>(null);

  /* Close sort dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const sortLabels: Record<SortType, string> = {
    deadline: "Deadline",
    newest: "Newest",
    highest_pay: "Highest Pay",
  };

  /* Filter then sort */
  const filteredCampaigns = mockCampaigns
    .filter(c => {
      const matchesStatus = filterStatus === "all" || c.niche === filterStatus;
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.niche.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "deadline") return parseDeadline(a.deadline) - parseDeadline(b.deadline);
      if (sortBy === "highest_pay") return parsePayment(b.payment) - parsePayment(a.payment);
      /* newest — use index in original array as proxy for recency */
      return mockCampaigns.indexOf(b) - mockCampaigns.indexOf(a);
    });

  const getStatusBadge = (status: CampaignStatusType) => {
    switch (status) {
      case "active":
        return <span className="pill pill-green" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><CheckCircle2 style={{ width: 12, height: 12 }} /> Active</span>;
      case "waiting_for_review":
        return <span className="pill pill-amber" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Clock style={{ width: 12, height: 12 }} /> Waiting for Review</span>;
      case "revision_requested":
        return <span className="pill pill-red" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><AlertCircle style={{ width: 12, height: 12 }} /> Revision Requested</span>;
      case "completed":
        return <span className="pill pill-purple" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Sparkles style={{ width: 12, height: 12 }} /> Completed</span>;
    }
  };

  return (
    <DashLayout title="Campaign Briefs">

      {/* Page Header */}
      <PageHeader
        title="Campaign Briefs & Opportunities"
        subtitle="Manage active briefs, review requirements, download brand assets, and submit content."
        action={
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search style={{ position: "absolute", left: 12, width: 15, height: 15, color: "var(--text-subtle)" }} />
              <input
                type="text"
                placeholder="Search briefs or brands..."
                className="input"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ paddingLeft: 38, width: 260, height: 40, fontSize: 13 }}
              />
            </div>
          </div>
        }
      />

      {/* ── Marketplace Category Filter Tabs + Sort ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        {[
          { id: "all", label: "All Open Briefs" },
          { id: "Beauty & Skincare", label: "Beauty & Skincare" },
          { id: "Tech & Audio", label: "Tech & Audio" },
          { id: "Fitness & Nutrition", label: "Fitness & Nutrition" },
          { id: "Wellness & Mindfulness", label: "Wellness & Mindfulness" },
        ].map(tab => {
          const isActive = filterStatus === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                background: isActive ? "#0284c7" : "var(--surface)",
                border: `1px solid ${isActive ? "#0284c7" : "var(--border-strong)"}`,
                color: isActive ? "#fff" : "var(--text-muted)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s ease",
                boxShadow: isActive ? "0 4px 12px rgba(2,132,199,0.25)" : "none"
              }}
            >
              {tab.label}
            </button>
          );
        })}
        </div>

        {/* Sort Dropdown */}
        <div ref={sortRef} style={{ position: "relative", flexShrink: 0 }}>
          <button
            onClick={() => setSortOpen(p => !p)}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "8px 16px", borderRadius: 12,
              background: "var(--surface)",
              border: "1px solid var(--border-strong)",
              color: "var(--text)", fontWeight: 600, fontSize: 13,
              cursor: "pointer", fontFamily: "inherit",
              transition: "border-color 0.15s"
            }}
          >
            <ArrowUpDown style={{ width: 14, height: 14, color: "var(--accent-text)" }} />
            Sort: <span style={{ color: "var(--accent-text)" }}>{sortLabels[sortBy]}</span>
            <ChevronDown style={{ width: 13, height: 13, color: "var(--text-subtle)", transition: "transform 0.15s", transform: sortOpen ? "rotate(180deg)" : "none" }} />
          </button>

          {sortOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 200,
              background: "var(--surface)",
              border: "1px solid var(--border-strong)",
              borderRadius: 14, padding: 6, minWidth: 170,
              boxShadow: "0 12px 32px rgba(0,0,0,0.18)"
            }}>
              {([
                { id: "deadline",    label: "Deadline",     sub: "Soonest first" },
                { id: "newest",      label: "Newest",       sub: "Most recently added" },
                { id: "highest_pay", label: "Highest Pay",  sub: "Top earning first" },
              ] as { id: SortType; label: string; sub: string }[]).map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { setSortBy(opt.id); setSortOpen(false); }}
                  style={{
                    display: "flex", flexDirection: "column", width: "100%",
                    textAlign: "left", padding: "10px 14px", borderRadius: 10,
                    background: sortBy === opt.id ? "rgba(2,132,199,0.1)" : "transparent",
                    border: "none", cursor: "pointer", fontFamily: "inherit",
                    transition: "background 0.12s"
                  }}
                >
                  <span style={{ color: sortBy === opt.id ? "#0284c7" : "var(--text)", fontWeight: 700, fontSize: 13 }}>
                    {sortBy === opt.id && <Check style={{ width: 12, height: 12, display: "inline", marginRight: 5 }} />}
                    {opt.label}
                  </span>
                  <span style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 1 }}>{opt.sub}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── CAMPAIGN CARDS GRID ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {filteredCampaigns.map(c => (
          <div
            key={c.id}
            className="card card-lift"
            style={{
              borderRadius: 20,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              border: "1px solid var(--border-strong)",
              background: "var(--surface)",
              boxShadow: "var(--shadow-card)"
            }}
          >
            {/* Campaign Cover Image Header */}
            <div style={{ position: "relative", height: 170, width: "100%", background: "var(--surface-subtle)" }}>
              <Image
                src={c.image}
                alt={c.title}
                fill
                style={{ objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.7) 100%)" }} />

              {/* Status Badge Top Right */}
              <div style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}>
                {getStatusBadge(c.status)}
              </div>

              {/* Brand Initial Tag Bottom Left */}
              <div style={{ position: "absolute", bottom: 12, left: 14, display: "flex", alignItems: "center", gap: 8, zIndex: 2 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: "#0284c7", color: "#fff",
                  fontWeight: 800, fontSize: 12,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
                }}>
                  {c.brandLogo}
                </div>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 13, textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}>
                  {c.brand}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between", gap: 16 }}>
              <div>
                <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, lineHeight: 1.3, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                  {c.title}
                </h3>
                <p style={{ color: "var(--text-subtle)", fontSize: 12, lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {c.overview}
                </p>
              </div>

              {/* Price & Deadline Row */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 14px", borderRadius: 12,
                background: "var(--surface-subtle)",
                border: "1px solid var(--border)"
              }}>
                <div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 10, fontWeight: 500 }}>Payment</div>
                  <div style={{ color: "#10b981", fontWeight: 800, fontSize: 16 }}>{c.payment}</div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "var(--text-subtle)", fontSize: 10, fontWeight: 500 }}>Deadline</div>
                  <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                    <Clock style={{ width: 12, height: 12, color: "var(--accent-text)" }} />
                    {c.deadline}
                  </div>
                </div>
              </div>

              {/* View Brief CTA Button */}
              <button
                onClick={() => setSelectedBrief(c)}
                className="btn btn-secondary"
                style={{
                  width: "100%",
                  height: 42,
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6
                }}
              >
                <Eye style={{ width: 15, height: 15 }} />
                View Brief
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── 3. INSIDE THE BRIEF (SLIDE-OVER DRAWER MODAL) ── */}
      {selectedBrief && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)",
          display: "flex", justifyContent: "flex-end",
          animation: "fadeIn 0.2s ease-out"
        }}>
          <div style={{
            width: "100%", maxWidth: 680, height: "100vh",
            background: "var(--bg)",
            borderLeft: "1px solid var(--border-strong)",
            display: "flex", flexDirection: "column",
            boxShadow: "-20px 0 60px rgba(0,0,0,0.4)",
            overflowY: "auto"
          }}>

            {/* Brief Drawer Header */}
            <div style={{
              position: "sticky", top: 0, zIndex: 10,
              padding: "20px 28px",
              background: "var(--surface)",
              borderBottom: "1px solid var(--border-strong)",
              display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0284c7", color: "#fff", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {selectedBrief.brandLogo}
                </div>
                <div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 600 }}>{selectedBrief.brand} • {selectedBrief.niche}</div>
                  <h2 style={{ color: "var(--text)", fontWeight: 800, fontSize: 18, margin: "2px 0 0", letterSpacing: "-0.02em" }}>{selectedBrief.title}</h2>
                </div>
              </div>

              <button
                onClick={() => setSelectedBrief(null)}
                style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: "var(--surface-subtle)", border: "1px solid var(--border-strong)",
                  color: "var(--text)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
                }}
              >
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            {/* Brief Body Content */}
            <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: 28 }}>

              {/* Cover Banner */}
              <div style={{ position: "relative", height: 180, borderRadius: 16, overflow: "hidden", border: "1px solid var(--border-strong)" }}>
                <Image src={selectedBrief.image} alt={selectedBrief.title} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.7) 100%)" }} />
                <div style={{ position: "absolute", bottom: 14, left: 16, right: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 600 }}>Compensation</span>
                    <div style={{ color: "#10b981", fontWeight: 800, fontSize: 22, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>{selectedBrief.payment}</div>
                  </div>
                  {getStatusBadge(selectedBrief.status)}
                </div>
              </div>

              {/* Overview */}
              <div>
                <h4 style={{ color: "var(--text)", fontWeight: 700, fontSize: 15, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <FileText style={{ width: 16, height: 16, color: "#0284c7" }} /> Campaign Overview
                </h4>
                <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                  {selectedBrief.overview}
                </p>
              </div>

              {/* Deliverables */}
              <div style={{ padding: "20px", borderRadius: 16, background: "var(--surface)", border: "1px solid var(--border-strong)" }}>
                <h4 style={{ color: "var(--text)", fontWeight: 700, fontSize: 15, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  <Sparkles style={{ width: 16, height: 16, color: "#38bdf8" }} /> Required Deliverables
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {selectedBrief.deliverables.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text)", fontSize: 13, fontWeight: 600 }}>
                      <div style={{ width: 6, height: 6, borderRadius: 999, background: "#0284c7" }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Shots Checklist */}
              <div>
                <h4 style={{ color: "var(--text)", fontWeight: 700, fontSize: 15, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle2 style={{ width: 16, height: 16, color: "#10b981" }} /> Required Shots Checklist
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {selectedBrief.requiredShots.map((shot, idx) => (
                    <div key={idx} style={{ padding: "12px 14px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
                      <Check style={{ width: 15, height: 15, color: "#10b981", flexShrink: 0 }} />
                      <span style={{ color: "var(--text)", fontSize: 13, fontWeight: 500 }}>{shot}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Do's and Don'ts */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {/* Do's */}
                <div style={{ padding: "18px", borderRadius: 14, background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                  <h5 style={{ color: "#10b981", fontWeight: 700, fontSize: 14, margin: "0 0 10px", display: "flex", alignItems: "center", gap: 6 }}>
                    <Check style={{ width: 15, height: 15 }} /> Do's
                  </h5>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {selectedBrief.dos.map((item, idx) => (
                      <div key={idx} style={{ color: "var(--text-muted)", fontSize: 12, lineHeight: 1.5 }}>
                        • {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Don'ts */}
                <div style={{ padding: "18px", borderRadius: 14, background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                  <h5 style={{ color: "#ef4444", fontWeight: 700, fontSize: 14, margin: "0 0 10px", display: "flex", alignItems: "center", gap: 6 }}>
                    <XCircle style={{ width: 15, height: 15 }} /> Don'ts
                  </h5>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {selectedBrief.donts.map((item, idx) => (
                      <div key={idx} style={{ color: "var(--text-muted)", fontSize: 12, lineHeight: 1.5 }}>
                        • {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Brand Assets */}
              <div>
                <h4 style={{ color: "var(--text)", fontWeight: 700, fontSize: 15, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  <Download style={{ width: 16, height: 16, color: "#8b5cf6" }} /> Downloadable Brand Assets
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {selectedBrief.brandAssets.map((asset, idx) => (
                    <div key={idx} style={{ padding: "12px 14px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <FileText style={{ width: 16, height: 16, color: "var(--accent-text)" }} />
                        <div>
                          <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 13 }}>{asset.name}</div>
                          <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{asset.type} • {asset.size}</div>
                        </div>
                      </div>
                      <button className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reference Files */}
              <div>
                <h4 style={{ color: "var(--text)", fontWeight: 700, fontSize: 15, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  <Play style={{ width: 16, height: 16, color: "#0284c7" }} /> Reference Files & Examples
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {selectedBrief.referenceFiles.map((ref, idx) => (
                    <div key={idx} style={{ padding: "12px 14px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Play style={{ width: 16, height: 16, color: "#10b981" }} />
                        <div>
                          <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 13 }}>{ref.name}</div>
                          <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{ref.type} • {ref.duration}</div>
                        </div>
                      </div>
                      <button className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>
                        Preview
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submission Deadline Banner */}
              <div style={{ padding: "16px 20px", borderRadius: 14, background: "rgba(2, 132, 199, 0.08)", border: "1px solid rgba(2, 132, 199, 0.25)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ color: "var(--accent-text)", fontSize: 12, fontWeight: 700 }}>Submission Deadline</div>
                  <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, marginTop: 2 }}>{selectedBrief.deadline}</div>
                </div>

                <button
                  onClick={() => {
                    setSubmitModalOpen(true);
                  }}
                  className="btn btn-primary"
                  style={{ height: 42, padding: "0 22px", borderRadius: 12, fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}
                >
                  <Upload style={{ width: 15, height: 15 }} />
                  Submit Content
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ── 4. SUBMIT CONTENT MODAL ── */}
      {submitModalOpen && selectedBrief && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1100,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "24px"
        }}>
          <div className="card" style={{ maxWidth: 520, width: "100%", padding: "28px", borderRadius: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 18, margin: 0 }}>Submit Content Deliverable</h3>
                <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 3 }}>{selectedBrief.title} • {selectedBrief.brand}</div>
              </div>

              <button onClick={() => setSubmitModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer" }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* File Drop Zone */}
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Upload Your Content File</label>
                <input
                  ref={submitFileRef}
                  type="file"
                  accept="video/*,image/*"
                  style={{ display: "none" }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const f = e.target.files?.[0] ?? null;
                    setSubmitFile(f);
                  }}
                />
                <div
                  onClick={() => submitFileRef.current?.click()}
                  onDragOver={(e: DragEvent) => { e.preventDefault(); setIsSubmitDragging(true); }}
                  onDragLeave={() => setIsSubmitDragging(false)}
                  onDrop={(e: DragEvent) => {
                    e.preventDefault();
                    setIsSubmitDragging(false);
                    const f = e.dataTransfer.files?.[0] ?? null;
                    setSubmitFile(f);
                  }}
                  style={{
                    borderRadius: 14,
                    border: `2px dashed ${isSubmitDragging ? "#0284c7" : submitFile ? "#10b981" : "var(--border-strong)"}`,
                    background: isSubmitDragging ? "rgba(2,132,199,0.05)" : submitFile ? "rgba(16,185,129,0.05)" : "var(--surface-subtle)",
                    padding: "32px 20px", textAlign: "center", cursor: "pointer",
                    transition: "all 0.15s"
                  }}
                >
                  {submitFile ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <CheckCircle2 style={{ width: 30, height: 30, color: "#10b981" }} />
                      <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{submitFile.name}</div>
                      <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{(submitFile.size / (1024 * 1024)).toFixed(1)} MB · Click to change</div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                      <Upload style={{ width: 30, height: 30, color: "var(--text-subtle)" }} />
                      <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>Drop your content file here</div>
                      <div style={{ color: "var(--text-subtle)", fontSize: 12 }}>or click to browse · MP4, MOV, JPG, PNG</div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Creator Notes for Brand (Optional)</label>
                <textarea className="input" rows={3} placeholder="Here is the 30s video reel with natural lighting as requested..." style={{ resize: "none" }} />
              </div>

              <div style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                <div style={{ color: "#10b981", fontSize: 12, fontWeight: 700 }}>🔒 Escrow Protection Active</div>
                <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>{selectedBrief.payment} will be released automatically upon brand approval.</div>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <button onClick={() => setSubmitModalOpen(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                <button
                  onClick={() => {
                    alert("Submission uploaded successfully! Status set to Waiting for Review.");
                    setSubmitModalOpen(false);
                    setSelectedBrief(null);
                  }}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Confirm Submission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </DashLayout>
  );
}
