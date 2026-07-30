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
      `}</style>

      <PageHeader
        title="Creator Membership & Earnings Plans"
        subtitle="Upgrade your plan to cut platform fees to 0%, unlock 10%-20% milestone cash bonuses, and get priority brand invites."
      />

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
