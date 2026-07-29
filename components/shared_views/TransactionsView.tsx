"use client";

import { useState } from "react";
import Link from "next/link";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  ShieldCheck, ArrowUpRight, ArrowDownLeft, Lock, CheckCircle2,
  Clock, DollarSign, CreditCard, Download, Filter, Search, Plus, Wallet
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  type: "escrow_funded" | "escrow_released" | "payout_withdrawal" | "subscription";
  description: string;
  campaign: string;
  amount: string;
  status: "locked_in_escrow" | "cleared_paid" | "processing";
  method: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "TX-9901",
    date: "Jul 29, 2026",
    type: "escrow_funded",
    description: "Escrow Deposit for Campaign Brief",
    campaign: "GlowBrand Vitamin C Launch",
    amount: "+$200.00",
    status: "locked_in_escrow",
    method: "Stripe Escrow Wallet"
  },
  {
    id: "TX-9892",
    date: "Jul 28, 2026",
    type: "escrow_released",
    description: "Milestone Deliverables Released",
    campaign: "TechFlow Headphones Review",
    amount: "+$300.00",
    status: "cleared_paid",
    method: "Escrow Release to Wallet"
  },
  {
    id: "TX-9840",
    date: "Jul 25, 2026",
    type: "payout_withdrawal",
    description: "Direct Bank Payout Clearance",
    campaign: "Withdrawal to Chase Bank (*8821)",
    amount: "-$450.00",
    status: "cleared_paid",
    method: "ACH Direct Deposit"
  },
  {
    id: "TX-9780",
    date: "Jul 20, 2026",
    type: "subscription",
    description: "Pro Creator Subscription Plan",
    campaign: "Monthly Plan Billing",
    amount: "-$29.00",
    status: "cleared_paid",
    method: "Visa Card ending in 4242"
  }
];

export default function TransactionsView() {
  const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<"all" | "escrow_funded" | "escrow_released" | "payout_withdrawal">("all");

  const filtered = transactions.filter(t => {
    if (activeTab === "all") return true;
    return t.type === activeTab;
  });

  return (
    <DashLayout title="Escrow Transactions">
      <PageHeader
        title="Escrow Wallet & Financial Transactions"
        subtitle="Full transparency into your escrow deposits, milestone payout releases, bank withdrawals, and subscription billing."
        action={
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/deposit" className="btn btn-primary" style={{ borderRadius: 12, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
              <Plus style={{ width: 15, height: 15 }} /> Fund Escrow Wallet
            </Link>
          </div>
        }
      />

      {/* ── ESCROW WALLET SUMMARY CARDS ── */}
      <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 28 }}>
        
        {/* Card 1: Locked Escrow */}
        <div className="card" style={{ padding: "22px", borderRadius: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }}>LOCKED IN ESCROW</span>
            <Lock style={{ width: 16, height: 16, color: "#0284c7" }} />
          </div>
          <div style={{ color: "#0284c7", fontWeight: 900, fontSize: 28 }}>$200.00</div>
          <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 4 }}>Protected until deliverable approval</div>
        </div>

        {/* Card 2: Cleared Payouts */}
        <div className="card" style={{ padding: "22px", borderRadius: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }}>CLEARED EARNINGS / PAYOUTS</span>
            <CheckCircle2 style={{ width: 16, height: 16, color: "#10b981" }} />
          </div>
          <div style={{ color: "#10b981", fontWeight: 900, fontSize: 28 }}>$3,840.00</div>
          <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 4 }}>Available for instant bank withdrawal</div>
        </div>

        {/* Card 3: Pending Escrow Releases */}
        <div className="card" style={{ padding: "22px", borderRadius: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }}>PENDING ESCROW RELEASES</span>
            <Clock style={{ width: 16, height: 16, color: "#f59e0b" }} />
          </div>
          <div style={{ color: "#f59e0b", fontWeight: 900, fontSize: 28 }}>$300.00</div>
          <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 4 }}>1 campaign under brand review</div>
        </div>

      </div>

      {/* ── FILTER TABS ── */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[
          { id: "all", label: "All Transactions" },
          { id: "escrow_funded", label: "Escrow Deposits" },
          { id: "escrow_released", label: "Escrow Releases" },
          { id: "payout_withdrawal", label: "Bank Payouts" },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            style={{
              padding: "8px 18px", borderRadius: 999, fontSize: 13, fontWeight: 700,
              cursor: "pointer", border: "none", transition: "all 0.15s",
              background: activeTab === t.id ? "#0284c7" : "var(--surface-subtle)",
              color: activeTab === t.id ? "#fff" : "var(--text-subtle)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TRANSACTIONS TABLE ── */}
      <div className="card table-responsive" style={{ padding: "24px", borderRadius: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Transaction ID & Date", "Description / Campaign", "Payment Method", "Status", "Amount"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", background: "var(--surface-subtle)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} style={{ borderBottom: "1px solid var(--border)" }}>
                
                {/* ID & Date */}
                <td style={{ padding: "16px" }}>
                  <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 13 }}>{row.id}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>{row.date}</div>
                </td>

                {/* Description */}
                <td style={{ padding: "16px" }}>
                  <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{row.description}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>{row.campaign}</div>
                </td>

                {/* Payment Method */}
                <td style={{ padding: "16px", color: "var(--text-muted)", fontSize: 12 }}>
                  {row.method}
                </td>

                {/* Status */}
                <td style={{ padding: "16px" }}>
                  <span className={`pill ${row.status === "locked_in_escrow" ? "pill-blue" : row.status === "cleared_paid" ? "pill-green" : "pill-amber"}`} style={{ fontSize: 10 }}>
                    {row.status === "locked_in_escrow" ? "Locked in Escrow" : row.status === "cleared_paid" ? "Cleared & Paid" : "Processing"}
                  </span>
                </td>

                {/* Amount */}
                <td style={{ padding: "16px" }}>
                  <span style={{
                    fontWeight: 900, fontSize: 15,
                    color: row.amount.startsWith("+") ? "#10b981" : "var(--text)"
                  }}>
                    {row.amount}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashLayout>
  );
}
