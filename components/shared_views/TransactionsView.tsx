"use client";

import DashLayout, { PageHeader } from "@/components/DashLayout";
import { ArrowUpRight, ArrowDownLeft, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

const TX = [
  { id: "TX-001", type: "credit", label: "Escrow Payout — GlowBrand Skincare", amount: "+$200.00", date: "Jul 28, 2025", status: "completed" },
  { id: "TX-002", type: "credit", label: "Escrow Payout — TechFlow Labs", amount: "+$300.00", date: "Jul 20, 2025", status: "completed" },
  { id: "TX-003", type: "debit",  label: "Pro Plan Subscription", amount: "−$29.00", date: "Jul 15, 2025", status: "completed" },
  { id: "TX-004", type: "credit", label: "Referral Reward — Marcus Lee joined", amount: "+$25.00", date: "Jul 12, 2025", status: "completed" },
  { id: "TX-005", type: "debit",  label: "Bank Withdrawal — Chase Direct", amount: "−$450.00", date: "Jul 10, 2025", status: "processing" },
];

export default function TransactionsView() {
  return (
    <DashLayout title="Transactions">
      <PageHeader title="Transaction History" subtitle="Full record of all escrow payouts, plan payments, withdrawals, and referral rewards." />

      <div className="card" style={{ borderRadius: 22, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Transaction", "Amount", "Date", "Status"].map(h => (
                <th key={h} style={{ padding: "14px 20px", textAlign: "left", color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>{h.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TX.map(tx => (
              <tr key={tx.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: tx.type === "credit" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {tx.type === "credit" ? <ArrowDownLeft style={{ width: 14, height: 14, color: "#10b981" }} /> : <ArrowUpRight style={{ width: 14, height: 14, color: "#ef4444" }} />}
                    </div>
                    <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{tx.label}</div>
                  </div>
                </td>
                <td style={{ padding: "16px 20px", fontWeight: 900, fontSize: 14, color: tx.type === "credit" ? "#10b981" : "#ef4444" }}>{tx.amount}</td>
                <td style={{ padding: "16px 20px", color: "var(--text-subtle)", fontSize: 13 }}>{tx.date}</td>
                <td style={{ padding: "16px 20px" }}>
                  <span className={`pill ${tx.status === "completed" ? "pill-green" : "pill-amber"}`} style={{ fontSize: 10 }}>
                    {tx.status === "completed" ? "Completed" : "Processing"}
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
