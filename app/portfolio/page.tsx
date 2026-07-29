"use client";

import { useState } from "react";
import Image from "next/image";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  User, Sparkles, Star, Eye, TrendingUp, CheckCircle2, PlayCircle,
  Copy, ExternalLink, Camera, Video, Award, MessageSquare, Send, Check, X
} from "lucide-react";

export default function PortfolioPage() {
  const [copied, setCopied] = useState(false);
  const [inboundModalOpen, setInboundModalOpen] = useState(false);

  const copyPortfolioLink = () => {
    navigator.clipboard.writeText("https://ugcstudio.com/creator/sarah_mitchell");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashLayout title="Creator Portfolio">
      <PageHeader
        title="UGC Creator Showcase & Portfolio"
        subtitle="Your public, shareable creator portfolio for brand discovery and direct inbound deal offers."
        action={
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={copyPortfolioLink}
              className="btn btn-secondary"
              style={{ borderRadius: 12, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}
            >
              {copied ? <Check style={{ width: 14, height: 14, color: "#10b981" }} /> : <Copy style={{ width: 14, height: 14 }} />}
              {copied ? "Link Copied!" : "Copy Portfolio Link"}
            </button>
            <button
              onClick={() => setInboundModalOpen(true)}
              className="btn btn-primary"
              style={{ borderRadius: 12, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}
            >
              <Send style={{ width: 14, height: 14 }} /> Send Direct Offer
            </button>
          </div>
        }
      />

      {/* ── CREATOR PROFILE HERO BANNER ── */}
      <div className="card" style={{ padding: "28px", borderRadius: 24, background: "var(--surface)", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: "#0284c7", color: "#fff", fontWeight: 900, fontSize: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 8px 24px rgba(2,132,199,0.35)" }}>
              S
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h1 style={{ color: "var(--text)", fontWeight: 900, fontSize: 24, margin: 0, letterSpacing: "-0.02em" }}>Sarah Mitchell</h1>
                <CheckCircle2 style={{ width: 18, height: 18, color: "#38bdf8", fill: "#38bdf8" }} />
                <span className="pill pill-amber" style={{ fontSize: 10 }}>Elite UGC Creator</span>
              </div>
              <p style={{ color: "var(--text-subtle)", fontSize: 13, margin: "4px 0 10px" }}>
                Beauty, Skincare & Tech UGC Specialist · Based in Los Angeles, CA
              </p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span className="pill pill-blue">Beauty & Skincare</span>
                <span className="pill pill-purple">Consumer Tech</span>
                <span className="pill pill-green">Fitness & Wellness</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: "flex", gap: 24, background: "var(--surface-subtle)", padding: "16px 20px", borderRadius: 16, border: "1px solid var(--border)" }}>
            <div>
              <div style={{ color: "var(--text-subtle)", fontSize: 10, fontWeight: 700 }}>CREATOR RATING</div>
              <div style={{ color: "#fbbf24", fontWeight: 900, fontSize: 20, display: "flex", alignItems: "center", gap: 4 }}>
                <Star style={{ width: 16, height: 16, fill: "#fbbf24" }} /> 4.92 / 5.0
              </div>
            </div>
            <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: 24 }}>
              <div style={{ color: "var(--text-subtle)", fontSize: 10, fontWeight: 700 }}>TOTAL REEL VIEWS</div>
              <div style={{ color: "var(--text)", fontWeight: 900, fontSize: 20 }}>1.4M+</div>
            </div>
            <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: 24 }}>
              <div style={{ color: "var(--text-subtle)", fontSize: 10, fontWeight: 700 }}>COMPLETED REELS</div>
              <div style={{ color: "#10b981", fontWeight: 900, fontSize: 20 }}>120+</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TOP FEATURED REELS GALLERY ── */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 18, margin: 0 }}>Featured Video Reels Showcase</h3>
          <span style={{ color: "var(--text-subtle)", fontSize: 12 }}>High-converting vertical 9:16 ads</span>
        </div>

        <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { title: "GlowBrand Vitamin C Serum Reel", views: "480k views", conv: "5.4% Conv Rate", client: "GlowBrand", img: "/slide-1.png" },
            { title: "TechFlow Noise-Canceling Unboxing", views: "320k views", conv: "4.9% Conv Rate", client: "TechFlow Labs", img: "/slide-2.png" },
            { title: "NutriLife Protein Smoothie Prep", views: "290k views", conv: "4.2% Conv Rate", client: "NutriLife", img: "/slide-3.png" },
          ].map((reel, i) => (
            <div key={i} className="card card-lift" style={{ borderRadius: 20, overflow: "hidden", border: "1px solid var(--border-strong)" }}>
              <div style={{ position: "relative", height: 220, background: "var(--surface-subtle)" }}>
                <Image src={reel.img} alt={reel.title} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 999, background: "rgba(2,132,199,0.9)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", cursor: "pointer", boxShadow: "0 6px 20px rgba(0,0,0,0.4)" }}>
                    <PlayCircle style={{ width: 22, height: 22 }} />
                  </div>
                </div>
                <div style={{ position: "absolute", bottom: 12, left: 14, right: 14, display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, color: "#fff" }}>
                  <span>{reel.views}</span>
                  <span style={{ color: "#10b981" }}>{reel.conv}</span>
                </div>
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 14 }}>{reel.title}</div>
                <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>Client: {reel.client}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RATE CARD & EQUIPMENT ── */}
      <div className="grid-responsive-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        
        {/* Rate Card */}
        <div className="card" style={{ padding: "24px", borderRadius: 20 }}>
          <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, marginBottom: 16 }}>Standard Rate Card</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { service: "1x Vertical Video Reel (30-60s)", price: "$200.00" },
              { service: "3x Video Reels Bundle", price: "$500.00 (Save $100)" },
              { service: "Raw Video B-Roll Footage", price: "$120.00" },
              { service: "Monthly Ambassador Retainer (4 Videos)", price: "$1,500.00 / mo" },
            ].map(r => (
              <div key={r.service} style={{ display: "flex", justifyContent: "space-between", padding: "12px 14px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border)", fontSize: 13 }}>
                <span style={{ color: "var(--text)", fontWeight: 600 }}>{r.service}</span>
                <strong style={{ color: "#0284c7", fontWeight: 800 }}>{r.price}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment & Setup */}
        <div className="card" style={{ padding: "24px", borderRadius: 20 }}>
          <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, marginBottom: 16 }}>Recording Equipment & Setup</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Sony A7 IV 4K 60fps Camera & iPhone 15 Pro Max",
              "DJI Mic 2 Wireless Lavalier Audio System",
              "18-inch Dimmable Ring Light & 45° Softbox Diffuser",
              "Professional Video Editing (Final Cut Pro / CapCut)",
            ].map(eq => (
              <div key={eq} style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)", fontSize: 13 }}>
                <CheckCircle2 style={{ width: 15, height: 15, color: "#10b981", flexShrink: 0 }} />
                <span>{eq}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── INBOUND DIRECT OFFER MODAL ── */}
      {inboundModalOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1100,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "24px"
        }}>
          <div className="card" style={{ maxWidth: 520, width: "100%", padding: "28px", borderRadius: 22 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <div>
                <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 18, margin: 0 }}>Send Direct 1-on-1 Offer</h3>
                <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>Target Creator: Sarah Mitchell</div>
              </div>
              <button onClick={() => setInboundModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer" }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Campaign Title</label>
                <input placeholder="e.g. Summer Skincare 30s Reel Offer" className="input" style={{ width: "100%" }} />
              </div>

              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Offered Payout Budget ($)</label>
                <input placeholder="$350.00" className="input" style={{ width: "100%" }} />
              </div>

              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Offer Details / Brief Overview</label>
                <textarea placeholder="Describe the product and deliverables needed..." rows={3} className="input" style={{ width: "100%", resize: "none" }} />
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <button onClick={() => setInboundModalOpen(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                <button
                  onClick={() => {
                    alert("Direct offer sent to Sarah Mitchell!");
                    setInboundModalOpen(false);
                  }}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Send Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
