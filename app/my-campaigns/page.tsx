"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  Sparkles, Wand2, Video, Mic, CheckCircle2, Upload, Play, Pause,
  FileText, Clock, Key, ShieldCheck, DollarSign, Layers, Sliders,
  Eye, Download, RefreshCcw, Copy, Check, X, ArrowRight, Zap, Scissors, Smartphone
} from "lucide-react";

interface DealItem {
  id: string;
  brand: string;
  brandLogo: string;
  title: string;
  payout: string;
  deadline: string;
  status: "active" | "in_review" | "completed";
  niche: string;
  progress: number;
  image: string;
  sparkCode: string;
  script: { hook: string; body: string; cta: string };
  shotList: { step: number; title: string; desc: string; done: boolean }[];
}

const MOCK_DEALS: DealItem[] = [
  {
    id: "DEAL-101",
    brand: "GlowBrand Skincare",
    brandLogo: "GB",
    title: "Vitamin C Glow Serum Reel",
    payout: "$200.00",
    deadline: "Aug 10, 2025",
    status: "active",
    niche: "Beauty & Skincare",
    progress: 60,
    image: "/slide-1.png",
    sparkCode: "TT-SPARK-8924-GLOW",
    script: {
      hook: "Stop scrolling if your skin feels dry and dull by 2 PM every single day!",
      body: "I switched to GlowBrand's Vitamin C Serum. It's super lightweight, non-greasy, and gives instant glass skin glow.",
      cta: "Use code GLOW20 for 20% off before it sells out!"
    },
    shotList: [
      { step: 1, title: "3s Viral Hook Shot", desc: "Face close-up holding serum bottle in window daylight", done: true },
      { step: 2, title: "Texture & Dropper Shot", desc: "3 drops onto cheekbones showing gel texture", done: true },
      { step: 3, title: "Before vs After Skin", desc: "Side-by-side skin glow transition effect", done: false },
      { step: 4, title: "Call to Action Overlay", desc: "Hold bottle smiling with GLOW20 code text box", done: false }
    ]
  },
  {
    id: "DEAL-102",
    brand: "TechFlow Labs",
    brandLogo: "TF",
    title: "ANC Headphones Unboxing",
    payout: "$300.00",
    deadline: "Aug 14, 2025",
    status: "in_review",
    niche: "Tech & Audio",
    progress: 90,
    image: "/slide-2.png",
    sparkCode: "IG-WHITELIST-4421-TF",
    script: {
      hook: "These are the only headphones that completely muted a noisy flight...",
      body: "Active noise cancellation test in coffee shop. The bass depth is insane.",
      cta: "Tap link in bio to get $50 off today!"
    },
    shotList: [
      { step: 1, title: "Unboxing Magnetic Box", desc: "Sleek unboxing reveal shot", done: true },
      { step: 2, title: "ANC On/Off Test", desc: "Tap earcup button to show noise cancellation activation", done: true },
      { step: 3, title: "CTA & Battery Specs", desc: "Highlight 40-hour battery life", done: true }
    ]
  }
];

export default function MyDealsPage() {
  const [deals] = useState<DealItem[]>(MOCK_DEALS);
  const [selectedDeal, setSelectedDeal] = useState<DealItem>(MOCK_DEALS[0]);
  const [activeStudioTool, setActiveStudioTool] = useState<"teleprompter" | "storyboard" | "upload" | "licenses">("teleprompter");
  const [prompterSpeed, setPrompterSpeed] = useState<number>(3);
  const [prompterPlaying, setPrompterPlaying] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <DashLayout title="UGC Creator Studio Workstation">
      <PageHeader
        title="UGC Creator Studio Workstation"
        subtitle="Your all-in-one studio environment: AI Teleprompter, Storyboard Shot List, Video Deliverable Player, and Ad Whitelisting."
        action={
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="pill pill-green" style={{ fontSize: 11, fontWeight: 800, padding: "5px 12px" }}>
              <ShieldCheck style={{ width: 13, height: 13 }} /> Escrow Protected: {selectedDeal.payout}
            </span>
          </div>
        }
      />

      {/* ── TOP CAMPAIGN SELECTOR BAR ── */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, overflowX: "auto" }}>
        {deals.map(d => (
          <div
            key={d.id}
            onClick={() => setSelectedDeal(d)}
            style={{
              padding: "12px 18px", borderRadius: 16, cursor: "pointer",
              background: selectedDeal.id === d.id ? "rgba(2,132,199,0.12)" : "var(--surface)",
              border: `2px solid ${selectedDeal.id === d.id ? "#0284c7" : "var(--border-strong)"}`,
              display: "flex", alignItems: "center", gap: 12, minWidth: 260, transition: "all 0.15s"
            }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0284c7", color: "#fff", fontWeight: 900, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {d.brandLogo}
            </div>
            <div>
              <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 13 }}>{d.title}</div>
              <div style={{ color: "#10b981", fontWeight: 700, fontSize: 11 }}>{d.payout} Escrow</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── STUDIO WORKSTATION GRID ── */}
      <div className="grid-responsive-2col" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, alignItems: "start" }}>

        {/* LEFT COLUMN: STUDIO TOOLS WORKSPACE */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* TOOL NAV DOCK SWITCHER */}
          <div style={{ display: "flex", background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", borderRadius: 14, padding: 4, gap: 4 }}>
            {[
              { id: "teleprompter", label: "AI Teleprompter", icon: Wand2 },
              { id: "storyboard", label: "Shot-List Storyboard", icon: Layers },
              { id: "upload", label: "Video Upload & Player", icon: Video },
              { id: "licenses", label: "Spark Ads Code", icon: Key },
            ].map(tool => {
              const Icon = tool.icon;
              const isActive = activeStudioTool === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveStudioTool(tool.id as any)}
                  style={{
                    flex: 1, padding: "9px 12px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                    background: isActive ? "var(--surface)" : "transparent",
                    color: isActive ? "#0284c7" : "var(--text-subtle)",
                    border: `1px solid ${isActive ? "var(--border-strong)" : "transparent"}`,
                    cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6
                  }}
                >
                  <Icon style={{ width: 14, height: 14 }} />
                  {tool.label}
                </button>
              );
            })}
          </div>

          {/* 1. TOOL PANELS: TELEPROMPTER */}
          {activeStudioTool === "teleprompter" && (
            <div className="card" style={{ padding: "24px", borderRadius: 22, background: "var(--surface)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Wand2 style={{ width: 18, height: 18, color: "#f59e0b" }} />
                  <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, margin: 0 }}>AI Teleprompter Studio</h3>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    onClick={() => setPrompterPlaying(!prompterPlaying)}
                    className="btn btn-primary btn-sm"
                    style={{ borderRadius: 8, fontSize: 11 }}
                  >
                    {prompterPlaying ? <Pause style={{ width: 12, height: 12 }} /> : <Play style={{ width: 12, height: 12 }} />}
                    {prompterPlaying ? "Pause Scroll" : "Start Teleprompter"}
                  </button>
                </div>
              </div>

              {/* TELEPROMPTER SCREEN */}
              <div style={{
                height: 240, background: "#0f172a", borderRadius: 16, border: "2px solid #0284c7",
                padding: "24px", overflowY: "auto", color: "#f8fafc", fontFamily: "sans-serif",
                position: "relative", display: "flex", flexDirection: "column", gap: 16
              }}>
                <div style={{ borderLeft: "3px solid #f59e0b", paddingLeft: 12 }}>
                  <div style={{ color: "#f59e0b", fontSize: 10, fontWeight: 800, textTransform: "uppercase" }}>[0:00 - 0:03] VIRAL HOOK</div>
                  <div style={{ fontSize: 18, fontWeight: 800, marginTop: 4, lineHeight: 1.4 }}>“{selectedDeal.script.hook}”</div>
                </div>

                <div style={{ borderLeft: "3px solid #38bdf8", paddingLeft: 12 }}>
                  <div style={{ color: "#38bdf8", fontSize: 10, fontWeight: 800, textTransform: "uppercase" }}>[0:03 - 0:20] PRODUCT BODY</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4, lineHeight: 1.5, color: "#cbd5e1" }}>“{selectedDeal.script.body}”</div>
                </div>

                <div style={{ borderLeft: "3px solid #10b981", paddingLeft: 12 }}>
                  <div style={{ color: "#10b981", fontSize: 10, fontWeight: 800, textTransform: "uppercase" }}>[0:20 - 0:30] CALL TO ACTION</div>
                  <div style={{ fontSize: 17, fontWeight: 800, marginTop: 4, color: "#4ade80" }}>“{selectedDeal.script.cta}”</div>
                </div>
              </div>
            </div>
          )}

          {/* 2. TOOL PANELS: STORYBOARD SHOT LIST */}
          {activeStudioTool === "storyboard" && (
            <div className="card" style={{ padding: "24px", borderRadius: 22 }}>
              <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <Layers style={{ width: 18, height: 18, color: "#0284c7" }} /> Video Storyboard & Shot Checklist
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {selectedDeal.shotList.map(shot => (
                  <div key={shot.step} style={{ padding: "14px 16px", borderRadius: 14, background: shot.done ? "rgba(16,185,129,0.06)" : "var(--surface-subtle)", border: `1px solid ${shot.done ? "#10b981" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: shot.done ? "#10b981" : "var(--surface)", color: shot.done ? "#fff" : "var(--text)", fontWeight: 800, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {shot.done ? <Check style={{ width: 14, height: 14 }} /> : shot.step}
                      </div>
                      <div>
                        <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 13 }}>{shot.title}</div>
                        <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>{shot.desc}</div>
                      </div>
                    </div>
                    <span className={`pill ${shot.done ? "pill-green" : "pill-amber"}`} style={{ fontSize: 10 }}>
                      {shot.done ? "Recorded" : "Pending Shot"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. TOOL PANELS: VIDEO UPLOAD & PLAYER */}
          {activeStudioTool === "upload" && (
            <div className="card" style={{ padding: "24px", borderRadius: 22 }}>
              <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <Upload style={{ width: 18, height: 18, color: "#0284c7" }} /> Studio Deliverable Upload Zone
              </div>

              <div style={{ border: "2px dashed var(--border-strong)", borderRadius: 18, padding: "36px", textAlign: "center", background: "var(--surface-subtle)", cursor: "pointer", marginBottom: 16 }}>
                <Video style={{ width: 32, height: 32, color: "#0284c7", margin: "0 auto 10px" }} />
                <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 14 }}>Drag and Drop MP4 / MOV Video File</div>
                <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 4 }}>9:16 Vertical Ratio · Up to 4K 60fps · Max 500MB</div>
              </div>

              <button onClick={() => alert("Deliverable uploaded successfully!")} className="btn btn-primary" style={{ width: "100%", borderRadius: 12, padding: "12px", fontSize: 13 }}>
                Submit Video for Escrow Release
              </button>
            </div>
          )}

          {/* 4. TOOL PANELS: SPARK ADS CODE */}
          {activeStudioTool === "licenses" && (
            <div className="card" style={{ padding: "24px", borderRadius: 22 }}>
              <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <Key style={{ width: 18, height: 18, color: "#0284c7" }} /> Spark Ads & Whitelisting Licenses
              </div>

              <div style={{ padding: "16px", borderRadius: 14, background: "var(--surface-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>TIKTOK SPARK CODE</div>
                  <code style={{ fontSize: 14, fontWeight: 900, color: "#0284c7", marginTop: 2, display: "block" }}>{selectedDeal.sparkCode}</code>
                </div>
                <button onClick={() => copyCode(selectedDeal.sparkCode)} className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>
                  {copiedCode ? <Check style={{ width: 12, height: 12, color: "#10b981" }} /> : <Copy style={{ width: 12, height: 12 }} />}
                  {copiedCode ? "Copied" : "Copy Code"}
                </button>
              </div>

              <div style={{ color: "var(--text-subtle)", fontSize: 12 }}>
                Commercial usage license active for 90 days. Brand receives digital ad authorization for TikTok & Reels Spark Ads.
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: LIVE VIDEO REEL PREVIEW & PRODUCTION METRICS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          
          {/* VERTICAL REEL PREVIEW CANVAS */}
          <div className="card" style={{ padding: "20px", borderRadius: 22, textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ color: "var(--text)", fontWeight: 800, fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                <Smartphone style={{ width: 15, height: 15, color: "#0284c7" }} /> 9:16 Reel Preview
              </span>
              <span className="pill pill-green" style={{ fontSize: 10 }}>4K 60FPS</span>
            </div>

            <div style={{ position: "relative", height: 380, borderRadius: 18, overflow: "hidden", background: "#000" }}>
              <Image src={selectedDeal.image} alt="Video Preview" fill style={{ objectFit: "cover", opacity: 0.85 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.85) 100%)" }} />

              {/* Play Button Overlay */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: 999, background: "rgba(2,132,199,0.9)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}>
                  <Play style={{ width: 22, height: 22, fill: "#fff", marginLeft: 2 }} />
                </div>
              </div>

              {/* Video Caption & Brand Tags */}
              <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, textAlign: "left", color: "#fff" }}>
                <div style={{ fontSize: 12, fontWeight: 800 }}>@{selectedDeal.brand.toLowerCase().replace(/\s+/g, '')}</div>
                <div style={{ fontSize: 11, opacity: 0.9, marginTop: 2 }}>“{selectedDeal.script.hook}”</div>
              </div>
            </div>
          </div>

          {/* ESCROW CLEARANCE MILESTONE BOX */}
          <div className="card" style={{ padding: "20px", borderRadius: 20, background: "var(--surface)" }}>
            <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>ESCROW MILESTONE CLEARANCE</div>
            <div style={{ color: "#10b981", fontWeight: 900, fontSize: 28, marginTop: 2 }}>{selectedDeal.payout}</div>
            <p style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>
              Funds held securely in escrow. Released directly into your bank upon video deliverable approval.
            </p>
          </div>

        </div>

      </div>
    </DashLayout>
  );
}
