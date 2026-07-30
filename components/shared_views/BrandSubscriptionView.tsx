"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  Check, Sparkles, Building2, Shield, Crown, ArrowRight,
  Users, Megaphone, Zap, FileText, CheckCircle2, Headphones
} from "lucide-react";

const BRAND_PLANS = [
  {
    id: "starter",
    name: "Starter Brand",
    priceMonthly: "$99",
    priceYearly: "$82",
    period: "/month",
    description: "Launch your first UGC campaigns and source authentic creator content.",
    badge: null,
    accent: "#7c3aed",
    features: [
      "3 Active campaigns simultaneously",
      "Up to 15 creator applicants per brief",
      "Standard escrow protection & refund policy",
      "Basic campaign performance analytics",
      "Email support response within 24h",
      "Standard creator pool access",
    ],
    cta: "Select Starter",
    disabled: false,
  },
  {
    id: "growth",
    name: "Growth Brand",
    priceMonthly: "$299",
    priceYearly: "$249",
    period: "/month",
    description: "Scale your content pipeline with featured listings & priority matching.",
    badge: "Most Popular",
    accent: "#8b5cf6",
    features: [
      "15 Active campaigns simultaneously",
      "Up to 50 creator applicants per brief",
      "Featured Brand placement on Marketplace",
      "AI Brief Assistant & script generator",
      "Custom brief templates & brand kit upload",
      "Priority creator matching & chat support",
      "Advanced ROI & video engagement analytics",
    ],
    cta: "Upgrade to Growth",
    disabled: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: "$999",
    priceYearly: "$830",
    period: "/month",
    description: "Full-scale UGC operations for large brands, agencies, and e-commerce portfolios.",
    badge: "Custom SLA",
    accent: "#0284c7",
    features: [
      "UNLIMITED Active campaigns & creators",
      "White-glove onboarding & account manager",
      "Custom team role permissions (Owner/Admin)",
      "Invoiced ACH & Net-30 billing terms",
      "Full digital rights & licensing clearance",
      "API & custom webhook integrations",
      "SLA turnaround guarantee",
    ],
    cta: "Contact Enterprise Sales",
    disabled: false,
  },
];

export default function BrandSubscriptionView() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <DashLayout title="Brand Plans">
      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        .brand-sub-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: 24px;
          align-items: stretch;
        }
      `}</style>

      <PageHeader
        title="Brand Workspace Membership & Campaign Plans"
        subtitle="Choose a plan tailored to your campaign volume, creator slots, and team collaboration needs."
      />

      {/* ── ESCROW & VALUE PROPOSITION HERO ── */}
      <div className="card" style={{ padding: "clamp(20px, 4vw, 28px)", borderRadius: 24, background: "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(2,132,199,0.08) 100%)", border: "1px solid rgba(124,58,237,0.3)", marginBottom: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 20, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 999, padding: "5px 14px", fontSize: 12, fontWeight: 700, color: "#8b5cf6", marginBottom: 12 }}>
              <Building2 style={{ width: 14, height: 14 }} /> Brand Campaign Scale
            </div>
            <h3 style={{ color: "var(--text)", fontWeight: 900, fontSize: "clamp(18px, 4vw, 22px)", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
              Escrow-Protected UGC Content Creation
            </h3>
            <p style={{ color: "var(--text-subtle)", fontSize: 13, margin: 0, lineHeight: 1.5 }}>
              All brand plans include 100% escrow protection. Funds are held safely until you approve your creator deliverables.
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { icon: Shield, title: "100% Escrow", desc: "Funds held until approval" },
              { icon: Zap, title: "Instant License", desc: "Full commercial usage rights" },
            ].map(b => (
              <div key={b.title} style={{ flex: 1, minWidth: 130, padding: 14, borderRadius: 14, background: "var(--surface)", border: "1px solid var(--border)" }}>
                <b.icon style={{ width: 18, height: 18, color: "#8b5cf6", marginBottom: 6 }} />
                <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 13 }}>{b.title}</div>
                <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{b.desc}</div>
              </div>
            ))}
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
              background: billingCycle === "monthly" ? "#8b5cf6" : "transparent",
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
              background: billingCycle === "yearly" ? "#8b5cf6" : "transparent",
              color: billingCycle === "yearly" ? "#fff" : "var(--text-subtle)",
              fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", gap: 6
            }}
          >
            Annual Billing
            <span className="pill pill-purple" style={{ fontSize: 10, padding: "2px 6px" }}>Save 20%</span>
          </button>
        </div>
      </div>

      {/* ── BRAND PLANS GRID ── */}
      <div className="brand-sub-grid" style={{ marginBottom: 40 }}>
        {BRAND_PLANS.map(plan => {
          const price = billingCycle === "yearly" ? plan.priceYearly : plan.priceMonthly;
          const isGrowth = plan.id === "growth";

          return (
            <div
              key={plan.id}
              className="card card-lift"
              style={{
                padding: "28px 24px", borderRadius: 24, display: "flex", flexDirection: "column",
                justify: "space-between", position: "relative",
                border: `2px solid ${isGrowth ? plan.accent : "var(--border)"}`,
                boxShadow: isGrowth ? `0 12px 36px ${plan.accent}20` : "none"
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
                  {billingCycle === "yearly" && (
                    <span style={{ color: "#10b981", fontSize: 11, fontWeight: 700, marginLeft: 6 }}>Billed annually</span>
                  )}
                </div>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "var(--text)" }}>
                      <Check style={{ width: 15, height: 15, color: plan.accent, flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontWeight: f.includes("UNLIMITED") || f.includes("Featured") ? 800 : 500 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="btn btn-primary"
                style={{
                  width: "100%", padding: "12px", borderRadius: 12, fontWeight: 800, fontSize: 14,
                  background: plan.accent, border: "none"
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
