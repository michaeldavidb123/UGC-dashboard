"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Zap, Crown, Star, ArrowRight, Sparkles, Shield, ChevronLeft } from "lucide-react";

/* ─────────────────────────────────────────────
   PLAN DATA
───────────────────────────────────────────── */
const creatorPlans = [
  {
    id: "creator_free", name: "Free", price: 0, yearlyPrice: 0,
    description: "Get started with UGC Studio at no cost.",
    icon: Zap, color: "#64748b", badge: null,
    features: ["Apply to 2 campaigns/month","Basic analytics","Community support","Standard payout (weekly)"],
    limits: "2 campaigns / month",
  },
  {
    id: "creator_pro", name: "Pro", price: 29, yearlyPrice: 290,
    description: "For active creators serious about UGC income.",
    icon: Star, color: "#0284c7", badge: "Most Popular",
    features: ["Apply to 20 campaigns/month","Priority campaign matching","Advanced analytics","Faster payout (3 days)","Pro profile badge"],
    limits: "20 campaigns / month",
  },
  {
    id: "creator_elite", name: "Elite", price: 79, yearlyPrice: 790,
    description: "For top creators scaling their content business.",
    icon: Crown, color: "#f59e0b", badge: "Best Value",
    features: ["Unlimited campaigns","Dedicated account manager","Real-time analytics","Same-day payout","Elite badge + priority listing","Early access to premium brands"],
    limits: "Unlimited",
  },
];

const brandPlans = [
  {
    id: "brand_starter", name: "Starter", price: 99, yearlyPrice: 990,
    description: "Launch your first UGC campaigns.",
    icon: Zap, color: "#64748b", badge: null,
    features: ["3 active campaigns","Up to 15 creator slots","Basic analytics","Email support","Standard creator pool"],
    limits: "3 campaigns",
  },
  {
    id: "brand_growth", name: "Growth", price: 299, yearlyPrice: 2990,
    description: "Scale your content production.",
    icon: Star, color: "#0284c7", badge: "Most Popular",
    features: ["15 active campaigns","Up to 50 creator slots","Advanced analytics & reporting","Priority support","Featured brand listing","Custom brief templates"],
    limits: "15 campaigns",
  },
  {
    id: "brand_enterprise", name: "Enterprise", price: 999, yearlyPrice: 9990,
    description: "Full-scale UGC operations.",
    icon: Crown, color: "#8b5cf6", badge: "Full Power",
    features: ["Unlimited campaigns","Unlimited creator slots","White-glove onboarding","Dedicated account manager","Custom integrations","SLA guarantee","Invoiced billing"],
    limits: "Unlimited",
  },
];

/* ─────────────────────────────────────────────
   PLAN CARD
───────────────────────────────────────────── */
function PlanCard({
  plan, selected, billing, onSelect
}: {
  plan: typeof creatorPlans[0];
  selected: boolean;
  billing: "monthly" | "yearly";
  onSelect: () => void;
}) {
  const Icon = plan.icon;
  const price = billing === "yearly" ? (plan.yearlyPrice / 12) : plan.price;
  const yearlySavings = plan.price * 12 - plan.yearlyPrice;

  return (
    <div
      onClick={onSelect}
      style={{
        position: "relative", padding: "28px 24px", borderRadius: 20, cursor: "pointer",
        background: selected ? `${plan.color}08` : "var(--surface)",
        border: `2px solid ${selected ? plan.color : "var(--border-strong)"}`,
        transition: "all 0.2s",
        boxShadow: selected ? `0 8px 32px ${plan.color}20` : "none",
        display: "flex", flexDirection: "column", gap: 20
      }}
    >
      {/* Popular badge */}
      {plan.badge && (
        <div style={{
          position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
          background: plan.color, color: "#fff",
          fontSize: 11, fontWeight: 800, padding: "4px 14px", borderRadius: 999,
          whiteSpace: "nowrap", letterSpacing: "0.04em"
        }}>
          {plan.badge}
        </div>
      )}

      {/* Selected check */}
      {selected && (
        <div style={{ position: "absolute", top: 16, right: 16, width: 22, height: 22, borderRadius: 999, background: plan.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Check style={{ width: 12, height: 12, color: "#fff" }} />
        </div>
      )}

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${plan.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon style={{ width: 18, height: 18, color: plan.color }} />
          </div>
          <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 17 }}>{plan.name}</div>
        </div>
        <div style={{ color: "var(--text-subtle)", fontSize: 12, lineHeight: 1.5 }}>{plan.description}</div>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ color: plan.color, fontWeight: 900, fontSize: price === 0 ? 32 : 36, letterSpacing: "-0.03em" }}>
            {price === 0 ? "Free" : `$${Math.round(price)}`}
          </span>
          {price > 0 && <span style={{ color: "var(--text-subtle)", fontSize: 13 }}>/mo</span>}
        </div>
        {billing === "yearly" && plan.yearlyPrice > 0 && (
          <div style={{ color: "#10b981", fontSize: 11, fontWeight: 700, marginTop: 2 }}>
            Save ${yearlySavings}/yr — billed ${plan.yearlyPrice} annually
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {plan.features.map(f => (
          <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <div style={{ width: 16, height: 16, borderRadius: 999, background: `${plan.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
              <Check style={{ width: 9, height: 9, color: plan.color }} />
            </div>
            <span style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.4 }}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function SubscriptionPage() {
  const router = useRouter();
  const [userType] = useState<"creator" | "brand">("creator"); // in real app, from auth context
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string>("creator_pro");

  const plans = userType === "creator" ? creatorPlans : brandPlans;
  const selected = plans.find(p => p.id === selectedPlan);

  const handleContinue = () => {
    // Store selected plan and billing cycle, then go to deposit
    localStorage.setItem("ugc_selected_plan", selectedPlan);
    localStorage.setItem("ugc_billing_cycle", billing);
    router.push("/deposit");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "var(--font-poppins), sans-serif" }}>
      {/* Header */}
      <header style={{ height: 64, borderBottom: "1px solid var(--border-strong)", background: "var(--sidebar-bg)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", position: "sticky", top: 0, zIndex: 50 }}>
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
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: 999, background: "#10b981" }} />
          <span style={{ color: "var(--text-subtle)", fontSize: 13 }}>Choose Your Plan</span>
        </div>
      </header>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "52px 24px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(2,132,199,0.08)", border: "1px solid rgba(2,132,199,0.2)", borderRadius: 999, padding: "5px 16px", fontSize: 12, fontWeight: 700, color: "#0284c7", marginBottom: 16 }}>
            <Crown style={{ width: 12, height: 12 }} /> Choose Your Plan
          </div>
          <h1 style={{ color: "var(--text)", fontWeight: 900, fontSize: 36, letterSpacing: "-0.03em", marginBottom: 12, lineHeight: 1.15 }}>
            {userType === "creator" ? "Start Earning with UGC Studio" : "Scale Your UGC Production"}
          </h1>
          <p style={{ color: "var(--text-subtle)", fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            {userType === "creator"
              ? "Pick a plan that matches your content goals. Upgrade or downgrade anytime."
              : "Choose the plan that fits your campaign volume. Cancel or scale anytime."}
          </p>
        </div>

        {/* Billing toggle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <div style={{ display: "flex", background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", borderRadius: 12, padding: 4, gap: 4 }}>
            {(["monthly", "yearly"] as const).map(b => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                style={{
                  padding: "9px 22px", borderRadius: 9, fontSize: 13, fontWeight: 700,
                  background: billing === b ? "var(--surface)" : "transparent",
                  border: `1px solid ${billing === b ? "var(--border-strong)" : "transparent"}`,
                  color: billing === b ? "var(--text)" : "var(--text-subtle)",
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
                  display: "flex", alignItems: "center", gap: 6,
                  boxShadow: billing === b ? "0 1px 4px rgba(0,0,0,0.08)" : "none"
                }}
              >
                {b === "monthly" ? "Monthly" : (
                  <>Yearly <span style={{ background: "#10b981", color: "#fff", fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 999 }}>Save 17%</span></>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
          {plans.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              selected={selectedPlan === plan.id}
              billing={billing}
              onSelect={() => setSelectedPlan(plan.id)}
            />
          ))}
        </div>

        {/* Trust row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 40, flexWrap: "wrap" }}>
          {[
            { icon: Shield, text: "Cancel anytime, no lock-in" },
            { icon: Check, text: "14-day money-back guarantee" },
            { icon: Sparkles, text: "Instant access after payment" },
          ].map(item => (
            <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--text-subtle)", fontSize: 13 }}>
              <item.icon style={{ width: 14, height: 14, color: "#10b981" }} />
              {item.text}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <button
            onClick={handleContinue}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "16px 48px", borderRadius: 14,
              background: selected?.price === 0 ? "#10b981" : "#0284c7",
              border: "none", color: "#fff",
              fontWeight: 800, fontSize: 16, cursor: "pointer",
              fontFamily: "inherit", letterSpacing: "-0.01em",
              boxShadow: `0 8px 28px ${selected?.price === 0 ? "rgba(16,185,129,0.35)" : "rgba(2,132,199,0.35)"}`,
              transition: "all 0.2s"
            }}
          >
            {selected?.price === 0 ? "Start for Free" : `Get ${selected?.name} — ${billing === "yearly" ? `$${selected?.yearlyPrice}/yr` : `$${selected?.price}/mo`}`}
            <ArrowRight style={{ width: 18, height: 18 }} />
          </button>
          <div style={{ color: "var(--text-subtle)", fontSize: 12 }}>
            {selected?.price === 0 ? "No credit card required" : "Secure payment · SSL encrypted"}
          </div>
        </div>
      </div>
    </div>
  );
}
