"use client";

import { useState } from "react";
import Image from "next/image";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  Upload, FileVideo, Eye, DollarSign, CheckCircle2, Plus, Tag,
  FolderOpen, PlayCircle, Lock, Sparkles, ExternalLink, X, Search
} from "lucide-react";

interface UploadItem {
  id: string;
  title: string;
  niche: string;
  fileSize: string;
  duration: string;
  uploadDate: string;
  status: "available_for_sale" | "assigned_to_deal" | "purchased";
  price: string;
  views: string;
  thumbnail: string;
  assignedBrand?: string;
}

const MOCK_UPLOADS: UploadItem[] = [
  {
    id: "UPL-101",
    title: "Vitamin C Serum Morning Routine Reel",
    niche: "Beauty & Skincare",
    fileSize: "142 MB",
    duration: "0:32",
    uploadDate: "Today at 2:15 PM",
    status: "assigned_to_deal",
    price: "$200.00",
    views: "1.4k views",
    thumbnail: "/slide-1.png",
    assignedBrand: "GlowBrand Skincare"
  },
  {
    id: "UPL-102",
    title: "Wireless ANC Headphones Unboxing & Sound Test",
    niche: "Tech & Audio",
    fileSize: "210 MB",
    duration: "0:45",
    uploadDate: "Yesterday",
    status: "available_for_sale",
    price: "$250.00",
    views: "890 views",
    thumbnail: "/slide-2.png"
  },
  {
    id: "UPL-103",
    title: "Post-Workout High-Protein Smoothie Prep",
    niche: "Fitness & Nutrition",
    fileSize: "118 MB",
    duration: "0:28",
    uploadDate: "Jul 20, 2025",
    status: "purchased",
    price: "$150.00",
    views: "3.2k views",
    thumbnail: "/slide-3.png",
    assignedBrand: "NutriLife Fitness"
  }
];

export default function CreatorUploadsPage() {
  const [uploads, setUploads] = useState<UploadItem[]>(MOCK_UPLOADS);
  const [activeTab, setActiveTab] = useState<"all" | "available" | "assigned" | "sold">("all");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("150");
  const [newNiche, setNewNiche] = useState("Beauty & Skincare");

  const handleUploadSubmit = () => {
    if (!newTitle) return;
    const newItem: UploadItem = {
      id: `UPL-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      niche: newNiche,
      fileSize: "98 MB",
      duration: "0:30",
      uploadDate: "Just now",
      status: "available_for_sale",
      price: `$${newPrice}.00`,
      views: "0 views",
      thumbnail: "/slide-1.png"
    };
    setUploads([newItem, ...uploads]);
    alert("New video content uploaded to your vault! Brands can now discover & purchase this reel.");
    setUploadModalOpen(false);
    setNewTitle("");
  };

  const filteredUploads = uploads.filter(u => {
    if (activeTab === "all") return true;
    if (activeTab === "available") return u.status === "available_for_sale";
    if (activeTab === "assigned") return u.status === "assigned_to_deal";
    if (activeTab === "sold") return u.status === "purchased";
    return true;
  });

  return (
    <DashLayout title="My Content Vault & Uploads">
      <PageHeader
        title="My Content Vault & Uploads"
        subtitle="Pre-created video reels and uploaded drafts ready for brands to assign, license, or purchase."
        action={
          <button
            onClick={() => setUploadModalOpen(true)}
            className="btn btn-primary"
            style={{ borderRadius: 12, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}
          >
            <Plus style={{ width: 15, height: 15 }} /> Upload Content to Vault
          </button>
        }
      />

      {/* ── STATUS TABS ── */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        {[
          { id: "all", label: "All Vault Uploads" },
          { id: "available", label: "Available for Sale" },
          { id: "assigned", label: "Assigned to Deals" },
          { id: "sold", label: "Purchased / Licensed" },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            style={{
              padding: "8px 18px", borderRadius: 999, fontSize: 13, fontWeight: 700,
              cursor: "pointer", border: "none", transition: "all 0.15s",
              background: activeTab === t.id ? "#0284c7" : "var(--surface-subtle)",
              color: activeTab === t.id ? "#fff" : "var(--text-subtle)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── UPLOADS GRID ── */}
      <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
        {filteredUploads.map(item => (
          <div key={item.id} className="card card-lift" style={{ borderRadius: 20, overflow: "hidden", border: "1px solid var(--border-strong)" }}>
            
            {/* Thumbnail Preview */}
            <div style={{ position: "relative", height: 180, background: "var(--surface-subtle)" }}>
              <Image src={item.thumbnail} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)" }} />
              
              <div style={{ position: "absolute", top: 12, right: 12 }}>
                <span className={`pill ${item.status === "available_for_sale" ? "pill-green" : item.status === "assigned_to_deal" ? "pill-blue" : "pill-purple"}`} style={{ fontSize: 10 }}>
                  {item.status === "available_for_sale" ? "Ready for Sale" : item.status === "assigned_to_deal" ? "Assigned to Deal" : "Sold"}
                </span>
              </div>

              <div style={{ position: "absolute", bottom: 12, left: 14, right: 14, display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, color: "#fff" }}>
                <span>{item.duration} · {item.fileSize}</span>
                <span>{item.views}</span>
              </div>
            </div>

            {/* Info Body */}
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <span className="pill pill-blue" style={{ fontSize: 10, marginBottom: 6, display: "inline-flex" }}>{item.niche}</span>
                <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 15, margin: 0, lineHeight: 1.3 }}>{item.title}</h3>
                <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 4 }}>Uploaded {item.uploadDate}</div>
              </div>

              {item.assignedBrand && (
                <div style={{ padding: "8px 12px", borderRadius: 10, background: "rgba(2,132,199,0.08)", border: "1px solid rgba(2,132,199,0.25)", fontSize: 12, color: "#0284c7", fontWeight: 700 }}>
                  Assigned Brand: {item.assignedBrand}
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                <div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 10, fontWeight: 700 }}>LIST PRICE</div>
                  <div style={{ color: "#10b981", fontWeight: 900, fontSize: 18 }}>{item.price}</div>
                </div>

                <button className="btn btn-secondary btn-sm" style={{ borderRadius: 10, fontSize: 12 }}>
                  Edit Details
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ── UPLOAD CONTENT MODAL ── */}
      {uploadModalOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1100,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "24px"
        }}>
          <div className="card" style={{ maxWidth: 500, width: "100%", padding: "28px", borderRadius: 22 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 18, margin: 0 }}>Upload Pre-Created Content to Vault</h3>
              <button onClick={() => setUploadModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer" }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Video Title / Description</label>
                <input
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Summer Skincare Unboxing Reel"
                  className="input"
                  style={{ width: "100%" }}
                />
              </div>

              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Asking Price ($)</label>
                <input
                  value={newPrice}
                  onChange={e => setNewPrice(e.target.value)}
                  placeholder="150"
                  className="input"
                  style={{ width: "100%" }}
                />
              </div>

              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Niche Category</label>
                <select value={newNiche} onChange={e => setNewNiche(e.target.value)} className="input" style={{ width: "100%" }}>
                  <option value="Beauty & Skincare">Beauty & Skincare</option>
                  <option value="Consumer Tech">Consumer Tech</option>
                  <option value="Fitness & Nutrition">Fitness & Nutrition</option>
                  <option value="Fashion & Apparel">Fashion & Apparel</option>
                </select>
              </div>

              {/* Upload Drag & Drop Area */}
              <div style={{ border: "2px dashed var(--border-strong)", borderRadius: 14, padding: "24px", textAlign: "center", background: "var(--surface-subtle)" }}>
                <Upload style={{ width: 28, height: 28, color: "#0284c7", margin: "0 auto 8px" }} />
                <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>Select MP4 / MOV Video File</div>
                <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>Vertical 9:16 format recommended</div>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
                <button onClick={() => setUploadModalOpen(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                <button onClick={handleUploadSubmit} className="btn btn-primary" style={{ flex: 1 }}>Save to Vault</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
