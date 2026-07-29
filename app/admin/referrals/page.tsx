"use client";

import { useState, type ChangeEvent } from "react";
import DashLayout, { PageHeader, SectionCard, Field } from "@/components/DashLayout";
import {
  Search, Gift, Users, DollarSign, TrendingUp, MoreHorizontal,
  CheckCircle2, XCircle, Clock, Save, Edit3, Award, Settings, Check
} from "lucide-react";

/* ─────────────────────────────────────────────
   MOCK ADMIN REFERRALS
───────────────────────────────────────────── */
const STATUS_PILLS: Record<string, { label: string; pill: string }> = {
  rewarded: { label: "Rewarded", pill: "pill-green" },
  pending:  { label: "Pending",  pill: "pill-amber" },
  expired:  { label: "Expired",  pill: "pill-red"   },
  canceled: { label: "Canceled", pill: "pill-red"   },
};

const adminReferrals = [
  { id: "REF-9021", referrer: "Sarah Mitchell", referrerEmail: "sarah@email.com", referee: "Jessica Taylor", refereeEmail: "jessica@email.com", type: "Creator", code: "SARAH2025", date: "Jul 26, 2025", reward: "$50.00",  status: "rewarded", trigger: "Completed 1st Brief" },
  { id: "REF-9020", referrer: "Sarah Mitchell", referrerEmail: "sarah@email.com", referee: "Apex Fitness Co.", refereeEmail: "team@apexfit.com", type: "Brand",   code: "SARAH2025", date: "Jul 22, 2025", reward: "$100.00", status: "rewarded", trigger: "Launched 1st Campaign" },
  { id: "REF-9019", referrer: "Marcus Lee",     referrerEmail: "marcus@email.com", referee: "TechFlow Labs",  refereeEmail: "hello@techflow.com", type: "Brand", code: "MARCUS50",  date: "Jul 20, 2025", reward: "$100.00", status: "pending",  trigger: "Awaiting Campaign Launch" },
  { id: "REF-9018", referrer: "Emma Chen",      referrerEmail: "emma@email.com",   referee: "David Miller",    refereeEmail: "david@email.com",   type: "Creator", code: "EMMA2025", date: "Jul 18, 2025", reward: "$50.00",  status: "pending",  trigger: "Awaiting 1st Brief" },
  { id: "REF-9017", referrer: "GlowBrand Team", referrerEmail: "hello@glow.com",   referee: "StyleBrand Inc.", refereeEmail: "info@style.com",    type: "Brand",   code: "GLOWBRAND", date: "Jul 14, 2025", reward: "$100.00", status: "rewarded", trigger: "Launched 1st Campaign" },
  { id: "REF-9016", referrer: "Jake Rodriguez", referrerEmail: "jake@email.com",   referee: "Sophia Martinez", refereeEmail: "sophia@email.com", type: "Creator", code: "JAKEFIT",   date: "Jun 28, 2025", reward: "$0.00",   status: "expired",  trigger: "Incomplete (30d limit)" },
];

const topLeaderboard = [
  { rank: 1, name: "Sarah Mitchell", type: "Creator", totalReferred: 18, totalEarned: "$950.00" },
  { rank: 2, name: "GlowBrand Team", type: "Brand",   totalReferred: 12, totalEarned: "$1,200.00" },
  { rank: 3, name: "Marcus Lee",     type: "Creator", totalReferred: 9,  totalEarned: "$450.00" },
  { rank: 4, name: "Jake Rodriguez", type: "Creator", totalReferred: 7,  totalEarned: "$350.00" },
];

export default function AdminReferralsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  /* Config settings state */
  const [creatorReward, setCreatorReward] = useState("50.00");
  const [brandReward, setBrandReward]     = useState("100.00");
  const [minPayout, setMinPayout]         = useState("50.00");
  const [savedSettings, setSavedSettings] = useState(false);

  const filtered = adminReferrals.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.referrer.toLowerCase().includes(q) || r.referee.toLowerCase().includes(q) || r.code.toLowerCase().includes(q) || r.id.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    const matchType   = filterType === "all"   || r.type.toLowerCase() === filterType;
    return matchSearch && matchStatus && matchType;
  });

  const handleSaveSettings = () => {
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 2000);
  };

  return (
    <DashLayout title="Admin – Referrals">
      <PageHeader
        title="Manage Referral Program"
        subtitle="Monitor user referrals, approve rewards, and adjust global program commission rates."
      />

      {/* KPI Cards */}
      <div className="grid-responsive-4col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: 28 }}>
        {[
          { label: "Total Platform Referrals", value: "1,420", delta: "+24.5%", color: "#0284c7", icon: Users },
          { label: "Conversion Rate",         value: "68.4%", delta: "+3.2%",  color: "#10b981", icon: TrendingUp },
          { label: "Total Rewards Paid",      value: "$42,500", delta: "+18.1%", color: "#f59e0b", icon: DollarSign },
          { label: "Pending Approvals",       value: "$5,400", delta: "12 items", color: "#8b5cf6", icon: Clock },
        ].map(k => (
          <div key={k.label} className="stat-card card-lift" style={{ borderLeft: `3px solid ${k.color}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }}>{k.label.toUpperCase()}</span>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `${k.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <k.icon style={{ width: 15, height: 15, color: k.color }} />
              </div>
            </div>
            <div style={{ color: "var(--text)", fontWeight: 900, fontSize: 26, letterSpacing: "-0.03em" }}>{k.value}</div>
            <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 4 }}>{k.delta}</div>
          </div>
        ))}
      </div>

      {/* Top Row: Leaderboard + Settings */}
      <div className="grid-responsive-2col" style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 24, marginBottom: 28, alignItems: "start" }}>

        {/* Leaderboard */}
        <div className="card" style={{ padding: "24px", borderRadius: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Award style={{ width: 18, height: 18, color: "#f59e0b" }} />
            <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 15 }}>Top Referrers Leaderboard</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {topLeaderboard.map(lb => (
              <div key={lb.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: lb.rank === 1 ? "rgba(245,158,11,0.2)" : "rgba(2,132,199,0.1)", color: lb.rank === 1 ? "#f59e0b" : "#0284c7", fontWeight: 900, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    #{lb.rank}
                  </div>
                  <div>
                    <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{lb.name}</div>
                    <span className={`pill ${lb.type === "Creator" ? "pill-blue" : "pill-purple"}`} style={{ fontSize: 10 }}>{lb.type}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#10b981", fontWeight: 800, fontSize: 14 }}>{lb.totalEarned}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{lb.totalReferred} referrals</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Referral Settings */}
        <div className="card" style={{ padding: "24px", borderRadius: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Settings style={{ width: 18, height: 18, color: "#0284c7" }} />
            <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 15 }}>Program Commission Settings</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Field label="CREATOR REFERRAL REWARD (USD)" hint="Paid when referred creator completes 1st brief">
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-subtle)", fontSize: 13 }}>$</span>
                <input className="input" type="number" style={{ paddingLeft: 26 }} value={creatorReward} onChange={(e: ChangeEvent<HTMLInputElement>) => setCreatorReward(e.target.value)} />
              </div>
            </Field>

            <Field label="BRAND REFERRAL REWARD (USD)" hint="Paid when referred brand launches 1st campaign">
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-subtle)", fontSize: 13 }}>$</span>
                <input className="input" type="number" style={{ paddingLeft: 26 }} value={brandReward} onChange={(e: ChangeEvent<HTMLInputElement>) => setBrandReward(e.target.value)} />
              </div>
            </Field>

            <button onClick={handleSaveSettings} className="btn btn-primary" style={{ marginTop: 6, width: "100%", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: savedSettings ? "#10b981" : "#0284c7" }}>
              {savedSettings ? <><Check style={{ width: 14, height: 14 }} /> Saved!</> : <><Save style={{ width: 14, height: 14 }} /> Save Referral Rates</>}
            </button>
          </div>
        </div>
      </div>

      {/* Referrals Table */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
          <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 16 }}>All Platform Referrals</div>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              type="text" placeholder="Search referrer or referee…" value={search} onChange={e => setSearch(e.target.value)}
              className="input" style={{ padding: "7px 14px", fontSize: 13, width: 220 }}
            />
            <select className="input" style={{ padding: "7px 14px", fontSize: 13 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="all">All Statuses</option>
              {Object.entries(STATUS_PILLS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
            <select className="input" style={{ padding: "7px 14px", fontSize: 13 }} value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="all">All Roles</option>
              <option value="creator">Creators</option>
              <option value="brand">Brands</option>
            </select>
          </div>
        </div>

        <div className="card table-responsive" style={{ borderRadius: 18, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Ref ID", "Referrer (Owner)", "Referee (Signed Up)", "Code", "Role", "Reward", "Status", "Date", ""].map(h => (
                  <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", background: "var(--surface-subtle)", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((ref, i) => {
                const st = STATUS_PILLS[ref.status];
                return (
                  <tr key={ref.id} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "var(--surface-subtle)" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ color: "var(--text-subtle)", fontSize: 12, fontFamily: "monospace" }}>{ref.id}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{ref.referrer}</div>
                      <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{ref.referrerEmail}</div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 13 }}>{ref.referee}</div>
                      <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{ref.refereeEmail}</div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ color: "#0284c7", fontWeight: 700, fontSize: 12, fontFamily: "monospace" }}>{ref.code}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span className={`pill ${ref.type === "Creator" ? "pill-blue" : "pill-purple"}`} style={{ fontSize: 11 }}>{ref.type}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ color: ref.status === "rewarded" ? "#10b981" : "var(--text-subtle)", fontWeight: 800, fontSize: 14 }}>
                        {ref.reward}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span className={`pill ${st.pill}`} style={{ fontSize: 11 }}>{st.label}</span>
                    </td>
                    <td style={{ padding: "14px 16px", color: "var(--text-subtle)", fontSize: 12 }}>{ref.date}</td>
                    <td style={{ padding: "14px 16px", position: "relative" }}>
                      <button onClick={() => setActiveMenu(activeMenu === ref.id ? null : ref.id)} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "5px", cursor: "pointer", color: "var(--text-subtle)", display: "flex", alignItems: "center" }}>
                        <MoreHorizontal style={{ width: 15, height: 15 }} />
                      </button>
                      {activeMenu === ref.id && (
                        <div style={{ position: "absolute", right: 12, top: "100%", zIndex: 50, background: "var(--surface)", border: "1px solid var(--border-strong)", borderRadius: 12, padding: "6px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", minWidth: 160 }}>
                          {[
                            { icon: CheckCircle2, label: "Approve Reward", color: "#10b981" },
                            { icon: XCircle,      label: "Mark Expired",   color: "#ef4444" },
                          ].map(a => (
                            <button key={a.label} onClick={() => setActiveMenu(null)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "9px 12px", borderRadius: 8, background: "none", border: "none", color: a.color, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                              <a.icon style={{ width: 13, height: 13 }} /> {a.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ padding: "40px", textAlign: "center", color: "var(--text-subtle)", fontSize: 13 }}>No platform referrals match your filter.</div>
          )}
        </div>
      </div>
    </DashLayout>
  );
}
