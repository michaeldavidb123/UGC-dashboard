"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import { Gift, Copy, Check, Users, DollarSign, Share2, QrCode } from "lucide-react";

export default function ReferralsView() {
  const [copied, setCopied] = useState(false);
  const refCode = "UGC-REF-A9X42";

  const copyCode = () => {
    navigator.clipboard.writeText(refCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashLayout title="Referrals">
      <PageHeader title="Referral Program" subtitle="Invite creators and brands to the platform and earn recurring commission rewards." />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 28 }}>
        {[
          { label: "Total Referrals", value: "12", color: "#0284c7" },
          { label: "Active Referrals", value: "8", color: "#10b981" },
          { label: "Earned So Far", value: "$340", color: "#f59e0b" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 22, borderRadius: 18, borderLeft: `4px solid ${s.color}` }}>
            <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>{s.label.toUpperCase()}</div>
            <div style={{ color: s.color, fontWeight: 900, fontSize: 28, marginTop: 4 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 24, borderRadius: 20, marginBottom: 24 }}>
        <h2 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, marginBottom: 14 }}>Your Referral Code</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <code style={{ background: "var(--surface-subtle)", padding: "10px 18px", borderRadius: 10, fontSize: 16, fontWeight: 800, color: "#0284c7", border: "1px solid var(--border)" }}>
            {refCode}
          </code>
          <button onClick={copyCode} className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {copied ? <Check style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>
        <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 10 }}>
          Earn <strong style={{ color: "#10b981" }}>$25 per referred creator</strong> that completes their first deal.
        </div>
      </div>
    </DashLayout>
  );
}
