"use client";

import { useState, useRef, useEffect, type ChangeEvent } from "react";
import DashLayout from "@/components/DashLayout";
import {
  Camera, Save, Check, ExternalLink,
  Shield, Bell, User, Palette, Star, MapPin, Globe, Clock,
  Lock, LogOut, AlertTriangle, X, Plus,
  Eye, Trash2, Play, Image as ImageIcon, CheckCircle2,
  Loader, Edit3, BadgeCheck, Zap, TrendingUp
} from "lucide-react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const NICHES = [
  "Beauty","Skincare","Fashion","Fitness","Lifestyle","Food & Cooking",
  "Travel","Tech","Gaming","Finance","Parenting","Pets",
  "Home & Living","Health & Wellness","Comedy","Music","Sports","DIY & Crafts"
];

const CONTENT_PREFS = [
  "Product Reviews","Unboxing","Tutorials & How-Tos","Testimonials",
  "Lifestyle Videos","Voice-over","Product Photography","Short-form Video",
  "Long-form Video","Day-in-the-Life","Before & After","Trending Audios"
];

const LANGUAGES = ["English","Spanish","French","Portuguese","German","Italian","Arabic","Hindi","Mandarin","Japanese","Korean"];
const TIMEZONES = ["UTC−8 (PST)","UTC−5 (EST)","UTC+0 (GMT)","UTC+1 (WAT)","UTC+1 (CET)","UTC+3 (EAT)","UTC+5:30 (IST)","UTC+8 (CST)","UTC+9 (JST)"];

const navSections = [
  { id: "header",       label: "Profile Header",       icon: User },
  { id: "completion",   label: "Completion",            icon: CheckCircle2 },
  { id: "about",        label: "About Me",              icon: Edit3 },
  { id: "categories",  label: "Creator Categories",    icon: Palette },
  { id: "social",       label: "Social Accounts",       icon: Globe },
  { id: "audience",     label: "Audience Insights",     icon: TrendingUp },
  { id: "portfolio",    label: "Portfolio",             icon: ImageIcon },
  { id: "preferences",  label: "Content Preferences",  icon: Zap },
  { id: "availability", label: "Availability",          icon: Clock },
  { id: "account",      label: "Account Info",          icon: Shield },
  { id: "notifications",label: "Notifications",         icon: Bell },
  { id: "security",     label: "Security",              icon: Lock },
  { id: "danger",       label: "Danger Zone",           icon: AlertTriangle },
];

/* ─────────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────────── */
function Section({
  id, title, subtitle, children
}: { id: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div id={id} style={{ marginBottom: 20 }}>
      <div className="card" style={{ padding: "clamp(16px, 4vw, 28px)", borderRadius: 18, maxWidth: "100%", boxSizing: "border-box" }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, letterSpacing: "-0.01em" }}>{title}</div>
          {subtitle && <div style={{ color: "var(--text-subtle)", fontSize: 13, marginTop: 4 }}>{subtitle}</div>}
        </div>
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FIELD WRAPPER
───────────────────────────────────────────── */
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 700, marginBottom: 7, letterSpacing: "0.04em" }}>
        {label}
      </label>
      {children}
      {hint && <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 5 }}>{hint}</div>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOGGLE SWITCH
───────────────────────────────────────────── */
function Toggle({ on, onChange, label, sub }: { on: boolean; onChange: () => void; label: string; sub?: string }) {
  return (
    <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderRadius: 14, background: "var(--surface-subtle)", border: "1px solid var(--border)", cursor: "pointer" }}>
      <div>
        <div style={{ color: "var(--text)", fontSize: 14, fontWeight: 600 }}>{label}</div>
        {sub && <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>{sub}</div>}
      </div>
      <div
        onClick={onChange}
        style={{ width: 44, height: 24, borderRadius: 999, background: on ? "#0284c7" : "var(--progress-bg)", position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}
      >
        <div style={{ position: "absolute", top: 3, left: on ? 23 : 3, width: 18, height: 18, borderRadius: 999, background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
      </div>
    </label>
  );
}

/* ─────────────────────────────────────────────
   CHIP SELECTOR
───────────────────────────────────────────── */
function ChipSelector({
  options, selected, onToggle, color = "#0284c7"
}: { options: string[]; selected: string[]; onToggle: (v: string) => void; color?: string }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map(opt => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            style={{
              padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600,
              background: active ? `${color}18` : "var(--surface-subtle)",
              border: `1px solid ${active ? color : "var(--border-strong)"}`,
              color: active ? color : "var(--text-muted)",
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.14s",
              display: "flex", alignItems: "center", gap: 5
            }}
          >
            {active && <Check style={{ width: 11, height: 11 }} />}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function ProfileView() {
  /* ── State ── */
  const [activeSection, setActiveSection] = useState("header");
  const [selectedNiches,   setSelectedNiches]   = useState<string[]>(["Beauty","Skincare","Lifestyle","Fashion"]);
  const [selectedContent,  setSelectedContent]   = useState<string[]>(["Product Reviews","Tutorials & How-Tos","Short-form Video"]);
  const [selectedLangs,    setSelectedLangs]     = useState<string[]>(["English"]);
  const [available,        setAvailable]         = useState(true);
  const [bio, setBio] = useState("Lifestyle & wellness creator based in London. I create authentic, scroll-stopping UGC content for beauty, health, and lifestyle brands.");

  /* Notification toggles */
  const [notifEmail,     setNotifEmail]     = useState(true);
  const [notifSMS,       setNotifSMS]       = useState(false);
  const [notifCampaign,  setNotifCampaign]  = useState(true);
  const [notifPayment,   setNotifPayment]   = useState(true);
  const [notifMarketing, setNotifMarketing] = useState(false);

  /* Modals */
  const [confirmDeactivate, setConfirmDeactivate] = useState(false);
  const [confirmDelete,     setConfirmDelete]     = useState(false);
  const [deleteInput,       setDeleteInput]       = useState("");
  const [previewOpen,       setPreviewOpen]       = useState(false);

  /* Portfolio items */
  const [portfolioLinks, setPortfolioLinks] = useState([
    { label: "GlowBrand Skincare Reel", url: "https://www.instagram.com/reel/xxx", type: "Instagram" },
    { label: "TechFlow Product Review",  url: "https://www.tiktok.com/@sarah/video/xxx", type: "TikTok" },
  ]);
  const [newLink, setNewLink] = useState({ label: "", url: "" });
  const [addLinkOpen, setAddLinkOpen] = useState(false);

  const avatarFileRef = useRef<HTMLInputElement>(null);
  const coverFileRef  = useRef<HTMLInputElement>(null);

  /* Completion checklist */
  const completionItems = [
    { label: "Profile Photo",      done: true },
    { label: "Creator Bio",        done: true },
    { label: "Social Accounts",    done: true },
    { label: "Portfolio Samples",  done: portfolioLinks.length > 0 },
    { label: "Creator Categories", done: selectedNiches.length > 0 },
    { label: "Audience Insights",  done: false },
  ];
  const completionPct = Math.round((completionItems.filter(i => i.done).length / completionItems.length) * 100);

  /* Active section observer */
  useEffect(() => {
    const sections = navSections.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleNiche  = (v: string) => setSelectedNiches(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleContent= (v: string) => setSelectedContent(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleLang   = (v: string) => setSelectedLangs  (p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);

  return (
    <DashLayout title="My Profile">
      {/* ── RESPONSIVE CSS INJECTION ── */}
      <style>{`
        .profile-container {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 24px;
          align-items: start;
          max-width: 100%;
          width: 100%;
          box-sizing: border-box;
        }
        .profile-main-column {
          min-width: 0;
          max-width: 100%;
        }
        .profile-nav-card {
          position: sticky;
          top: 24px;
        }
        .profile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .auto-grid-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
          gap: 14px;
        }
        .auto-grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 140px), 1fr));
          gap: 14px;
        }
        @media (max-width: 768px) {
          .profile-container {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .profile-nav-card {
            position: relative;
            top: 0;
            margin-bottom: 12px;
            overflow-x: auto;
            max-width: 100%;
          }
          .profile-nav-list {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 4px;
          }
          .profile-nav-btn {
            white-space: nowrap;
          }
          .profile-header-padding {
            padding: 0 16px 20px !important;
          }
        }
      `}</style>

      <div className="profile-container">

        {/* ══════════════════════════════════════
            STICKY SIDEBAR NAV (Horizontally scrolls on mobile)
        ══════════════════════════════════════ */}
        <div className="profile-nav-card">
          <div className="card" style={{ padding: "12px 10px" }}>
            <div className="profile-nav-list">
              {navSections.map(({ id, label, icon: Icon }) => {
                const active = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="profile-nav-btn"
                    style={{
                      display: "flex", alignItems: "center", gap: 9,
                      padding: "9px 12px", borderRadius: 12,
                      background: active ? "rgba(2,132,199,0.1)" : "transparent",
                      border: `1px solid ${active ? "rgba(2,132,199,0.25)" : "transparent"}`,
                      color: active ? "#0284c7" : "var(--text-subtle)",
                      fontWeight: active ? 700 : 500, fontSize: 13,
                      cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                      transition: "all 0.15s", flexShrink: 0
                    }}
                  >
                    <Icon style={{ width: 14, height: 14, flexShrink: 0 }} />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════ */}
        <div className="profile-main-column">

          {/* ── PROFILE HEADER ── */}
          <div id="header" style={{ marginBottom: 24, borderRadius: 20, overflow: "hidden", border: "1px solid var(--border-strong)" }}>
            {/* Cover Photo */}
            <div style={{ position: "relative", height: 180, background: "linear-gradient(135deg, #0c4a6e 0%, #0284c7 50%, #38bdf8 100%)", cursor: "pointer" }}
              onClick={() => coverFileRef.current?.click()}
            >
              <input ref={coverFileRef} type="file" accept="image/*" style={{ display: "none" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, background: "rgba(0,0,0,0.35)", transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", fontWeight: 700, fontSize: 13 }}>
                  <Camera style={{ width: 18, height: 18 }} /> Change Cover Photo
                </div>
              </div>
            </div>

            {/* Avatar + Info */}
            <div className="profile-header-padding" style={{ background: "var(--surface)", padding: "0 clamp(16px, 4vw, 32px) clamp(16px, 4vw, 28px)" }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                {/* Avatar */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
                  <div style={{ position: "relative", marginTop: -40 }}>
                    <div style={{ width: 90, height: 90, borderRadius: 22, background: "#0284c7", border: "4px solid var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 32, cursor: "pointer", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
                      onClick={() => avatarFileRef.current?.click()}
                    >
                      S
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                        onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
                      >
                        <Camera style={{ width: 18, height: 18, color: "#fff" }} />
                      </div>
                    </div>
                    <input ref={avatarFileRef} type="file" accept="image/*" style={{ display: "none" }} />
                  </div>

                  <div style={{ paddingBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 20, letterSpacing: "-0.02em" }}>Sarah Mitchell</div>
                      {/* Verification Badge */}
                      <BadgeCheck style={{ width: 20, height: 20, color: "#0284c7" }} />
                      {/* Creator Level */}
                      <span style={{ background: "linear-gradient(135deg,#f59e0b,#fbbf24)", color: "#fff", fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 999, letterSpacing: "0.04em" }}>
                        PRO
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4, flexWrap: "wrap" }}>
                      <span style={{ color: "var(--text-subtle)", fontSize: 13 }}>@sarah.creates</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#f59e0b", fontSize: 12, fontWeight: 700 }}>
                        <Star style={{ width: 12, height: 12, fill: "#f59e0b" }} /> 4.9
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text-subtle)", fontSize: 12 }}>
                        <MapPin style={{ width: 12, height: 12 }} /> London, UK
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: 10, paddingBottom: 4 }}>
                  <button onClick={() => setPreviewOpen(true)} className="btn btn-ghost btn-sm" style={{ fontSize: 13 }}>
                    <Eye style={{ width: 13, height: 13 }} /> Preview Public Profile
                  </button>
                  <button className="btn btn-primary btn-sm" style={{ fontSize: 13 }}>
                    <Save style={{ width: 13, height: 13 }} /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── PROFILE COMPLETION ── */}
          <div id="completion" style={{ marginBottom: 24 }}>
            <div className="card" style={{ padding: "24px 28px", borderRadius: 18, borderLeft: "4px solid #0284c7" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 16 }}>Profile Completion</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 13, marginTop: 3 }}>Complete your profile to increase your chances of being selected for campaigns.</div>
                </div>
                <div style={{ textAlign: "center", flexShrink: 0 }}>
                  <div style={{ color: "#0284c7", fontWeight: 800, fontSize: 32, lineHeight: 1 }}>{completionPct}%</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>Complete</div>
                </div>
              </div>
              <div style={{ height: 8, background: "var(--progress-bg)", borderRadius: 999, overflow: "hidden", marginBottom: 16 }}>
                <div style={{ height: "100%", width: `${completionPct}%`, background: "linear-gradient(90deg,#0284c7,#38bdf8)", borderRadius: 999, transition: "width 0.4s ease" }} />
              </div>
              <div className="auto-grid-2">
                {completionItems.map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 10, background: item.done ? "rgba(16,185,129,0.06)" : "var(--surface-subtle)", border: `1px solid ${item.done ? "rgba(16,185,129,0.2)" : "var(--border)"}` }}>
                    {item.done
                      ? <CheckCircle2 style={{ width: 14, height: 14, color: "#10b981", flexShrink: 0 }} />
                      : <Loader style={{ width: 14, height: 14, color: "#f59e0b", flexShrink: 0 }} />
                    }
                    <span style={{ color: item.done ? "var(--text)" : "var(--text-subtle)", fontSize: 13, fontWeight: item.done ? 600 : 400 }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── ABOUT ME ── */}
          <Section id="about" title="About Me" subtitle="Your public bio and personal information shown to brands.">
            <div className="auto-grid-2">
              <Field label="FULL NAME">
                <input type="text" defaultValue="Sarah Mitchell" className="input" />
              </Field>
              <Field label="DISPLAY NAME / USERNAME">
                <input type="text" defaultValue="@sarah.creates" className="input" />
              </Field>
              <div style={{ gridColumn: "1 / -1" }}>
                <Field label="BIO" hint="Max 300 characters. Shown on your public profile to brands.">
                  <textarea rows={3} value={bio} onChange={e => setBio(e.target.value)} className="input" style={{ resize: "none" }} />
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 5, textAlign: "right" }}>{bio.length}/300</div>
                </Field>
              </div>
              <Field label="LOCATION">
                <input type="text" defaultValue="London, UK" className="input" />
              </Field>
              <Field label="TIME ZONE">
                <select className="input">
                  {TIMEZONES.map(tz => <option key={tz}>{tz}</option>)}
                </select>
              </Field>
              <div style={{ gridColumn: "1 / -1" }}>
                <Field label="LANGUAGES SPOKEN">
                  <ChipSelector options={LANGUAGES} selected={selectedLangs} onToggle={toggleLang} />
                </Field>
              </div>
            </div>
          </Section>

          {/* ── CREATOR CATEGORIES ── */}
          <Section id="categories" title="Creator Categories" subtitle="Select all niches that match your content style. Brands filter by these.">
            <ChipSelector options={NICHES} selected={selectedNiches} onToggle={toggleNiche} />
          </Section>

          {/* ── SOCIAL ACCOUNTS ── */}
          <Section id="social" title="Social Accounts" subtitle="Connected platforms are shown to brands on your public profile.">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { platform: "Instagram",  handle: "@sarahmitchell",  followers: "120K Followers",    connected: true,  color: "#e1306c" },
                { platform: "TikTok",     handle: "@sarah.creates",  followers: "95K Followers",     connected: true,  color: "#010101" },
                { platform: "YouTube",    handle: "Sarah Creates",   followers: "24K Subscribers",   connected: false, color: "#ff0000" },
                { platform: "X (Twitter)",handle: "@sarah_creates",  followers: "18K Followers",     connected: false, color: "#1da1f2" },
              ].map(acc => (
                <div key={acc.platform} style={{
                  padding: "16px 20px", borderRadius: 14,
                  background: "var(--surface-subtle)", border: "1px solid var(--border-strong)",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: `${acc.color}18`, border: `1px solid ${acc.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Globe style={{ width: 18, height: 18, color: acc.color }} />
                    </div>
                    <div>
                      <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>{acc.platform}</div>
                      {acc.connected
                        ? <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>{acc.handle} · <span style={{ color: "#10b981", fontWeight: 600 }}>{acc.followers}</span></div>
                        : <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2, fontStyle: "italic" }}>Not connected</div>
                      }
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    {acc.connected && (
                      <button className="btn btn-ghost btn-sm" style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}>
                        <Edit3 style={{ width: 12, height: 12 }} /> Edit
                      </button>
                    )}
                    <button
                      className={acc.connected ? "btn btn-ghost btn-sm" : "btn btn-secondary btn-sm"}
                      style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 5,
                        ...(acc.connected ? { color: "#ef4444", borderColor: "rgba(239,68,68,0.3)" } : {})
                      }}
                    >
                      {acc.connected ? "Disconnect" : <><Plus style={{ width: 12, height: 12 }} /> Connect</>}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── AUDIENCE INSIGHTS ── */}
          <Section id="audience" title="Audience Insights" subtitle="Help brands understand your audience. Enter these manually from your platform analytics.">
            <div className="auto-grid-3">
              <Field label="PRIMARY AUDIENCE COUNTRY">
                <input type="text" defaultValue="United Kingdom" className="input" />
              </Field>
              <Field label="AGE RANGE">
                <select className="input">
                  <option>18–24</option><option>25–34</option><option>35–44</option><option>45+</option>
                </select>
              </Field>
              <Field label="GENDER SPLIT">
                <input type="text" defaultValue="72% Female, 28% Male" className="input" />
              </Field>
              <Field label="ENGAGEMENT RATE (%)" hint="Avg likes + comments / followers × 100">
                <input type="number" defaultValue="4.8" step="0.1" className="input" />
              </Field>
              <Field label="AVERAGE VIEWS PER POST">
                <input type="text" defaultValue="28,000" className="input" />
              </Field>
              <Field label="AVERAGE REACH PER POST">
                <input type="text" defaultValue="35,000" className="input" />
              </Field>
            </div>
            <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 12, background: "rgba(2,132,199,0.06)", border: "1px solid rgba(2,132,199,0.18)", color: "var(--text-muted)", fontSize: 12, lineHeight: 1.6 }}>
              These stats are displayed on your public profile. Brands use them to evaluate fit before inviting you to campaigns.
            </div>
          </Section>

          {/* ── PORTFOLIO ── */}
          <Section id="portfolio" title="Portfolio" subtitle="Showcase your best UGC work. Add video/image links from TikTok, Instagram, YouTube or Google Drive.">
            {/* Add Link */}
            <div style={{ marginBottom: 20 }}>
              <button
                onClick={() => setAddLinkOpen(true)}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}
              >
                <Plus style={{ width: 13, height: 13 }} /> Add Portfolio Link
              </button>
            </div>

            {/* Grid */}
            {portfolioLinks.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "var(--text-subtle)", fontSize: 13, border: "2px dashed var(--border-strong)", borderRadius: 14 }}>
                No portfolio items yet. Add links to your best content above.
              </div>
            ) : (
              <div className="auto-grid-2">
                {portfolioLinks.map((item, i) => (
                  <div key={i} style={{ padding: "16px 18px", borderRadius: 14, background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(2,132,199,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Play style={{ width: 16, height: 16, color: "#0284c7" }} />
                      </div>
                      <div>
                        <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 13 }}>{item.label}</div>
                        <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>{item.type}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <a href={item.url} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", padding: "6px", borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-subtle)", cursor: "pointer" }}>
                        <ExternalLink style={{ width: 13, height: 13 }} />
                      </a>
                      <button onClick={() => setPortfolioLinks(p => p.filter((_, idx) => idx !== i))} style={{ display: "flex", alignItems: "center", padding: "6px", borderRadius: 8, background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", cursor: "pointer" }}>
                        <Trash2 style={{ width: 13, height: 13 }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* ── CONTENT PREFERENCES ── */}
          <Section id="preferences" title="Content Preferences" subtitle="Select the types of content you enjoy creating and specialise in.">
            <ChipSelector options={CONTENT_PREFS} selected={selectedContent} onToggle={toggleContent} color="#10b981" />
          </Section>

          {/* ── AVAILABILITY ── */}
          <Section id="availability" title="Availability" subtitle="Toggle your availability status. Brands can only invite you to campaigns when you're available.">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { val: true,  label: "Available for Campaigns",      sub: "Brands can discover and invite you",     color: "#10b981" },
                { val: false, label: "Not Accepting New Campaigns",   sub: "You won't receive new campaign invites", color: "#ef4444" },
              ].map(opt => (
                <div
                  key={String(opt.val)}
                  onClick={() => setAvailable(opt.val)}
                  style={{
                    padding: "18px 20px", borderRadius: 14, cursor: "pointer",
                    background: available === opt.val ? `${opt.color}08` : "var(--surface-subtle)",
                    border: `1.5px solid ${available === opt.val ? opt.color : "var(--border-strong)"}`,
                    display: "flex", alignItems: "center", gap: 14, transition: "all 0.15s"
                  }}
                >
                  <div style={{ width: 18, height: 18, borderRadius: 999, border: `2px solid ${available === opt.val ? opt.color : "var(--border-strong)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {available === opt.val && <div style={{ width: 9, height: 9, borderRadius: 999, background: opt.color }} />}
                  </div>
                  <div>
                    <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>{opt.label}</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>{opt.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── ACCOUNT INFORMATION ── */}
          <Section id="account" title="Account Information" subtitle="Manage your login credentials and contact details.">
            <div className="auto-grid-2" style={{ marginBottom: 20 }}>
              <Field label="EMAIL ADDRESS">
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="email" defaultValue="sarah@email.com" className="input" style={{ flex: 1 }} />
                  <button className="btn btn-ghost btn-sm" style={{ flexShrink: 0, fontSize: 12 }}>Change</button>
                </div>
              </Field>
              <Field label="PHONE NUMBER">
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="tel" defaultValue="+44 7700 900123" className="input" style={{ flex: 1 }} />
                  <button className="btn btn-ghost btn-sm" style={{ flexShrink: 0, fontSize: 12 }}>Change</button>
                </div>
              </Field>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-ghost btn-sm" style={{ fontSize: 13 }}>
                <Lock style={{ width: 13, height: 13 }} /> Change Password
              </button>
            </div>
          </Section>

          {/* ── NOTIFICATIONS ── */}
          <Section id="notifications" title="Notification Preferences" subtitle="Control how and when you receive updates from UGC Studio.">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Toggle on={notifEmail}     onChange={() => setNotifEmail(p => !p)}     label="Email Notifications"   sub="Campaign updates, approvals and news via email" />
              <Toggle on={notifSMS}       onChange={() => setNotifSMS(p => !p)}       label="SMS Notifications"     sub="Urgent alerts sent to your phone number" />
              <Toggle on={notifCampaign}  onChange={() => setNotifCampaign(p => !p)}  label="Campaign Invitations"  sub="Get notified when a brand invites you to a brief" />
              <Toggle on={notifPayment}   onChange={() => setNotifPayment(p => !p)}   label="Payment Updates"       sub="Payout approvals, clearances and transfers" />
              <Toggle on={notifMarketing} onChange={() => setNotifMarketing(p => !p)} label="Marketing Emails"      sub="Platform news, tips and creator resources" />
            </div>
          </Section>

          {/* ── SECURITY ── */}
          <Section id="security" title="Account Security" subtitle="Protect your account and manage active sessions.">
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Last Login",              value: "Jul 29, 2025 at 10:42 AM · London, UK",  color: "var(--text)" },
                { label: "Two-Factor Authentication", value: "Not Enabled",                            color: "#ef4444" },
                { label: "Active Sessions",          value: "2 devices",                               color: "var(--text)" },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border)" }}>
                  <span style={{ color: "var(--text-subtle)", fontSize: 13 }}>{row.label}</span>
                  <span style={{ color: row.color, fontWeight: 700, fontSize: 13 }}>{row.value}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="btn btn-secondary btn-sm" style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                <Shield style={{ width: 13, height: 13 }} /> Enable 2FA
              </button>
              <button className="btn btn-ghost btn-sm" style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                <Lock style={{ width: 13, height: 13 }} /> Change Password
              </button>
              <button className="btn btn-ghost btn-sm" style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6, color: "#ef4444", borderColor: "rgba(239,68,68,0.3)" }}>
                <LogOut style={{ width: 13, height: 13 }} /> Log Out of Other Devices
              </button>
            </div>
          </Section>

          {/* ── DANGER ZONE ── */}
          <div id="danger" style={{ marginBottom: 24 }}>
            <div className="card" style={{ padding: "28px 32px", borderRadius: 18, borderTop: "3px solid #ef4444" }}>
              <div style={{ color: "#ef4444", fontWeight: 800, fontSize: 17, marginBottom: 4 }}>Danger Zone</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 13, marginBottom: 24 }}>These actions are irreversible. Please proceed with caution.</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderRadius: 14, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
                  <div>
                    <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>Deactivate Account</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 13, marginTop: 2 }}>Temporarily hides your profile. You can reactivate at any time.</div>
                  </div>
                  <button onClick={() => setConfirmDeactivate(true)} style={{ padding: "9px 18px", borderRadius: 10, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", color: "#d97706", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>
                    Deactivate
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderRadius: 14, background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <div>
                    <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>Delete Account</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 13, marginTop: 2 }}>Permanently removes your account, profile, and all data. This cannot be undone.</div>
                  </div>
                  <button onClick={() => setConfirmDelete(true)} style={{ padding: "9px 18px", borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ════════════════════════════════
          ADD PORTFOLIO LINK MODAL
      ════════════════════════════════ */}
      {addLinkOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1100, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div className="card" style={{ maxWidth: 440, width: "100%", padding: "28px", borderRadius: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, margin: 0 }}>Add Portfolio Link</h3>
              <button onClick={() => setAddLinkOpen(false)} style={{ background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer" }}><X style={{ width: 18, height: 18 }} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Field label="TITLE / DESCRIPTION">
                <input type="text" className="input" placeholder="e.g. GlowBrand Skincare Reel" value={newLink.label} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewLink(p => ({ ...p, label: e.target.value }))} />
              </Field>
              <Field label="URL" hint="TikTok, Instagram, YouTube, Google Drive or any public link">
                <input type="url" className="input" placeholder="https://..." value={newLink.url} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewLink(p => ({ ...p, url: e.target.value }))} />
              </Field>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button onClick={() => setAddLinkOpen(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                <button
                  onClick={() => {
                    if (newLink.label && newLink.url) {
                      setPortfolioLinks(p => [...p, { ...newLink, type: "Link" }]);
                      setNewLink({ label: "", url: "" });
                      setAddLinkOpen(false);
                    }
                  }}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  disabled={!newLink.label || !newLink.url}
                >
                  Add to Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════
          DEACTIVATE CONFIRM MODAL
      ════════════════════════════════ */}
      {confirmDeactivate && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1100, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div className="card" style={{ maxWidth: 420, width: "100%", padding: "28px", borderRadius: 20 }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <AlertTriangle style={{ width: 24, height: 24, color: "#d97706" }} />
              </div>
              <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 18, margin: "0 0 8px" }}>Deactivate Account?</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6 }}>Your profile will be hidden from brands. All active campaigns will be paused. You can reactivate at any time by logging back in.</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirmDeactivate(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button onClick={() => { setConfirmDeactivate(false); alert("Account deactivated."); }} style={{ flex: 1, padding: "10px 0", borderRadius: 12, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", color: "#d97706", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Deactivate</button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════
          DELETE CONFIRM MODAL
      ════════════════════════════════ */}
      {confirmDelete && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1100, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div className="card" style={{ maxWidth: 440, width: "100%", padding: "28px", borderRadius: 20 }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <Trash2 style={{ width: 24, height: 24, color: "#ef4444" }} />
              </div>
              <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 18, margin: "0 0 8px" }}>Delete Account Permanently?</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>This will permanently delete your profile, submissions, earnings history, and all associated data. <strong>This cannot be undone.</strong></p>
              <Field label={`TYPE "DELETE" TO CONFIRM`}>
                <input type="text" className="input" placeholder="DELETE" value={deleteInput} onChange={(e: ChangeEvent<HTMLInputElement>) => setDeleteInput(e.target.value)} style={{ textAlign: "center", fontWeight: 700, letterSpacing: "0.1em" }} />
              </Field>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { setConfirmDelete(false); setDeleteInput(""); }} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button
                disabled={deleteInput !== "DELETE"}
                onClick={() => { setConfirmDelete(false); alert("Account deleted."); }}
                style={{
                  flex: 1, padding: "10px 0", borderRadius: 12,
                  background: deleteInput === "DELETE" ? "#ef4444" : "var(--surface-subtle)",
                  border: "none", color: deleteInput === "DELETE" ? "#fff" : "var(--text-subtle)",
                  fontSize: 14, fontWeight: 700, cursor: deleteInput === "DELETE" ? "pointer" : "not-allowed",
                  fontFamily: "inherit", transition: "all 0.15s"
                }}
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
