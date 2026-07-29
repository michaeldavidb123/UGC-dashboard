"use client";

import { useState } from "react";
import Image from "next/image";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  FileText, CheckCircle2, Clock, Upload, DollarSign, Key,
  Copy, Check, PlayCircle, Eye, ExternalLink, Filter, ShieldCheck, X
} from "lucide-react";

interface Deal {
  id: string;
  brand: string;
  brandLogo: string;
  title: string;
  payout: string;
  deadline: string;
  status: "active" | "submitted" | "completed";
  niche: string;
  deliverableFile?: string;
  uploadDate?: string;
  sparkCode: string;
}

const INITIAL_DEALS: Deal[] = [
  {
    id: "DEAL-101",
    brand: "GlowBrand Skincare",
    brandLogo: "GB",
    title: "Vitamin C Glow Serum Reel",
    payout: "$200.00",
    deadline: "Aug 10, 2025",
    status: "submitted",
    niche: "Beauty & Skincare",
    deliverableFile: "vitamin_c_glow_reel_v1.mp4",
    uploadDate: "Today at 2:15 PM",
    sparkCode: "TT-SPARK-8924-GLOW"
  },
  {
    id: "DEAL-102",
    brand: "TechFlow Labs",
    brandLogo: "TF",
    title: "Noise-Canceling Headphones Review",
    payout: "$300.00",
    deadline: "Aug 14, 2025",
    status: "active",
    niche: "Tech & Audio",
    sparkCode: "IG-WHITELIST-4421-TF"
  },
  {
    id: "DEAL-103",
    brand: "NutriLife Fitness",
    brandLogo: "NL",
    title: "High-Protein Smoothie Recipe",
    payout: "$150.00",
    deadline: "Jul 24, 2025",
    status: "completed",
    niche: "Fitness & Nutrition",
    deliverableFile: "protein_smoothie_final.mp4",
    uploadDate: "Jul 24, 2025",
    sparkCode: "PERPETUAL-BUYOUT-NL"
  }
];

export default function MyDealsPage() {
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "submitted" | "completed">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadingForId, setUploadingForId] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUploadSubmit = (dealId: string) => {
    setDeals(prev => prev.map(d => {
      if (d.id !== dealId) return d;
      return {
        ...d,
        status: "submitted",
        deliverableFile: "new_content_submission.mp4",
        uploadDate: "Just now"
      };
    }));
    alert("Video deliverable uploaded successfully! Brand has been notified for review.");
    setUploadingForId(null);
  };

  const filteredDeals = deals.filter(d => {
    if (activeTab === "all") return true;
    return d.status === activeTab;
  });

  return (
    <DashLayout title="My Deals & Assigned Campaigns">
      <PageHeader
        title="My Deals & Assigned Campaigns"
        subtitle="Contracted deals assigned to you by brands. Escrow funds are locked and released upon video deliverable clearance."
      />

      {/* ── CLEAN TAB FILTER BAR ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { id: "all", label: "All Deals" },
            { id: "active", label: "Pending Upload" },
            { id: "submitted", label: "Submitted Videos" },
            { id: "completed", label: "Completed & Paid" },
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
      </div>

      {/* ── CLEAN DEALS & UPLOADS TABLE ── */}
      <div className="card table-responsive" style={{ padding: "24px", borderRadius: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Brand & Campaign", "Payout (Escrow)", "Status", "Uploaded Deliverable", "Spark Ads Code", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", background: "var(--surface-subtle)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredDeals.map(deal => (
              <tr key={deal.id} style={{ borderBottom: "1px solid var(--border)" }}>
                
                {/* Brand & Campaign */}
                <td style={{ padding: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "#0284c7", color: "#fff", fontWeight: 900, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {deal.brandLogo}
                    </div>
                    <div>
                      <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 14 }}>{deal.title}</div>
                      <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>{deal.brand} • Deadline: {deal.deadline}</div>
                    </div>
                  </div>
                </td>

                {/* Payout */}
                <td style={{ padding: "16px" }}>
                  <div style={{ color: "#10b981", fontWeight: 900, fontSize: 16 }}>{deal.payout}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 10 }}>In Escrow</div>
                </td>

                {/* Status */}
                <td style={{ padding: "16px" }}>
                  <span className={`pill ${deal.status === "active" ? "pill-amber" : deal.status === "submitted" ? "pill-blue" : "pill-green"}`} style={{ fontSize: 10 }}>
                    {deal.status === "active" ? "Pending Upload" : deal.status === "submitted" ? "Under Review" : "Completed & Paid"}
                  </span>
                </td>

                {/* Uploaded Deliverable */}
                <td style={{ padding: "16px" }}>
                  {deal.deliverableFile ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <FileText style={{ width: 16, height: 16, color: "#0284c7" }} />
                      <div>
                        <div style={{ color: "var(--text)", fontSize: 12, fontWeight: 700 }}>{deal.deliverableFile}</div>
                        <div style={{ color: "var(--text-subtle)", fontSize: 10 }}>Uploaded {deal.uploadDate}</div>
                      </div>
                    </div>
                  ) : (
                    <span style={{ color: "var(--text-subtle)", fontSize: 12, italic: "true" }}>No file uploaded yet</span>
                  )}
                </td>

                {/* Spark Ads Code */}
                <td style={{ padding: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <code style={{ background: "var(--surface-subtle)", border: "1px solid var(--border)", padding: "4px 8px", borderRadius: 6, fontSize: 11, color: "#0284c7" }}>
                      {deal.sparkCode}
                    </code>
                    <button onClick={() => copyCode(deal.sparkCode, deal.id)} className="btn btn-ghost btn-sm" style={{ padding: 4 }}>
                      {copiedId === deal.id ? <Check style={{ width: 12, height: 12, color: "#10b981" }} /> : <Copy style={{ width: 12, height: 12 }} />}
                    </button>
                  </div>
                </td>

                {/* Actions */}
                <td style={{ padding: "16px" }}>
                  <button
                    onClick={() => setUploadingForId(deal.id)}
                    className={`btn ${deal.status === "active" ? "btn-primary" : "btn-secondary"} btn-sm`}
                    style={{ borderRadius: 10, fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <Upload style={{ width: 13, height: 13 }} />
                    {deal.status === "active" ? "Upload Video" : "Re-upload File"}
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── SIMPLE UPLOAD MODAL ── */}
      {uploadingForId && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1100,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "24px"
        }}>
          <div className="card" style={{ maxWidth: 480, width: "100%", padding: "28px", borderRadius: 22 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 18, margin: 0 }}>Upload Video Deliverable</h3>
              <button onClick={() => setUploadingForId(null)} style={{ background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer" }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div style={{ border: "2px dashed var(--border-strong)", borderRadius: 16, padding: "32px 20px", textAlign: "center", background: "var(--surface-subtle)", cursor: "pointer", marginBottom: 18 }}>
              <Upload style={{ width: 32, height: 32, color: "#0284c7", margin: "0 auto 10px" }} />
              <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>Click or drag MP4 / MOV video file here</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 4 }}>Maximum file size: 500MB</div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setUploadingForId(null)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button onClick={() => handleUploadSubmit(uploadingForId)} className="btn btn-primary" style={{ flex: 1 }}>Submit Video</button>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
