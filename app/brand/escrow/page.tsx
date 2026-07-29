"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  CreditCard, Lock, Check, ArrowRight, ShieldCheck,
  Building2, Wallet, Sparkles, ChevronLeft, AlertCircle
} from "lucide-react";

function formatCard(val: string) {
  return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(val: string) {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length > 2) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}

export default function BrandEscrowPage() {
  const router = useRouter();
  const [method, setMethod] = useState<"card" | "bank" | "paypal">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("500");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Escrow Wallet successfully funded with $${amount}.00! Money is now ready to assign to creators.`);
      router.push("/brand/transactions");
    }, 1500);
  };

  return (
    <DashLayout title="Fund Escrow Wallet">
      <PageHeader
        title="Fund Brand Escrow Wallet"
        subtitle="Deposit funds into secure 256-bit SSL Escrow to assign creators and launch campaign briefs."
      />

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px 0" }}>
        <div className="card" style={{ padding: "32px", borderRadius: 24 }}>
          
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <Lock style={{ width: 18, height: 18, color: "#0284c7" }} />
            <h2 style={{ color: "var(--text)", fontWeight: 800, fontSize: 18, margin: 0 }}>Secure Escrow Deposit</h2>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Funding Amount ($ USD)</label>
              <input
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="input"
                style={{ width: "100%", fontSize: 18, fontWeight: 800, color: "#10b981" }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Card Number</label>
              <input
                placeholder="4242 4242 4242 4242"
                value={cardNumber}
                onChange={e => setCardNumber(formatCard(e.target.value))}
                className="input"
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Expiry Date</label>
                <input
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={e => setExpiry(formatExpiry(e.target.value))}
                  className="input"
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>CVV Code</label>
                <input
                  placeholder="123"
                  maxLength={4}
                  value={cvv}
                  onChange={e => setCvv(e.target.value.replace(/\D/g, ""))}
                  className="input"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: "100%", padding: "14px", borderRadius: 14, fontWeight: 800, fontSize: 15, marginTop: 8 }}
            >
              {loading ? "Processing Escrow Funding..." : `Fund Escrow Wallet ($${amount}.00)`}
            </button>
          </form>

        </div>
      </div>
    </DashLayout>
  );
}
