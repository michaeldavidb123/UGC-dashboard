"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  Share2, Copy, Check, Gift, DollarSign, Users, Sparkles,
  ArrowRight, ShieldCheck, Clock, CheckCircle2, AlertCircle,
  ExternalLink, Mail, MessageSquare, Globe
} from "lucide-react";

/* ─────────────────────────────────────────────
   MOCK REFERRAL DATA
───────────────────────────────────────────── */
const REFERRAL_CODE = "SARAH2025";
const REFERRAL_LINK = `https://ugcstudio.com/signup?ref=${REFERRAL_CODE}`;

const referralsList = [
  { id: "REF-101", user: "Jessica Taylor", email: "jessica@email.com", type: "Creator", date: "Jul 26, 2025", status: "rewarded", reward: "$50.00",  trigger: "Completed 1st Brief" },
  { id: "REF-102", user: "Apex Fitness Co.", email: "team@apexfit.com", type: "Brand",   date: "Jul 22, 2025", status: "rewarded", reward: "$100.00", trigger: "Launched 1st Campaign" },
  { id: "REF-103", user: "David Miller",   email: "david@email.com",   type: "Creator", date: "Jul 18, 2025", status: "pending",  reward: "$50.00",  trigger: "Awaiting 1st Brief" },
  { id: "REF-104", user: "GlowGlow Cosmetics", email: "hi@glowglow.com", type: "Brand", date: "Jul 12, 2025", status: "rewarded", reward: "$100.00", trigger: "Launched 1st Campaign" },
  { id: "REF-105", user: "Liam Wilson",    email: "liam@email.com",    type: "Creator", date: "Jun 28, 2025", status: "rewarded", reward: "$50.00",  trigger: "Completed 1st Brief" },
  { id: "REF-106", user: "Sophia Martinez", email: "sophia@email.com", type: "Creator", date: "Jun 15, 2025", status: "expired",  reward: "$0.00",   trigger: "Incomplete (30d limit)" },
];

const STATUS_PILLS: Record<string, { label: string; pill: string }> = {
  rewarded: { label: "Rewarded", pill: "pill-green" },
  pending:  { label: "Pending",  pill: "pill-amber" },
  expired:  { label: "Expired",  pill: "pill-red"   },
};

export default function ReferralsView() {
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const copyLink = () => {
    navigator.clipboard.writeText(REFERRAL_LINK);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(REFERRAL_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const filtered = referralsList.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.user.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.id.toLowerCase().includes(q);
    const matchType   = filterType === "all" || r.type.toLowerCase() === filterType;
    return matchSearch && matchType;
  });

  return (
    <DashLayout title="Refer & Earn">
      <PageHeader
        title="Referral Program"
        subtitle="Invite creators or brands to UGC Studio and earn cash rewards for every active referral."
      />

      {/* ── HERO BANNER: LINK & CODE ── */}
      <div className="card" style={{ padding: "32px", borderRadius: 22, background: "linear-gradient(135deg, rgba(2,132,199,0.12) 0%, rgba(124,58,237,0.08) 100%)", border: "1px solid rgba(2,132,199,0.3)", marginBottom: 28, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -40, top: -40, width: 220, height: 220, borderRadius: 999, background: "radial-gradient(circle, rgba(2,132,199,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div className="grid-responsive-2col" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(2,132,199,0.15)", border: "1px solid rgba(2,132,199,0.3)", borderRadius: 999, padding: "5px 14px", fontSize: 12, fontWeight: 700, color: "#0284c7", marginBottom: 14 }}>
              <Gift style={{ width: 13, height: 13 }} /> Give $50, Get $50
            </div>
            <h2 style={{ color: "var(--text)", fontWeight: 900, fontSize: 26, letterSpacing: "-0.03em", marginBottom: 10, lineHeight: 1.2 }}>
              Earn Up to $100 per Referral
            </h2>
            <p style={{ color: "var(--text-subtle)", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
              Earn <strong>$50</strong> when a referred creator completes their first brief, or <strong>$100</strong> when a referred brand launches their first campaign!
            </p>

            {/* Social Share Row */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--text-subtle)", fontSize: 12, fontWeight: 600 }}>Share directly:</span>
              {[
                { label: "WhatsApp", icon: MessageSquare, color: "#25d366", href: `https://wa.me/?text=${encodeURIComponent(`Join me on UGC Studio and get $50 reward: ${REFERRAL_LINK}`)}` },
                { label: "X / Twitter", icon: Globe,       color: "#1da1f2", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I make money creating content on UGC Studio. Sign up with my link and get $50 bonus: ${REFERRAL_LINK}`)}` },
                { label: "LinkedIn", icon: Share2,        color: "#0a66c2", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(REFERRAL_LINK)}` },
                { label: "Email",    icon: Mail,          color: "#ea4335", href: `mailto:?subject=Join%20UGC%20Studio&body=${encodeURIComponent(`Hey! Sign up for UGC Studio with my referral link: ${REFERRAL_LINK}`)}` },
              ].map(s => (
                <a
                  key={s.label} href={s.href} target="_blank" rel="noreferrer" title={`Share via ${s.label}`}
                  style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}15`, border: `1px solid ${s.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, textDecoration: "none", transition: "transform 0.15s" }}
                >
                  <s.icon style={{ width: 16, height: 16 }} />
                </a>
              ))}
            </div>
          </div>

          {/* Copy Box */}
          <div style={{ background: "var(--surface)", padding: "20px", borderRadius: 16, border: "1px solid var(--border-strong)", display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 6 }}>YOUR REFERRAL LINK</div>
              <div style={{ display: "flex", gap: 8 }}>
                <input className="input" readOnly value={REFERRAL_LINK} style={{ fontSize: 12, fontWeight: 600, fontFamily: "monospace", flex: 1 }} />
                <button
                  onClick={copyLink}
                  className="btn btn-primary btn-sm"
                  style={{ flexShrink: 0, fontSize: 12, display: "flex", alignItems: "center", gap: 5, background: copied ? "#10b981" : "#0284c7" }}
                >
                  {copied ? <><Check style={{ width: 13, height: 13 }} /> Copied!</> : <><Copy style={{ width: 13, height: 13 }} /> Copy Link</>}
                </button>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 600 }}>REFERRAL CODE</div>
                <div style={{ color: "var(--text)", fontWeight: 900, fontSize: 16, letterSpacing: "0.08em", fontFamily: "monospace" }}>{REFERRAL_CODE}</div>
              </div>
              <button onClick={copyCode} className="btn btn-ghost btn-sm" style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}>
                {copiedCode ? <Check style={{ width: 12, height: 12, color: "#10b981" }} /> : <Copy style={{ width: 12, height: 12 }} />}
                {copiedCode ? "Copied" : "Copy Code"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="grid-responsive-4col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: 28 }}>
        {[
          { label: "Total Referred",      value: "6 Users",  sub: "4 Creators, 2 Brands", color: "#0284c7", icon: Users },
          { label: "Successful Conversions", value: "4 Users", sub: "Met reward criteria",  color: "#10b981", icon: CheckCircle2 },
          { label: "Total Earned",         value: "$300.00", sub: "Credited to balance",   color: "#f59e0b", icon: DollarSign },
          { label: "Pending Rewards",      value: "$50.00",  sub: "Awaiting 1st brief",   color: "#8b5cf6", icon: Clock },
        ].map(k => (
          <div key={k.label} className="stat-card card-lift" style={{ borderLeft: `3px solid ${k.color}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }}>{k.label.toUpperCase()}</span>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `${k.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <k.icon style={{ width: 15, height: 15, color: k.color }} />
              </div>
            </div>
            <div style={{ color: "var(--text)", fontWeight: 900, fontSize: 26, letterSpacing: "-0.03em" }}>{k.value}</div>
            <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 4 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, marginBottom: 16 }}>How Referrals Work</div>
        <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { step: "01", title: "Share Your Link", desc: "Send your unique link or code to creators or brand owners you know.", icon: Share2 },
            { step: "02", title: "Friend Signs Up", desc: "They register on UGC Studio using your referral code during setup.", icon: Users },
            { step: "03", title: "Get Rewarded", desc: "Receive $50 when a creator submits a brief or $100 when a brand launches.", icon: Gift },
          ].map(s => (
            <div key={s.step} className="card" style={{ padding: "20px", borderRadius: 16, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(2,132,199,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <s.icon style={{ width: 18, height: 18, color: "#0284c7" }} />
                </div>
                <span style={{ color: "var(--border-strong)", fontWeight: 900, fontSize: 24 }}>{s.step}</span>
              </div>
              <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{s.title}</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 12, lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── REFERRALS TABLE ── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 16 }}>Referral History</div>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              type="text" placeholder="Search referee name…" value={search} onChange={e => setSearch(e.target.value)}
              className="input" style={{ padding: "7px 14px", fontSize: 13, width: 220 }}
            />
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
                {["Referee", "Role", "Date Joined", "Trigger Condition", "Reward Earned", "Status"].map(h => (
                  <th key={h} style={{ padding: "14px 18px", textAlign: "left", color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", background: "var(--surface-subtle)", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((ref, i) => {
                const st = STATUS_PILLS[ref.status];
                return (
                  <tr key={ref.id} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "var(--surface-subtle)" }}>
                    <td style={{ padding: "16px 18px" }}>
                      <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{ref.user}</div>
                      <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{ref.email}</div>
                    </td>
                    <td style={{ padding: "16px 18px" }}>
                      <span className={`pill ${ref.type === "Creator" ? "pill-blue" : "pill-purple"}`} style={{ fontSize: 11 }}>{ref.type}</span>
                    </td>
                    <td style={{ padding: "16px 18px", color: "var(--text-subtle)", fontSize: 13 }}>{ref.date}</td>
                    <td style={{ padding: "16px 18px", color: "var(--text-muted)", fontSize: 13 }}>{ref.trigger}</td>
                    <td style={{ padding: "16px 18px" }}>
                      <span style={{ color: ref.status === "rewarded" ? "#10b981" : "var(--text-subtle)", fontWeight: 800, fontSize: 14 }}>
                        {ref.reward}
                      </span>
                    </td>
                    <td style={{ padding: "16px 18px" }}>
                      <span className={`pill ${st.pill}`} style={{ fontSize: 11 }}>{st.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ padding: "40px", textAlign: "center", color: "var(--text-subtle)", fontSize: 13 }}>
              No referrals match your filter.
            </div>
          )}
        </div>
      </div>
    </DashLayout>
  );
}
