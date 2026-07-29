"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  HeartHandshake, Crown, Sparkles, DollarSign, Package, TrendingUp,
  CheckCircle2, Clock, Gift, ArrowRight, ShieldCheck, UserCheck, Search,
  Award, Star, ExternalLink, Plus, Filter, X, Send, Truck
} from "lucide-react";

interface AmbassadorProgram {
  id: string;
  brand: string;
  brandLogo: string;
  title: string;
  niche: string;
  monthlyRetainer: string;
  productBoxValue: string;
  affiliateCommission: string;
  contractLength: string;
  monthlyQuota: string;
  perks: string[];
  applied?: boolean;
}

const INITIAL_PROGRAMS: AmbassadorProgram[] = [
  {
    id: "AMB-101",
    brand: "GlowBrand Skincare",
    brandLogo: "GB",
    title: "Official Skincare Brand Ambassador 2025",
    niche: "Beauty & Skincare",
    monthlyRetainer: "$1,500 / month",
    productBoxValue: "$250 free products / month",
    affiliateCommission: "15% sales rev-share",
    contractLength: "6 Months",
    monthlyQuota: "4 Reels / month",
    perks: [
      "Guaranteed $1,500 monthly recurring cash retainer",
      "Free monthly VIP skincare package before launch",
      "Custom 15% discount promo code for your audience",
      "Featured on GlowBrand official Instagram & TikTok ads"
    ],
    applied: false
  },
  {
    id: "AMB-102",
    brand: "TechFlow Labs",
    brandLogo: "TF",
    title: "Lead Audio & Gadgets Ambassador",
    niche: "Tech & Audio",
    monthlyRetainer: "$2,200 / month",
    productBoxValue: "$400 free tech / month",
    affiliateCommission: "20% sales rev-share",
    contractLength: "12 Months",
    monthlyQuota: "5 Videos / month",
    perks: [
      "$2,200 monthly cash retainer via direct escrow deposit",
      "Free flagship headphones & accessories sent quarterly",
      "Custom 20% affiliate code with real-time payout tracking",
      "All-expenses-paid invite to TechFlow annual launch event"
    ],
    applied: true
  },
  {
    id: "AMB-103",
    brand: "NutriLife Fitness",
    brandLogo: "NL",
    title: "Nutrition & Fitness Ambassador",
    niche: "Fitness & Wellness",
    monthlyRetainer: "$1,200 / month",
    productBoxValue: "$200 free supplements / month",
    affiliateCommission: "15% sales rev-share",
    contractLength: "3 Months",
    monthlyQuota: "3 Reels / month",
    perks: [
      "$1,200 monthly guaranteed retainer",
      "Monthly protein & supplement supply box",
      "Exclusive ambassador merchandise kit",
      "Priority consideration for 1-year contract extension"
    ],
    applied: false
  }
];

export default function AmbassadorView() {
  const [viewMode, setViewMode] = useState<"creator" | "brand">("creator");
  const [programs, setPrograms] = useState<AmbassadorProgram[]>(INITIAL_PROGRAMS);
  const [selectedProgram, setSelectedProgram] = useState<AmbassadorProgram | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [pitchText, setPitchText] = useState("");
  const [createProgramModalOpen, setCreateProgramModalOpen] = useState(false);

  const handleApplySubmit = () => {
    if (!selectedProgram) return;
    setPrograms(prev => prev.map(p => {
      if (p.id !== selectedProgram.id) return p;
      return { ...p, applied: true };
    }));
    alert(`Application submitted to ${selectedProgram.brand}! You will receive updates in your notifications.`);
    setApplyModalOpen(false);
    setSelectedProgram(null);
  };

  return (
    <DashLayout title="Brand Ambassador Program">
      <PageHeader
        title="Brand Ambassador Program"
        subtitle="Connect for long-term monthly retainers, receive recurring product shipments, and earn affiliate commissions."
        action={
          <div style={{ display: "flex", gap: 10 }}>
            {/* View Switcher: Creator vs Brand */}
            <div style={{ display: "flex", background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", borderRadius: 12, padding: 3 }}>
              <button
                onClick={() => setViewMode("creator")}
                style={{
                  padding: "6px 14px", borderRadius: 9, fontSize: 12, fontWeight: 700,
                  background: viewMode === "creator" ? "#0284c7" : "transparent",
                  color: viewMode === "creator" ? "#fff" : "var(--text-subtle)",
                  border: "none", cursor: "pointer", fontFamily: "inherit"
                }}
              >
                Creator Retainers
              </button>
              <button
                onClick={() => setViewMode("brand")}
                style={{
                  padding: "6px 14px", borderRadius: 9, fontSize: 12, fontWeight: 700,
                  background: viewMode === "brand" ? "#8b5cf6" : "transparent",
                  color: viewMode === "brand" ? "#fff" : "var(--text-subtle)",
                  border: "none", cursor: "pointer", fontFamily: "inherit"
                }}
              >
                Recruit Ambassadors
              </button>
            </div>
          </div>
        }
      />

      {/* ── HERO BANNER ── */}
      <div className="card" style={{ padding: "26px", borderRadius: 22, background: "linear-gradient(135deg, rgba(2,132,199,0.12) 0%, rgba(245,158,11,0.08) 100%)", border: "1px solid rgba(2,132,199,0.3)", marginBottom: 28 }}>
        <div className="grid-responsive-2col" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 24, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(2,132,199,0.15)", border: "1px solid rgba(2,132,199,0.3)", borderRadius: 999, padding: "4px 12px", fontSize: 11, fontWeight: 800, color: "#0284c7", marginBottom: 12 }}>
              <HeartHandshake style={{ width: 13, height: 13 }} /> LONG-TERM BRAND RETAINERS
            </div>
            <h2 style={{ color: "var(--text)", fontWeight: 900, fontSize: 24, letterSpacing: "-0.03em", marginBottom: 8, lineHeight: 1.2 }}>
              {viewMode === "creator" ? "Secure Predictable Monthly Income as an Ambassador" : "Recruit Dedicated Brand Ambassadors for 3-12 Months"}
            </h2>
            <p style={{ color: "var(--text-subtle)", fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>
              {viewMode === "creator"
                ? "Stop chasing one-off deals. Join brand ambassador programs for guaranteed monthly cash retainers, free monthly product boxes, and affiliate revenue share."
                : "Build an army of loyal UGC creators who post consistently for your brand month after month with custom promo codes and automated product box shipments."}
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {viewMode === "creator" ? (
                <a href="#open-programs" className="btn btn-primary" style={{ borderRadius: 12, fontSize: 13, padding: "9px 20px" }}>
                  Browse Ambassador Openings <ArrowRight style={{ width: 14, height: 14 }} />
                </a>
              ) : (
                <button onClick={() => setCreateProgramModalOpen(true)} className="btn btn-primary" style={{ borderRadius: 12, fontSize: 13, padding: "9px 20px", background: "#8b5cf6" }}>
                  <Plus style={{ width: 14, height: 14 }} /> Post Ambassador Program
                </button>
              )}
            </div>
          </div>

          {/* Stats Highlight Box */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, background: "var(--surface)", padding: "18px", borderRadius: 16, border: "1px solid var(--border-strong)" }}>
            <div>
              <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>AVG RETAINER PAY</div>
              <div style={{ color: "#10b981", fontWeight: 900, fontSize: 22, marginTop: 4 }}>$1,850/mo</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>Guaranteed Cash</div>
            </div>
            <div>
              <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>AFFILIATE REV-SHARE</div>
              <div style={{ color: "#0284c7", fontWeight: 900, fontSize: 22, marginTop: 4 }}>15% – 20%</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>Per Sales Conversion</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ACTIVE AMBASSADOR RETAINER STATUS (For Creators) ── */}
      {viewMode === "creator" && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Award style={{ width: 18, height: 18, color: "#f59e0b" }} /> My Active Ambassador Retainers
          </div>

          <div className="card" style={{ padding: "20px 24px", borderRadius: 20, borderLeft: "5px solid #0284c7", background: "var(--surface)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "#0284c7", color: "#fff", fontWeight: 900, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  TF
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, margin: 0 }}>TechFlow Labs — Lead Audio Ambassador</h3>
                    <span className="pill pill-green" style={{ fontSize: 10 }}>Active (Month 3 of 12)</span>
                  </div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 3 }}>
                    Retainer: <strong>$2,200 / month</strong> · Promo Code: <strong>SARAH20</strong> (20% Off)
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ color: "#10b981", fontWeight: 900, fontSize: 18 }}>+$380.50 Earned</div>
                <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>Affiliate Commissions This Month</div>
              </div>
            </div>

            {/* Sub-status Row: Monthly Quota & Package Tracker */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
              <div style={{ padding: "10px 14px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
                <CheckCircle2 style={{ width: 16, height: 16, color: "#10b981" }} />
                <div>
                  <div style={{ color: "var(--text)", fontSize: 12, fontWeight: 700 }}>Monthly Content Quota: 3 of 5 Delivered</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>2 videos remaining for July payout</div>
                </div>
              </div>

              <div style={{ padding: "10px 14px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
                <Truck style={{ width: 16, height: 16, color: "#0284c7" }} />
                <div>
                  <div style={{ color: "var(--text)", fontSize: 12, fontWeight: 700 }}>Product Box Status: Dispatched</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>August Package arriving Friday via FedEx</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── OPEN AMBASSADOR PROGRAM LISTINGS ── */}
      <div id="open-programs">
        <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, marginBottom: 16 }}>
          {viewMode === "creator" ? "Open Ambassador Programs Hiring Now" : "Current Ambassador Recruitment Listings"}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {programs.map(p => (
            <div key={p.id} className="card card-lift" style={{ padding: "24px", borderRadius: 20 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: "#0284c7", color: "#fff", fontWeight: 900, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {p.brandLogo}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, margin: 0 }}>{p.title}</h3>
                      <span className="pill pill-blue" style={{ fontSize: 10 }}>{p.niche}</span>
                    </div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 3 }}>
                      {p.brand} · Contract Duration: <strong>{p.contractLength}</strong> · Quota: <strong>{p.monthlyQuota}</strong>
                    </div>
                  </div>
                </div>

                {/* Retainer Pay Highlight */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ color: "#10b981", fontWeight: 900, fontSize: 20 }}>{p.monthlyRetainer}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>+ {p.affiliateCommission}</div>
                </div>
              </div>

              {/* Perks Checklist */}
              <div style={{ padding: "14px 16px", borderRadius: 14, background: "var(--surface-subtle)", border: "1px solid var(--border)", marginBottom: 16 }}>
                <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", marginBottom: 8 }}>AMBASSADOR PERKS & BENEFITS:</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {p.perks.map((perk, idx) => (
                    <div key={idx} style={{ color: "var(--text-muted)", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                      <CheckCircle2 style={{ width: 13, height: 13, color: "#10b981", flexShrink: 0 }} />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "var(--text-subtle)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Package style={{ width: 14, height: 14, color: "#0284c7" }} /> {p.productBoxValue}</span>
                </div>

                {viewMode === "creator" ? (
                  p.applied ? (
                    <span style={{ color: "#10b981", fontSize: 12, fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <CheckCircle2 style={{ width: 14, height: 14 }} /> Application Submitted
                    </span>
                  ) : (
                    <button
                      onClick={() => { setSelectedProgram(p); setApplyModalOpen(true); }}
                      className="btn btn-primary"
                      style={{ borderRadius: 12, padding: "8px 20px", fontSize: 13 }}
                    >
                      Apply for Ambassador Role
                    </button>
                  )
                ) : (
                  <button className="btn btn-secondary" style={{ borderRadius: 12, padding: "8px 18px", fontSize: 12 }}>
                    Manage Applicants (12)
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── APPLY MODAL ── */}
      {applyModalOpen && selectedProgram && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1100,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "24px"
        }}>
          <div className="card" style={{ maxWidth: 540, width: "100%", padding: "28px", borderRadius: 22 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <div>
                <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 18, margin: 0 }}>Apply for Ambassador Role</h3>
                <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>{selectedProgram.title} • {selectedProgram.brand}</div>
              </div>
              <button onClick={() => setApplyModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer" }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(2,132,199,0.08)", border: "1px solid rgba(2,132,199,0.25)" }}>
                <div style={{ color: "#0284c7", fontSize: 12, fontWeight: 700 }}>Retainer Offer Summary</div>
                <div style={{ color: "var(--text)", fontSize: 13, fontWeight: 800, marginTop: 2 }}>{selectedProgram.monthlyRetainer} + {selectedProgram.affiliateCommission}</div>
              </div>

              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Why are you a great fit for {selectedProgram.brand}?</label>
                <textarea
                  value={pitchText}
                  onChange={e => setPitchText(e.target.value)}
                  placeholder="Share a short pitch explaining your content style, experience in skincare, and audience engagement..."
                  rows={4}
                  className="input"
                  style={{ width: "100%", resize: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                <button onClick={() => setApplyModalOpen(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                <button onClick={handleApplySubmit} className="btn btn-primary" style={{ flex: 1 }}>Submit Application</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
