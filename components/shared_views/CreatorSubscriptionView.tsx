"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  Check, Sparkles, Zap, Shield, Crown, ArrowRight, TrendingUp,
  DollarSign, Clock, Award, Star, Info, ChevronRight
} from "lucide-react";

const CREATOR_PLANS = [
  {
    id: "free",
    name: "Free Creator",
    priceMonthly: "$0",
    priceYearly: "$0",
    period: "/month",
    description: "Essential tools to start applying to brand briefs and earning.",
    badge: null,
    accent: "#6b7280",
    features: [
      "3 Brand brief applications / mo",
      "Standard 15% platform fee",
      "Basic analytics dashboard",
      "Standard 7-day payout clearance",
      "Community lounge access",
    ],
    cta: "Current Free Plan",
    disabled: true,
  },
  {
    id: "pro",
    name: "Pro Creator",
    priceMonthly: "$29",
    priceYearly: "$24",
    period: "/month",
    description: "For active creators looking to boost earnings and get priority brand invites.",
    badge: "Most Popular",
    accent: "#0284c7",
    features: [
      "25 Brand brief applications / mo",
      "Reduced 5% platform fee (Save 10%!)",
      "+10% Task Milestone Cash Bonuses",
      "Priority campaign matching & Pro badge",
      "Faster 3-day payout clearance",
      "Full analytics suite & profile stats",
    ],
    cta: "Upgrade to Pro",
    disabled: false,
  },
  {
    id: "elite",
    name: "Elite Creator",
    priceMonthly: "$79",
    priceYearly: "$65",
    period: "/month",
    description: "For top creators running a full-time UGC content production business.",
    badge: "Maximum Earnings",
    accent: "#8b5cf6",
    features: [
      "UNLIMITED Brand brief applications",
      "0% Platform Fee (Keep 100% of earnings)",
      "+20% Task Milestone Cash Bonuses",
      "Same-Day instant payout clearance",
      "Dedicated account manager",
      "Elite badge + Top-of-search placement",
      "Early access to $1,000+ brand briefs",
    ],
    cta: "Go Elite",
    disabled: false,
  },
];

export default function CreatorSubscriptionView() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [estEarnings, setEstEarnings] = useState(2500);

  // Profit calculation
  const freeFee = estEarnings * 0.15;
  const proFee = estEarnings * 0.05;
  const proBonus = estEarnings * 0.10;
  const proNetExtra = (freeFee - proFee) + proBonus - (billingCycle === "yearly" ? 24 : 29);

  return (
    <DashLayout title="Creator Plans">
      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        .sub-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: 24px;
          align-items: stretch;
        }
        .calc-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 24px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .calc-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <PageHeader
        title="Creator Membership & Earnings Plans"
        subtitle="Upgrade your plan to cut platform fees to 0%, unlock 10%-20% milestone cash bonuses, and get priority brand invites."
      />

      {/* ── PROFIT CALCULATOR BANNER ── */}
      <div className="card" style={{ padding: "clamp(20px, 4vw, 28px)", borderRadius: 24, background: "linear-gradient(135deg, rgba(2,132,199,0.12) 0%, rgba(16,185,129,0.08) 100%)", border: "1px solid rgba(2,132,199,0.3)", marginBottom: 32 }}>
        <div className="calc-grid">
          <div>
            <div style={{ color: "#0284c7", fontWeight: 800, fontSize: 12, letterSpacing: "0.06em", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
              <TrendingUp style={{ width: 16, height: 16 }} /> CREATOR PROFIT CALCULATOR
            </div>
            <h3 style={{ color: "var(--text)", fontWeight: 900, fontSize: "clamp(18px, 4vw, 22px)", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
              Why Upgrading to Pro or Elite Pays for Itself
            </h3>
            <p style={{ color: "var(--text-subtle)", fontSize: 13, margin: "0 0 16px", lineHeight: 1.5 }}>
              Adjust your estimated monthly brand deal earnings to see how much extra cash you pocket on Pro vs Free:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700 }}>
                <span style={{ color: "var(--text-subtle)" }}>Monthly Brand Deal Earnings:</span>
                <span style={{ color: "#10b981", fontSize: 16, fontWeight: 900 }}>${estEarnings.toLocaleString()} / mo</span>
              </div>
              <input
                type="range"
                min={500}
                max={10000}
                step={250}
                value={estEarnings}
                onChange={e => setEstEarnings(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#0284c7", cursor: "pointer" }}
              />
            </div>
          </div>

          <div style={{ background: "var(--surface)", padding: "20px", borderRadius: 18, border: "1px solid var(--border-strong)" }}>
            <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>ESTIMATED EXTRA NET PROFIT ON PRO:</div>
            <div style={{ color: "#10b981", fontWeight: 900, fontSize: "clamp(26px, 5vw, 32px)", letterSpacing: "-0.03em", marginTop: 2 }}>
              +${Math.round(proNetExtra).toLocaleString()} <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-subtle)" }}>/mo extra</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)", fontSize: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>Fee Savings (5% vs 15%):</span>
                <strong style={{ color: "#10b981" }}>+${Math.round(freeFee - proFee).toLocaleString()}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>+10% Task Milestone Cash Bonus:</span>
                <strong style={{ color: "#10b981" }}>+${Math.round(proBonus).toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BILLING CYCLE TOGGLE ── */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
        <div style={{ background: "var(--surface)", padding: "4px", borderRadius: 14, border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 4 }}>
          <button
            onClick={() => setBillingCycle("monthly")}
            style={{
              padding: "8px 18px", borderRadius: 10, border: "none",
              background: billingCycle === "monthly" ? "#0284c7" : "transparent",
              color: billingCycle === "monthly" ? "#fff" : "var(--text-subtle)",
              fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit"
            }}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            style={{
              padding: "8px 18px", borderRadius: 10, border: "none",
              background: billingCycle === "yearly" ? "#0284c7" : "transparent",
              color: billingCycle === "yearly" ? "#fff" : "var(--text-subtle)",
              fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", gap: 6
            }}
          >
            Annual Billing
            <span className="pill pill-green" style={{ fontSize: 10, padding: "2px 6px" }}>Save 20%</span>
          </button>
        </div>
      </div>

      {/* ── CREATOR PLANS GRID ── */}
      <div className="sub-grid" style={{ marginBottom: 40 }}>
        {CREATOR_PLANS.map(plan => {
          const price = billingCycle === "yearly" ? plan.priceYearly : plan.priceMonthly;
          const isPro = plan.id === "pro";

          return (
            <div
              key={plan.id}
              className="card card-lift"
              style={{
                padding: "28px 24px", borderRadius: 24, display: "flex", flexDirection: "column",
                justify: "space-between", position: "relative",
                border: `2px solid ${isPro ? plan.accent : "var(--border)"}`,
                boxShadow: isPro ? `0 12px 36px ${plan.accent}20` : "none"
              }}
            >
              {plan.badge && (
                <div style={{ position: "absolute", top: -13, right: 24, background: plan.accent, color: "#fff", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 999, boxShadow: `0 4px 12px ${plan.accent}55` }}>
                  {plan.badge}
                </div>
              )}

              <div>
                <div style={{ color: plan.accent, fontWeight: 900, fontSize: 20, marginBottom: 4 }}>{plan.name}</div>
                <p style={{ color: "var(--text-subtle)", fontSize: 13, margin: "0 0 16px", minHeight: 38, lineHeight: 1.4 }}>{plan.description}</p>

                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 20 }}>
                  <span style={{ color: "var(--text)", fontWeight: 900, fontSize: 36, letterSpacing: "-0.03em" }}>{price}</span>
                  <span style={{ color: "var(--text-subtle)", fontSize: 13, fontWeight: 600 }}>{plan.period}</span>
                  {billingCycle === "yearly" && price !== "$0" && (
                    <span style={{ color: "#10b981", fontSize: 11, fontWeight: 700, marginLeft: 6 }}>Billed annually</span>
                  )}
                </div>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "var(--text)" }}>
                      <Check style={{ width: 15, height: 15, color: plan.accent, flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontWeight: f.includes("0%") || f.includes("UNLIMITED") ? 800 : 500 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                disabled={plan.disabled}
                className={plan.disabled ? "btn btn-ghost" : "btn btn-primary"}
                style={{
                  width: "100%", padding: "12px", borderRadius: 12, fontWeight: 800, fontSize: 14,
                  background: isPro ? plan.accent : undefined,
                  border: isPro ? "none" : undefined
                }}
              >
                {plan.cta}
              </button>
            </div>
          );
        })}
      </div>
    </DashLayout>
  );
}
