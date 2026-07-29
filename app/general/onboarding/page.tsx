"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles, User, Building2, ArrowRight, ChevronLeft, ChevronRight,
  AtSign, Play, Video, Banknote, CreditCard, Check, Loader2,
  DollarSign, Globe, Star
} from "lucide-react";

/* ─────────────────────────────────────────── types */
type Role = "creator" | "brand";

interface CreatorForm {
  fullName: string; email: string; phone: string; country: string;
  bio: string; niche: string; tiktok: string; instagram: string;
  youtube: string; followers: string;
  paymentMethod: "bank" | "stripe" | "";
  bankName: string; accountNumber: string; routingNumber: string;
}

interface BrandForm {
  brandName: string; email: string; phone: string; country: string;
  website: string; industry: string; budget: string; description: string;
  paymentMethod: "card" | "bank" | "";
  cardNumber: string; cardHolder: string; expiry: string; cvv: string;
}

const NICHES = ["Beauty & Skincare", "Fashion & Apparel", "Fitness & Wellness", "Consumer Tech", "Food & Beverage", "Travel & Lifestyle", "Home & Living", "Gaming"];
const COUNTRIES = ["United States", "United Kingdom", "Canada", "Australia", "Nigeria", "South Africa", "Germany", "France", "Other"];
const INDUSTRIES = ["Beauty & Cosmetics", "Consumer Electronics", "Food & Beverage", "Fashion & Retail", "Health & Wellness", "Travel & Hospitality", "Software & SaaS", "Other"];

/* ─────────────────────────────────────────── helpers */
function StepWrap({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ color: "var(--text)", fontWeight: 800, fontSize: "clamp(18px, 4vw, 24px)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>{title}</h2>
        <p style={{ color: "var(--text-subtle)", fontSize: "clamp(12px, 3vw, 14px)", margin: 0, lineHeight: 1.6 }}>{sub}</p>
      </div>
      {children}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
        {label}{required && <span style={{ color: "#0284c7", marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function InfoBox({ text }: { text: string }) {
  return (
    <div style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.18)" }}>
      <div style={{ color: "var(--accent-text)", fontSize: 12, lineHeight: 1.6 }}>{text}</div>
    </div>
  );
}

function SuccessScreen({ name, role }: { name: string; role: Role }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{ width: 72, height: 72, borderRadius: 999, background: "linear-gradient(135deg, #0284c7, #38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 12px 40px rgba(2,132,199,0.4)" }}>
        <Check style={{ width: 32, height: 32, color: "#fff" }} />
      </div>
      <h1 style={{ color: "var(--text)", fontWeight: 900, fontSize: "clamp(22px, 5vw, 30px)", marginBottom: 10 }}>
        {name ? `Welcome, ${name.split(" ")[0]}! 🎉` : "You're all set! 🎉"}
      </h1>
      <p style={{ color: "var(--text-subtle)", fontSize: 14, lineHeight: 1.6, maxWidth: 360, margin: "0 auto" }}>
        Your {role} profile is live. Taking you to your dashboard…
      </p>
      <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 6 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: 999, background: "#0284c7", animation: `bounce 1.2s ease ${i * 0.15}s infinite` }} />
        ))}
      </div>
      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-8px)} }`}</style>
    </div>
  );
}

/* ─────────────────────────────────────────── main */
export default function GeneralOnboardingPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);
  const [step, setStep] = useState(0);         // 0 = role pick, 1+ = steps
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [cf, setCf] = useState<CreatorForm>({
    fullName: "", email: "", phone: "", country: "", bio: "", niche: "",
    tiktok: "", instagram: "", youtube: "", followers: "",
    paymentMethod: "", bankName: "", accountNumber: "", routingNumber: ""
  });
  const [bf, setBf] = useState<BrandForm>({
    brandName: "", email: "", phone: "", country: "", website: "", industry: "",
    budget: "", description: "", paymentMethod: "",
    cardNumber: "", cardHolder: "", expiry: "", cvv: ""
  });

  const setC = (k: keyof CreatorForm, v: string) => setCf(p => ({ ...p, [k]: v }));
  const setB = (k: keyof BrandForm, v: string) => setBf(p => ({ ...p, [k]: v }));

  // Creator steps
  const CREATOR_STEPS = [
    { title: "Your Profile", sub: "Tell brands a little about who you are." },
    { title: "Social Presence", sub: "Connect your social accounts and show your reach." },
    { title: "Payout Method", sub: "Choose how you want to receive your escrow payouts." },
  ];

  // Brand steps
  const BRAND_STEPS = [
    { title: "Brand Details", sub: "Tell creators about your brand and campaigns." },
    { title: "Payment Setup", sub: "Set up how you'll fund your creator escrow campaigns." },
  ];

  const STEPS = role === "creator" ? CREATOR_STEPS : BRAND_STEPS;

  const canNext = () => {
    if (step === 0) return role !== null;
    const s = step - 1;
    if (role === "creator") {
      if (s === 0) return !!(cf.fullName && cf.email && cf.country && cf.niche);
      if (s === 1) return !!(cf.instagram || cf.tiktok || cf.youtube);
      if (s === 2) return !!(cf.paymentMethod);
    } else {
      if (s === 0) return !!(bf.brandName && bf.email && bf.industry);
      if (s === 1) return !!(bf.paymentMethod);
    }
    return true;
  };

  const finish = () => {
    setSubmitting(true);
    setTimeout(() => {
      localStorage.setItem("ugc_onboarding_complete", "true");
      localStorage.setItem("ugc_creator_role", role === "creator" ? "creator" : "normal");
      setDone(true);
      setTimeout(() => router.push("/"), 2200);
    }, 1400);
  };

  const selectRole = (r: Role) => {
    setRole(r);
    setStep(1);
  };

  const totalSteps = STEPS.length;
  const currentStepIndex = step - 1; // 0-based within steps (after role pick)

  /* ── DONE ── */
  if (done) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <SuccessScreen name={role === "creator" ? cf.fullName : bf.brandName} role={role!} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      {/* ── HEADER ── */}
      <header style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Sparkles style={{ width: 18, height: 18, color: "#0284c7" }} />
          <span style={{ color: "#0284c7", fontWeight: 800, fontSize: 16 }}>UGC Platform</span>
        </div>
        {step > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "var(--text-subtle)", fontSize: 12 }}>Step {currentStepIndex + 1} of {totalSteps}</span>
            <div style={{ display: "flex", gap: 4 }}>
              {STEPS.map((_, i) => (
                <div key={i} style={{ width: i === currentStepIndex ? 18 : 6, height: 6, borderRadius: 999, background: i <= currentStepIndex ? "#0284c7" : "var(--border-strong)", transition: "all 0.3s" }} />
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex: 1, overflowY: "auto", padding: "24px 16px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", width: "100%" }}>

          {/* ── STEP 0: ROLE PICKER ── */}
          {step === 0 && (
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }`}</style>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <h1 style={{ color: "var(--text)", fontWeight: 900, fontSize: "clamp(24px, 6vw, 36px)", margin: "0 0 10px", letterSpacing: "-0.03em" }}>Welcome Aboard! 👋</h1>
                <p style={{ color: "var(--text-subtle)", fontSize: "clamp(13px, 3.5vw, 15px)", margin: 0 }}>Tell us how you'd like to use the platform</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
                {([
                  { id: "creator" as Role, icon: User, title: "I'm a Creator", desc: "Create UGC content, apply to brand briefs, and earn through escrow-protected deals.", color: "#0284c7" },
                  { id: "brand" as Role, icon: Building2, title: "I'm a Brand", desc: "Discover top creators, post campaign briefs, and pay safely through escrow.", color: "#8b5cf6" },
                ] as const).map(opt => (
                  <button key={opt.id} onClick={() => selectRole(opt.id)} style={{
                    padding: "24px 20px", borderRadius: 20, cursor: "pointer", textAlign: "left",
                    border: `2px solid ${role === opt.id ? opt.color : "var(--border)"}`,
                    background: role === opt.id ? `${opt.color}10` : "var(--surface)",
                    transition: "all 0.2s", fontFamily: "inherit", width: "100%"
                  }}>
                    <div style={{ width: 46, height: 46, borderRadius: 14, background: opt.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                      <opt.icon style={{ width: 22, height: 22, color: "#fff" }} />
                    </div>
                    <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: "clamp(15px, 3.5vw, 17px)", margin: "0 0 8px" }}>{opt.title}</h3>
                    <p style={{ color: "var(--text-subtle)", fontSize: "clamp(12px, 3vw, 13px)", margin: 0, lineHeight: 1.5 }}>{opt.desc}</p>
                    <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6, color: opt.color, fontSize: 13, fontWeight: 700 }}>
                      Get started <ArrowRight style={{ width: 13, height: 13 }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── CREATOR STEPS ── */}
          {role === "creator" && step > 0 && (
            <>
              {/* Step 1: Profile */}
              {step === 1 && (
                <StepWrap title="Your Creator Profile" sub="This is how brands will discover and identify you.">
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
                      <Field label="Full Name" required><input className="input" placeholder="Sarah Mitchell" value={cf.fullName} onChange={e => setC("fullName", e.target.value)} /></Field>
                      <Field label="Email Address" required><input className="input" type="email" placeholder="sarah@example.com" value={cf.email} onChange={e => setC("email", e.target.value)} /></Field>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
                      <Field label="Country" required>
                        <select className="input" value={cf.country} onChange={e => setC("country", e.target.value)}>
                          <option value="">Select country…</option>
                          {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </Field>
                      <Field label="Content Niche" required>
                        <select className="input" value={cf.niche} onChange={e => setC("niche", e.target.value)}>
                          <option value="">Select your niche…</option>
                          {NICHES.map(n => <option key={n}>{n}</option>)}
                        </select>
                      </Field>
                    </div>
                    <Field label="Short Bio">
                      <textarea className="input" placeholder="Tell brands about your content style and audience…" rows={3} value={cf.bio} onChange={e => setC("bio", e.target.value)} style={{ resize: "vertical", width: "100%" }} />
                    </Field>
                  </div>
                </StepWrap>
              )}

              {/* Step 2: Socials */}
              {step === 2 && (
                <StepWrap title="Your Social Presence" sub="Connect at least one social account to show brands your reach.">
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                      { key: "tiktok" as const, icon: Star, label: "TikTok Handle", placeholder: "@yourcreatorhandle" },
                      { key: "instagram" as const, icon: AtSign, label: "Instagram Handle", placeholder: "@yourinstagram" },
                      { key: "youtube" as const, icon: Play, label: "YouTube Channel", placeholder: "youtube.com/c/yourchannel" },
                    ].map(({ key, icon: Icon, label, placeholder }) => (
                      <Field key={key} label={label}>
                        <div style={{ position: "relative" }}>
                          <Icon style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "var(--text-subtle)" }} />
                          <input className="input" placeholder={placeholder} value={cf[key]} onChange={e => setC(key, e.target.value)} style={{ paddingLeft: 36 }} />
                        </div>
                      </Field>
                    ))}
                    <Field label="Total Followers (approx)">
                      <select className="input" value={cf.followers} onChange={e => setC("followers", e.target.value)}>
                        <option value="">Select range…</option>
                        {["Under 10k", "10k–50k", "50k–100k", "100k–500k", "500k–1M", "1M+"].map(r => <option key={r}>{r}</option>)}
                      </select>
                    </Field>
                  </div>
                </StepWrap>
              )}

              {/* Step 3: Payout */}
              {step === 3 && (
                <StepWrap title="Payout Method" sub="Choose how you'll receive your campaign earnings.">
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      {[
                        { id: "bank", icon: Banknote, label: "Bank Transfer", sub: "Direct ACH / wire" },
                        { id: "stripe", icon: CreditCard, label: "Stripe Connect", sub: "Instant payouts" },
                      ].map(opt => (
                        <button key={opt.id} onClick={() => setC("paymentMethod", opt.id as any)} style={{
                          padding: "16px 14px", borderRadius: 16, cursor: "pointer", textAlign: "left",
                          border: `2px solid ${cf.paymentMethod === opt.id ? "#0284c7" : "var(--border)"}`,
                          background: cf.paymentMethod === opt.id ? "rgba(2,132,199,0.08)" : "var(--surface-subtle)",
                          fontFamily: "inherit", transition: "all 0.2s"
                        }}>
                          <opt.icon style={{ width: 20, height: 20, color: cf.paymentMethod === opt.id ? "#0284c7" : "var(--text-subtle)", marginBottom: 8 }} />
                          <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>{opt.label}</div>
                          <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>{opt.sub}</div>
                        </button>
                      ))}
                    </div>
                    {cf.paymentMethod === "bank" && (
                      <>
                        <Field label="Bank Name" required><input className="input" placeholder="e.g. Chase, Barclays, GTBank" value={cf.bankName} onChange={e => setC("bankName", e.target.value)} /></Field>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
                          <Field label="Account Number" required><input className="input" placeholder="••••••••••" value={cf.accountNumber} onChange={e => setC("accountNumber", e.target.value)} /></Field>
                          <Field label="Sort / Routing Code"><input className="input" placeholder="••••••••" value={cf.routingNumber} onChange={e => setC("routingNumber", e.target.value)} /></Field>
                        </div>
                        <InfoBox text="Your banking details are encrypted with AES-256. We never sell or share your data." />
                      </>
                    )}
                    {cf.paymentMethod === "stripe" && (
                      <div style={{ padding: "20px", borderRadius: 14, background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", textAlign: "center" }}>
                        <CreditCard style={{ width: 32, height: 32, color: "var(--accent-text)", margin: "0 auto 10px" }} />
                        <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>Connect Stripe after setup</div>
                        <div style={{ color: "var(--text-subtle)", fontSize: 12, lineHeight: 1.6 }}>You'll connect your Stripe account from the Earnings settings page.</div>
                      </div>
                    )}
                  </div>
                </StepWrap>
              )}
            </>
          )}

          {/* ── BRAND STEPS ── */}
          {role === "brand" && step > 0 && (
            <>
              {/* Step 1: Brand Info */}
              {step === 1 && (
                <StepWrap title="Brand Details" sub="Tell our creators about your brand.">
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
                      <Field label="Brand Name" required><input className="input" placeholder="e.g. GlowBrand Skincare" value={bf.brandName} onChange={e => setB("brandName", e.target.value)} /></Field>
                      <Field label="Business Email" required><input className="input" type="email" placeholder="hello@yourbrand.com" value={bf.email} onChange={e => setB("email", e.target.value)} /></Field>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
                      <Field label="Industry" required>
                        <select className="input" value={bf.industry} onChange={e => setB("industry", e.target.value)}>
                          <option value="">Select industry…</option>
                          {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                        </select>
                      </Field>
                      <Field label="Monthly Campaign Budget">
                        <select className="input" value={bf.budget} onChange={e => setB("budget", e.target.value)}>
                          <option value="">Select budget…</option>
                          {["Under $500", "$500–$2,000", "$2,000–$10,000", "$10,000–$50,000", "$50,000+"].map(b => <option key={b}>{b}</option>)}
                        </select>
                      </Field>
                    </div>
                    <Field label="Website URL"><input className="input" type="url" placeholder="https://yourbrand.com" value={bf.website} onChange={e => setB("website", e.target.value)} /></Field>
                    <Field label="Brand Description">
                      <textarea className="input" placeholder="Describe your brand and the type of content you're looking for…" rows={3} value={bf.description} onChange={e => setB("description", e.target.value)} style={{ resize: "vertical", width: "100%" }} />
                    </Field>
                  </div>
                </StepWrap>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <StepWrap title="Payment Setup" sub="Set up how you'll fund your creator campaigns via escrow.">
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      {[
                        { id: "card", icon: CreditCard, label: "Credit / Debit Card", sub: "Visa, Mastercard, Amex" },
                        { id: "bank", icon: Banknote, label: "Bank Transfer", sub: "ACH / Wire transfer" },
                      ].map(opt => (
                        <button key={opt.id} onClick={() => setB("paymentMethod", opt.id as any)} style={{
                          padding: "16px 14px", borderRadius: 16, cursor: "pointer", textAlign: "left",
                          border: `2px solid ${bf.paymentMethod === opt.id ? "#8b5cf6" : "var(--border)"}`,
                          background: bf.paymentMethod === opt.id ? "rgba(139,92,246,0.08)" : "var(--surface-subtle)",
                          fontFamily: "inherit", transition: "all 0.2s"
                        }}>
                          <opt.icon style={{ width: 20, height: 20, color: bf.paymentMethod === opt.id ? "#8b5cf6" : "var(--text-subtle)", marginBottom: 8 }} />
                          <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>{opt.label}</div>
                          <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>{opt.sub}</div>
                        </button>
                      ))}
                    </div>
                    {bf.paymentMethod === "card" && (
                      <>
                        <Field label="Card Number" required>
                          <input className="input" placeholder="4242 4242 4242 4242" maxLength={19}
                            value={bf.cardNumber}
                            onChange={e => setB("cardNumber", e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim())}
                          />
                        </Field>
                        <Field label="Cardholder Name"><input className="input" placeholder="As it appears on card" value={bf.cardHolder} onChange={e => setB("cardHolder", e.target.value)} /></Field>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                          <Field label="Expiry"><input className="input" placeholder="MM/YY" maxLength={5}
                            value={bf.expiry}
                            onChange={e => { const d = e.target.value.replace(/\D/g, "").slice(0, 4); setB("expiry", d.length > 2 ? d.slice(0,2)+"/"+d.slice(2) : d); }}
                          /></Field>
                          <Field label="CVV"><input className="input" placeholder="123" maxLength={4} value={bf.cvv} onChange={e => setB("cvv", e.target.value.replace(/\D/g, ""))} /></Field>
                        </div>
                        <InfoBox text="Your card is tokenised via Stripe. We never store raw card details." />
                      </>
                    )}
                  </div>
                </StepWrap>
              )}
            </>
          )}
        </div>
      </main>

      {/* ── FOOTER NAV ── */}
      {step > 0 && (
        <footer style={{ padding: "16px 20px", borderTop: "1px solid var(--border)", background: "var(--surface)", flexShrink: 0 }}>
          <div style={{ maxWidth: 560, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <button
              onClick={() => step === 1 ? setStep(0) : setStep(s => s - 1)}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 18px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", color: "var(--text)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}
            >
              <ChevronLeft style={{ width: 15, height: 15 }} />
              <span style={{ display: "none" }} className="btn-back-label">Back</span>
              <span>Back</span>
            </button>

            {/* Dot indicators */}
            <div style={{ display: "flex", gap: 5, flex: 1, justifyContent: "center" }}>
              {STEPS.map((_, i) => (
                <div key={i} style={{ width: i === currentStepIndex ? 18 : 6, height: 6, borderRadius: 999, background: i <= currentStepIndex ? "#0284c7" : "var(--border-strong)", transition: "all 0.3s" }} />
              ))}
            </div>

            {currentStepIndex < totalSteps - 1 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canNext()}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 20px", borderRadius: 12, background: canNext() ? "#0284c7" : "var(--surface-subtle)", border: `1px solid ${canNext() ? "#0284c7" : "var(--border-strong)"}`, color: canNext() ? "#fff" : "var(--text-subtle)", fontSize: 14, fontWeight: 700, cursor: canNext() ? "pointer" : "not-allowed", fontFamily: "inherit", boxShadow: canNext() ? "0 4px 14px rgba(2,132,199,0.3)" : "none", transition: "all 0.2s", flexShrink: 0 }}
              >
                Continue <ChevronRight style={{ width: 15, height: 15 }} />
              </button>
            ) : (
              <button
                onClick={finish}
                disabled={submitting || !canNext()}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 20px", borderRadius: 12, background: "#0284c7", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 14px rgba(2,132,199,0.3)", flexShrink: 0 }}
              >
                {submitting
                  ? <><Loader2 style={{ width: 15, height: 15, animation: "spin 1s linear infinite" }} /> Setting up…</>
                  : <><Sparkles style={{ width: 15, height: 15 }} /> {role === "creator" ? "Launch Profile" : "Launch Brand"}</>
                }
              </button>
            )}
          </div>
        </footer>
      )}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .input { width: 100%; box-sizing: border-box; }
        select.input { appearance: auto; }
        textarea.input { min-height: 80px; }
      `}</style>
    </div>
  );
}
