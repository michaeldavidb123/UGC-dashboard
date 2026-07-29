"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Camera, ChevronRight, ChevronLeft, Check, Sparkles,
  Globe, Building2, Loader2, Video, Image as ImageIcon,
  Film, Users, BarChart2, Target, DollarSign, Phone,
  Mail, Briefcase, CreditCard
} from "lucide-react";

/* ── Constants ────────────────────────── */
const STEPS = [
  { label: "Company Profile" },
  { label: "Campaign Goals"  },
  { label: "Contact Person"  },
  { label: "Billing Setup"   },
];

const INDUSTRIES = [
  "Beauty & Cosmetics", "Fashion & Apparel", "Food & Beverage", "Health & Wellness",
  "Technology & Software", "Home & Garden", "Sports & Fitness", "Travel & Hospitality",
  "Finance & Fintech", "Education & E-learning", "Entertainment & Media",
  "Automotive", "Pet Products", "Baby & Kids", "Sustainability & Eco", "Other",
];

const COMPANY_SIZES = ["1–10 (Startup)", "11–50 (Small)", "51–200 (Mid-size)", "201–500 (Large)", "500+ (Enterprise)"];

const COUNTRIES = ["United States","United Kingdom","Canada","Australia","Germany","France","Nigeria","South Africa","India","Brazil","Mexico","Netherlands","Sweden","Norway","Denmark","Singapore","UAE","Ghana","Kenya","Egypt","Other"];

const BUDGET_RANGES = [
  { id: "starter", label: "Starter", range: "$500–$2,000/mo", desc: "1–5 creators per campaign" },
  { id: "growth",  label: "Growth",  range: "$2,000–$10,000/mo", desc: "5–20 creators per campaign" },
  { id: "scale",   label: "Scale",   range: "$10,000–$50,000/mo", desc: "20–100 creators" },
  { id: "enterprise", label: "Enterprise", range: "$50,000+/mo", desc: "Full-scale UGC operations" },
];

const USE_CASES = [
  "Social Media Ads (Meta, TikTok)",
  "Organic Social Content",
  "Product Launch Campaigns",
  "Website & Landing Pages",
  "Amazon / E-commerce Listings",
  "Email Marketing",
  "YouTube Pre-roll Ads",
  "App Store Screenshots & Videos",
];

/* ── Form types ───────────────────────── */
interface FormData {
  // Step 1 – Company
  logo: string | null;
  companyName: string;
  companyWebsite: string;
  industry: string;
  companySize: string;
  country: string;
  city: string;
  bio: string;
  // Step 2 – Goals
  contentTypes: string[];
  budgetRange: string;
  useCases: string[];
  targetAudience: string;
  // Step 3 – Contact
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  // Step 4 – Billing
  billingMethod: "card" | "invoice" | "crypto" | null;
  billingEmail: string;
  vatNumber: string;
}

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function BrandOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormData>({
    logo: null, companyName: "", companyWebsite: "", industry: "", companySize: "", country: "", city: "", bio: "",
    contentTypes: [], budgetRange: "", useCases: [], targetAudience: "",
    contactName: "", contactRole: "", contactEmail: "", contactPhone: "",
    billingMethod: null, billingEmail: "", vatNumber: "",
  });

  const set = (k: keyof FormData, v: unknown) => setForm(p => ({ ...p, [k]: v }));
  const toggleArr = (k: keyof FormData, val: string) => {
    const arr = form[k] as string[];
    set(k, arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader(); r.onload = () => set("logo", r.result as string); r.readAsDataURL(f);
  };

  const canNext = () => {
    if (step === 0) return !!(form.companyName.trim() && form.industry && form.country);
    if (step === 1) return form.contentTypes.length > 0 && !!form.budgetRange;
    if (step === 2) return !!(form.contactName.trim() && form.contactEmail.trim());
    if (step === 3) {
      if (!form.billingMethod) return false;
      if (form.billingMethod === "card" || form.billingMethod === "invoice") return !!form.billingEmail.trim();
      return true;
    }
    return true;
  };

  const finish = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1800));
    localStorage.setItem("ugc_onboarding_complete", "true");
    localStorage.setItem("ugc_creator_role", "normal");
    setSubmitting(false);
    setDone(true);
    setTimeout(() => router.push("/subscription"), 2200);
  };

  if (done) return <SuccessScreen name={form.companyName} />;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "var(--font-poppins), sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ height: 64, borderBottom: "1px solid var(--border-strong)", background: "var(--sidebar-bg)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(124,58,237,0.35)" }}>
            <Sparkles style={{ width: 15, height: 15, color: "#fff" }} />
          </div>
          <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 15 }}>UGC Studio</span>
          <span style={{ color: "var(--text-subtle)", fontSize: 13, marginLeft: 4 }}>· Brand Setup</span>
        </div>

        {/* Step pills */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 999, background: i === step ? "#7c3aed" : i < step ? "rgba(124,58,237,0.1)" : "var(--surface-subtle)", border: `1px solid ${i === step ? "#7c3aed" : i < step ? "rgba(124,58,237,0.3)" : "var(--border-strong)"}`, transition: "all 0.3s" }}>
                {i < step ? <Check style={{ width: 11, height: 11, color: i === step ? "#fff" : "#a78bfa" }} /> : <span style={{ fontSize: 10, fontWeight: 700, color: i === step ? "#fff" : "var(--text-subtle)" }}>{i + 1}</span>}
                <span style={{ fontSize: 11, fontWeight: 600, color: i === step ? "#fff" : i < step ? "#a78bfa" : "var(--text-subtle)", whiteSpace: "nowrap" }}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div style={{ width: 16, height: 1, background: i < step ? "rgba(124,58,237,0.4)" : "var(--border-strong)" }} />}
            </div>
          ))}
        </div>

        <div style={{ color: "var(--text-subtle)", fontSize: 13 }}>Step {step + 1} / {STEPS.length}</div>
      </header>

      {/* Body */}
      <div style={{ flex: 1, display: "flex" }}>
        {/* Left panel */}
        <aside style={{ width: 380, flexShrink: 0, background: "linear-gradient(160deg, #1a0c2e 0%, #0b0e17 100%)", borderRight: "1px solid var(--border-strong)", padding: "52px 36px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 300, height: 300, borderRadius: 999, top: -80, right: -100, background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 999, padding: "6px 14px", marginBottom: 20 }}>
              <Building2 style={{ width: 11, height: 11, color: "#a78bfa" }} />
              <span style={{ color: "#a78bfa", fontSize: 12, fontWeight: 600 }}>Brand Onboarding</span>
            </div>

            <h2 style={{ color: "#f1f5f9", fontWeight: 800, fontSize: 26, lineHeight: 1.25, letterSpacing: "-0.03em", marginBottom: 14 }}>
              {step === 0 && "Tell us about\nyour brand"}
              {step === 1 && "Define your\ncampaign goals"}
              {step === 2 && "Who's our\nmain contact?"}
              {step === 3 && "Set up\nbilling"}
            </h2>
            <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7, marginBottom: 32 }}>
              {step === 0 && "A complete brand profile helps creators trust your campaigns and apply faster."}
              {step === 1 && "Let us know what content you need and how much you're planning to spend monthly."}
              {step === 2 && "We'll reach out to this person for campaign approvals, briefs, and platform support."}
              {step === 3 && "Set up billing so your campaigns go live instantly. Funds are held in escrow until you approve deliverables."}
            </p>

            {/* Stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: <Users style={{ width: 14, height: 14 }} />, text: "12,000+ vetted creators ready to apply" },
                { icon: <BarChart2 style={{ width: 14, height: 14 }} />, text: "Avg. 48hr turnaround on applications" },
                { icon: <Target style={{ width: 14, height: 14 }} />, text: "94% client satisfaction rate" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "12px 16px" }}>
                  <div style={{ color: "#a78bfa" }}>{s.icon}</div>
                  <span style={{ color: "#94a3b8", fontSize: 13 }}>{s.text}</span>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div style={{ marginTop: 32, padding: "20px", background: "rgba(124,58,237,0.06)", borderRadius: 16, border: "1px solid rgba(124,58,237,0.15)", textAlign: "center" }}>
              <div style={{ color: "#a78bfa", fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em" }}>{Math.round((step / STEPS.length) * 100)}%</div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 999, margin: "8px 0 6px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(step / STEPS.length) * 100}%`, background: "linear-gradient(90deg, #7c3aed, #a78bfa)", borderRadius: 999, transition: "width 0.5s ease" }} />
              </div>
              <div style={{ color: "#475569", fontSize: 12 }}>Setup completion</div>
            </div>
          </div>
        </aside>

        {/* Right: form */}
        <main style={{ flex: 1, overflowY: "auto", padding: "52px 72px", display: "flex", flexDirection: "column" }}>
          <div style={{ maxWidth: 620, width: "100%", margin: "0 auto", flex: 1 }}>

            {/* ── STEP 0: Company Profile ── */}
            {step === 0 && (
              <StepWrap title="Company Profile" sub="This is your brand page — creators will see this before applying to your campaigns.">
                {/* Logo upload */}
                <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 32, padding: "24px", background: "var(--surface-subtle)", borderRadius: 16, border: "1px solid var(--border-strong)" }}>
                  <div onClick={() => fileRef.current?.click()} style={{ width: 80, height: 80, borderRadius: 20, flexShrink: 0, cursor: "pointer", background: form.logo ? "transparent" : "rgba(124,58,237,0.08)", border: `2px dashed ${form.logo ? "#7c3aed" : "var(--border-strong)"}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {form.logo ? <img src={form.logo} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Building2 style={{ width: 24, height: 24, color: "#a78bfa" }} />}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleLogo} />
                  <div>
                    <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Company Logo</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>Upload your brand logo. PNG or SVG, transparent background preferred.</div>
                    <button onClick={() => fileRef.current?.click()} style={{ padding: "7px 16px", borderRadius: 10, background: "var(--nav-hover-bg)", border: "1px solid var(--border-strong)", color: "var(--text)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Upload Logo</button>
                  </div>
                </div>

                <div style={{ display: "grid", gap: 18 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Field label="Company Name" required accent="#7c3aed"><input className="input" placeholder="GlowBrand Inc." value={form.companyName} onChange={e => set("companyName", e.target.value)} /></Field>
                    <Field label="Website" accent="#7c3aed"><input className="input" placeholder="https://yourbrand.com" value={form.companyWebsite} onChange={e => set("companyWebsite", e.target.value)} /></Field>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Field label="Industry" required accent="#7c3aed">
                      <select className="input" value={form.industry} onChange={e => set("industry", e.target.value)} style={{ cursor: "pointer" }}>
                        <option value="">Select industry</option>
                        {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                      </select>
                    </Field>
                    <Field label="Company Size" accent="#7c3aed">
                      <select className="input" value={form.companySize} onChange={e => set("companySize", e.target.value)} style={{ cursor: "pointer" }}>
                        <option value="">Select size</option>
                        {COMPANY_SIZES.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </Field>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Field label="Country" required accent="#7c3aed">
                      <select className="input" value={form.country} onChange={e => set("country", e.target.value)} style={{ cursor: "pointer" }}>
                        <option value="">Select country</option>
                        {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field label="City" accent="#7c3aed"><input className="input" placeholder="New York" value={form.city} onChange={e => set("city", e.target.value)} /></Field>
                  </div>
                  <Field label="Brand Description" accent="#7c3aed">
                    <textarea className="input" rows={3} placeholder="Tell creators about your brand — your values, audience, and what makes your products special..." value={form.bio} onChange={e => set("bio", e.target.value)} style={{ resize: "none", lineHeight: 1.6 }} />
                  </Field>
                </div>
              </StepWrap>
            )}

            {/* ── STEP 1: Campaign Goals ── */}
            {step === 1 && (
              <StepWrap title="Campaign Goals" sub="Help us match you with the right creators. This shapes how your campaigns are structured.">
                {/* Content types */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Content Types Needed <span style={{ color: "#7c3aed" }}>*</span></div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 12, marginBottom: 14 }}>What formats will you need from creators?</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                    {[
                      { id: "video", label: "Short Video", sub: "Reels, TikToks, Stories", icon: <Video style={{ width: 20, height: 20 }} /> },
                      { id: "long_video", label: "Long-form Video", sub: "YouTube, tutorials", icon: <Film style={{ width: 20, height: 20 }} /> },
                      { id: "photo", label: "Photo Packs", sub: "Product stills & lifestyle", icon: <ImageIcon style={{ width: 20, height: 20 }} /> },
                    ].map(ct => {
                      const sel = form.contentTypes.includes(ct.id);
                      return (
                        <button key={ct.id} onClick={() => toggleArr("contentTypes", ct.id)} style={{ padding: "18px 14px", borderRadius: 14, textAlign: "center", background: sel ? "rgba(124,58,237,0.08)" : "var(--surface-subtle)", border: `1.5px solid ${sel ? "#7c3aed" : "var(--border-strong)"}`, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", position: "relative" }}>
                          {sel && <div style={{ position: "absolute", top: 8, right: 8, width: 16, height: 16, borderRadius: 999, background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center" }}><Check style={{ width: 9, height: 9, color: "#fff" }} /></div>}
                          <div style={{ color: sel ? "#a78bfa" : "var(--text-muted)", marginBottom: 8 }}>{ct.icon}</div>
                          <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{ct.label}</div>
                          <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>{ct.sub}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Monthly budget */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Monthly UGC Budget <span style={{ color: "#7c3aed" }}>*</span></div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 12, marginBottom: 14 }}>This helps us recommend the right campaign structures for your budget.</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {BUDGET_RANGES.map(b => {
                      const sel = form.budgetRange === b.id;
                      return (
                        <button key={b.id} onClick={() => set("budgetRange", b.id)} style={{ padding: "18px 20px", borderRadius: 14, textAlign: "left", background: sel ? "rgba(124,58,237,0.08)" : "var(--surface-subtle)", border: `1.5px solid ${sel ? "#7c3aed" : "var(--border-strong)"}`, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", position: "relative" }}>
                          {sel && <div style={{ position: "absolute", top: 10, right: 10, width: 18, height: 18, borderRadius: 999, background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center" }}><Check style={{ width: 10, height: 10, color: "#fff" }} /></div>}
                          <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{b.label}</div>
                          <div style={{ color: sel ? "#a78bfa" : "var(--accent-text)", fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{b.range}</div>
                          <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{b.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Use cases */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Primary Use Cases</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 12, marginBottom: 14 }}>Where will this content be used? Select all that apply.</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {USE_CASES.map(uc => {
                      const sel = form.useCases.includes(uc);
                      return <button key={uc} onClick={() => toggleArr("useCases", uc)} style={{ padding: "7px 16px", borderRadius: 999, background: sel ? "#7c3aed" : "var(--surface-subtle)", border: `1px solid ${sel ? "#7c3aed" : "var(--border-strong)"}`, color: sel ? "#fff" : "var(--text-muted)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 5 }}>{sel && <Check style={{ width: 10, height: 10 }} />}{uc}</button>;
                    })}
                  </div>
                </div>

                {/* Target audience */}
                <Field label="Target Audience Description" accent="#7c3aed">
                  <textarea className="input" rows={2} placeholder="e.g. Women aged 25–35 interested in skincare, natural beauty, and wellness routines..." value={form.targetAudience} onChange={e => set("targetAudience", e.target.value)} style={{ resize: "none", lineHeight: 1.6 }} />
                </Field>
              </StepWrap>
            )}

            {/* ── STEP 2: Contact Person ── */}
            {step === 2 && (
              <StepWrap title="Primary Contact" sub="This person will handle campaign approvals, creator communications, and platform support requests.">
                <div style={{ display: "grid", gap: 18 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Field label="Full Name" required accent="#7c3aed"><input className="input" placeholder="Jamie Chen" value={form.contactName} onChange={e => set("contactName", e.target.value)} /></Field>
                    <Field label="Job Title / Role" accent="#7c3aed">
                      <select className="input" value={form.contactRole} onChange={e => set("contactRole", e.target.value)} style={{ cursor: "pointer" }}>
                        <option value="">Select role</option>
                        <option>Marketing Manager</option>
                        <option>Brand Manager</option>
                        <option>Social Media Manager</option>
                        <option>Content Director</option>
                        <option>CMO / VP Marketing</option>
                        <option>Founder / CEO</option>
                        <option>Agency Account Manager</option>
                        <option>Influencer Marketing Lead</option>
                        <option>Other</option>
                      </select>
                    </Field>
                  </div>
                  <Field label="Work Email Address" required accent="#7c3aed">
                    <div style={{ position: "relative" }}>
                      <Mail style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "var(--text-subtle)" }} />
                      <input className="input" type="email" placeholder="jamie@yourbrand.com" value={form.contactEmail} onChange={e => set("contactEmail", e.target.value)} style={{ paddingLeft: 40 }} />
                    </div>
                  </Field>
                  <Field label="Phone Number" accent="#7c3aed">
                    <div style={{ position: "relative" }}>
                      <Phone style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "var(--text-subtle)" }} />
                      <input className="input" type="tel" placeholder="+1 (555) 000-0000" value={form.contactPhone} onChange={e => set("contactPhone", e.target.value)} style={{ paddingLeft: 40 }} />
                    </div>
                  </Field>

                  <div style={{ padding: "20px 22px", borderRadius: 16, background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.18)" }}>
                    <div style={{ color: "#a78bfa", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>🔐 How we use this</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 13, lineHeight: 1.6 }}>
                      Your contact details are only used for campaign updates, creator approvals, and platform support. We will never share your info with third parties or use it for marketing without consent.
                    </div>
                  </div>

                  {/* Team note */}
                  <div style={{ padding: "20px 22px", borderRadius: 16, background: "var(--surface-subtle)", border: "1px solid var(--border-strong)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <Users style={{ width: 16, height: 16, color: "var(--text-subtle)" }} />
                      <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 13 }}>Invite Team Members Later</div>
                    </div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 13, lineHeight: 1.5 }}>
                      After setup, you can invite your marketing team, agency partners, or approval managers from your brand settings.
                    </div>
                  </div>
                </div>
              </StepWrap>
            )}

            {/* ── STEP 3: Billing ── */}
            {step === 3 && (
              <StepWrap title="Billing Setup" sub="Your account is funded before campaigns go live. Payments to creators are only released when you approve their content.">
                {/* Method picker */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
                  {[
                    { id: "card", label: "Credit / Debit Card", icon: <CreditCard style={{ width: 22, height: 22 }} />, sub: "Instant funding" },
                    { id: "invoice", label: "Invoice / PO", icon: <Briefcase style={{ width: 22, height: 22 }} />, sub: "Net 30 terms" },
                    { id: "crypto", label: "Crypto (USDC)", icon: <DollarSign style={{ width: 22, height: 22 }} />, sub: "Web3 payments" },
                  ].map(m => {
                    const sel = form.billingMethod === m.id;
                    return (
                      <button key={m.id} onClick={() => set("billingMethod", m.id)} style={{ padding: "22px 16px", borderRadius: 16, textAlign: "center", background: sel ? "rgba(124,58,237,0.08)" : "var(--surface-subtle)", border: `1.5px solid ${sel ? "#7c3aed" : "var(--border-strong)"}`, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s", position: "relative" }}>
                        {sel && <div style={{ position: "absolute", top: 10, right: 10, width: 18, height: 18, borderRadius: 999, background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center" }}><Check style={{ width: 10, height: 10, color: "#fff" }} /></div>}
                        <div style={{ color: sel ? "#a78bfa" : "var(--text-muted)", marginBottom: 8 }}>{m.icon}</div>
                        <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 12 }}>{m.label}</div>
                        <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 3 }}>{m.sub}</div>
                      </button>
                    );
                  })}
                </div>

                {(form.billingMethod === "card" || form.billingMethod === "invoice") && (
                  <div style={{ display: "grid", gap: 16 }}>
                    <Field label="Billing Email Address" required accent="#7c3aed">
                      <div style={{ position: "relative" }}>
                        <Mail style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "var(--text-subtle)" }} />
                        <input className="input" type="email" placeholder="billing@yourbrand.com" value={form.billingEmail} onChange={e => set("billingEmail", e.target.value)} style={{ paddingLeft: 40 }} />
                      </div>
                    </Field>
                    <Field label="VAT / Tax Number (Optional)" accent="#7c3aed">
                      <input className="input" placeholder="GB123456789" value={form.vatNumber} onChange={e => set("vatNumber", e.target.value)} />
                    </Field>
                    {form.billingMethod === "card" && (
                      <div style={{ padding: "20px 22px", borderRadius: 14, background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.18)" }}>
                        <div style={{ color: "#a78bfa", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>🔒 Secure card setup</div>
                        <div style={{ color: "var(--text-subtle)", fontSize: 13, lineHeight: 1.6 }}>After completing setup, you'll be directed to our secure payment processor (Stripe) to add your card. Your card details are never stored on our servers.</div>
                      </div>
                    )}
                    {form.billingMethod === "invoice" && (
                      <div style={{ padding: "20px 22px", borderRadius: 14, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
                        <div style={{ color: "#d97706", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>📋 Invoice terms</div>
                        <div style={{ color: "var(--text-subtle)", fontSize: 13, lineHeight: 1.6 }}>Available for accounts spending $5,000+/month. A member of our team will contact you to confirm terms within 24 hours of setup.</div>
                      </div>
                    )}
                  </div>
                )}

                {form.billingMethod === "crypto" && (
                  <div style={{ padding: "28px", borderRadius: 16, background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", textAlign: "center" }}>
                    <DollarSign style={{ width: 40, height: 40, color: "#a78bfa", margin: "0 auto 16px" }} />
                    <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>USDC payments via Coinbase Commerce</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 13, lineHeight: 1.6 }}>After setup, you'll fund your campaign wallet with USDC on Base or Ethereum. Creators receive USDC directly to their wallets.</div>
                  </div>
                )}

                {!form.billingMethod && (
                  <div style={{ padding: "24px", borderRadius: 16, background: "var(--surface-subtle)", border: "1px dashed var(--border-strong)", textAlign: "center" }}>
                    <CreditCard style={{ width: 32, height: 32, color: "var(--text-subtle)", margin: "0 auto 12px" }} />
                    <div style={{ color: "var(--text-subtle)", fontSize: 13 }}>Select a billing method to continue</div>
                  </div>
                )}

                {/* Escrow info */}
                <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { icon: "🛡️", title: "Escrow Protection", desc: "Funds held until you approve content" },
                    { icon: "↩️", title: "Refund Policy", desc: "Full refund if no creators apply" },
                  ].map(item => (
                    <div key={item.title} style={{ padding: "16px", background: "var(--surface-subtle)", borderRadius: 14, border: "1px solid var(--border-strong)" }}>
                      <div style={{ fontSize: 18, marginBottom: 8 }}>{item.icon}</div>
                      <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{item.title}</div>
                      <div style={{ color: "var(--text-subtle)", fontSize: 12 }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </StepWrap>
            )}
          </div>

          {/* Footer nav */}
          <div style={{ maxWidth: 620, width: "100%", margin: "40px auto 0", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid var(--border-strong)" }}>
            <button onClick={() => step === 0 ? router.push("/onboarding") : setStep(s => s - 1)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", color: "var(--text)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
              <ChevronLeft style={{ width: 16, height: 16 }} />
              {step === 0 ? "Change Role" : "Back"}
            </button>

            <div style={{ display: "flex", gap: 7 }}>
              {STEPS.map((_, i) => <div key={i} style={{ width: i === step ? 22 : 7, height: 7, borderRadius: 999, background: i === step ? "#7c3aed" : i < step ? "rgba(124,58,237,0.4)" : "var(--border-strong)", transition: "all 0.3s" }} />)}
            </div>

            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canNext()} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 12, background: canNext() ? "#7c3aed" : "var(--surface-subtle)", border: `1px solid ${canNext() ? "#7c3aed" : "var(--border-strong)"}`, color: canNext() ? "#fff" : "var(--text-subtle)", fontSize: 14, fontWeight: 700, cursor: canNext() ? "pointer" : "not-allowed", fontFamily: "inherit", boxShadow: canNext() ? "0 4px 16px rgba(124,58,237,0.35)" : "none", transition: "all 0.2s" }}>
                Continue <ChevronRight style={{ width: 16, height: 16 }} />
              </button>
            ) : (
              <button onClick={finish} disabled={submitting || !canNext()} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 12, background: canNext() ? "#7c3aed" : "var(--surface-subtle)", border: "1px solid #7c3aed", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 16px rgba(124,58,237,0.35)" }}>
                {submitting ? <><Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} /> Setting up…</> : <><Sparkles style={{ width: 16, height: 16 }} /> Launch Brand Workspace</>}
              </button>
            )}
          </div>
        </main>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ── Helpers ── */
function StepWrap({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: "var(--text)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.03em", marginBottom: 8 }}>{title}</h1>
        <p style={{ color: "var(--text-subtle)", fontSize: 14, lineHeight: 1.6 }}>{sub}</p>
      </div>
      {children}
    </div>
  );
}

function Field({ label, required, accent = "#0284c7", children }: { label: string; required?: boolean; accent?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", color: "var(--text-muted)", fontSize: 13, fontWeight: 600, marginBottom: 7 }}>
        {label}{required && <span style={{ color: accent, marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function SuccessScreen({ name }: { name: string }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-poppins), sans-serif" }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ width: 80, height: 80, borderRadius: 999, background: "linear-gradient(135deg, #7c3aed, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 12px 40px rgba(124,58,237,0.4)", animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <Check style={{ width: 36, height: 36, color: "#fff" }} />
        </div>
        <h1 style={{ color: "var(--text)", fontWeight: 800, fontSize: 30, letterSpacing: "-0.03em", marginBottom: 12 }}>
          {name ? `${name} is live!` : "Your workspace is ready!"} 🚀
        </h1>
        <p style={{ color: "var(--text-subtle)", fontSize: 15, lineHeight: 1.6 }}>Your brand workspace is set up. Redirecting to your dashboard…</p>
        <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 6 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: 999, background: "#7c3aed", animation: `bounce 1.2s ease ${i * 0.15}s infinite` }} />)}
        </div>
        <style>{`
          @keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          @keyframes bounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-10px); } }
        `}</style>
      </div>
    </div>
  );
}
