"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Camera, ChevronRight, ChevronLeft, Check, Sparkles,
  Globe, DollarSign, Building2, Banknote, Loader2, CreditCard,
  Video, Image as ImageIcon, Film, ArrowRight, Star, Users
} from "lucide-react";

/* ── Inline social SVGs ─────────────── */
function TikTokIcon({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.26 6.26 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.87a8.19 8.19 0 0 0 4.79 1.52V7a4.85 4.85 0 0 1-1.02-.31z"/></svg>;
}
function InstagramIcon({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>;
}
function YoutubeIcon({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>;
}
function XIcon({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
}

/* ── Constants ──────────────────────── */
const STEPS = [
  { label: "Personal Profile" },
  { label: "Creator Details" },
  { label: "Social Accounts" },
  { label: "Payment Info"    },
];

const COUNTRIES = ["United States","United Kingdom","Canada","Australia","Germany","France","Nigeria","South Africa","India","Brazil","Mexico","Netherlands","Sweden","Norway","Denmark","Singapore","UAE","Ghana","Kenya","Egypt","Philippines","Indonesia","Other"];

const NICHES = ["Lifestyle","Beauty","Fitness","Tech","Food","Travel","Fashion","Gaming","Education","Finance","Parenting","Pets","Home Decor","Sports","Music","Comedy","Business","Health","Automotive","DIY"];

const LANGUAGES = ["English","Spanish","French","Portuguese","German","Arabic","Hindi","Swahili","Mandarin","Japanese","Korean","Dutch","Italian","Other"];

/* ── Form state ─────────────────────── */
interface FormData {
  // Step 1 – Personal
  photo: string | null;
  fullName: string;
  username: string;
  bio: string;
  country: string;
  city: string;
  address: string;
  // Step 2 – Creator details
  contentTypes: string[];
  niches: string[];
  experience: string;
  languages: string[];
  rateShortVideo: string;
  rateLongVideo: string;
  ratePhotoPack: string;
  portfolioLinks: string[];
  // Step 3 – Socials
  tiktok: string;
  tiktokFollowers: string;
  instagram: string;
  instagramFollowers: string;
  youtube: string;
  youtubeSubscribers: string;
  twitter: string;
  website: string;
  // Step 4 – Payment
  paymentMethod: "paypal" | "bank" | "stripe" | null;
  paypalEmail: string;
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
}

/* ══════════════════════════════════════
   MAIN
══════════════════════════════════════ */
export default function CreatorOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormData>({
    photo: null, fullName: "", username: "", bio: "", country: "", city: "", address: "",
    contentTypes: [], niches: [], experience: "", languages: [], rateShortVideo: "150", rateLongVideo: "250", ratePhotoPack: "120", portfolioLinks: [""],
    tiktok: "", tiktokFollowers: "", instagram: "", instagramFollowers: "", youtube: "", youtubeSubscribers: "", twitter: "", website: "",
    paymentMethod: null, paypalEmail: "", accountHolder: "", bankName: "", accountNumber: "", routingNumber: "",
  });

  const set = (k: keyof FormData, v: unknown) => setForm(p => ({ ...p, [k]: v }));
  const toggleArr = (k: keyof FormData, val: string) => {
    const arr = form[k] as string[];
    set(k, arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader(); r.onload = () => set("photo", r.result as string); r.readAsDataURL(f);
  };

  const canNext = () => {
    if (step === 0) return !!(form.fullName.trim() && form.country && form.city.trim());
    if (step === 1) return form.contentTypes.length > 0 && form.niches.length > 0;
    if (step === 2) return true; // socials optional
    if (step === 3) {
      if (!form.paymentMethod) return false;
      if (form.paymentMethod === "paypal") return !!form.paypalEmail.trim();
      if (form.paymentMethod === "bank") return !!(form.accountHolder && form.bankName && form.accountNumber);
      return true;
    }
    return true;
  };

  const finish = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1800));
    localStorage.setItem("ugc_onboarding_complete", "true");
    localStorage.setItem("ugc_creator_role", "creator");
    setSubmitting(false);
    setDone(true);
    setTimeout(() => router.push("/subscription"), 2200);
  };

  if (done) return <SuccessScreen name={form.fullName} role="creator" />;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "var(--font-poppins), sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ height: 64, borderBottom: "1px solid var(--border-strong)", background: "var(--sidebar-bg)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(2,132,199,0.35)" }}>
            <Sparkles style={{ width: 15, height: 15, color: "#fff" }} />
          </div>
          <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 15 }}>UGC Studio</span>
          <span style={{ color: "var(--text-subtle)", fontSize: 13, marginLeft: 4 }}>· Creator Setup</span>
        </div>

        {/* Step pills */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 999, background: i === step ? "#0284c7" : i < step ? "rgba(14,165,233,0.1)" : "var(--surface-subtle)", border: `1px solid ${i === step ? "#0284c7" : i < step ? "rgba(14,165,233,0.3)" : "var(--border-strong)"}`, transition: "all 0.3s" }}>
                {i < step ? <Check style={{ width: 11, height: 11, color: i === step ? "#fff" : "var(--accent-text)" }} /> : <span style={{ fontSize: 10, fontWeight: 700, color: i === step ? "#fff" : "var(--text-subtle)" }}>{i + 1}</span>}
                <span style={{ fontSize: 11, fontWeight: 600, color: i === step ? "#fff" : i < step ? "var(--accent-text)" : "var(--text-subtle)", whiteSpace: "nowrap" }}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div style={{ width: 16, height: 1, background: i < step ? "rgba(14,165,233,0.4)" : "var(--border-strong)" }} />}
            </div>
          ))}
        </div>

        <div style={{ color: "var(--text-subtle)", fontSize: 13 }}>Step {step + 1} / {STEPS.length}</div>
      </header>

      {/* Body */}
      <div style={{ flex: 1, display: "flex" }}>
        {/* Left panel */}
        <aside style={{ width: 380, flexShrink: 0, background: "linear-gradient(160deg, #0c1a2e 0%, #0b0e17 100%)", borderRight: "1px solid var(--border-strong)", padding: "52px 36px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 300, height: 300, borderRadius: 999, top: -80, right: -100, background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="pill pill-blue" style={{ display: "inline-flex", marginBottom: 20 }}>
              <Video style={{ width: 11, height: 11 }} /> Creator Onboarding
            </div>
            <h2 style={{ color: "#f1f5f9", fontWeight: 800, fontSize: 26, lineHeight: 1.25, letterSpacing: "-0.03em", marginBottom: 14 }}>
              {step === 0 && "Let's build\nyour profile"}
              {step === 1 && "Define your\ncreator niche"}
              {step === 2 && "Grow your\ndiscoverability"}
              {step === 3 && "Set up your\nearnings"}
            </h2>
            <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7, marginBottom: 32 }}>
              {step === 0 && "A complete profile gets 3× more brand invites. Brands want to know who they're working with."}
              {step === 1 && "Brands search by niche and content type. The more specific you are, the better your matches."}
              {step === 2 && "Link your accounts so brands can verify your audience reach before sending you campaign invites."}
              {step === 3 && "We pay out every Friday. Choose your preferred method and start earning from your first campaign."}
            </p>

            {/* Stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: <Star style={{ width: 14, height: 14 }} />, text: "Avg. creator earns $320/campaign" },
                { icon: <Users style={{ width: 14, height: 14 }} />, text: "12,000+ active creators on platform" },
                { icon: <DollarSign style={{ width: 14, height: 14 }} />, text: "$2.4M+ paid out to creators" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "12px 16px" }}>
                  <div style={{ color: "#38bdf8" }}>{s.icon}</div>
                  <span style={{ color: "#94a3b8", fontSize: 13 }}>{s.text}</span>
                </div>
              ))}
            </div>

            {/* Progress ring visual */}
            <div style={{ marginTop: 32, padding: "20px", background: "rgba(14,165,233,0.06)", borderRadius: 16, border: "1px solid rgba(14,165,233,0.15)", textAlign: "center" }}>
              <div style={{ color: "#38bdf8", fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em" }}>{Math.round(((step) / STEPS.length) * 100)}%</div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 999, margin: "8px 0 6px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(step / STEPS.length) * 100}%`, background: "linear-gradient(90deg, #0284c7, #38bdf8)", borderRadius: 999, transition: "width 0.5s ease" }} />
              </div>
              <div style={{ color: "#475569", fontSize: 12 }}>Profile completion</div>
            </div>
          </div>
        </aside>

        {/* Right: form */}
        <main style={{ flex: 1, overflowY: "auto", padding: "52px 72px", display: "flex", flexDirection: "column" }}>
          <div style={{ maxWidth: 600, width: "100%", margin: "0 auto", flex: 1 }}>

            {/* ── STEP 0: Personal Profile ── */}
            {step === 0 && (
              <StepWrap title="Personal Profile" sub="This is what brands see when they visit your creator page.">
                {/* Photo */}
                <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 32, padding: "24px", background: "var(--surface-subtle)", borderRadius: 16, border: "1px solid var(--border-strong)" }}>
                  <div onClick={() => fileRef.current?.click()} style={{ width: 80, height: 80, borderRadius: 20, flexShrink: 0, cursor: "pointer", background: form.photo ? "transparent" : "var(--icon-bg)", border: `2px dashed ${form.photo ? "#0284c7" : "var(--border-strong)"}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
                    {form.photo ? <img src={form.photo} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Camera style={{ width: 22, height: 22, color: "var(--text-subtle)" }} />}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
                  <div>
                    <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Profile Photo</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>A clear, professional headshot. Creators with photos get 4× more views.</div>
                    <button onClick={() => fileRef.current?.click()} style={{ padding: "7px 16px", borderRadius: 10, background: "var(--nav-hover-bg)", border: "1px solid var(--border-strong)", color: "var(--text)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Upload Photo</button>
                  </div>
                </div>

                <div style={{ display: "grid", gap: 18 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Field label="Full Name" required><input className="input" placeholder="Sarah Mitchell" value={form.fullName} onChange={e => set("fullName", e.target.value)} /></Field>
                    <Field label="Username / Handle"><input className="input" placeholder="@sarahmitchell" value={form.username} onChange={e => set("username", e.target.value)} /></Field>
                  </div>
                  <Field label="Bio / Tagline">
                    <textarea className="input" rows={3} placeholder="Lifestyle & beauty creator from London. I make authentic content that converts 🎬" value={form.bio} onChange={e => set("bio", e.target.value)} style={{ resize: "none", lineHeight: 1.6 }} />
                  </Field>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Field label="Country" required>
                      <select className="input" value={form.country} onChange={e => set("country", e.target.value)} style={{ cursor: "pointer" }}>
                        <option value="">Select country</option>
                        {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field label="City" required><input className="input" placeholder="London" value={form.city} onChange={e => set("city", e.target.value)} /></Field>
                  </div>
                  <Field label="Street Address"><input className="input" placeholder="123 Creator Lane, Apt 4B" value={form.address} onChange={e => set("address", e.target.value)} /></Field>
                </div>
              </StepWrap>
            )}

            {/* ── STEP 1: Creator Details ── */}
            {step === 1 && (
              <StepWrap title="Creator Details" sub="Help brands match you to the right campaigns. Be as specific as possible.">
                {/* Content types */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Content Types <span style={{ color: "#0284c7" }}>*</span></div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 12, marginBottom: 14 }}>What formats do you produce? Select all that apply.</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                    {[
                      { id: "video", label: "Short Video", sub: "Reels, TikToks", icon: <Video style={{ width: 20, height: 20 }} /> },
                      { id: "long_video", label: "Long Video", sub: "YouTube, reviews", icon: <Film style={{ width: 20, height: 20 }} /> },
                      { id: "photo", label: "Photo Pack", sub: "Stills, lifestyle", icon: <ImageIcon style={{ width: 20, height: 20 }} /> },
                    ].map(ct => {
                      const sel = form.contentTypes.includes(ct.id);
                      return (
                        <button key={ct.id} onClick={() => toggleArr("contentTypes", ct.id)} style={{ padding: "18px 14px", borderRadius: 14, textAlign: "center", background: sel ? "rgba(2,132,199,0.08)" : "var(--surface-subtle)", border: `1.5px solid ${sel ? "#0284c7" : "var(--border-strong)"}`, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", position: "relative" }}>
                          {sel && <div style={{ position: "absolute", top: 8, right: 8, width: 16, height: 16, borderRadius: 999, background: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center" }}><Check style={{ width: 9, height: 9, color: "#fff" }} /></div>}
                          <div style={{ color: sel ? "var(--accent-text)" : "var(--text-muted)", marginBottom: 8 }}>{ct.icon}</div>
                          <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{ct.label}</div>
                          <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>{ct.sub}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Niches */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Content Niches <span style={{ color: "#0284c7" }}>*</span></div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 12, marginBottom: 14 }}>Pick your primary content categories (1-5 recommended).</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {NICHES.map(n => {
                      const sel = form.niches.includes(n);
                      return <button key={n} onClick={() => toggleArr("niches", n)} style={{ padding: "7px 16px", borderRadius: 999, background: sel ? "#0284c7" : "var(--surface-subtle)", border: `1px solid ${sel ? "#0284c7" : "var(--border-strong)"}`, color: sel ? "#fff" : "var(--text-muted)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 5 }}>{sel && <Check style={{ width: 10, height: 10 }} />}{n}</button>;
                    })}
                  </div>
                </div>

                {/* Languages & experience */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 28 }}>
                  <Field label="Years of Experience">
                    <select className="input" value={form.experience} onChange={e => set("experience", e.target.value)}>
                      <option value="">Select range</option>
                      <option>Less than 1 year</option>
                      <option>1–2 years</option>
                      <option>3–5 years</option>
                      <option>5+ years</option>
                    </select>
                  </Field>
                  <Field label="Content Language(s)">
                    <select className="input" value={form.languages[0] || ""} onChange={e => set("languages", [e.target.value])}>
                      <option value="">Primary language</option>
                      {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </Field>
                </div>

                {/* Rates */}
                <div>
                  <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Your Rates (USD)</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 12, marginBottom: 14 }}>Set your starting rates. Brands will see these when browsing your profile. You can always negotiate per campaign.</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                    {[
                      { key: "rateShortVideo", label: "Short Video", hint: "15–60 sec Reel/TikTok" },
                      { key: "rateLongVideo",  label: "Long Video",  hint: "60 sec+ YouTube/review" },
                      { key: "ratePhotoPack",  label: "Photo Pack",  hint: "5–10 lifestyle stills" },
                    ].map(r => (
                      <div key={r.key} style={{ padding: "16px", background: "var(--surface-subtle)", borderRadius: 14, border: "1px solid var(--border-strong)" }}>
                        <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 600, marginBottom: 8 }}>{r.label}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ color: "var(--text-muted)", fontSize: 14, fontWeight: 700 }}>$</span>
                          <input className="input" type="number" value={(form as unknown as Record<string, string>)[r.key]} onChange={e => set(r.key as keyof FormData, e.target.value)} style={{ padding: "6px 8px", fontSize: 18, fontWeight: 800, color: "var(--text)" }} />
                        </div>
                        <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 6 }}>{r.hint}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </StepWrap>
            )}

            {/* ── STEP 2: Social Accounts ── */}
            {step === 2 && (
              <StepWrap title="Social Accounts" sub="Connect your platforms. Brands verify your reach before sending campaign invites. All fields are optional but recommended.">
                <div style={{ display: "grid", gap: 14 }}>
                  {[
                    { hKey: "tiktok", fKey: "tiktokFollowers", label: "TikTok", icon: <TikTokIcon />, placeholder: "@yourhandle", fLabel: "Followers", color: "#f0f0f0" },
                    { hKey: "instagram", fKey: "instagramFollowers", label: "Instagram", icon: <InstagramIcon />, placeholder: "@yourhandle", fLabel: "Followers", color: "#e1306c" },
                    { hKey: "youtube", fKey: "youtubeSubscribers", label: "YouTube", icon: <YoutubeIcon />, placeholder: "Channel URL or @handle", fLabel: "Subscribers", color: "#ff0000" },
                    { hKey: "twitter", fKey: "", label: "Twitter / X", icon: <XIcon />, placeholder: "@yourusername", fLabel: "", color: "#f0f0f0" },
                    { hKey: "website", fKey: "", label: "Portfolio / Website", icon: <Globe style={{ width: 18, height: 18 }} />, placeholder: "https://yourportfolio.com", fLabel: "", color: "#0284c7" },
                  ].map(({ hKey, fKey, label, icon, placeholder, fLabel, color }) => {
                    const val = (form as unknown as Record<string, string>)[hKey];
                    return (
                      <div key={hKey} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderRadius: 14, background: "var(--surface-subtle)", border: `1px solid ${val ? "rgba(14,165,233,0.3)" : "var(--border-strong)"}`, transition: "border-color 0.2s" }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--icon-bg)", border: "1px solid var(--icon-border)", display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>{icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 600, marginBottom: 4 }}>{label}</div>
                          <input style={{ background: "none", border: "none", outline: "none", color: "var(--text)", fontSize: 13, fontFamily: "inherit", width: "100%" }} placeholder={placeholder} value={val} onChange={e => set(hKey as keyof FormData, e.target.value)} />
                        </div>
                        {fKey && (
                          <div style={{ flexShrink: 0, textAlign: "right", minWidth: 90 }}>
                            <div style={{ color: "var(--text-subtle)", fontSize: 10, fontWeight: 600, marginBottom: 3 }}>{fLabel}</div>
                            <input style={{ background: "var(--input-bg)", border: "1px solid var(--border-strong)", borderRadius: 8, outline: "none", color: "var(--text)", fontSize: 12, fontFamily: "inherit", width: "90px", padding: "5px 8px", textAlign: "right" }} placeholder="e.g. 50K" value={(form as unknown as Record<string, string>)[fKey]} onChange={e => set(fKey as keyof FormData, e.target.value)} />
                          </div>
                        )}
                        {val && <Check style={{ width: 16, height: 16, color: "var(--accent-text)", flexShrink: 0 }} />}
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: 20, padding: "16px 20px", borderRadius: 14, background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.18)" }}>
                  <div style={{ color: "var(--accent-text)", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>💡 Why this matters</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 13, lineHeight: 1.6 }}>Brands filter creators by platform and follower count. Linking your accounts increases your chances of getting invited to campaigns by up to 5×.</div>
                </div>
              </StepWrap>
            )}

            {/* ── STEP 3: Payment ── */}
            {step === 3 && (
              <StepWrap title="Payment Setup" sub="Choose how you'd like to receive your earnings. We pay out every Friday. All data is encrypted.">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
                  {[
                    { id: "paypal", label: "PayPal", icon: <DollarSign style={{ width: 24, height: 24 }} />, sub: "Send to email" },
                    { id: "bank",   label: "Bank Transfer", icon: <Building2 style={{ width: 24, height: 24 }} />, sub: "Direct deposit" },
                    { id: "stripe", label: "Stripe", icon: <Banknote style={{ width: 24, height: 24 }} />, sub: "Instant payouts" },
                  ].map(m => {
                    const sel = form.paymentMethod === m.id;
                    return (
                      <button key={m.id} onClick={() => set("paymentMethod", m.id)} style={{ padding: "22px 16px", borderRadius: 16, textAlign: "center", background: sel ? "rgba(2,132,199,0.08)" : "var(--surface-subtle)", border: `1.5px solid ${sel ? "#0284c7" : "var(--border-strong)"}`, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s", position: "relative" }}>
                        {sel && <div style={{ position: "absolute", top: 10, right: 10, width: 18, height: 18, borderRadius: 999, background: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center" }}><Check style={{ width: 10, height: 10, color: "#fff" }} /></div>}
                        <div style={{ color: sel ? "var(--accent-text)" : "var(--text-muted)", marginBottom: 8 }}>{m.icon}</div>
                        <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{m.label}</div>
                        <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 3 }}>{m.sub}</div>
                      </button>
                    );
                  })}
                </div>

                {form.paymentMethod === "paypal" && (
                  <div style={{ display: "grid", gap: 16 }}>
                    <Field label="PayPal Email Address" required><input className="input" type="email" placeholder="you@paypal.com" value={form.paypalEmail} onChange={e => set("paypalEmail", e.target.value)} /></Field>
                    <InfoBox color="amber" text="Payouts are sent every Friday. You'll receive a notification when your payment is on its way." />
                  </div>
                )}
                {form.paymentMethod === "bank" && (
                  <div style={{ display: "grid", gap: 16 }}>
                    <Field label="Account Holder Name" required><input className="input" placeholder="Full legal name" value={form.accountHolder} onChange={e => set("accountHolder", e.target.value)} /></Field>
                    <Field label="Bank Name" required><input className="input" placeholder="e.g. Chase, Barclays, GTBank" value={form.bankName} onChange={e => set("bankName", e.target.value)} /></Field>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <Field label="Account Number" required><input className="input" placeholder="••••••••••" value={form.accountNumber} onChange={e => set("accountNumber", e.target.value)} /></Field>
                      <Field label="Sort / Routing Code"><input className="input" placeholder="••••••••" value={form.routingNumber} onChange={e => set("routingNumber", e.target.value)} /></Field>
                    </div>
                    <InfoBox color="blue" text="Your banking details are encrypted with AES-256. We never sell or share your data." />
                  </div>
                )}
                {form.paymentMethod === "stripe" && (
                  <div style={{ padding: "28px", borderRadius: 16, background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", textAlign: "center" }}>
                    <Banknote style={{ width: 40, height: 40, color: "var(--accent-text)", margin: "0 auto 16px" }} />
                    <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Connect Stripe after setup</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 13, lineHeight: 1.6 }}>You'll be redirected to Stripe to connect your payout account after completing onboarding.</div>
                  </div>
                )}
                {!form.paymentMethod && (
                  <div style={{ padding: "24px", borderRadius: 16, background: "var(--surface-subtle)", border: "1px dashed var(--border-strong)", textAlign: "center" }}>
                    <CreditCard style={{ width: 32, height: 32, color: "var(--text-subtle)", margin: "0 auto 12px" }} />
                    <div style={{ color: "var(--text-subtle)", fontSize: 13 }}>Select a payment method above to continue</div>
                  </div>
                )}
              </StepWrap>
            )}
          </div>

          {/* Footer nav */}
          <div style={{ maxWidth: 600, width: "100%", margin: "40px auto 0", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid var(--border-strong)" }}>
            <button onClick={() => step === 0 ? router.push("/onboarding") : setStep(s => s - 1)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", color: "var(--text)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
              <ChevronLeft style={{ width: 16, height: 16 }} />
              {step === 0 ? "Change Role" : "Back"}
            </button>

            <div style={{ display: "flex", gap: 7 }}>
              {STEPS.map((_, i) => <div key={i} style={{ width: i === step ? 22 : 7, height: 7, borderRadius: 999, background: i === step ? "#0284c7" : i < step ? "rgba(14,165,233,0.4)" : "var(--border-strong)", transition: "all 0.3s" }} />)}
            </div>

            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canNext()} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 12, background: canNext() ? "#0284c7" : "var(--surface-subtle)", border: `1px solid ${canNext() ? "#0284c7" : "var(--border-strong)"}`, color: canNext() ? "#fff" : "var(--text-subtle)", fontSize: 14, fontWeight: 700, cursor: canNext() ? "pointer" : "not-allowed", fontFamily: "inherit", boxShadow: canNext() ? "0 4px 16px rgba(2,132,199,0.35)" : "none", transition: "all 0.2s" }}>
                Continue <ChevronRight style={{ width: 16, height: 16 }} />
              </button>
            ) : (
              <button onClick={finish} disabled={submitting || !canNext()} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 12, background: canNext() ? "#0284c7" : "var(--surface-subtle)", border: "1px solid #0284c7", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 16px rgba(2,132,199,0.35)" }}>
                {submitting ? <><Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} /> Setting up…</> : <><Sparkles style={{ width: 16, height: 16 }} /> Launch Creator Profile</>}
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

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", color: "var(--text-muted)", fontSize: 13, fontWeight: 600, marginBottom: 7 }}>
        {label}{required && <span style={{ color: "#0284c7", marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function InfoBox({ color, text }: { color: "amber" | "blue"; text: string }) {
  const c = color === "amber" ? { bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.2)", text: "#d97706" } : { bg: "rgba(14,165,233,0.06)", border: "rgba(14,165,233,0.18)", text: "var(--accent-text)" };
  return (
    <div style={{ padding: "14px 18px", borderRadius: 12, background: c.bg, border: `1px solid ${c.border}` }}>
      <div style={{ color: c.text, fontSize: 13, lineHeight: 1.6 }}>{text}</div>
    </div>
  );
}

function SuccessScreen({ name, role }: { name: string; role: "creator" | "brand" }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-poppins), sans-serif" }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ width: 80, height: 80, borderRadius: 999, background: "linear-gradient(135deg, #0284c7, #38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 12px 40px rgba(2,132,199,0.4)", animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <Check style={{ width: 36, height: 36, color: "#fff" }} />
        </div>
        <h1 style={{ color: "var(--text)", fontWeight: 800, fontSize: 30, letterSpacing: "-0.03em", marginBottom: 12 }}>
          {name ? `Welcome, ${name.split(" ")[0]}!` : "You're all set!"} 🎉
        </h1>
        <p style={{ color: "var(--text-subtle)", fontSize: 15, lineHeight: 1.6 }}>
          Your {role === "creator" ? "creator" : "brand"} profile is live. Redirecting to your dashboard…
        </p>
        <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 6 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: 999, background: "#0284c7", animation: `bounce 1.2s ease ${i * 0.15}s infinite` }} />)}
        </div>
        <style>{`
          @keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          @keyframes bounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-10px); } }
        `}</style>
      </div>
    </div>
  );
}
