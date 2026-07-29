"use client";

import { useState } from "react";
import Image from "next/image";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  Folder, ArrowLeft, Plus, Upload, CheckCircle2, Clock, DollarSign, Key,
  Copy, Check, FileVideo, ExternalLink, ShieldCheck, ChevronRight, X
} from "lucide-react";

interface BrandContent {
  id: string;
  title: string;
  file: string;
  uploadDate: string;
  status: "approved" | "under_review" | "draft";
  size: string;
  duration: string;
  thumbnail: string;
}

interface BrandDeal {
  id: string;
  brand: string;
  brandLogo: string;
  niche: string;
  campaignTitle: string;
  escrowPayout: string;
  deadline: string;
  sparkCode: string;
  status: "active" | "completed";
  contents: BrandContent[];
}

const MOCK_BRAND_DEALS: BrandDeal[] = [
  {
    id: "BD-101",
    brand: "GlowBrand Skincare",
    brandLogo: "GB",
    niche: "Beauty & Skincare",
    campaignTitle: "Vitamin C Serum Launch 2025",
    escrowPayout: "$200.00",
    deadline: "Aug 10, 2025",
    sparkCode: "TT-SPARK-8924-GLOW",
    status: "active",
    contents: [
      { id: "C-1", title: "Morning Skincare Routine Reel", file: "glow_serum_reel_v1.mp4", uploadDate: "Today at 2:15 PM", status: "under_review", size: "142 MB", duration: "0:32", thumbnail: "/slide-1.png" },
      { id: "C-2", title: "Serum Texture Close-Up Shot", file: "serum_texture_broll.mp4", uploadDate: "Yesterday", status: "approved", size: "85 MB", duration: "0:15", thumbnail: "/slide-1.png" }
    ]
  },
  {
    id: "BD-102",
    brand: "TechFlow Labs",
    brandLogo: "TF",
    niche: "Tech & Audio",
    campaignTitle: "ANC Headphones Video Review",
    escrowPayout: "$300.00",
    deadline: "Aug 14, 2025",
    sparkCode: "IG-WHITELIST-4421-TF",
    status: "active",
    contents: [
      { id: "C-3", title: "Unboxing & Sound Quality Test", file: "anc_headphones_review.mp4", uploadDate: "Jul 26, 2025", status: "under_review", size: "210 MB", duration: "0:45", thumbnail: "/slide-2.png" }
    ]
  },
  {
    id: "BD-103",
    brand: "NutriLife Fitness",
    brandLogo: "NL",
    niche: "Fitness & Nutrition",
    campaignTitle: "High-Protein Smoothie Campaign",
    escrowPayout: "$150.00",
    deadline: "Jul 24, 2025",
    sparkCode: "PERPETUAL-BUYOUT-NL",
    status: "completed",
    contents: [
      { id: "C-4", title: "Protein Smoothie Prep Reel", file: "smoothie_recipe_final.mp4", uploadDate: "Jul 24, 2025", status: "approved", size: "118 MB", duration: "0:28", thumbnail: "/slide-3.png" }
    ]
  }
];

export default function CreatorDealsPage() {
  const [brandDeals, setBrandDeals] = useState<BrandDeal[]>(MOCK_BRAND_DEALS);
  const [selectedBrand, setSelectedBrand] = useState<BrandDeal | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newContentTitle, setNewContentTitle] = useState("");

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleUploadContent = () => {
    if (!selectedBrand || !newContentTitle) return;
    const newContent: BrandContent = {
      id: `C-${Math.floor(100 + Math.random() * 900)}`,
      title: newContentTitle,
      file: `${newContentTitle.toLowerCase().replace(/\s+/g, '_')}.mp4`,
      uploadDate: "Just now",
      status: "under_review",
      size: "95 MB",
      duration: "0:30",
      thumbnail: "/slide-1.png"
    };

    setBrandDeals(prev => prev.map(bd => {
      if (bd.id !== selectedBrand.id) return bd;
      return { ...bd, contents: [newContent, ...bd.contents] };
    }));

    setSelectedBrand(prev => prev ? { ...prev, contents: [newContent, ...prev.contents] } : null);
    alert(`Content "${newContentTitle}" uploaded to ${selectedBrand.brand}!`);
    setUploadModalOpen(false);
    setNewContentTitle("");
  };

  return (
    <DashLayout title="My Deals">
      
      {/* ── CASE 1: MAIN VIEW — BRAND CARDS GRID ── */}
      {!selectedBrand ? (
        <>
          <PageHeader
            title="My Deals & Brand Workspaces"
            subtitle="Click on any brand to open its folder, view all video contents, and manage deliverable uploads."
          />

          <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {brandDeals.map(deal => (
              <div
                key={deal.id}
                onClick={() => setSelectedBrand(deal)}
                className="card card-lift"
                style={{ borderRadius: 22, padding: "24px", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 18 }}
              >
                <div>
                  {/* Brand Header */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 14, background: "#0284c7", color: "#fff", fontWeight: 900, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {deal.brandLogo}
                      </div>
                      <div>
                        <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, margin: 0 }}>{deal.brand}</h3>
                        <span className="pill pill-blue" style={{ fontSize: 10, marginTop: 2, display: "inline-flex" }}>{deal.niche}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{deal.campaignTitle}</div>

                  {/* Contents Count Badge */}
                  <div style={{ padding: "10px 12px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: "var(--text-subtle)", display: "flex", alignItems: "center", gap: 6 }}>
                      <Folder style={{ width: 14, height: 14, color: "#0284c7" }} /> Brand Folder Contents
                    </span>
                    <strong style={{ color: "#0284c7", fontWeight: 800 }}>{deal.contents.length} Video Files</strong>
                  </div>
                </div>

                {/* Footer Payout & Open Action */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 10, fontWeight: 700 }}>ESCROW BUDGET</div>
                    <div style={{ color: "#10b981", fontWeight: 900, fontSize: 17 }}>{deal.escrowPayout}</div>
                  </div>

                  <button className="btn btn-primary btn-sm" style={{ borderRadius: 10, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                    Open Brand Folder <ChevronRight style={{ width: 14, height: 14 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (

        /* ── CASE 2: INSIDE OPENED BRAND WORKSPACE FOLDER ── */
        <>
          {/* Back Header Button */}
          <div style={{ marginBottom: 18 }}>
            <button
              onClick={() => setSelectedBrand(null)}
              className="btn btn-secondary"
              style={{ borderRadius: 10, fontSize: 12, display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <ArrowLeft style={{ width: 14, height: 14 }} /> Back to All Brands
            </button>
          </div>

          <PageHeader
            title={`${selectedBrand.brand} — Campaign Contents`}
            subtitle={`Campaign: ${selectedBrand.campaignTitle} • Deadline: ${selectedBrand.deadline}`}
            action={
              <button
                onClick={() => setUploadModalOpen(true)}
                className="btn btn-primary"
                style={{ borderRadius: 12, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}
              >
                <Plus style={{ width: 15, height: 15 }} /> Upload Content for {selectedBrand.brand}
              </button>
            }
          />

          {/* Escrow & Spark Code Banner */}
          <div className="card" style={{ padding: "20px 24px", borderRadius: 20, marginBottom: 28, background: "rgba(2,132,199,0.08)", border: "1px solid rgba(2,132,199,0.3)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>LOCKED ESCROW PAYOUT</div>
                <div style={{ color: "#10b981", fontWeight: 900, fontSize: 24 }}>{selectedBrand.escrowPayout}</div>
                <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>Released upon video deliverable approval</div>
              </div>

              <div>
                <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>SPARK ADS CODE</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <code style={{ background: "var(--surface)", padding: "5px 10px", borderRadius: 8, fontSize: 12, fontWeight: 700, color: "#0284c7" }}>
                    {selectedBrand.sparkCode}
                  </code>
                  <button onClick={() => copyCode(selectedBrand.sparkCode)} className="btn btn-ghost btn-sm">
                    {copiedCode ? <Check style={{ width: 13, height: 13, color: "#10b981" }} /> : <Copy style={{ width: 13, height: 13 }} />}
                    {copiedCode ? "Copied" : "Copy Code"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* BRAND CONTENTS LIST */}
          <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, marginBottom: 16 }}>
            Uploaded Video Contents ({selectedBrand.contents.length})
          </div>

          <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {selectedBrand.contents.map(item => (
              <div key={item.id} className="card card-lift" style={{ borderRadius: 20, overflow: "hidden", border: "1px solid var(--border-strong)" }}>
                {/* Thumbnail */}
                <div style={{ position: "relative", height: 180, background: "var(--surface-subtle)" }}>
                  <Image src={item.thumbnail} alt={item.title} fill style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)" }} />
                  
                  <div style={{ position: "absolute", top: 12, right: 12 }}>
                    <span className={`pill ${item.status === "approved" ? "pill-green" : "pill-amber"}`} style={{ fontSize: 10 }}>
                      {item.status === "approved" ? "Approved by Brand" : "Under Review"}
                    </span>
                  </div>

                  <div style={{ position: "absolute", bottom: 12, left: 14, right: 14, display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, color: "#fff" }}>
                    <span>{item.duration} · {item.size}</span>
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: "18px" }}>
                  <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 14, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>File: <code>{item.file}</code></div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>Uploaded: {item.uploadDate}</div>
                </div>
              </div>
            ))}
          </div>

          {/* UPLOAD MODAL FOR BRAND */}
          {uploadModalOpen && (
            <div style={{
              position: "fixed", inset: 0, zIndex: 1100,
              background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center", padding: "24px"
            }}>
              <div className="card" style={{ maxWidth: 480, width: "100%", padding: "28px", borderRadius: 22 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                  <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 18, margin: 0 }}>Upload Content for {selectedBrand.brand}</h3>
                  <button onClick={() => setUploadModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer" }}>
                    <X style={{ width: 18, height: 18 }} />
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Video Content Title</label>
                    <input
                      value={newContentTitle}
                      onChange={e => setNewContentTitle(e.target.value)}
                      placeholder="e.g. Skin Transformation Reel V2"
                      className="input"
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div style={{ border: "2px dashed var(--border-strong)", borderRadius: 14, padding: "28px", textAlign: "center", background: "var(--surface-subtle)" }}>
                    <Upload style={{ width: 30, height: 30, color: "#0284c7", margin: "0 auto 8px" }} />
                    <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>Select MP4 / MOV Video File</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>Max 500MB · 9:16 Vertical Reel</div>
                  </div>

                  <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
                    <button onClick={() => setUploadModalOpen(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                    <button onClick={handleUploadContent} className="btn btn-primary" style={{ flex: 1 }}>Upload to Brand Folder</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

    </DashLayout>
  );
}
