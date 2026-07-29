"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Sparkles, Video, ShoppingBag, ArrowRight, Check, ChevronLeft, ChevronRight,
  AtSign, Play, Banknote, CreditCard, Loader2, DollarSign, ShieldCheck
} from "lucide-react";

/* ── Types ── */
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
  billingMethod: "card" | "bank" | "crypto" | "";
  cardNumber: string; cardHolder: string; expiry: string; cvv: string;
}

const NICHES = ["Beauty & Skincare", "Fashion & Apparel", "Fitness & Wellness", "Consumer Tech", "Food & Beverage", "Travel & Lifestyle", "Home & Living", "Gaming"];
const COUNTRIES = ["United States", "United Kingdom", "Canada", "Australia", "Nigeria", "South Africa", "Germany", "France", "Other"];
const INDUSTRIES = ["Beauty & Cosmetics", "Consumer Electronics", "Food & Beverage", "Fashion & Retail", "Health & Wellness", "Travel & Hospitality", "Software & SaaS", "Other"];

export default function GeneralOnboardingPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [step, setStep] = useState(0); // 0 = role pick, 1+ = multi-step form
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // Creator form state
  const [cf, setCf] = useState<CreatorForm>({
    fullName: "", email: "", phone: "", country: "", bio: "", niche: "",
    tiktok: "", instagram: "", youtube: "", followers: "",
    paymentMethod: "", bankName: "", accountNumber: "", routingNumber: ""
  });

  // Brand form state
  const [bf, setBf] = useState<BrandForm>({
    brandName: "", email: "", phone: "", country: "", website: "", industry: "",
    budget: "", description: "", billingMethod: "",
    cardNumber: "", cardHolder: "", expiry: "", cvv: ""
  });

  const setC = (k: keyof CreatorForm, v: string) => setCf(p => ({ ...p, [k]: v }));
  const setB = (k: keyof BrandForm, v: string) => setBf(p => ({ ...p, [k]: v }));

  const CREATOR_STEPS = ["Profile Info", "Social Media", "Payout Setup"];
  const BRAND_STEPS = ["Brand Details", "Billing & Escrow"];
  const STEPS = selectedRole === "creator" ? CREATOR_STEPS : BRAND_STEPS;
  const currentStepIndex = step - 1;

  const canNext = () => {
    if (step === 0) return selectedRole !== null;
    if (selectedRole === "creator") {
      if (currentStepIndex === 0) return !!(cf.fullName && cf.email && cf.country && cf.niche);
      if (currentStepIndex === 1) return !!(cf.instagram || cf.tiktok || cf.youtube);
      if (currentStepIndex === 2) return !!cf.paymentMethod;
    } else {
      if (currentStepIndex === 0) return !!(bf.brandName && bf.email && bf.industry);
      if (currentStepIndex === 1) return !!bf.billingMethod;
    }
    return true;
  };

  const handleStartForm = () => {
    if (!selectedRole) return;
    setStep(1);
  };

  const finishOnboarding = () => {
    setSubmitting(true);
    setTimeout(() => {
      localStorage.setItem("ugc_onboarding_complete", "true");
      localStorage.setItem("ugc_creator_role", selectedRole === "creator" ? "creator" : "normal");
      setDone(true);
      setTimeout(() => router.push("/"), 2200);
    }, 1400);
  };

  if (done) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "var(--font-poppins), sans-serif" }}>
        <SuccessScreen name={selectedRole === "creator" ? cf.fullName : bf.brandName} role={selectedRole!} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column", color: "var(--text)" }}>
      {/* ── HEADER ── */}
      <header style={{ padding: "16px 24px", borderBottom: "1px solid var(--border-strong)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--surface)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #0284c7, #38bdf8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles style={{ width: 16, height: 16, color: "#fff" }} />
          </div>
          <span style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>UGC Studio</span>
        </div>

        {step > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "var(--text-subtle)", fontSize: 13, fontWeight: 600 }}>Step {currentStepIndex + 1} of {STEPS.length}</span>
            <div style={{ display: "flex", gap: 4 }}>
              {STEPS.map((_, i) => (
                <div key={i} style={{ width: i === currentStepIndex ? 20 : 6, height: 6, borderRadius: 999, background: i <= currentStepIndex ? (selectedRole === "creator" ? "#0284c7" : "#7c3aed") : "var(--border-strong)", transition: "all 0.3s" }} />
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex: 1, overflowY: "auto", padding: "32px 16px 48px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: step === 0 ? "center" : "flex-start" }}>

        {/* ── STEP 0: ORIGINAL ROLE SELECTION ── */}
        {step === 0 && (
          <div style={{ maxWidth: 840, width: "100%", textAlign: "center", margin: "0 auto", animation: "fadeUp 0.4s ease" }}>
            <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }`}</style>
            
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.25)", borderRadius: 999, padding: "6px 16px", marginBottom: 20 }}>
              <Sparkles style={{ width: 14, height: 14, color: "#38bdf8" }} />
              <span style={{ color: "#38bdf8", fontSize: 12, fontWeight: 700 }}>Welcome to UGC Studio</span>
            </div>

            <h1 style={{ color: "var(--text)", fontWeight: 900, fontSize: "clamp(26px, 5vw, 40px)", letterSpacing: "-0.04em", lineHeight: 1.15, marginBottom: 12 }}>
              Who are you joining as today?
            </h1>
            <p style={{ color: "var(--text-subtle)", fontSize: "clamp(14px, 3.5vw, 16px)", lineHeight: 1.6, marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
              Choose your role to get a personalised setup experience. You can always switch roles later.
            </p>

            {/* Role Cards Grid (Mobile responsive) */}
            <div className="onboarding-role-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 36, textAlign: "left" }}>
              <RoleCard
                selected={selectedRole === "creator"}
                onClick={() => setSelectedRole("creator")}
                icon={<Video style={{ width: 28, height: 28 }} />}
                title="Content Creator"
                subtitle="I create UGC content"
                description="You'll film, photograph, and produce authentic content for brands. Set up your rates, connect your socials, and get discovered."
                perks={[
                  "Browse & apply to campaign briefs",
                  "Submit content for brand review",
                  "Get paid via Escrow payouts",
                  "Build a verified creator portfolio",
                  "Earn bonuses for high-rated content",
                ]}
                image="/onboarding-creator.png"
                accent="#0284c7"
                pillText="Most Popular"
              />

              <RoleCard
                selected={selectedRole === "brand"}
                onClick={() => setSelectedRole("brand")}
                icon={<ShoppingBag style={{ width: 28, height: 28 }} />}
                title="Brand / Buyer"
                subtitle="I source UGC content"
                description="You represent a brand or agency looking to hire creators and source authentic content for your campaigns and ads."
                perks={[
                  "Post campaigns & receive applications",
                  "Browse vetted creator profiles",
                  "Review & approve deliverables",
                  "Fund campaigns safely via Escrow",
                  "Download content with full usage rights",
                ]}
                image="/onboarding-brand.png"
                accent="#7c3aed"
                pillText="For Brands"
              />
            </div>

            {/* CTA Button */}
            <div>
              <button
                onClick={handleStartForm}
                disabled={!selectedRole}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                  padding: "16px 44px", borderRadius: 14,
                  background: selectedRole ? `linear-gradient(135deg, ${selectedRole === "creator" ? "#0284c7, #0ea5e9" : "#7c3aed, #a78bfa"})` : "var(--surface-subtle)",
                  border: `1px solid ${selectedRole ? (selectedRole === "creator" ? "#0284c7" : "#7c3aed") : "var(--border-strong)"}`,
                  color: selectedRole ? "#fff" : "var(--text-subtle)",
                  fontSize: 16, fontWeight: 800, cursor: selectedRole ? "pointer" : "not-allowed",
                  fontFamily: "inherit",
                  boxShadow: selectedRole ? `0 8px 32px ${selectedRole === "creator" ? "rgba(2,132,199,0.4)" : "rgba(124,58,237,0.4)"}` : "none",
                  transition: "all 0.25s", width: "100%", maxWidth: 360
                }}
              >
                {selectedRole
                  ? <>Continue as {selectedRole === "creator" ? "Creator" : "Brand"} <ArrowRight style={{ width: 18, height: 18 }} /></>
                  : "Select a role to continue"
                }
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 1+: MULTI-STEP CREATOR & BRAND FORMS ── */}
        {step > 0 && (
          <div style={{ maxWidth: 600, width: "100%", margin: "0 auto" }}>

            {/* CREATOR STEPS */}
            {selectedRole === "creator" && (
              <>
                {currentStepIndex === 0 && (
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
                        <textarea className="input" placeholder="Tell brands about your content style, equipment, and audience…" rows={3} value={cf.bio} onChange={e => setC("bio", e.target.value)} style={{ resize: "vertical", width: "100%" }} />
                      </Field>
                    </div>
                  </StepWrap>
                )}

                {currentStepIndex === 1 && (
                  <StepWrap title="Your Social Presence" sub="Connect at least one social account to showcase your reach.">
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {[
                        { key: "tiktok" as const, icon: AtSign, label: "TikTok Handle", placeholder: "@yourhandle" },
                        { key: "instagram" as const, icon: AtSign, label: "Instagram Handle", placeholder: "@yourhandle" },
                        { key: "youtube" as const, icon: Play, label: "YouTube Channel URL", placeholder: "youtube.com/c/yourchannel" },
                      ].map(({ key, icon: Icon, label, placeholder }) => (
                        <Field key={key} label={label}>
                          <div style={{ position: "relative" }}>
                            <Icon style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "var(--text-subtle)" }} />
                            <input className="input" placeholder={placeholder} value={cf[key]} onChange={e => setC(key, e.target.value)} style={{ paddingLeft: 38 }} />
                          </div>
                        </Field>
                      ))}
                      <Field label="Total Audience Size (approx)">
                        <select className="input" value={cf.followers} onChange={e => setC("followers", e.target.value)}>
                          <option value="">Select range…</option>
                          {["Under 10k", "10k–50k", "50k–100k", "100k–500k", "500k–1M", "1M+"].map(r => <option key={r}>{r}</option>)}
                        </select>
                      </Field>
                    </div>
                  </StepWrap>
                )}

                {currentStepIndex === 2 && (
                  <StepWrap title="Payout Method" sub="Select how you want to receive your escrow earnings.">
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
                        {[
                          { id: "bank", icon: Banknote, label: "Bank Transfer", desc: "Direct ACH or International Wire" },
                          { id: "stripe", icon: CreditCard, label: "Stripe Connect", desc: "Instant payouts to debit card" },
                        ].map(opt => (
                          <button key={opt.id} onClick={() => setC("paymentMethod", opt.id as any)} style={{
                            padding: "20px 16px", borderRadius: 16, cursor: "pointer", textAlign: "left",
                            border: `2px solid ${cf.paymentMethod === opt.id ? "#0284c7" : "var(--border-strong)"}`,
                            background: cf.paymentMethod === opt.id ? "rgba(2,132,199,0.08)" : "var(--surface)",
                            fontFamily: "inherit", transition: "all 0.2s"
                          }}>
                            <opt.icon style={{ width: 22, height: 22, color: cf.paymentMethod === opt.id ? "#0284c7" : "var(--text-subtle)", marginBottom: 8 }} />
                            <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>{opt.label}</div>
                            <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>{opt.desc}</div>
                          </button>
                        ))}
                      </div>

                      {cf.paymentMethod === "bank" && (
                        <div style={{ padding: "20px", borderRadius: 16, background: "var(--surface)", border: "1px solid var(--border-strong)", display: "flex", flexDirection: "column", gap: 14 }}>
                          <Field label="Bank Name" required><input className="input" placeholder="e.g. Chase, Barclays, GTBank" value={cf.bankName} onChange={e => setC("bankName", e.target.value)} /></Field>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
                            <Field label="Account Number" required><input className="input" placeholder="••••••••••" value={cf.accountNumber} onChange={e => setC("accountNumber", e.target.value)} /></Field>
                            <Field label="Routing / Sort Code"><input className="input" placeholder="••••••••" value={cf.routingNumber} onChange={e => setC("routingNumber", e.target.value)} /></Field>
                          </div>
                        </div>
                      )}
                    </div>
                  </StepWrap>
                )}
              </>
            )}

            {/* BRAND STEPS */}
            {selectedRole === "brand" && (
              <>
                {currentStepIndex === 0 && (
                  <StepWrap title="Brand Details" sub="Tell creators about your brand and campaigns.">
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
                        <Field label="Monthly Content Budget">
                          <select className="input" value={bf.budget} onChange={e => setB("budget", e.target.value)}>
                            <option value="">Select budget…</option>
                            {["Under $500", "$500–$2,000", "$2,000–$10,000", "$10,000–$50,000", "$50,000+"].map(b => <option key={b}>{b}</option>)}
                          </select>
                        </Field>
                      </div>
                      <Field label="Website URL"><input className="input" type="url" placeholder="https://yourbrand.com" value={bf.website} onChange={e => setB("website", e.target.value)} /></Field>
                    </div>
                  </StepWrap>
                )}

                {currentStepIndex === 1 && (
                  <StepWrap title="Billing & Escrow Setup" sub="Configure how you will fund creator campaign escrows.">
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
                        {[
                          { id: "card", icon: CreditCard, label: "Credit Card", desc: "Visa, Mastercard, Amex" },
                          { id: "bank", icon: Banknote, label: "Bank Invoice", desc: "ACH / Wire transfer" },
                          { id: "crypto", icon: DollarSign, label: "USDC / Base", desc: "Crypto escrow wallet" },
                        ].map(opt => (
                          <button key={opt.id} onClick={() => setB("billingMethod", opt.id as any)} style={{
                            padding: "18px 14px", borderRadius: 16, cursor: "pointer", textAlign: "left",
                            border: `2px solid ${bf.billingMethod === opt.id ? "#7c3aed" : "var(--border-strong)"}`,
                            background: bf.billingMethod === opt.id ? "rgba(124,58,237,0.08)" : "var(--surface)",
                            fontFamily: "inherit", transition: "all 0.2s"
                          }}>
                            <opt.icon style={{ width: 22, height: 22, color: bf.billingMethod === opt.id ? "#7c3aed" : "var(--text-subtle)", marginBottom: 8 }} />
                            <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>{opt.label}</div>
                            <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>{opt.desc}</div>
                          </button>
                        ))}
                      </div>

                      {bf.billingMethod === "card" && (
                        <div style={{ padding: "20px", borderRadius: 16, background: "var(--surface)", border: "1px solid var(--border-strong)", display: "flex", flexDirection: "column", gap: 14 }}>
                          <Field label="Card Number" required>
                            <input className="input" placeholder="4242 4242 4242 4242" maxLength={19} value={bf.cardNumber} onChange={e => setB("cardNumber", e.target.value)} />
                          </Field>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                            <Field label="Expiry"><input className="input" placeholder="MM/YY" maxLength={5} value={bf.expiry} onChange={e => setB("expiry", e.target.value)} /></Field>
                            <Field label="CVV"><input className="input" placeholder="123" maxLength={4} value={bf.cvv} onChange={e => setB("cvv", e.target.value)} /></Field>
                          </div>
                        </div>
                      )}
                    </div>
                  </StepWrap>
                )}
              </>
            )}

            {/* Form Nav Buttons */}
            <div style={{ marginTop: 36, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, paddingTop: 20, borderTop: "1px solid var(--border-strong)" }}>
              <button
                onClick={() => currentStepIndex === 0 ? setStep(0) : setStep(s => s - 1)}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 20px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", color: "var(--text)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >
                <ChevronLeft style={{ width: 16, height: 16 }} /> Back
              </button>

              {currentStepIndex < STEPS.length - 1 ? (
                <button
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canNext()}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 24px", borderRadius: 12, background: canNext() ? (selectedRole === "creator" ? "#0284c7" : "#7c3aed") : "var(--surface-subtle)", border: `1px solid ${canNext() ? (selectedRole === "creator" ? "#0284c7" : "#7c3aed") : "var(--border-strong)"}`, color: canNext() ? "#fff" : "var(--text-subtle)", fontSize: 14, fontWeight: 700, cursor: canNext() ? "pointer" : "not-allowed", fontFamily: "inherit" }}
                >
                  Continue <ChevronRight style={{ width: 16, height: 16 }} />
                </button>
              ) : (
                <button
                  onClick={finishOnboarding}
                  disabled={submitting || !canNext()}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 28px", borderRadius: 12, background: selectedRole === "creator" ? "#0284c7" : "#7c3aed", border: "none", color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}
                >
                  {submitting ? <><Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} /> Setting up…</> : <><Sparkles style={{ width: 16, height: 16 }} /> Complete Setup</>}
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .input { width: 100%; box-sizing: border-box; }
        select.input { appearance: auto; }
      `}</style>
    </div>
  );
}

/* ── Role Card Component ── */
function RoleCard({
  selected, onClick, icon, title, subtitle, description, perks, image, accent, pillText,
}: {
  selected: boolean; onClick: () => void;
  icon: React.ReactNode; title: string; subtitle: string; description: string;
  perks: string[]; image: string; accent: string; pillText: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left", padding: 0, borderRadius: 24,
        background: selected ? `${accent}0d` : "var(--surface)",
        border: `2px solid ${selected ? accent : "var(--border-strong)"}`,
        cursor: "pointer", fontFamily: "inherit", overflow: "hidden",
        boxShadow: selected ? `0 16px 48px ${accent}25` : "var(--shadow-card)",
        transform: selected ? "translateY(-4px)" : "none",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        position: "relative", width: "100%"
      }}
    >
      {/* Selected check badge */}
      {selected && (
        <div style={{
          position: "absolute", top: 16, right: 16, zIndex: 3,
          width: 26, height: 26, borderRadius: 999,
          background: accent, display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 12px ${accent}66`,
        }}>
          <Check style={{ width: 14, height: 14, color: "#fff" }} />
        </div>
      )}

      {/* Hero Image */}
      <div style={{ position: "relative", height: 180, overflow: "hidden", background: "var(--surface-subtle)" }}>
        <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover", opacity: 0.9 }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 30%, ${selected ? accent + "55" : "#00000088"})` }} />
        <div style={{
          position: "absolute", bottom: 14, left: 16,
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
          border: `1px solid ${accent}55`, borderRadius: 999,
          padding: "4px 12px",
        }}>
          <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>{pillText}</span>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: "20px 22px 24px" }}>
        <div style={{ color: selected ? accent : "var(--text-muted)", marginBottom: 10 }}>
          {icon}
        </div>
        <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 20, marginBottom: 2 }}>{title}</div>
        <div style={{ color: selected ? accent : "var(--text-subtle)", fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{subtitle}</div>
        <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6, marginBottom: 18 }}>{description}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {perks.map(perk => (
            <div key={perk} style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 18, height: 18, borderRadius: 999, background: selected ? `${accent}20` : "var(--surface-subtle)", border: `1px solid ${selected ? accent + "50" : "var(--border-strong)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Check style={{ width: 10, height: 10, color: selected ? accent : "var(--text-subtle)" }} />
              </div>
              <span style={{ color: selected ? "var(--text)" : "var(--text-subtle)", fontSize: 13, fontWeight: selected ? 600 : 400 }}>{perk}</span>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}

function StepWrap({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ color: "var(--text)", fontWeight: 800, fontSize: 24, margin: "0 0 6px", letterSpacing: "-0.02em" }}>{title}</h2>
        <p style={{ color: "var(--text-subtle)", fontSize: 14, margin: 0 }}>{sub}</p>
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

function SuccessScreen({ name, role }: { name: string; role: Role }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 480 }}>
      <div style={{ width: 76, height: 76, borderRadius: 999, background: `linear-gradient(135deg, ${role === "creator" ? "#0284c7, #38bdf8" : "#7c3aed, #a78bfa"})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: `0 12px 40px ${role === "creator" ? "rgba(2,132,199,0.4)" : "rgba(124,58,237,0.4)"}` }}>
        <Check style={{ width: 34, height: 34, color: "#fff" }} />
      </div>
      <h1 style={{ color: "var(--text)", fontWeight: 800, fontSize: 30, letterSpacing: "-0.03em", marginBottom: 12 }}>
        {name ? `Welcome, ${name.split(" ")[0]}!` : "You're all set!"} 🎉
      </h1>
      <p style={{ color: "var(--text-subtle)", fontSize: 15, lineHeight: 1.6 }}>
        Your {role === "creator" ? "creator profile" : "brand workspace"} is live. Redirecting to your dashboard…
      </p>
      <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 6 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: 999, background: role === "creator" ? "#0284c7" : "#7c3aed", animation: `bounce 1.2s ease ${i * 0.15}s infinite` }} />
        ))}
      </div>
      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-8px)} }`}</style>
    </div>
  );
}
