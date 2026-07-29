"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard, Lock, Check, ArrowRight, ShieldCheck,
  Building2, Wallet, Sparkles, ChevronLeft, AlertCircle
} from "lucide-react";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function formatCard(val: string) {
  return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(val: string) {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length > 2) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}

/* ─────────────────────────────────────────────
   PLAN SUMMARY (from localStorage in real app)
───────────────────────────────────────────── */
const PLAN_SUMMARY = {
  name: "Creator Pro",
  billing: "monthly",
  price: "$29.00",
  yearlyNote: null,
  next_billing: "Aug 29, 2025",
};

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function DepositPage() {
  const router = useRouter();
  const [method, setMethod] = useState<"card" | "bank" | "paypal">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const isCardValid = cardNumber.replace(/\s/g, "").length === 16 && cardHolder.trim() && expiry.length === 5 && cvv.length >= 3;
  const canPay = method === "card" ? isCardValid : method === "paypal" ? true : true;

  const handlePay = async () => {
    setError("");
    setProcessing(true);
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 2200));
    setProcessing(false);
    setSuccess(true);
    setTimeout(() => router.push("/"), 2500);
  };

  if (success) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "var(--font-poppins), sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 440 }}>
          <div style={{ width: 80, height: 80, borderRadius: 999, background: "linear-gradient(135deg,#10b981,#34d399)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 12px 40px rgba(16,185,129,0.4)", animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
            <Check style={{ width: 36, height: 36, color: "#fff" }} />
          </div>
          <h1 style={{ color: "var(--text)", fontWeight: 900, fontSize: 28, letterSpacing: "-0.03em", marginBottom: 10 }}>Payment Successful!</h1>
          <p style={{ color: "var(--text-subtle)", fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>
            Your <strong>Creator Pro</strong> subscription is now active. Welcome to UGC Studio Pro!
          </p>
          <div style={{ color: "var(--text-subtle)", fontSize: 13 }}>Redirecting to your dashboard…</div>
          <style>{`@keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "var(--font-poppins), sans-serif" }}>
      {/* Header */}
      <header style={{ height: 64, borderBottom: "1px solid var(--border-strong)", background: "var(--sidebar-bg)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles style={{ width: 15, height: 15, color: "#fff" }} />
          </div>
          <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 15 }}>UGC Studio</span>
        </div>
        <button onClick={() => router.push("/subscription")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "var(--text-subtle)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
          <ChevronLeft style={{ width: 15, height: 15 }} /> Change plan
        </button>
      </header>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "52px 24px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 32, alignItems: "start" }}>

        {/* LEFT: Payment Form */}
        <div>
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(2,132,199,0.08)", border: "1px solid rgba(2,132,199,0.2)", borderRadius: 999, padding: "5px 14px", fontSize: 12, fontWeight: 700, color: "#0284c7", marginBottom: 14 }}>
              <Lock style={{ width: 11, height: 11 }} /> Secure Checkout
            </div>
            <h1 style={{ color: "var(--text)", fontWeight: 900, fontSize: 28, letterSpacing: "-0.03em", marginBottom: 6 }}>Complete Your Payment</h1>
            <p style={{ color: "var(--text-subtle)", fontSize: 14 }}>All transactions are encrypted with SSL. We never store your full card details.</p>
          </div>

          {/* Payment Method Tabs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 28 }}>
            {[
              { id: "card" as const, label: "Credit / Debit Card", icon: CreditCard },
              { id: "bank" as const, label: "Bank Transfer", icon: Building2 },
              { id: "paypal" as const, label: "PayPal", icon: Wallet },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                style={{
                  padding: "14px", borderRadius: 14, textAlign: "center",
                  background: method === m.id ? "rgba(2,132,199,0.08)" : "var(--surface-subtle)",
                  border: `1.5px solid ${method === m.id ? "#0284c7" : "var(--border-strong)"}`,
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 6
                }}
              >
                <m.icon style={{ width: 20, height: 20, color: method === m.id ? "#0284c7" : "var(--text-subtle)" }} />
                <span style={{ color: method === m.id ? "#0284c7" : "var(--text-muted)", fontSize: 12, fontWeight: 700 }}>{m.label}</span>
              </button>
            ))}
          </div>

          {/* Card Form */}
          {method === "card" && (
            <div className="card" style={{ padding: "28px", borderRadius: 18, display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 700, marginBottom: 7 }}>CARD NUMBER</label>
                <div style={{ position: "relative" }}>
                  <input
                    className="input" type="text" inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCardNumber(formatCard(e.target.value))}
                    style={{ paddingRight: 48, letterSpacing: "0.08em", fontWeight: 700, fontSize: 15 }}
                  />
                  <CreditCard style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", width: 18, height: 18, color: "var(--text-subtle)" }} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 700, marginBottom: 7 }}>CARDHOLDER NAME</label>
                <input className="input" type="text" placeholder="Sarah Mitchell" value={cardHolder} onChange={(e: ChangeEvent<HTMLInputElement>) => setCardHolder(e.target.value)} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 700, marginBottom: 7 }}>EXPIRY DATE</label>
                  <input className="input" type="text" inputMode="numeric" placeholder="MM/YY" value={expiry} onChange={(e: ChangeEvent<HTMLInputElement>) => setExpiry(formatExpiry(e.target.value))} style={{ letterSpacing: "0.06em", fontWeight: 700 }} />
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 700, marginBottom: 7 }}>CVV / CVC</label>
                  <input className="input" type="text" inputMode="numeric" placeholder="•••" maxLength={4} value={cvv} onChange={(e: ChangeEvent<HTMLInputElement>) => setCvv(e.target.value.replace(/\D/g, ""))} style={{ letterSpacing: "0.1em", fontWeight: 700 }} />
                </div>
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <div
                  onClick={() => setSaveCard(p => !p)}
                  style={{ width: 18, height: 18, borderRadius: 5, background: saveCard ? "#0284c7" : "var(--surface-subtle)", border: `2px solid ${saveCard ? "#0284c7" : "var(--border-strong)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}
                >
                  {saveCard && <Check style={{ width: 10, height: 10, color: "#fff" }} />}
                </div>
                <span style={{ color: "var(--text-muted)", fontSize: 13 }}>Save card for future renewals</span>
              </label>
            </div>
          )}

          {/* Bank Transfer */}
          {method === "bank" && (
            <div className="card" style={{ padding: "28px", borderRadius: 18 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Bank Name", placeholder: "e.g. Chase, Barclays, GTBank" },
                  { label: "Account Holder Name", placeholder: "Full legal name" },
                  { label: "Account Number / IBAN", placeholder: "•••••••••••••" },
                  { label: "Sort / Routing Code", placeholder: "Optional" },
                ].map(field => (
                  <div key={field.label}>
                    <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 700, marginBottom: 7 }}>{field.label.toUpperCase()}</label>
                    <input className="input" type="text" placeholder={field.placeholder} />
                  </div>
                ))}
                <div style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(2,132,199,0.06)", border: "1px solid rgba(2,132,199,0.2)", color: "var(--text-muted)", fontSize: 12, lineHeight: 1.6 }}>
                  Bank transfers typically take 1–3 business days. Your subscription activates once payment clears.
                </div>
              </div>
            </div>
          )}

          {/* PayPal */}
          {method === "paypal" && (
            <div className="card" style={{ padding: "40px 28px", borderRadius: 18, textAlign: "center" }}>
              <div style={{ width: 60, height: 60, borderRadius: 16, background: "#003087", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Wallet style={{ width: 28, height: 28, color: "#fff" }} />
              </div>
              <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Pay with PayPal</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 13, lineHeight: 1.6, marginBottom: 24 }}>
                You&apos;ll be redirected to PayPal to complete your payment securely.
              </div>
              <input className="input" type="email" placeholder="your@paypal.com" style={{ textAlign: "center" }} />
            </div>
          )}

          {error && (
            <div style={{ marginTop: 16, padding: "12px 14px", borderRadius: 12, background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", gap: 8, color: "#ef4444", fontSize: 13 }}>
              <AlertCircle style={{ width: 14, height: 14, flexShrink: 0 }} /> {error}
            </div>
          )}

          <button
            onClick={handlePay}
            disabled={!canPay || processing}
            style={{
              marginTop: 24, width: "100%", padding: "16px", borderRadius: 14,
              background: canPay && !processing ? "#0284c7" : "var(--surface-subtle)",
              border: "none", color: canPay && !processing ? "#fff" : "var(--text-subtle)",
              fontWeight: 800, fontSize: 15, cursor: canPay && !processing ? "pointer" : "not-allowed",
              fontFamily: "inherit", letterSpacing: "-0.01em",
              boxShadow: canPay && !processing ? "0 8px 28px rgba(2,132,199,0.35)" : "none",
              transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10
            }}
          >
            {processing ? (
              <>
                <div style={{ width: 18, height: 18, borderRadius: 999, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite" }} />
                Processing payment…
              </>
            ) : (
              <>
                <Lock style={{ width: 16, height: 16 }} />
                Pay {PLAN_SUMMARY.price} · Activate {PLAN_SUMMARY.name}
                <ArrowRight style={{ width: 16, height: 16 }} />
              </>
            )}
          </button>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>

        {/* RIGHT: Order Summary */}
        <div style={{ position: "sticky", top: 88 }}>
          <div className="card" style={{ padding: "24px", borderRadius: 18 }}>
            <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 15, marginBottom: 18 }}>Order Summary</div>

            <div style={{ padding: "16px", borderRadius: 14, background: "rgba(2,132,199,0.05)", border: "1px solid rgba(2,132,199,0.15)", marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Sparkles style={{ width: 16, height: 16, color: "#fff" }} />
                </div>
                <div>
                  <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 14 }}>{PLAN_SUMMARY.name}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 12 }}>Billed {PLAN_SUMMARY.billing}</div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
              {[
                { label: "Plan",             value: PLAN_SUMMARY.name },
                { label: "Billing Cycle",    value: PLAN_SUMMARY.billing === "monthly" ? "Monthly" : "Yearly" },
                { label: "Next Billing",     value: PLAN_SUMMARY.next_billing },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-subtle)", fontSize: 13 }}>{row.label}</span>
                  <span style={{ color: "var(--text)", fontWeight: 600, fontSize: 13 }}>{row.value}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>Total Today</span>
                <span style={{ color: "#0284c7", fontWeight: 900, fontSize: 18 }}>{PLAN_SUMMARY.price}</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { icon: ShieldCheck, text: "SSL encrypted payment" },
                { icon: Check, text: "14-day money-back guarantee" },
                { icon: Lock, text: "Cancel anytime from settings" },
              ].map(item => (
                <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-subtle)", fontSize: 12 }}>
                  <item.icon style={{ width: 13, height: 13, color: "#10b981", flexShrink: 0 }} />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
