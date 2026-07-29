"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  CreditCard, Building2, Wallet, Plus, Search, Filter,
  ArrowUpRight, ArrowDownLeft, CheckCircle2, Clock, XCircle, RotateCcw,
  Download, Receipt, FileText, Sparkles, ShieldCheck, X, Eye
} from "lucide-react";

/* ─────────────────────────────────────────────
   CONSTANTS & MOCK DATA
───────────────────────────────────────────── */
const STATUS_PILLS: Record<string, { label: string; pill: string }> = {
  completed:  { label: "Completed",  pill: "pill-green" },
  pending:    { label: "Pending",    pill: "pill-amber" },
  processing: { label: "Processing", pill: "pill-blue"  },
  failed:     { label: "Failed",     pill: "pill-red"   },
  refunded:   { label: "Refunded",   pill: "pill-purple"},
};

const METHOD_ICONS: Record<string, typeof CreditCard> = {
  card: CreditCard, bank: Building2, paypal: Wallet,
};

const userDeposits = [
  { id: "DEP-8902", date: "Jul 29, 2025 at 14:22", description: "Creator Pro Subscription — Monthly", amount: "$29.00", fee: "$0.00", total: "$29.00", method: "card", card: "Visa •••• 4242", status: "completed", ref: "pi_3MxtL24e589x12" },
  { id: "DEP-8841", date: "Jun 29, 2025 at 10:15", description: "Creator Pro Subscription — Monthly", amount: "$29.00", fee: "$0.00", total: "$29.00", method: "card", card: "Visa •••• 4242", status: "completed", ref: "pi_3Mxk814e589x99" },
  { id: "DEP-8790", date: "May 29, 2025 at 16:45", description: "Creator Pro Subscription — Monthly", amount: "$29.00", fee: "$0.00", total: "$29.00", method: "card", card: "Visa •••• 4242", status: "completed", ref: "pi_3Mxj124e589x44" },
  { id: "DEP-8622", date: "May 12, 2025 at 09:30", description: "Campaign Escrow Deposit — Summer Reel", amount: "$250.00", fee: "$0.00", total: "$250.00", method: "paypal", card: "sarah@paypal.com", status: "completed", ref: "pp_991823741" },
  { id: "DEP-8501", date: "Apr 29, 2025 at 11:00", description: "Creator Pro Subscription — Monthly", amount: "$29.00", fee: "$0.00", total: "$29.00", method: "card", card: "MC •••• 1234", status: "failed", ref: "pi_failed_881" },
];

export default function UserDepositsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMethod, setFilterMethod] = useState("all");
  const [selectedReceipt, setSelectedReceipt] = useState<typeof userDeposits[0] | null>(null);

  const filtered = userDeposits.filter(d => {
    const q = search.toLowerCase();
    const matchSearch = d.description.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || d.ref.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || d.status === filterStatus;
    const matchMethod = filterMethod === "all" || d.method === filterMethod;
    return matchSearch && matchStatus && matchMethod;
  });

  const totalSpent = "$366.00";
  const activePlan = "Creator Pro ($29/mo)";

  return (
    <DashLayout title="My Deposits">
      <PageHeader
        title="Deposits & Payment History"
        subtitle="View all your past subscription payments, deposit receipts, and billing history."
        action={
          <button
            onClick={() => router.push("/deposit")}
            className="btn btn-primary"
            style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 7 }}
          >
            <Plus style={{ width: 14, height: 14 }} /> Make New Deposit / Upgrade
          </button>
        }
      />

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 28 }}>
        <div className="stat-card card-lift">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "var(--text-subtle)", fontSize: 12, fontWeight: 600 }}>TOTAL DEPOSITED (LIFETIME)</span>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(2,132,199,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CreditCard style={{ width: 16, height: 16, color: "#0284c7" }} />
            </div>
          </div>
          <div style={{ color: "var(--text)", fontWeight: 900, fontSize: 30, letterSpacing: "-0.03em" }}>{totalSpent}</div>
          <div style={{ color: "#10b981", fontSize: 12, fontWeight: 600, marginTop: 4 }}>5 successful deposits</div>
        </div>

        <div className="stat-card card-lift">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "var(--text-subtle)", fontSize: 12, fontWeight: 600 }}>CURRENT PLAN</span>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles style={{ width: 16, height: 16, color: "#10b981" }} />
            </div>
          </div>
          <div style={{ color: "var(--text)", fontWeight: 900, fontSize: 24, letterSpacing: "-0.02em" }}>{activePlan}</div>
          <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 4 }}>Next billing: Aug 29, 2025</div>
        </div>

        <div className="stat-card card-lift">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "var(--text-subtle)", fontSize: 12, fontWeight: 600 }}>DEFAULT PAYMENT METHOD</span>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(139,92,246,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ShieldCheck style={{ width: 16, height: 16, color: "#8b5cf6" }} />
            </div>
          </div>
          <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 18, marginTop: 4 }}>Visa •••• 4242</div>
          <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 4 }}>Expires 08/28 · Auto-renew On</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
          <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "var(--text-subtle)" }} />
          <input
            type="text"
            placeholder="Search transactions or refs…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input"
            style={{ paddingLeft: 36, paddingTop: 8, paddingBottom: 8, fontSize: 13 }}
          />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <select className="input" style={{ fontSize: 13, paddingTop: 8, paddingBottom: 8, minWidth: 130 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">All Statuses</option>
            {Object.entries(STATUS_PILLS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <select className="input" style={{ fontSize: 13, paddingTop: 8, paddingBottom: 8, minWidth: 120 }} value={filterMethod} onChange={e => setFilterMethod(e.target.value)}>
            <option value="all">All Methods</option>
            <option value="card">Card</option>
            <option value="bank">Bank Transfer</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
      </div>

      {/* Deposits Table */}
      <div className="card" style={{ borderRadius: 18, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Transaction ID", "Date", "Description", "Payment Method", "Amount", "Status", "Receipt"].map(h => (
                <th key={h} style={{ padding: "14px 18px", textAlign: "left", color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", background: "var(--surface-subtle)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((dep, i) => {
              const st = STATUS_PILLS[dep.status];
              const MIcon = METHOD_ICONS[dep.method] || CreditCard;
              return (
                <tr key={dep.id} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "var(--surface-subtle)" }}>
                  <td style={{ padding: "16px 18px" }}>
                    <span style={{ color: "var(--text-subtle)", fontSize: 12, fontFamily: "monospace", fontWeight: 600 }}>{dep.id}</span>
                  </td>
                  <td style={{ padding: "16px 18px", color: "var(--text-subtle)", fontSize: 13, whiteSpace: "nowrap" }}>
                    {dep.date}
                  </td>
                  <td style={{ padding: "16px 18px" }}>
                    <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 13 }}>{dep.description}</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 11, fontFamily: "monospace", marginTop: 2 }}>Ref: {dep.ref}</div>
                  </td>
                  <td style={{ padding: "16px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <MIcon style={{ width: 14, height: 14, color: "var(--text-subtle)" }} />
                      <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{dep.card}</span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 18px" }}>
                    <span style={{ color: dep.status === "failed" ? "var(--text-subtle)" : "#0284c7", fontWeight: 800, fontSize: 14 }}>
                      {dep.amount}
                    </span>
                  </td>
                  <td style={{ padding: "16px 18px" }}>
                    <span className={`pill ${st.pill}`} style={{ fontSize: 11 }}>{st.label}</span>
                  </td>
                  <td style={{ padding: "16px 18px" }}>
                    <button
                      onClick={() => setSelectedReceipt(dep)}
                      className="btn btn-ghost btn-sm"
                      style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}
                    >
                      <Receipt style={{ width: 13, height: 13 }} /> View Receipt
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: "48px", textAlign: "center", color: "var(--text-subtle)", fontSize: 13 }}>
            No deposits found.
          </div>
        )}
      </div>

      {/* ════════════════════════════════
          RECEIPT MODAL
      ════════════════════════════════ */}
      {selectedReceipt && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1100, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div className="card" style={{ maxWidth: 440, width: "100%", padding: "28px", borderRadius: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(2,132,199,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Receipt style={{ width: 18, height: 18, color: "#0284c7" }} />
                </div>
                <div>
                  <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 16 }}>Payment Receipt</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{selectedReceipt.id}</div>
                </div>
              </div>
              <button onClick={() => setSelectedReceipt(null)} style={{ background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer" }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
              {[
                { label: "Description",    value: selectedReceipt.description },
                { label: "Date & Time",    value: selectedReceipt.date },
                { label: "Payment Method", value: selectedReceipt.card },
                { label: "Reference ID",   value: selectedReceipt.ref },
                { label: "Subtotal",       value: selectedReceipt.amount },
                { label: "Processing Fee", value: selectedReceipt.fee },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
                  <span style={{ color: "var(--text-subtle)" }}>{row.label}</span>
                  <span style={{ color: "var(--text)", fontWeight: 600, fontFamily: row.label.includes("ID") ? "monospace" : "inherit" }}>{row.value}</span>
                </div>
              ))}

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "var(--text)", fontWeight: 800, fontSize: 15 }}>Total Paid</span>
                <span style={{ color: "#0284c7", fontWeight: 900, fontSize: 20 }}>{selectedReceipt.total}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => window.print()} className="btn btn-secondary" style={{ flex: 1, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Download style={{ width: 14, height: 14 }} /> Download PDF
              </button>
              <button onClick={() => setSelectedReceipt(null)} className="btn btn-ghost" style={{ flex: 1 }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
