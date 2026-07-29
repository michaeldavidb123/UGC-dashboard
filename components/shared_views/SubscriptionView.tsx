"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import { Crown, Check, Sparkles, Zap, Shield } from "lucide-react";

const plans = [
  { id: "starter", name: "Starter", price: "$0", period: "/mo", features: ["3 brand applications/mo", "Basic analytics", "Community access"], cta: "Current Plan", current: true, color: "#6b7280" },
  { id: "pro", name: "Pro Creator", price: "$29", period: "/mo", features: ["Unlimited applications", "Priority matching", "Full analytics suite", "+10% earnings bonus", "Pro badge"], cta: "Upgrade to Pro", current: false, color: "#0284c7" },
  { id: "elite", name: "Elite", price: "$79", period: "/mo", features: ["Everything in Pro", "Dedicated account manager", "Early campaign access", "+20% earnings bonus", "Ambassador priority"], cta: "Go Elite", current: false, color: "#8b5cf6" },
];

export default function SubscriptionView() {
  const [selected, setSelected] = useState("starter");

  return (
    <DashLayout title="Subscription Plans">
      <PageHeader title="Subscription Plans" subtitle="Upgrade your plan to unlock higher earnings bonuses, unlimited brand applications, and priority matching." />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, maxWidth: 860, margin: "0 auto" }}>
        {plans.map(plan => (
          <div key={plan.id} onClick={() => setSelected(plan.id)} className="card" style={{ padding: 28, borderRadius: 22, cursor: "pointer", border: `2px solid ${selected === plan.id ? plan.color : "var(--border)"}`, transition: "all 0.2s" }}>
            <div style={{ color: plan.color, fontWeight: 900, fontSize: 18, marginBottom: 4 }}>{plan.name}</div>
            <div style={{ color: "var(--text)", fontWeight: 900, fontSize: 32 }}>{plan.price}<span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-subtle)" }}>{plan.period}</span></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "18px 0 22px" }}>
              {plan.features.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text)" }}>
                  <Check style={{ width: 14, height: 14, color: plan.color, flexShrink: 0 }} /> {f}
                </div>
              ))}
            </div>
            <button className={plan.current ? "btn btn-ghost" : "btn btn-primary"} style={{ width: "100%", borderRadius: 12 }}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </DashLayout>
  );
}
