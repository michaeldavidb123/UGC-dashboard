"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check, Zap, Crown, Star, ArrowRight, Sparkles, Shield, ChevronLeft,
  DollarSign, TrendingUp, Award, ZapOff, Percent, CheckCircle2, Lock, Gift
} from "lucide-react";

/* ─────────────────────────────────────────────
   CREATOR PLANS (Reflecting Rewards & Net Profit)
───────────────────────────────────────────── */
const creatorPlans = [
  {
    id: "creator_free",
    name: "Free Creator",
    price: 0,
    yearlyPrice: 0,
    description: "Ideal for beginner creators starting out.",
    icon: Zap,
    color: "#64748b",
    badge: null,
    earningsPotential: "Up to $500/mo",
    feeDiscount: "15% Platform Fee",
    milestoneBonus: "0% Bonus",
    payoutTime: "7-Day Clearance",
    features: [
      "Apply to 2 Brand Deals / month",
      "Standard 15% platform fee on earnings",
      "Basic Analytics & Performance Tracking",
      "Community Hub & Support",
      "Standard 7-day payout clearance"
    ],
    limits: "2 campaigns / month",
  },
  {
    id: "creator_pro",
    name: "Pro Creator",
    price: 29,
    yearlyPrice: 290,
    description: "For active creators ready to maximize monthly income.",
    icon: Star,
    color: "#0284c7",
    badge: "Most Popular — 7x ROI",
    earningsPotential: "Up to $3,500/mo",
    feeDiscount: "5% Fee (Save 10%!)",
    milestoneBonus: "+10% Cash Bonus",
    payoutTime: "Instant 24-Hr Payout",
    features: [
      "Apply to 20 Brand Deals / month",
      "Low 5% platform fee (Save $200+ monthly in fees!)",
      "+10% Cash Bonus on all daily milestone task payouts",
      "Instant 24-hour payout clearance into bank",
      "Priority Brand Matchmaking & Placement",
      "Pro Verified Badge on Brand Discovery Marketplace"
    ],
    limits: "20 campaigns / month",
  },
  {
    id: "creator_elite",
    name: "Elite Creator",
    price: 79,
    yearlyPrice: 790,
    description: "For top-tier creators building a full-time content business.",
    icon: Crown,
    color: "#f59e0b",
    badge: "0% Fees — Max Profit",
    earningsPotential: "Unlimited ($10,000+/mo)",
    feeDiscount: "0% Fee (Keep 100%!)",
    milestoneBonus: "+25% Cash Bonus",
    payoutTime: "Same-Day Direct Bank",
    features: [
      "Unlimited Brand Deal applications",
      "KEEP 100% of all payouts (0% Platform Fee!)",
      "+25% Cash Bonus boost on all daily task milestones",
      "$100 Monthly Guaranteed Creator Reward Bonus",
      "Same-day direct bank payout clearance",
      "VIP Featured #1 position on Brand Marketplace",
      "Dedicated 1-on-1 Talent Agent & Contract Support"
    ],
    limits: "Unlimited",
  },
];

/* ─────────────────────────────────────────────
   BRAND PLANS (Reflecting ROAS & Talent Access)
───────────────────────────────────────────── */
const brandPlans = [
  {
    id: "brand_starter",
    name: "Brand Starter",
    price: 99,
    yearlyPrice: 990,
    description: "For startups testing high-converting UGC video ads.",
    icon: Zap,
    color: "#64748b",
    badge: null,
    earningsPotential: "3 Active Campaigns",
    feeDiscount: "Commercial License Included",
    milestoneBonus: "Up to 15 Creators",
    payoutTime: "Standard Clearance",
    features: [
      "Launch 3 active campaigns simultaneously",
      "Connect with up to 15 vetted creators",
      "Full Commercial & Organic Ad usage rights",
      "Escrow Payment Protection",
      "Standard email support"
    ],
    limits: "3 campaigns",
  },
  {
    id: "brand_growth",
    name: "Brand Growth",
    price: 299,
    yearlyPrice: 2990,
    description: "Scale your e-commerce ad creative volume & ROAS.",
    icon: Star,
    color: "#0284c7",
    badge: "Most Popular — 4.5x ROAS",
    earningsPotential: "15 Active Campaigns",
    feeDiscount: "Whitelisting Included",
    milestoneBonus: "Up to 50 Top Creators",
    payoutTime: "Priority Clearance",
    features: [
      "Launch 15 active campaigns simultaneously",
      "Connect with up to 50 Elite & Pro creators",
      "Full Ad Whitelisting & Creator Spark Ads rights",
      "Custom Script & Briefing Templates",
      "Advanced Conversion & ROAS Analytics",
      "Priority 24/7 Account Manager"
    ],
    limits: "15 campaigns",
  },
  {
    id: "brand_enterprise",
    name: "Enterprise",
    price: 999,
    yearlyPrice: 9990,
    description: "Full-scale UGC video production engine for high-volume brands.",
    icon: Crown,
    color: "#8b5cf6",
    badge: "Full Scale",
    earningsPotential: "Unlimited Campaigns",
    feeDiscount: "Full Master License",
    milestoneBonus: "Unlimited Creators",
    payoutTime: "Instant Clearance",
    features: [
      "Unlimited active campaigns & creator slots",
      "White-glove creator selection & scriptwriting",
      "Guaranteed 48-hour video delivery SLA",
      "Custom Legal Contracts & Full Buyout Rights",
      "Dedicated Creative Strategist & Account Manager",
      "Custom API & Slack Integration"
    ],
    limits: "Unlimited",
  },
];

export default function SubscriptionView() {
  const router = useRouter();
  const [userType, setUserType] = useState<"creator" | "brand">("creator");
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string>("creator_pro");
  const [estMonthlyEarnings, setEstMonthlyEarnings] = useState<number>(2000);

  const plans = userType === "creator" ? creatorPlans : brandPlans;
  const selected = plans.find(p => p.id === selectedPlan) || plans[1];

  /* Calculations for Creator Profit Calculator */
  const freeFee = estMonthlyEarnings * 0.15;
  const proFee = estMonthlyEarnings * 0.05 + (billing === "yearly" ? 24 : 29);
  const proBonus = estMonthlyEarnings * 0.10;
  const proNetExtra = (freeFee - proFee) + proBonus;

  const handleContinue = () => {
    localStorage.setItem("ugc_selected_plan", selectedPlan);
    localStorage.setItem("ugc_billing_cycle", billing);
    router.push("/deposit");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "var(--font-poppins), sans-serif" }}>
      {/* Top Header */}
      <header style={{ height: 64, borderBottom: "1px solid var(--border-strong)", background: "var(--sidebar-bg)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => router.back()}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 10,
              background: "var(--surface-subtle)", border: "1px solid var(--border-strong)",
              color: "var(--text)", fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s"
            }}
          >
            <ChevronLeft style={{ width: 15, height: 15 }} /> Back
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(2,132,199,0.35)" }}>
              <Sparkles style={{ width: 15, height: 15, color: "#fff" }} />
            </div>
            <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 15 }}>UGC Studio</span>
          </div>
        </div>

        {/* User Role Switcher: Creator vs Brand Plans */}
        <div style={{ display: "flex", background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", borderRadius: 12, padding: 3 }}>
          <button
            onClick={() => { setUserType("creator"); setSelectedPlan("creator_pro"); }}
            style={{
              padding: "6px 14px", borderRadius: 9, fontSize: 12, fontWeight: 700,
              background: userType === "creator" ? "#0284c7" : "transparent",
              color: userType === "creator" ? "#fff" : "var(--text-subtle)",
              border: "none", cursor: "pointer", fontFamily: "inherit"
            }}
          >
            Creator Plans
          </button>
          <button
            onClick={() => { setUserType("brand"); setSelectedPlan("brand_growth"); }}
            style={{
              padding: "6px 14px", borderRadius: 9, fontSize: 12, fontWeight: 700,
              background: userType === "brand" ? "#8b5cf6" : "transparent",
              color: userType === "brand" ? "#fff" : "var(--text-subtle)",
              border: "none", cursor: "pointer", fontFamily: "inherit"
            }}
          >
            Brand Plans
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "48px 24px" }}>
        
        {/* HERO SECTION */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(2,132,199,0.1)", border: "1px solid rgba(2,132,199,0.25)", borderRadius: 999, padding: "5px 16px", fontSize: 12, fontWeight: 800, color: "#0284c7", marginBottom: 14 }}>
            <Crown style={{ width: 14, height: 14 }} /> {userType === "creator" ? "CREATOR REWARD & PROFIT PLANS" : "BRAND GROWTH & ROAS PLANS"}
          </div>
          <h1 style={{ color: "var(--text)", fontWeight: 900, fontSize: 36, letterSpacing: "-0.03em", marginBottom: 12, lineHeight: 1.15 }}>
            {userType === "creator" ? "Keep More Earnings & Unlock Cash Bonuses" : "Scale E-Commerce ROAS with Top 1% Creators"}
          </h1>
          <p style={{ color: "var(--text-subtle)", fontSize: 15, maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
            {userType === "creator"
              ? "Higher tier plans slash platform fees from 15% down to 0% and add milestone cash rewards on every approved reel."
              : "Access high-converting UGC video creators with full commercial ad usage rights, whitelisting, and escrow protection."}
          </p>
        </div>

       

        {/* BILLING TOGGLE (Monthly vs Yearly) */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
          <div style={{ display: "flex", background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", borderRadius: 14, padding: 4, gap: 4 }}>
            {(["monthly", "yearly"] as const).map(b => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                style={{
                  padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 700,
                  background: billing === b ? "var(--surface)" : "transparent",
                  border: `1px solid ${billing === b ? "var(--border-strong)" : "transparent"}`,
                  color: billing === b ? "var(--text)" : "var(--text-subtle)",
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
                  display: "flex", alignItems: "center", gap: 6,
                  boxShadow: billing === b ? "0 2px 8px rgba(0,0,0,0.08)" : "none"
                }}
              >
                {b === "monthly" ? "Monthly Billing" : (
                  <>Yearly Billing <span style={{ background: "#10b981", color: "#fff", fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 999 }}>Save 20%</span></>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* PLAN CARDS GRID */}
        <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, marginBottom: 44 }}>
          {plans.map(plan => {
            const Icon = plan.icon;
            const price = billing === "yearly" ? Math.round(plan.yearlyPrice / 12) : plan.price;
            const isSelected = selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className="card card-lift"
                style={{
                  position: "relative", padding: "30px 24px", borderRadius: 22, cursor: "pointer",
                  background: isSelected ? `${plan.color}08` : "var(--surface)",
                  border: `2px solid ${isSelected ? plan.color : "var(--border-strong)"}`,
                  boxShadow: isSelected ? `0 12px 40px ${plan.color}25` : "var(--shadow-card)",
                  display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 20
                }}
              >
                {/* Badge Header */}
                {plan.badge && (
                  <div style={{
                    position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                    background: plan.color, color: "#fff",
                    fontSize: 11, fontWeight: 800, padding: "4px 16px", borderRadius: 999,
                    whiteSpace: "nowrap", letterSpacing: "0.04em", boxShadow: `0 4px 12px ${plan.color}40`
                  }}>
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Plan Name & Icon */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: `${plan.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon style={{ width: 19, height: 19, color: plan.color }} />
                    </div>
                    <div>
                      <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 18 }}>{plan.name}</div>
                    </div>
                  </div>
                  <p style={{ color: "var(--text-subtle)", fontSize: 12, lineHeight: 1.5, margin: "0 0 16px" }}>{plan.description}</p>

                  {/* Price Header */}
                  <div style={{ paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{ color: plan.color, fontWeight: 900, fontSize: price === 0 ? 32 : 38, letterSpacing: "-0.03em" }}>
                        {price === 0 ? "Free" : `$${price}`}
                      </span>
                      {price > 0 && <span style={{ color: "var(--text-subtle)", fontSize: 13, fontWeight: 600 }}>/month</span>}
                    </div>
                    {billing === "yearly" && plan.yearlyPrice > 0 && (
                      <div style={{ color: "#10b981", fontSize: 11, fontWeight: 700, marginTop: 4 }}>
                        Billed ${plan.yearlyPrice} annually (Save 20%)
                      </div>
                    )}
                  </div>

                  {/* CREATOR REWARD REASONS HIGHLIGHT BOX */}
                  <div style={{ margin: "16px 0", padding: "12px 14px", borderRadius: 14, background: "var(--surface-subtle)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                      <span style={{ color: "var(--text-subtle)", fontWeight: 500 }}>Fee Rate:</span>
                      <strong style={{ color: plan.color, fontWeight: 800 }}>{plan.feeDiscount}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                      <span style={{ color: "var(--text-subtle)", fontWeight: 500 }}>Milestone Cash Bonus:</span>
                      <strong style={{ color: "#10b981", fontWeight: 800 }}>{plan.milestoneBonus}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                      <span style={{ color: "var(--text-subtle)", fontWeight: 500 }}>Payout Speed:</span>
                      <strong style={{ color: "var(--text)", fontWeight: 700 }}>{plan.payoutTime}</strong>
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {plan.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                        <div style={{ width: 16, height: 16, borderRadius: 999, background: `${plan.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <Check style={{ width: 10, height: 10, color: plan.color }} />
                        </div>
                        <span style={{ color: "var(--text)", fontSize: 13, lineHeight: 1.4, fontWeight: 500 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Selection Button */}
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  style={{
                    width: "100%", padding: "12px", borderRadius: 12, fontWeight: 800, fontSize: 13,
                    background: isSelected ? plan.color : "var(--surface-subtle)",
                    color: isSelected ? "#fff" : "var(--text)",
                    border: `1px solid ${isSelected ? plan.color : "var(--border-strong)"}`,
                    cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit"
                  }}
                >
                  {isSelected ? "Selected Plan" : `Choose ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* TRUST BANNER */}
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 36, flexWrap: "wrap" }}>
          {[
            { icon: Shield, text: "Escrow Protection on Every Brief" },
            { icon: CheckCircle2, text: "Cancel or Switch Plans Anytime" },
            { icon: Sparkles, text: "Instant Plan Upgrades" },
          ].map(item => (
            <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-subtle)", fontSize: 13, fontWeight: 600 }}>
              <item.icon style={{ width: 15, height: 15, color: "#10b981" }} />
              {item.text}
            </div>
          ))}
        </div>

        {/* BOTTOM CONFIRMATION CTA */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <button
            onClick={handleContinue}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "16px 48px", borderRadius: 14,
              background: selected.price === 0 ? "#10b981" : "#0284c7",
              border: "none", color: "#fff",
              fontWeight: 800, fontSize: 16, cursor: "pointer",
              fontFamily: "inherit", letterSpacing: "-0.01em",
              boxShadow: `0 8px 28px ${selected.price === 0 ? "rgba(16,185,129,0.35)" : "rgba(2,132,199,0.35)"}`,
              transition: "all 0.2s"
            }}
          >
            {selected.price === 0 ? "Start for Free" : `Activate ${selected.name} — ${billing === "yearly" ? `$${selected.yearlyPrice}/yr` : `$${selected.price}/mo`}`}
            <ArrowRight style={{ width: 18, height: 18 }} />
          </button>
          <div style={{ color: "var(--text-subtle)", fontSize: 12 }}>
            {selected.price === 0 ? "No credit card required" : "Secure payment · 256-bit SSL encrypted"}
          </div>
        </div>

      </div>
    </div>
  );
}
