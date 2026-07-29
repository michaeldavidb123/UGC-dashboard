"use client";

import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  TrendingUp, ArrowDownLeft, Wallet, DollarSign, Clock,
  CheckCircle2, AlertCircle, XCircle, ArrowRight, CreditCard,
  Pencil, X, Building2, CalendarDays, RefreshCcw, ChevronDown,
  Send, Sparkles, ShieldCheck, ArrowUpRight, Search
} from "lucide-react";

/* ──────────────────────────────────────────
   TYPES
────────────────────────────────────────── */
type EarningStatus = "pending" | "processing" | "available" | "paid_out";
type PayoutStatus = "pending_review" | "approved" | "processing" | "paid" | "rejected";
type ChartRange = "30d" | "90d" | "year" | "all";

interface EarningRow {
  id: string;
  campaign: string;
  brand: string;
  brandLogo: string;
  earned: string;
  earnedNum: number;
  status: EarningStatus;
  date: string;
}

interface PayoutRequest {
  id: string;
  amount: string;
  requested: string;
  status: PayoutStatus;
  method: string;
}

/* ──────────────────────────────────────────
   MOCK DATA
────────────────────────────────────────── */
const MIN_WITHDRAWAL = 50; // mirrors admin setting

const earningsData: EarningRow[] = [
  { id: "e1", campaign: "Skincare Morning Routine Reel", brand: "GlowBrand",  brandLogo: "GB", earned: "$200.00", earnedNum: 200, status: "available",   date: "Jul 27, 2025" },
  { id: "e2", campaign: "Noise-Canceling Headphones",   brand: "TechFlow",   brandLogo: "TF", earned: "$300.00", earnedNum: 300, status: "pending",     date: "Jul 25, 2025" },
  { id: "e3", campaign: "High-Protein Meal Prep Recipe", brand: "NutriLife",  brandLogo: "NL", earned: "$120.00", earnedNum: 120, status: "processing",  date: "Jul 20, 2025" },
  { id: "e4", campaign: "Summer Collection Running",     brand: "Nike",       brandLogo: "NK", earned: "$150.00", earnedNum: 150, status: "paid_out",    date: "Jul 18, 2025" },
  { id: "e5", campaign: "Yoga Mat & Activewear",         brand: "AuraFit",   brandLogo: "AF", earned: "$250.00", earnedNum: 250, status: "available",   date: "Jul 30, 2025" },
  { id: "e6", campaign: "App Review & Feature Walk",     brand: "TechFlow",  brandLogo: "TF", earned: "$300.00", earnedNum: 300, status: "paid_out",    date: "Jul 14, 2025" },
  { id: "e7", campaign: "Summer Skincare UGC Ad",        brand: "SportStyle", brandLogo: "SS", earned: "$180.00", earnedNum: 180, status: "paid_out",    date: "Jul 05, 2025" },
  { id: "e8", campaign: "Protein Powder Recipes",        brand: "NutriLife",  brandLogo: "NL", earned: "$90.00",  earnedNum:  90, status: "available",   date: "Jul 02, 2025" },
];

const payoutRequests: PayoutRequest[] = [
  { id: "pr1", amount: "$450.00", requested: "Jul 20, 2025", status: "paid",           method: "Bank Transfer ••••4821" },
  { id: "pr2", amount: "$280.00", requested: "Jun 30, 2025", status: "paid",           method: "Bank Transfer ••••4821" },
  { id: "pr3", amount: "$120.00", requested: "Jul 26, 2025", status: "processing",     method: "Bank Transfer ••••4821" },
  { id: "pr4", amount: "$540.00", requested: "Jul 28, 2025", status: "pending_review", method: "Bank Transfer ••••4821" },
];

/* Chart sparkline points for each range (normalised 0-100) */
const chartPoints: Record<ChartRange, number[]> = {
  "30d":  [20, 35, 28, 45, 38, 60, 52, 70, 65, 80, 72, 90, 85, 100, 88, 95, 92, 78, 82, 88, 76, 84, 90, 95, 88, 92, 97, 100, 94, 88],
  "90d":  [10, 18, 25, 22, 35, 30, 45, 40, 55, 50, 65, 60, 72, 68, 78, 75, 82, 80, 88, 85, 90, 88, 94, 92, 97, 95, 100, 98, 95, 92],
  "year": [5, 12, 20, 30, 42, 55, 65, 70, 78, 85, 90, 100],
  "all":  [2, 8, 15, 22, 35, 50, 60, 72, 80, 88, 94, 100],
};

const chartLabels: Record<ChartRange, string[]> = {
  "30d":  ["Jul 1","","","","","","","","","","","","","","Jul 15","","","","","","","","","","","","","","","Jul 30"],
  "90d":  ["May 1","","","May 15","","","Jun 1","","","Jun 15","","","Jul 1","","","Jul 15","","","Jul 30","","","","","","","","","","",""],
  "year": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  "all":  ["2022","","","2023","","","2024","","","2025","",""],
};

/* ──────────────────────────────────────────
   HELPERS
────────────────────────────────────────── */
const earningStatusConfig: Record<EarningStatus, { label: string; pill: string; color: string }> = {
  pending:    { label: "Pending",    pill: "pill-amber", color: "#f59e0b" },
  processing: { label: "Processing", pill: "pill-blue",  color: "#38bdf8" },
  available:  { label: "Available",  pill: "pill-green", color: "#10b981" },
  paid_out:   { label: "Paid Out",   pill: "pill-gray",  color: "#94a3b8" },
};

const payoutStatusConfig: Record<PayoutStatus, { label: string; pill: string; icon: React.ReactNode }> = {
  pending_review: { label: "Pending Review", pill: "pill-amber",  icon: <Clock style={{ width: 11, height: 11 }} /> },
  approved:       { label: "Approved",       pill: "pill-green",  icon: <CheckCircle2 style={{ width: 11, height: 11 }} /> },
  processing:     { label: "Processing",     pill: "pill-blue",   icon: <RefreshCcw style={{ width: 11, height: 11 }} /> },
  paid:           { label: "Paid",           pill: "pill-purple", icon: <Sparkles style={{ width: 11, height: 11 }} /> },
  rejected:       { label: "Rejected",       pill: "pill-red",    icon: <XCircle style={{ width: 11, height: 11 }} /> },
};

const payoutTimeline = [
  { label: "Request Submitted", desc: "Your payout request is logged." },
  { label: "Under Review",      desc: "Our finance team verifies the request." },
  { label: "Payment Processing",desc: "Funds routed to your bank account." },
  { label: "Funds Sent",        desc: "Money arrives in your account." },
];

/* ──────────────────────────────────────────
   SPARKLINE CHART
────────────────────────────────────────── */
function SparklineChart({ points, color = "#0284c7" }: { points: number[]; color?: string }) {
  const width = 800;
  const height = 160;
  const pad = 12;
  const n = points.length;
  const xs = points.map((_, i) => pad + (i / (n - 1)) * (width - 2 * pad));
  const ys = points.map(v => height - pad - (v / 100) * (height - 2 * pad));
  const linePath = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  const areaPath = `${linePath} L${xs[n - 1]},${height} L${xs[0]},${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: 160 }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#areaGrad)" />
      <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* last point dot */}
      <circle cx={xs[n - 1]} cy={ys[n - 1]} r="5" fill={color} stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

/* ──────────────────────────────────────────
   DONUT CHART
────────────────────────────────────────── */
function DonutChart({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((a, s) => a + s.value, 0);
  let cumAngle = -90;
  const r = 54;
  const cx = 70;
  const cy = 70;

  function arc(startDeg: number, endDeg: number) {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startDeg));
    const y1 = cy + r * Math.sin(toRad(startDeg));
    const x2 = cx + r * Math.cos(toRad(endDeg));
    const y2 = cy + r * Math.sin(toRad(endDeg));
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
  }

  return (
    <svg viewBox="0 0 140 140" style={{ width: 140, height: 140 }}>
      <circle cx={cx} cy={cy} r={r} fill="var(--surface-subtle)" />
      {segments.map((seg, i) => {
        const angle = (seg.value / total) * 360;
        const start = cumAngle;
        cumAngle += angle;
        return <path key={i} d={arc(start, cumAngle - 0.5)} fill={seg.color} />;
      })}
      <circle cx={cx} cy={cy} r={38} fill="var(--surface)" />
    </svg>
  );
}

/* ──────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────── */
export default function EarningsPage() {
  const [earningFilter, setEarningFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [chartRange, setChartRange] = useState<ChartRange>("30d");
  const [payoutModalStep, setPayoutModalStep] = useState<0 | 1 | 2 | 3>(0); // 0=closed
  const [payoutAmount, setPayoutAmount] = useState("540");
  const [editPaymentOpen, setEditPaymentOpen] = useState(false);
  const [changeMethodOpen, setChangeMethodOpen] = useState(false);

  /* KPI values */
  const totalEarned    = earningsData.reduce((a, e) => a + e.earnedNum, 0);
  const available      = earningsData.filter(e => e.status === "available").reduce((a, e) => a + e.earnedNum, 0);
  const pending        = earningsData.filter(e => e.status === "pending" || e.status === "processing").reduce((a, e) => a + e.earnedNum, 0);
  const paidOut        = earningsData.filter(e => e.status === "paid_out").reduce((a, e) => a + e.earnedNum, 0);
  const numCampaigns   = earningsData.length;
  const avgValue       = totalEarned / numCampaigns;

  const filteredEarnings = earningsData.filter(e => {
    const matchStatus = earningFilter === "all" || e.status === earningFilter;
    const matchSearch = e.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        e.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const canWithdraw    = parseFloat(payoutAmount) >= MIN_WITHDRAWAL && parseFloat(payoutAmount) <= available;
  const belowMin       = parseFloat(payoutAmount) < MIN_WITHDRAWAL;

  const chartRangeTabs: { id: ChartRange; label: string }[] = [
    { id: "30d",  label: "30 Days" },
    { id: "90d",  label: "90 Days" },
    { id: "year", label: "This Year" },
    { id: "all",  label: "All Time" },
  ];

  const donutSegments = [
    { label: "Campaign Payments", value: 1590, color: "#0284c7" },
    { label: "Bonuses",           value: 180,  color: "#10b981" },
    { label: "Referral Rewards",  value: 90,   color: "#8b5cf6" },
    { label: "Adjustments",       value: -30,  color: "#ef4444" },
  ];

  /* The most recent processing payout step */
  const activePayoutStep = 2; // 0-indexed → "Payment Processing"

  return (
    <DashLayout title="Earnings & Payouts">
      <PageHeader
        title="Earnings & Payouts"
        subtitle="Track your income, manage withdrawals, and monitor your payout history."
        action={
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setPayoutModalStep(1)}
          >
            <ArrowDownLeft style={{ width: 14, height: 14 }} /> Request Payout
          </button>
        }
      />

      {/* ── KPI CARDS ─────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total Earned",          value: `$${totalEarned.toLocaleString()}`,  sub: `${numCampaigns} campaigns`,    color: "var(--text)",  accent: "#0284c7", border: true },
          { label: "Available to Withdraw", value: `$${available.toLocaleString()}`,    sub: "Ready now",                    color: "#10b981",      accent: "#10b981", border: false },
          { label: "Pending Clearance",     value: `$${pending.toLocaleString()}`,      sub: "Awaiting brand approval",      color: "#f59e0b",      accent: "#f59e0b", border: false },
          { label: "Total Paid Out",        value: `$${paidOut.toLocaleString()}`,      sub: "Lifetime withdrawals",         color: "#94a3b8",      accent: "#94a3b8", border: false },
          { label: "Next Expected Payout",  value: "Aug 12, 2025",                      sub: "Est. from active campaigns",   color: "var(--text)",  accent: "#8b5cf6", border: false },
        ].map((card) => (
          <div
            key={card.label}
            className="card"
            style={{
              padding: "20px",
              borderTop: `3px solid ${card.accent}`,
              display: "flex", flexDirection: "column", gap: 10
            }}
          >
            <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {card.label}
            </div>
            <div style={{ color: card.color, fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em", lineHeight: 1 }}>
              {card.value}
            </div>
            <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* ── CHART + BREAKDOWN ROW ─────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, marginBottom: 24 }}>

        {/* Earnings Chart */}
        <div className="card" style={{ padding: "24px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Earnings Analytics</div>
              <div style={{ display: "flex", gap: 24 }}>
                {[
                  { label: "Total Earned",    val: `$${totalEarned.toLocaleString()}` },
                  { label: "Campaigns",       val: numCampaigns },
                  { label: "Avg per Campaign",val: `$${avgValue.toFixed(0)}` },
                ].map(m => (
                  <div key={m.label}>
                    <span style={{ color: "var(--text)", fontWeight: 800, fontSize: 15 }}>{m.val}</span>
                    <span style={{ color: "var(--text-subtle)", fontSize: 11, marginLeft: 5 }}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 4 }}>
              {chartRangeTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setChartRange(tab.id)}
                  style={{
                    padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600,
                    background: chartRange === tab.id ? "#0284c7" : "var(--surface-subtle)",
                    border: `1px solid ${chartRange === tab.id ? "#0284c7" : "var(--border)"}`,
                    color: chartRange === tab.id ? "#fff" : "var(--text-muted)",
                    cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s"
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <SparklineChart points={chartPoints[chartRange]} />

          {/* X-axis labels */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            {chartLabels[chartRange].filter((_, i, a) => i === 0 || i === Math.floor(a.length / 2) || i === a.length - 1).map((l, i) => (
              <span key={i} style={{ color: "var(--text-subtle)", fontSize: 10 }}>{l}</span>
            ))}
          </div>
        </div>

        {/* Donut Breakdown */}
        <div className="card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 15 }}>Earnings Breakdown</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DonutChart segments={donutSegments} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {donutSegments.map(seg => (
              <div key={seg.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: seg.color, flexShrink: 0 }} />
                  <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{seg.label}</span>
                </div>
                <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 12 }}>
                  {seg.value < 0 ? `-$${Math.abs(seg.value)}` : `$${seg.value}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── AVAILABLE BALANCE + PAYOUT TIMELINE ───── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>

        {/* Available Balance Card */}
        <div className="card" style={{ padding: "28px", borderTop: "3px solid #10b981" }}>
          <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
            Available Balance
          </div>
          <div style={{ color: "#10b981", fontWeight: 800, fontSize: 40, letterSpacing: "-0.03em", marginBottom: 20 }}>
            ${available.toLocaleString()}.00
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            {[
              { label: "Minimum Withdrawal",     value: `$${MIN_WITHDRAWAL}.00` },
              { label: "Estimated Processing",    value: "1–3 Business Days" },
              { label: "Payout Method",           value: "Bank Transfer ••••4821" },
            ].map(row => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ color: "var(--text-subtle)", fontSize: 13 }}>{row.label}</span>
                <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{row.value}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setPayoutModalStep(1)}
            className="btn btn-primary"
            style={{ width: "100%", height: 44, borderRadius: 12, fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            <ArrowDownLeft style={{ width: 16, height: 16 }} /> Request Payout
          </button>
        </div>

        {/* Payment Timeline */}
        <div className="card" style={{ padding: "28px" }}>
          <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 15, marginBottom: 20 }}>Payment Timeline</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {payoutTimeline.map((step, i) => {
              const isActive = i === activePayoutStep;
              const isDone   = i < activePayoutStep;
              return (
                <div key={i} style={{ display: "flex", gap: 14, position: "relative" }}>
                  {/* connector */}
                  {i < payoutTimeline.length - 1 && (
                    <div style={{ position: "absolute", left: 13, top: 28, width: 2, height: "calc(100% - 8px)", background: isDone || isActive ? "#0284c7" : "var(--border-strong)", zIndex: 0 }} />
                  )}
                  {/* dot */}
                  <div style={{ width: 28, height: 28, borderRadius: 999, flexShrink: 0, zIndex: 1,
                    background: isActive ? "#0284c7" : isDone ? "#10b981" : "var(--surface-subtle)",
                    border: `2px solid ${isActive ? "#0284c7" : isDone ? "#10b981" : "var(--border-strong)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    {isDone && <CheckCircle2 style={{ width: 14, height: 14, color: "#fff" }} />}
                    {isActive && <div style={{ width: 8, height: 8, borderRadius: 999, background: "#fff" }} />}
                  </div>
                  <div style={{ paddingBottom: 24 }}>
                    <div style={{ color: isActive ? "#0284c7" : isDone ? "#10b981" : "var(--text-subtle)", fontWeight: isActive ? 800 : 600, fontSize: 13 }}>
                      {step.label} {isActive && <span style={{ background: "rgba(2,132,199,0.1)", color: "#0284c7", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, marginLeft: 6 }}>Current</span>}
                    </div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>{step.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── PAYOUT REQUESTS ─────────────────────── */}
      <div className="card" style={{ marginBottom: 24, borderRadius: 18, overflow: "hidden", padding: 0 }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-strong)" }}>
          <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 15 }}>Payout Requests</div>
          <div style={{ color: "var(--text-subtle)", fontSize: 13, marginTop: 2 }}>Track every withdrawal request you've submitted.</div>
        </div>

        {/* Table Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr 1fr", padding: "12px 24px", background: "var(--surface-subtle)", borderBottom: "1px solid var(--border-strong)" }}>
          {["Request ID", "Amount", "Requested", "Status"].map(h => (
            <div key={h} style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>

        {payoutRequests.map((pr, i) => {
          const cfg = payoutStatusConfig[pr.status];
          return (
            <div
              key={pr.id}
              style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr 1fr",
                padding: "16px 24px", alignItems: "center",
                borderBottom: i < payoutRequests.length - 1 ? "1px solid var(--border)" : "none",
                transition: "background 0.12s"
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-subtle)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ color: "var(--text-subtle)", fontWeight: 600, fontSize: 13, fontFamily: "monospace" }}>{pr.id.toUpperCase()}</div>
              <div style={{ color: "#10b981", fontWeight: 800, fontSize: 15 }}>{pr.amount}</div>
              <div style={{ color: "var(--text-muted)", fontSize: 13 }}>{pr.requested} · {pr.method}</div>
              <span className={`pill ${cfg.pill}`} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                {cfg.icon} {cfg.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── RECENT EARNINGS TABLE ────────────────── */}
      <div className="card" style={{ marginBottom: 24, borderRadius: 18, overflow: "hidden", padding: 0 }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-strong)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 15 }}>Recent Earnings</div>
            <div style={{ color: "var(--text-subtle)", fontSize: 13, marginTop: 2 }}>Every campaign payment and its current status.</div>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <Search style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 13, height: 13, color: "var(--text-subtle)" }} />
              <input
                type="text"
                className="input"
                placeholder="Search campaign..."
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: 32, height: 36, fontSize: 12, width: 200 }}
              />
            </div>
            {["all", "pending", "processing", "available", "paid_out"].map(f => {
              const active = earningFilter === f;
              const labels: Record<string, string> = { all: "All", pending: "Pending", processing: "Processing", available: "Available", paid_out: "Paid Out" };
              return (
                <button
                  key={f}
                  onClick={() => setEarningFilter(f)}
                  style={{
                    padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600,
                    background: active ? "#0284c7" : "var(--surface)",
                    border: `1px solid ${active ? "#0284c7" : "var(--border-strong)"}`,
                    color: active ? "#fff" : "var(--text-muted)",
                    cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s"
                  }}
                >
                  {labels[f]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Table Header */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "12px 24px", background: "var(--surface-subtle)", borderBottom: "1px solid var(--border-strong)" }}>
          {["Campaign", "Brand", "Earned", "Status"].map(h => (
            <div key={h} style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>

        {filteredEarnings.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px", color: "var(--text-subtle)", fontSize: 14 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>No earnings found</div>
            <div style={{ fontSize: 13 }}>Try adjusting your filters or search query.</div>
          </div>
        ) : (
          filteredEarnings.map((e, i) => {
            const cfg = earningStatusConfig[e.status];
            return (
              <div
                key={e.id}
                style={{
                  display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
                  padding: "16px 24px", alignItems: "center",
                  borderBottom: i < filteredEarnings.length - 1 ? "1px solid var(--border)" : "none",
                  transition: "background 0.12s"
                }}
                onMouseEnter={ev => (ev.currentTarget.style.background = "var(--surface-subtle)")}
                onMouseLeave={ev => (ev.currentTarget.style.background = "transparent")}
              >
                <div>
                  <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{e.campaign}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>{e.date}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: "#0284c7", color: "#fff", fontWeight: 800, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {e.brandLogo}
                  </div>
                  <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{e.brand}</span>
                </div>
                <div style={{ color: cfg.color, fontWeight: 800, fontSize: 15 }}>{e.earned}</div>
                <span className={`pill ${cfg.pill}`}>{cfg.label}</span>
              </div>
            );
          })
        )}
      </div>

      {/* ── PAYMENT METHOD ───────────────────────── */}
      <div className="card" style={{ padding: "24px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 15 }}>Payout Method</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setEditPaymentOpen(true)} className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>
              <Pencil style={{ width: 13, height: 13 }} /> Edit Details
            </button>
            <button onClick={() => setChangeMethodOpen(true)} className="btn btn-secondary btn-sm" style={{ fontSize: 12 }}>
              <ArrowRight style={{ width: 13, height: 13 }} /> Change Method
            </button>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "18px 20px", borderRadius: 14, background: "var(--surface-subtle)", border: "1px solid var(--border-strong)" }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(2,132,199,0.1)", border: "1px solid rgba(2,132,199,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Building2 style={{ width: 22, height: 22, color: "#0284c7" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 15 }}>Bank Transfer</div>
            <div style={{ color: "var(--text-subtle)", fontSize: 13, marginTop: 2 }}>First Bank · •••• 4821 · Michael David</div>
          </div>
          <span className="pill pill-green" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <CheckCircle2 style={{ width: 11, height: 11 }} /> Verified
          </span>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          REQUEST PAYOUT MODAL (3-step)
      ════════════════════════════════════════════ */}
      {payoutModalStep > 0 && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1100, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(7px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div className="card" style={{ maxWidth: 480, width: "100%", padding: "28px", borderRadius: 20 }}>
            {/* Step indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 24 }}>
              {["Amount", "Destination", "Review"].map((s, i) => {
                const stepNum = i + 1;
                const done    = payoutModalStep > stepNum;
                const active  = payoutModalStep === stepNum;
                return (
                  <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, background: active ? "#0284c7" : done ? "#10b981" : "var(--surface-subtle)", border: `2px solid ${active ? "#0284c7" : done ? "#10b981" : "var(--border-strong)"}`, color: active || done ? "#fff" : "var(--text-subtle)" }}>
                        {done ? <CheckCircle2 style={{ width: 14, height: 14 }} /> : stepNum}
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 600, color: active ? "#0284c7" : "var(--text-subtle)" }}>{s}</span>
                    </div>
                    {i < 2 && <div style={{ flex: 1, height: 2, background: done ? "#10b981" : "var(--border-strong)", margin: "0 4px", marginBottom: 16 }} />}
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, margin: 0 }}>
                {payoutModalStep === 1 ? "Choose Amount" : payoutModalStep === 2 ? "Destination Account" : "Review & Submit"}
              </h3>
              <button onClick={() => setPayoutModalStep(0)} style={{ background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer" }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            {/* Step 1: Amount */}
            {payoutModalStep === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Withdrawal Amount ($)</label>
                  <input
                    type="number"
                    className="input"
                    value={payoutAmount}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPayoutAmount(e.target.value)}
                    style={{ fontSize: 22, fontWeight: 800, height: 56, textAlign: "center" }}
                  />
                  {belowMin && (
                    <div style={{ color: "#ef4444", fontSize: 12, fontWeight: 600, marginTop: 6, display: "flex", alignItems: "center", gap: 5 }}>
                      <AlertCircle style={{ width: 13, height: 13 }} />
                      Minimum withdrawal is ${MIN_WITHDRAWAL}.00
                    </div>
                  )}
                  {!belowMin && parseFloat(payoutAmount) > available && (
                    <div style={{ color: "#ef4444", fontSize: 12, fontWeight: 600, marginTop: 6, display: "flex", alignItems: "center", gap: 5 }}>
                      <AlertCircle style={{ width: 13, height: 13 }} /> Amount exceeds available balance (${available})
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[50, 100, 250, available].map(v => (
                    <button
                      key={v}
                      onClick={() => setPayoutAmount(String(v))}
                      style={{ flex: 1, padding: "8px 0", borderRadius: 10, background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", color: "var(--text-muted)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                    >
                      {v === available ? "Max" : `$${v}`}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                  <button onClick={() => setPayoutModalStep(0)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                  <button onClick={() => setPayoutModalStep(2)} className="btn btn-primary" style={{ flex: 2 }} disabled={!canWithdraw}>
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Destination */}
            {payoutModalStep === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ padding: "16px 18px", borderRadius: 14, background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", display: "flex", alignItems: "center", gap: 14 }}>
                  <Building2 style={{ width: 22, height: 22, color: "#0284c7" }} />
                  <div>
                    <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>Bank Transfer</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>First Bank · •••• 4821 · Michael David</div>
                  </div>
                  <span className="pill pill-green" style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <CheckCircle2 style={{ width: 11, height: 11 }} /> Verified
                  </span>
                </div>
                <div style={{ color: "var(--text-subtle)", fontSize: 12, textAlign: "center" }}>
                  <button onClick={() => setEditPaymentOpen(true)} style={{ background: "none", border: "none", color: "#0284c7", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                    + Add or change payment method
                  </button>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                  <button onClick={() => setPayoutModalStep(1)} className="btn btn-ghost" style={{ flex: 1 }}>Back</button>
                  <button onClick={() => setPayoutModalStep(3)} className="btn btn-primary" style={{ flex: 2 }}>Continue</button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {payoutModalStep === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ padding: "18px 20px", borderRadius: 14, background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "Withdrawal Amount", value: `$${parseFloat(payoutAmount).toFixed(2)}` },
                    { label: "Payout Method",     value: "Bank Transfer ••••4821" },
                    { label: "Processing Time",   value: "1–3 Business Days" },
                    { label: "Remaining Balance", value: `$${(available - parseFloat(payoutAmount)).toFixed(2)}` },
                  ].map(row => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--text-subtle)", fontSize: 13 }}>{row.label}</span>
                      <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <div style={{ color: "#10b981", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
                    <ShieldCheck style={{ width: 13, height: 13 }} /> Secure Payout
                  </div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>Your payout will be processed within 1–3 business days.</div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                  <button onClick={() => setPayoutModalStep(2)} className="btn btn-ghost" style={{ flex: 1 }}>Back</button>
                  <button
                    onClick={() => {
                      alert(`Payout of $${parseFloat(payoutAmount).toFixed(2)} submitted successfully!`);
                      setPayoutModalStep(0);
                    }}
                    className="btn btn-primary"
                    style={{ flex: 2 }}
                  >
                    <Send style={{ width: 14, height: 14 }} /> Submit Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════
          EDIT PAYMENT DETAILS MODAL
      ════════════════════════════════════════════ */}
      {editPaymentOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1200, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(7px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div className="card" style={{ maxWidth: 500, width: "100%", padding: "28px", borderRadius: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
              <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, margin: 0 }}>Update Payment Details</h3>
              <button onClick={() => setEditPaymentOpen(false)} style={{ background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer" }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Account Holder Name", placeholder: "Michael David",   type: "text" },
                { label: "Bank Name",            placeholder: "First Bank",      type: "text" },
                { label: "Account Number / IBAN",placeholder: "•••• 4821",       type: "text" },
                { label: "Routing / Sort Code",  placeholder: "021000021",       type: "text" },
                { label: "Country",              placeholder: "United States",   type: "text" },
                { label: "Currency",             placeholder: "USD — US Dollar", type: "text" },
              ].map(field => (
                <div key={field.label}>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{field.label}</label>
                  <input type={field.type} className="input" placeholder={field.placeholder} />
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button onClick={() => setEditPaymentOpen(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                <button onClick={() => setEditPaymentOpen(false)} className="btn btn-primary" style={{ flex: 1 }}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
