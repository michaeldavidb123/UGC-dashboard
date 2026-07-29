"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  Building2, Globe, Mail, Phone, MapPin, Edit3, Check, Camera,
  ShieldCheck, CreditCard, Users, Megaphone, Plus, Trash2, ExternalLink,
  Lock, AlertTriangle, FileText, UploadCloud, Star, DollarSign, Wallet
} from "lucide-react";

interface TeamMember {
  id: string; name: string; email: string; role: "Owner" | "Admin" | "Campaign Manager"; status: "Active" | "Pending";
}

interface SavedCreator {
  id: string; name: string; handle: string; niche: string; rating: string; deals: number; avatar: string;
}

export default function BrandProfileView() {
  const [activeTab, setActiveTab] = useState<"info" | "campaigns" | "talent" | "billing" | "team" | "settings">("info");
  const [editing, setEditing] = useState(false);

  // Brand profile fields
  const [brandName, setBrandName] = useState("GlowBrand Skincare");
  const [tagline, setTagline] = useState("Clean, organic skincare products designed for daily radiant confidence.");
  const [website, setWebsite] = useState("https://glowbrand.com");
  const [industry, setIndustry] = useState("Beauty & Cosmetics");
  const [location, setLocation] = useState("Los Angeles, CA");
  const [email, setEmail] = useState("partnerships@glowbrand.com");
  const [phone, setPhone] = useState("+1 (555) 234-5678");
  const [description, setDescription] = useState(
    "GlowBrand creates premium, dermatologist-tested skincare using sustainably sourced botanicals. We collaborate with authentic UGC creators to produce relatable TikTok & Reel video content."
  );

  // Guidelines & Asset Links
  const [targetAudience, setTargetAudience] = useState("Women aged 18-34 interested in skincare, wellness, and natural beauty routines.");
  const [contentGuidelines, setContentGuidelines] = useState("Natural lighting, clear product shots within first 3 seconds, enthusiastic voice-over or spoken review. Highlight texture and application.");

  // Team members
  const [team, setTeam] = useState<TeamMember[]>([
    { id: "1", name: "Jessica Vance", email: "jessica@glowbrand.com", role: "Owner", status: "Active" },
    { id: "2", name: "David Chen", email: "david@glowbrand.com", role: "Campaign Manager", status: "Active" },
    { id: "3", name: "Sarah Miller", email: "sarah@glowbrand.com", role: "Admin", status: "Pending" },
  ]);

  // Saved Creators
  const [savedCreators] = useState<SavedCreator[]>([
    { id: "1", name: "Sarah Mitchell", handle: "@sarahcreates", niche: "Beauty & Skincare", rating: "4.92★", deals: 18, avatar: "SM" },
    { id: "2", name: "Elena Rostova", handle: "@elenaugc", niche: "Beauty & Lifestyle", rating: "4.98★", deals: 24, avatar: "ER" },
    { id: "3", name: "Marcus Lee", handle: "@marcusfits", niche: "Wellness & Tech", rating: "4.88★", deals: 12, avatar: "ML" },
  ]);

  // Invite team modal
  const [inviteModal, setInviteModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<"Admin" | "Campaign Manager">("Campaign Manager");

  const handleInvite = () => {
    if (!newEmail) return;
    setTeam(prev => [...prev, { id: String(Date.now()), name: newEmail.split("@")[0], email: newEmail, role: newRole, status: "Pending" }]);
    setNewEmail("");
    setInviteModal(false);
  };

  return (
    <DashLayout title="Brand Profile">
      <PageHeader
        title="Brand Profile & Workspace Settings"
        subtitle="Manage your brand identity, creator guidelines, team access, and campaign escrow preferences."
        action={
          <button onClick={() => setEditing(!editing)} className={editing ? "btn btn-primary" : "btn btn-secondary"} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {editing ? <Check style={{ width: 15, height: 15 }} /> : <Edit3 style={{ width: 15, height: 15 }} />}
            {editing ? "Save Profile" : "Edit Profile"}
          </button>
        }
      />

      {/* ── BRAND HERO CARD ── */}
      <div className="card" style={{ padding: "28px", borderRadius: 24, marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {/* Brand Logo Avatar */}
              <div style={{ position: "relative" }}>
                <div style={{ width: 76, height: 76, borderRadius: 20, background: "linear-gradient(135deg, #7c3aed, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 28, boxShadow: "0 10px 24px rgba(124,58,237,0.3)" }}>
                  GB
                </div>
                {editing && (
                  <button style={{ position: "absolute", bottom: -4, right: -4, width: 26, height: 26, borderRadius: 999, background: "var(--surface)", border: "1px solid var(--border-strong)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <Camera style={{ width: 13, height: 13, color: "var(--text)" }} />
                  </button>
                )}
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {editing ? (
                    <input className="input" value={brandName} onChange={e => setBrandName(e.target.value)} style={{ fontWeight: 900, fontSize: 20, padding: "4px 10px" }} />
                  ) : (
                    <h1 style={{ color: "var(--text)", fontWeight: 900, fontSize: 24, margin: 0 }}>{brandName}</h1>
                  )}
                  <span className="pill pill-purple" style={{ fontSize: 11, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <ShieldCheck style={{ width: 12, height: 12 }} /> Verified Brand
                  </span>
                </div>

                {editing ? (
                  <input className="input" value={tagline} onChange={e => setTagline(e.target.value)} style={{ fontSize: 13, marginTop: 6, width: "100%" }} />
                ) : (
                  <p style={{ color: "var(--text-subtle)", fontSize: 14, margin: "4px 0 8px" }}>{tagline}</p>
                )}

                <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontSize: 12, color: "var(--text-subtle)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Building2 style={{ width: 13, height: 13, color: "#7c3aed" }} /> {industry}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin style={{ width: 13, height: 13 }} /> {location}</span>
                  <a href={website} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 4, color: "#7c3aed", textDecoration: "none", fontWeight: 600 }}>
                    <Globe style={{ width: 13, height: 13 }} /> {website.replace("https://", "")} <ExternalLink style={{ width: 11, height: 11 }} />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {[
                { label: "Campaigns Posted", val: "6", color: "#7c3aed" },
                { label: "Creators Hired", val: "42", color: "#10b981" },
                { label: "Escrow Funded", val: "$18.4k", color: "#0284c7" },
                { label: "Creator Rating", val: "4.98★", color: "#f59e0b" },
              ].map(s => (
                <div key={s.label} style={{ padding: "12px 18px", borderRadius: 14, background: "var(--surface-subtle)", border: "1px solid var(--border)", textAlign: "center", minWidth: 100 }}>
                  <div style={{ color: s.color, fontWeight: 900, fontSize: 20 }}>{s.val}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 600, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── NAVIGATION TABS ── */}
      <div style={{ display: "flex", gap: 8, borderBottom: "1px solid var(--border)", marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
        {[
          { id: "info", label: "Brand Overview & Guidelines" },
          { id: "campaigns", label: "Active Briefs (6)" },
          { id: "billing", label: "Escrow & Billing" },
          { id: "team", label: "Team Members (3)" },
          { id: "settings", label: "Settings & Security" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: "10px 18px", borderRadius: 12, border: "none",
              background: activeTab === tab.id ? "#7c3aed" : "transparent",
              color: activeTab === tab.id ? "#fff" : "var(--text-subtle)",
              fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
              whiteSpace: "nowrap", transition: "all 0.2s"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: BRAND OVERVIEW & GUIDELINES ── */}
      {activeTab === "info" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          <div className="card" style={{ padding: 24, borderRadius: 20 }}>
            <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <Building2 style={{ width: 18, height: 18, color: "#7c3aed" }} /> About the Brand
            </h3>
            {editing ? (
              <textarea className="input" rows={4} value={description} onChange={e => setDescription(e.target.value)} style={{ width: "100%", resize: "vertical" }} />
            ) : (
              <p style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{description}</p>
            )}

            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                <Mail style={{ width: 15, height: 15, color: "var(--text-subtle)" }} />
                <span style={{ color: "var(--text-subtle)", width: 110 }}>Partner Email:</span>
                {editing ? <input className="input" value={email} onChange={e => setEmail(e.target.value)} /> : <strong style={{ color: "var(--text)" }}>{email}</strong>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                <Phone style={{ width: 15, height: 15, color: "var(--text-subtle)" }} />
                <span style={{ color: "var(--text-subtle)", width: 110 }}>Phone:</span>
                {editing ? <input className="input" value={phone} onChange={e => setPhone(e.target.value)} /> : <strong style={{ color: "var(--text)" }}>{phone}</strong>}
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 24, borderRadius: 20 }}>
            <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <FileText style={{ width: 18, height: 18, color: "#7c3aed" }} /> Creator Content Guidelines
            </h3>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>TARGET AUDIENCE</label>
              {editing ? (
                <textarea className="input" rows={2} value={targetAudience} onChange={e => setTargetAudience(e.target.value)} style={{ width: "100%" }} />
              ) : (
                <p style={{ color: "var(--text)", fontSize: 13, margin: 0, lineHeight: 1.5 }}>{targetAudience}</p>
              )}
            </div>
            <div>
              <label style={{ display: "block", color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>CONTENT DOS & DON'TS</label>
              {editing ? (
                <textarea className="input" rows={3} value={contentGuidelines} onChange={e => setContentGuidelines(e.target.value)} style={{ width: "100%" }} />
              ) : (
                <p style={{ color: "var(--text)", fontSize: 13, margin: 0, lineHeight: 1.5 }}>{contentGuidelines}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: ACTIVE CAMPAIGNS ── */}
      {activeTab === "campaigns" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { id: "CP-101", title: "Vitamin C Serum Morning Routine Reel", budget: "$1,000 Escrow", applicants: 14, status: "Active" },
            { id: "CP-102", title: "Hydration Barrier Cream Unboxing", budget: "$1,500 Escrow", applicants: 22, status: "Active" },
            { id: "CP-103", title: "Glow Lotion TikTok Summer Push", budget: "$800 Escrow", applicants: 9, status: "Active" },
          ].map(c => (
            <div key={c.id} className="card card-lift" style={{ padding: "18px 22px", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span className="pill pill-green" style={{ fontSize: 10 }}>{c.status}</span>
                  <span style={{ color: "var(--text-subtle)", fontSize: 11 }}>{c.id}</span>
                </div>
                <h4 style={{ color: "var(--text)", fontWeight: 800, fontSize: 15, margin: 0 }}>{c.title}</h4>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#10b981", fontWeight: 800, fontSize: 14 }}>{c.budget}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{c.applicants} Applicants</div>
                </div>
                <button className="btn btn-secondary btn-sm">Manage Brief</button>
              </div>
            </div>
          ))}
        </div>
      )}



      {/* ── TAB 4: ESCROW & BILLING ── */}
      {activeTab === "billing" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          <div className="card" style={{ padding: 24, borderRadius: 20 }}>
            <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <Wallet style={{ width: 18, height: 18, color: "#7c3aed" }} /> Brand Escrow Wallet
            </h3>
            <div style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 16, padding: 20, marginBottom: 18 }}>
              <div style={{ color: "var(--text-subtle)", fontSize: 12, fontWeight: 700 }}>AVAILABLE ESCROW BALANCE</div>
              <div style={{ color: "#7c3aed", fontWeight: 900, fontSize: 32, marginTop: 4 }}>$4,500.00</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 4 }}>Locked in active campaigns: $3,300.00</div>
            </div>
            <button className="btn btn-primary" style={{ width: "100%", borderRadius: 12 }}>+ Fund Escrow Wallet</button>
          </div>

          <div className="card" style={{ padding: 24, borderRadius: 20 }}>
            <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <CreditCard style={{ width: 18, height: 18, color: "#7c3aed" }} /> Payment Method
            </h3>
            <div style={{ padding: "16px", borderRadius: 14, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <CreditCard style={{ width: 22, height: 22, color: "#7c3aed" }} />
                <div>
                  <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>Visa ending in •••• 4242</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>Expires 12/28 · Default</div>
                </div>
              </div>
              <span className="pill pill-green" style={{ fontSize: 10 }}>Active</span>
            </div>
            <button className="btn btn-secondary" style={{ width: "100%", borderRadius: 12 }}>Manage Payment Methods</button>
          </div>
        </div>
      )}

      {/* ── TAB 5: TEAM MEMBERS ── */}
      {activeTab === "team" && (
        <div className="card" style={{ borderRadius: 20, overflow: "hidden", padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, margin: 0 }}>Team Access & Permissions</h3>
            <button onClick={() => setInviteModal(true)} className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Plus style={{ width: 14, height: 14 }} /> Invite Member
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {team.map(m => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border)" }}>
                <div>
                  <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>{m.name}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 12 }}>{m.email}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="pill pill-purple" style={{ fontSize: 11 }}>{m.role}</span>
                  <span className={`pill ${m.status === "Active" ? "pill-green" : "pill-amber"}`} style={{ fontSize: 10 }}>{m.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 6: SETTINGS & SECURITY ── */}
      {activeTab === "settings" && (
        <div className="card" style={{ padding: 24, borderRadius: 20, maxWidth: 540 }}>
          <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, marginBottom: 16 }}>Security & Preferences</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: 14 }}>
              <div>
                <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>Two-Factor Authentication (2FA)</div>
                <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>Secure your brand account with authenticator apps.</div>
              </div>
              <button className="btn btn-secondary btn-sm">Enable</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: 14 }}>
              <div>
                <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>Email Notifications</div>
                <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>Receive alerts for new creator applications & deliverables.</div>
              </div>
              <button className="btn btn-primary btn-sm">Configured</button>
            </div>
          </div>
        </div>
      )}

      {/* ── INVITE TEAM MODAL ── */}
      {inviteModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1100, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div className="card" style={{ maxWidth: 420, width: "100%", padding: 24, borderRadius: 20 }}>
            <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, marginBottom: 16 }}>Invite Team Member</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ display: "block", color: "var(--text-subtle)", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>EMAIL ADDRESS</label>
                <input className="input" type="email" placeholder="colleague@yourbrand.com" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
              </div>
              <div>
                <label style={{ display: "block", color: "var(--text-subtle)", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>ROLE PERMISSION</label>
                <select className="input" value={newRole} onChange={e => setNewRole(e.target.value as any)}>
                  <option value="Campaign Manager">Campaign Manager (Create briefs & approve deliverables)</option>
                  <option value="Admin">Admin (Full access + Billing & Team control)</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button onClick={() => setInviteModal(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                <button onClick={handleInvite} className="btn btn-primary" style={{ flex: 1 }} disabled={!newEmail}>Send Invite</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
