"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  Wallet, DollarSign, ArrowUpRight, ArrowDownLeft, CheckCircle2, Clock,
  ShieldCheck, Building2, Plus, CreditCard, Banknote, Download, Sparkles,
  TrendingUp, Lock, RefreshCw, AlertCircle, ChevronRight, FileText, Check,
  Zap, Award, ArrowRight, Eye, Info
} from "lucide-react";

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
interface EarningItem {
  id: string; campaign: string; brand: string; brandLogo: string;
  type: string; date: string; amount: string; status: "available" | "clearance" | "paid_out";
  clearanceDate?: string;
}

const MOCK_EARNINGS: EarningItem[] = [
  { id: "EARN-901", campaign: "Vitamin C Serum Morning Routine Reel", brand: "GlowBrand", brandLogo: "GB", type: "Short Video", date: "Jul 28, 2025", amount: "$350.00", status: "available" },
  { id: "EARN-902", campaign: "ANC Headphones Unboxing & Review", brand: "TechFlow Labs", brandLogo: "TF", type: "Product Review", date: "Jul 26, 2025", amount: "$500.00", status: "clearance", clearanceDate: "In 2 days" },
  { id: "EARN-903", campaign: "Summer Protein Smoothie Campaign", brand: "NutriLife", brandLogo: "NL", type: "Photo & Reel", date: "Jul 22, 2025", amount: "$250.00", status: "paid_out" },
  { id: "EARN-904", campaign: "Hydration Barrier Cream Testimonial", brand: "GlowBrand", brandLogo: "GB", type: "Testimonial", date: "Jul 15, 2025", amount: "$400.00", status: "paid_out" },
  { id: "EARN-905", campaign: "Smart Fitness Watch Unboxing", brand: "PulseFit", brandLogo: "PF", type: "Product Review", date: "Jul 10, 2025", amount: "$600.00", status: "paid_out" },
];

const MONTHLY_STATS = [
  { month: "Mar", earnings: "$1,200" },
  { month: "Apr", earnings: "$1,850" },
  { month: "May", earnings: "$2,400" },
  { month: "Jun", earnings: "$3,100" },
  { month: "Jul", earnings: "$3,840" },
];

export default function EarningsView() {
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [addMethodModalOpen, setAddMethodModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "available" | "clearance" | "paid_out">("all");
  const [withdrawAmount, setWithdrawAmount] = useState("1250.00");
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const filteredEarnings = MOCK_EARNINGS.filter(e => {
    if (activeTab === "all") return true;
    return e.status === activeTab;
  });

  const handleConfirmWithdraw = () => {
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawSuccess(false);
      setWithdrawModalOpen(false);
    }, 2000);
  };

  return (
    <DashLayout title="Creator Earnings">
      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        .earnings-hero-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
          align-items: center;
        }
        .earnings-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
          gap: 16px;
        }
        .earnings-pipeline-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
          gap: 16px;
        }
        @media (max-width: 860px) {
          .earnings-hero-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <PageHeader
        title="Creator Earnings & Escrow Payout Hub"
        subtitle="Manage your cleared earnings, track escrow clearance stages, and withdraw payouts to your bank or card."
        action={
          <button
            onClick={() => setWithdrawModalOpen(true)}
            className="btn btn-primary"
            style={{ borderRadius: 12, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, boxShadow: "0 4px 16px rgba(2,132,199,0.3)" }}
          >
            <ArrowUpRight style={{ width: 16, height: 16 }} /> Withdraw Payout
          </button>
        }
      />

      {/* ── HERO BALANCE CARD ── */}
      <div className="card" style={{ padding: "clamp(20px, 4vw, 32px)", borderRadius: 24, background: "linear-gradient(135deg, rgba(2,132,199,0.15) 0%, rgba(16,185,129,0.1) 100%)", border: "1px solid rgba(2,132,199,0.3)", marginBottom: 28, position: "relative", overflow: "hidden", maxWidth: "100%", boxSizing: "border-box" }}>
        <div style={{ position: "absolute", right: -50, top: -50, width: 260, height: 260, borderRadius: 999, background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="earnings-hero-grid">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 999, padding: "5px 14px", fontSize: 12, fontWeight: 700, color: "#10b981", marginBottom: 14 }}>
              <ShieldCheck style={{ width: 14, height: 14 }} /> Escrow Protected Wallet
            </div>

            <div style={{ color: "var(--text-subtle)", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 4 }}>AVAILABLE TO WITHDRAW</div>
            <div style={{ color: "var(--text)", fontWeight: 900, fontSize: "clamp(32px, 6vw, 44px)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 12 }}>
              $3,840.00
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", fontSize: 13 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#0284c7", fontWeight: 700 }}>
                <Clock style={{ width: 14, height: 14 }} /> $500.00 in Clearance
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-subtle)" }}>
                <CheckCircle2 style={{ width: 14, height: 14, color: "#10b981" }} /> $14,250.00 Lifetime Earned
              </span>
            </div>
          </div>

          {/* Quick Payout Destination Box */}
          <div style={{ background: "var(--surface)", padding: "20px", borderRadius: 20, border: "1px solid var(--border-strong)", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>PAYOUT DESTINATION</div>
              <span className="pill pill-green" style={{ fontSize: 10 }}>Default ACH</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(2,132,199,0.12)", border: "1px solid rgba(2,132,199,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Building2 style={{ width: 20, height: 20, color: "#0284c7" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Chase Direct Checking</div>
                <div style={{ color: "var(--text-subtle)", fontSize: 12 }}>•••• 8821 · Same-day ACH</div>
              </div>
            </div>

            <button
              onClick={() => setWithdrawModalOpen(true)}
              className="btn btn-primary"
              style={{ width: "100%", padding: "12px", borderRadius: 12, fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              Withdraw Available Funds <ArrowRight style={{ width: 14, height: 14 }} />
            </button>
          </div>
        </div>
      </div>

      {/* ── KPI STAT CARDS ── */}
      <div className="earnings-kpi-grid" style={{ marginBottom: 28 }}>
        {[
          { label: "Available Balance", val: "$3,840.00", sub: "Ready for withdrawal", color: "#10b981", icon: Wallet },
          { label: "Pending Clearance", val: "$500.00", sub: "Security clearance (2 days)", color: "#0284c7", icon: Clock },
          { label: "Milestone Cash Bonus", val: "+$350.00", sub: "Pro Creator reward tier", color: "#f59e0b", icon: Award },
          { label: "Platform Fee Rate", val: "0%", sub: "Pro Plan 0% fee active", color: "#8b5cf6", icon: Sparkles },
        ].map(k => (
          <div key={k.label} className="card card-lift" style={{ padding: 20, borderRadius: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }}>{k.label.toUpperCase()}</span>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: `${k.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <k.icon style={{ width: 16, height: 16, color: k.color }} />
              </div>
            </div>
            <div style={{ color: "var(--text)", fontWeight: 900, fontSize: "clamp(22px, 4vw, 26px)", letterSpacing: "-0.03em" }}>{k.val}</div>
            <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 4 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* ── MILESTONE BONUS PROGRESS ── */}
      <div className="card" style={{ padding: 22, borderRadius: 20, marginBottom: 28, background: "var(--surface)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(245,158,11,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Award style={{ width: 18, height: 18, color: "#f59e0b" }} />
            </div>
            <div>
              <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 15 }}>Next Creator Milestone Bonus</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 12 }}>Complete 2 more brand briefs to unlock a <strong>$100.00 cash bonus</strong>.</div>
            </div>
          </div>
          <span className="pill pill-amber" style={{ fontSize: 11, fontWeight: 700 }}>3 / 5 Briefs Done</span>
        </div>
        <div style={{ height: 8, background: "var(--progress-bg)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: "60%", background: "linear-gradient(90deg, #f59e0b, #fbbf24)", borderRadius: 999 }} />
        </div>
      </div>

      {/* ── ESCROW CLEARANCE PIPELINE ── */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, marginBottom: 14 }}>Escrow Clearance Pipeline</div>
        <div className="earnings-pipeline-grid">
          {[
            { step: "01", title: "Brand Escrow Locked", desc: "Funds locked safely in brand escrow upon campaign brief approval.", icon: Lock, status: "Secure", color: "#0284c7" },
            { step: "02", title: "Deliverable Approved", desc: "Brand reviews and accepts video/photo deliverable.", icon: CheckCircle2, status: "Active", color: "#f59e0b" },
            { step: "03", title: "Cleared for Payout", desc: "Funds automatically released to your available balance.", icon: Wallet, status: "Cleared", color: "#10b981" },
          ].map(p => (
            <div key={p.step} className="card" style={{ padding: 20, borderRadius: 18, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `${p.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p.icon style={{ width: 18, height: 18, color: p.color }} />
                </div>
                <span className="pill" style={{ background: `${p.color}15`, color: p.color, fontSize: 10, fontWeight: 700 }}>{p.status}</span>
              </div>
              <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{p.title}</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 12, lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EARNINGS HISTORY TABLE ── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 17 }}>Escrow & Earnings History</div>

          {/* Filter Tabs */}
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
            {[
              { id: "all", label: "All Records" },
              { id: "available", label: "Available" },
              { id: "clearance", label: "In Clearance" },
              { id: "paid_out", label: "Paid Out" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: "6px 14px", borderRadius: 10, border: "none",
                  background: activeTab === tab.id ? "#0284c7" : "var(--surface-subtle)",
                  color: activeTab === tab.id ? "#fff" : "var(--text-subtle)",
                  fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  whiteSpace: "nowrap", transition: "all 0.15s"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="card" style={{ borderRadius: 20, overflow: "hidden", maxWidth: "100%" }}>
          <div style={{ overflowX: "auto", maxWidth: "100%" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-subtle)" }}>
                  {["Campaign Brief", "Format", "Date Approved", "Amount", "Status", "Action"].map(h => (
                    <th key={h} style={{ padding: "14px 18px", textAlign: "left", color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredEarnings.map((item, i) => (
                  <tr key={item.id} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "var(--surface-subtle)" }}>
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 10, background: "#0284c7", color: "#fff", fontWeight: 900, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {item.brandLogo}
                        </div>
                        <div>
                          <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{item.campaign}</div>
                          <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{item.brand} · {item.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <span className="pill pill-blue" style={{ fontSize: 11 }}>{item.type}</span>
                    </td>
                    <td style={{ padding: "14px 18px", color: "var(--text-subtle)", fontSize: 13 }}>{item.date}</td>
                    <td style={{ padding: "14px 18px", fontWeight: 900, fontSize: 15, color: "#10b981" }}>{item.amount}</td>
                    <td style={{ padding: "14px 18px" }}>
                      {item.status === "available" && <span className="pill pill-green" style={{ fontSize: 11 }}>Available</span>}
                      {item.status === "clearance" && <span className="pill pill-amber" style={{ fontSize: 11 }}>{item.clearanceDate}</span>}
                      {item.status === "paid_out" && <span className="pill pill-purple" style={{ fontSize: 11 }}>Paid Out</span>}
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <button className="btn btn-ghost btn-sm" style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                        <Download style={{ width: 12, height: 12 }} /> Invoice PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── WITHDRAWAL MODAL ── */}
      {withdrawModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1100, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div className="card" style={{ maxWidth: 460, width: "100%", padding: 28, borderRadius: 22 }}>
            <h3 style={{ color: "var(--text)", fontWeight: 900, fontSize: 18, marginBottom: 14 }}>Withdraw Creator Earnings</h3>

            {withdrawSuccess ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ width: 64, height: 64, borderRadius: 999, background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "#fff" }}>
                  <Check style={{ width: 32, height: 32 }} />
                </div>
                <h4 style={{ color: "var(--text)", fontWeight: 800, fontSize: 18, marginBottom: 6 }}>Payout Initiated! 🎉</h4>
                <p style={{ color: "var(--text-subtle)", fontSize: 13, lineHeight: 1.5 }}>
                  ${withdrawAmount} has been sent to your bank. Expect delivery within 1 business day.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", color: "var(--text-subtle)", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>WITHDRAWAL AMOUNT ($ USD)</label>
                  <input
                    className="input"
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                    style={{ fontSize: 20, fontWeight: 900, color: "#10b981" }}
                  />
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 4 }}>Maximum available: $3,840.00</div>
                </div>

                <div>
                  <label style={{ display: "block", color: "var(--text-subtle)", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>SELECT DESTINATION</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { id: "bank", name: "Chase Direct Checking (•••• 8821)", sub: "Same-Day ACH · No Fee", icon: Banknote },
                      { id: "stripe", name: "Stripe Connect Direct Payout", sub: "Instant Debit Card", icon: CreditCard },
                    ].map(m => (
                      <div
                        key={m.id}
                        onClick={() => setSelectedMethod(m.id)}
                        style={{
                          padding: "12px 14px", borderRadius: 12, cursor: "pointer",
                          border: `1.5px solid ${selectedMethod === m.id ? "#0284c7" : "var(--border)"}`,
                          background: selectedMethod === m.id ? "rgba(2,132,199,0.08)" : "var(--surface-subtle)",
                          display: "flex", alignItems: "center", gap: 12
                        }}
                      >
                        <m.icon style={{ width: 18, height: 18, color: selectedMethod === m.id ? "#0284c7" : "var(--text-subtle)" }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{m.name}</div>
                          <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{m.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button onClick={() => setWithdrawModalOpen(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                  <button onClick={handleConfirmWithdraw} className="btn btn-primary" style={{ flex: 1, fontWeight: 800 }}>Confirm Payout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </DashLayout>
  );
}
