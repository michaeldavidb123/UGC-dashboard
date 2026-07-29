"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  FileText, Clock, Upload, CheckCircle2, AlertCircle, DollarSign,
  Sparkles, Key, Wand2, PlayCircle, Eye, Download, X, Copy, Check,
  ChevronRight, ArrowRight, ShieldCheck, Flame, Send
} from "lucide-react";

interface DealItem {
  id: string;
  brand: string;
  brandLogo: string;
  title: string;
  payout: string;
  deadline: string;
  status: "active" | "in_review" | "revision_requested" | "completed";
  niche: string;
  progress: number;
  image: string;
  sparkCode: string;
  deliverables: string[];
  tasks: { step: number; name: string; due: string; reward: string; done: boolean }[];
}

const MOCK_DEALS: DealItem[] = [
  {
    id: "DEAL-101",
    brand: "GlowBrand",
    brandLogo: "GB",
    title: "Skincare Morning Routine Reel",
    payout: "$200.00",
    deadline: "Aug 10, 2025",
    status: "active",
    niche: "Beauty & Skincare",
    progress: 50,
    image: "/slide-1.png",
    sparkCode: "TT-SPARK-8924-GLOW",
    deliverables: ["1x 30s Vertical Reel (9:16)", "3x High-Res Still Photos"],
    tasks: [
      { step: 1, name: "Script & Visual Hook Draft", due: "11:00 AM Today", reward: "+$50.00", done: true },
      { step: 2, name: "Raw B-Roll & Texture Shoot", due: "4:00 PM Today", reward: "+$75.00", done: false },
      { step: 3, name: "Final Edit Cut & Voiceover", due: "10:00 PM Today", reward: "+$75.00", done: false },
    ]
  },
  {
    id: "DEAL-102",
    brand: "TechFlow Labs",
    brandLogo: "TF",
    title: "Noise-Canceling Headphones Review",
    payout: "$300.00",
    deadline: "Aug 14, 2025",
    status: "in_review",
    niche: "Tech & Audio",
    progress: 85,
    image: "/slide-2.png",
    sparkCode: "IG-WHITELIST-4421-TF",
    deliverables: ["1x 45s Product Review (9:16)", "2x Lifestyle Photos"],
    tasks: [
      { step: 1, name: "Script & Visual Storyboard", due: "Yesterday", reward: "+$75.00", done: true },
      { step: 2, name: "ANC Noise Test Video Shoot", due: "Yesterday", reward: "+$125.00", done: true },
      { step: 3, name: "Final Edit & Captions Upload", due: "Today at 9:00 AM", reward: "+$100.00", done: true },
    ]
  },
  {
    id: "DEAL-103",
    brand: "NutriLife",
    brandLogo: "NL",
    title: "High-Protein Smoothie Recipe",
    payout: "$150.00",
    deadline: "Jul 24, 2025",
    status: "completed",
    niche: "Fitness & Nutrition",
    progress: 100,
    image: "/slide-3.png",
    sparkCode: "PERPETUAL-BUYOUT-NL",
    deliverables: ["1x 30s Recipe Reel", "5x Food Photography Stills"],
    tasks: [
      { step: 1, name: "Recipe Preparation & Shoot", due: "Completed", reward: "+$75.00", done: true },
      { step: 2, name: "Final Video Cut Upload", due: "Completed", reward: "+$75.00", done: true },
    ]
  }
];

export default function MyDealsPage() {
  const [deals, setDeals] = useState<DealItem[]>(MOCK_DEALS);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedDeal, setSelectedDeal] = useState<DealItem | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [showAiHelper, setShowAiHelper] = useState(false);
  const [aiProduct, setAiProduct] = useState("Vitamin C Glow Serum");
  const [aiHooks, setAiHooks] = useState<string[]>([
    "Stop scrolling if your skin feels dry and dull by 2 PM every day!",
    "I tested 10 different Vitamin C serums so you don't have to...",
    "The $30 skincare secret dermatologists don't want you to know."
  ]);
  const [copiedCode, setCopiedCode] = useState(false);

  const copySparkCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const markTaskDone = (dealId: string, taskStep: number) => {
    setDeals(prev => prev.map(d => {
      if (d.id !== dealId) return d;
      const updatedTasks = d.tasks.map(t => t.step === taskStep ? { ...t, done: true } : t);
      const doneCount = updatedTasks.filter(t => t.done).length;
      const newProgress = Math.round((doneCount / updatedTasks.length) * 100);
      return { ...d, tasks: updatedTasks, progress: newProgress };
    }));
  };

  const filteredDeals = deals.filter(d => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return d.status === "active";
    if (activeTab === "in_review") return d.status === "in_review";
    if (activeTab === "completed") return d.status === "completed";
    return true;
  });

  return (
    <DashLayout title="My Deals Hub">
      <PageHeader
        title="My Deals & Campaign Workspace"
        subtitle="Manage active deals, complete daily task checklists, generate AI video hooks, and upload video deliverables."
      />

      {/* ── TABS FOR DEALS ── */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24, overflowX: "auto" }}>
        {[
          { id: "all", label: "All My Deals" },
          { id: "active", label: "Active Deals (1)" },
          { id: "in_review", label: "In Review (1)" },
          { id: "completed", label: "Completed (1)" },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "8px 18px", borderRadius: 999, fontSize: 13, fontWeight: 700,
              cursor: "pointer", border: "none", transition: "all 0.15s", whiteSpace: "nowrap",
              background: activeTab === t.id ? "#0284c7" : "var(--surface-subtle)",
              color: activeTab === t.id ? "#fff" : "var(--text-subtle)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── DEALS GRID ── */}
      <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
        {filteredDeals.map(deal => (
          <div key={deal.id} className="card card-lift" style={{ borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ position: "relative", height: 160, background: "var(--surface-subtle)" }}>
              <Image src={deal.image} alt={deal.title} fill style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.7) 100%)" }} />
              <div style={{ position: "absolute", top: 12, right: 12 }}>
                <span className={`pill ${deal.status === "active" ? "pill-green" : deal.status === "in_review" ? "pill-amber" : "pill-purple"}`} style={{ fontSize: 10 }}>
                  {deal.status === "active" ? "Active" : deal.status === "in_review" ? "Waiting Review" : "Completed"}
                </span>
              </div>
              <div style={{ position: "absolute", bottom: 12, left: 14, color: "#fff", fontWeight: 800, fontSize: 13 }}>
                {deal.brand}
              </div>
            </div>

            <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between", gap: 16 }}>
              <div>
                <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, margin: "0 0 6px" }}>{deal.title}</h3>
                <div style={{ color: "#10b981", fontWeight: 900, fontSize: 18 }}>{deal.payout} <span style={{ fontSize: 11, color: "var(--text-subtle)", fontWeight: 500 }}>in Escrow</span></div>
              </div>

              {/* Progress Bar */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, color: "var(--text-subtle)", marginBottom: 4 }}>
                  <span>Progress</span>
                  <span>{deal.progress}%</span>
                </div>
                <div style={{ height: 6, background: "var(--surface-subtle)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${deal.progress}%`, background: "linear-gradient(90deg, #0284c7, #10b981)", borderRadius: 999 }} />
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={() => setSelectedDeal(deal)}
                className="btn btn-primary"
                style={{ width: "100%", borderRadius: 12, padding: "10px", fontSize: 13 }}
              >
                Open Workspace & Upload <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── ALL-IN-ONE DEAL WORKSPACE MODAL (Daily Tasks + Video Upload + AI Helper + Spark Code) ── */}
      {selectedDeal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
          display: "flex", justifyContent: "flex-end"
        }}>
          <div style={{
            width: "100%", maxWidth: 680, height: "100vh",
            background: "var(--bg)", borderLeft: "1px solid var(--border-strong)",
            display: "flex", flexDirection: "column", overflowY: "auto"
          }}>
            
            {/* Header */}
            <div style={{ padding: "20px 24px", background: "var(--surface)", borderBottom: "1px solid var(--border-strong)", display: "flex", alignItems: "center", justifyContent: "space-between", sticky: "top", top: 0, zIndex: 10 }}>
              <div>
                <span className="pill pill-blue" style={{ fontSize: 10 }}>{selectedDeal.brand} • {selectedDeal.niche}</span>
                <h2 style={{ color: "var(--text)", fontWeight: 900, fontSize: 20, margin: "2px 0 0" }}>{selectedDeal.title}</h2>
              </div>
              <button onClick={() => setSelectedDeal(null)} style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer" }}>
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 24 }}>

              {/* 1. Escrow & Spark Code Banner */}
              <div style={{ padding: "16px", borderRadius: 16, background: "rgba(2,132,199,0.08)", border: "1px solid rgba(2,132,199,0.25)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>ESCROW PAYOUT</div>
                  <div style={{ color: "#10b981", fontWeight: 900, fontSize: 22 }}>{selectedDeal.payout}</div>
                </div>

                <div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>SPARK ADS CODE</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                    <code style={{ background: "var(--surface)", padding: "4px 8px", borderRadius: 6, fontSize: 11, color: "#0284c7" }}>{selectedDeal.sparkCode}</code>
                    <button onClick={() => copySparkCode(selectedDeal.sparkCode)} className="btn btn-ghost btn-sm">
                      {copiedCode ? <Check style={{ width: 12, height: 12, color: "#10b981" }} /> : <Copy style={{ width: 12, height: 12 }} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. AI SCRIPT ASSISTANT HELPER TOGGLE */}
              <div className="card" style={{ padding: "18px", borderRadius: 16, background: "var(--surface)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Sparkles style={{ width: 18, height: 18, color: "#f59e0b" }} />
                    <div>
                      <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>Need Viral Script Ideas?</div>
                      <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>Generate 3-second TikTok hooks & visual shot lists</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAiHelper(!showAiHelper)}
                    className="btn btn-secondary btn-sm"
                    style={{ borderRadius: 10, fontSize: 12 }}
                  >
                    {showAiHelper ? "Hide AI Helper" : "Open AI Helper"}
                  </button>
                </div>

                {showAiHelper && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>AI GENERATED VIRAL HOOKS:</div>
                    {aiHooks.map((h, i) => (
                      <div key={i} style={{ padding: "10px 12px", borderRadius: 10, background: "var(--surface-subtle)", border: "1px solid var(--border)", fontSize: 12, color: "var(--text)" }}>
                        “{h}”
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. DAILY TASK CHECKLIST */}
              <div>
                <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, marginBottom: 12 }}>Daily Task Checklist & Milestones</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {selectedDeal.tasks.map(task => (
                    <div key={task.step} style={{ padding: "14px 16px", borderRadius: 14, background: task.done ? "rgba(16,185,129,0.05)" : "var(--surface-subtle)", border: `1px solid ${task.done ? "#10b981" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: task.done ? "#10b981" : "var(--surface)", border: "1px solid var(--border)", color: task.done ? "#fff" : "var(--text)", fontWeight: 800, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {task.done ? <Check style={{ width: 14, height: 14 }} /> : task.step}
                        </div>
                        <div>
                          <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{task.name}</div>
                          <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{task.due} · <strong style={{ color: "#10b981" }}>{task.reward}</strong></div>
                        </div>
                      </div>

                      {!task.done && (
                        <button onClick={() => markTaskDone(selectedDeal.id, task.step)} className="btn btn-ghost btn-sm" style={{ fontSize: 11 }}>
                          Mark Done
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. VIDEO DELIVERABLE UPLOAD ZONE */}
              <div className="card" style={{ padding: "20px", borderRadius: 18 }}>
                <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <Upload style={{ width: 16, height: 16, color: "#0284c7" }} /> Upload Content Deliverable
                </div>

                <div style={{ border: "2px dashed var(--border-strong)", borderRadius: 14, padding: "28px", textAlign: "center", background: "var(--surface-subtle)", cursor: "pointer", marginBottom: 14 }}>
                  <Upload style={{ width: 28, height: 28, color: "var(--text-subtle)", margin: "0 auto 8px" }} />
                  <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>Drop your MP4 / MOV video file here</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>Max 500MB · 9:16 Vertical Video Format</div>
                </div>

                <button
                  onClick={() => {
                    alert("Deliverable uploaded successfully! Sent to brand for clearance.");
                    setSelectedDeal(null);
                  }}
                  className="btn btn-primary"
                  style={{ width: "100%", borderRadius: 12, padding: "12px", fontSize: 13, fontWeight: 700 }}
                >
                  Submit Deliverable for Review
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </DashLayout>
  );
}
