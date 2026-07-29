"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  Wallet, DollarSign, ArrowUpRight, CheckCircle2, Clock, ShieldCheck,
  Building2, Plus, ArrowDownLeft
} from "lucide-react";

export default function CreatorEarningsPage() {
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("450.00");

  const handleWithdraw = () => {
    alert(`Payout request of $${withdrawAmount} submitted! Direct ACH Bank transfer initiated.`);
    setPayoutModalOpen(false);
  };

  return (
    <DashLayout title="Creator Earnings">
      <PageHeader
        title="Creator Earnings & Payout Wallet"
        subtitle="Track your cleared milestone earnings, escrow payouts, and request instant bank transfers."
        action={
          <button
            onClick={() => setPayoutModalOpen(true)}
            className="btn btn-primary"
            style={{ borderRadius: 12, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}
          >
            <ArrowUpRight style={{ width: 15, height: 15 }} /> Withdraw to Bank Account
          </button>
        }
      />

      {/* KPI Cards */}
      <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 28 }}>
        <div className="card" style={{ padding: "22px", borderRadius: 20 }}>
          <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>CLEARED EARNINGS</div>
          <div style={{ color: "#10b981", fontWeight: 900, fontSize: 30, marginTop: 4 }}>$3,840.00</div>
          <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>Ready for withdrawal</div>
        </div>

        <div className="card" style={{ padding: "22px", borderRadius: 20 }}>
          <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>LOCKED IN ESCROW</div>
          <div style={{ color: "#0284c7", fontWeight: 900, fontSize: 30, marginTop: 4 }}>$200.00</div>
          <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>GlowBrand Vitamin C Reel</div>
        </div>

        <div className="card" style={{ padding: "22px", borderRadius: 20 }}>
          <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>MILESTONE CASH BONUSES</div>
          <div style={{ color: "#f59e0b", fontWeight: 900, fontSize: 30, marginTop: 4 }}>+$350.00</div>
          <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>+10% Pro Plan Task Reward</div>
        </div>
      </div>

      {/* Payout Modal */}
      {payoutModalOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1100,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "24px"
        }}>
          <div className="card" style={{ maxWidth: 460, width: "100%", padding: "28px", borderRadius: 22 }}>
            <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 18, margin: "0 0 14px" }}>Request Direct Bank Payout</h3>
            
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Withdrawal Amount ($ USD)</label>
              <input
                value={withdrawAmount}
                onChange={e => setWithdrawAmount(e.target.value)}
                className="input"
                style={{ width: "100%", fontSize: 18, fontWeight: 800, color: "#10b981" }}
              />
            </div>

            <div style={{ padding: "12px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border)", fontSize: 12, color: "var(--text-subtle)", marginBottom: 18 }}>
              Bank Destination: <strong>Chase Direct Checking (*8821)</strong> · Arrival: <strong>Same Day</strong>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setPayoutModalOpen(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button onClick={handleWithdraw} className="btn btn-primary" style={{ flex: 1 }}>Confirm Payout</button>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
