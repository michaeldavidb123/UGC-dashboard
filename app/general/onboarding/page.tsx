"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashLayout from "@/components/DashLayout";
import { User, Building2, ArrowRight, Check, Sparkles } from "lucide-react";

export default function GeneralOnboardingPage() {
  const router = useRouter();
  const [role, setRole] = useState<"creator" | "brand" | null>(null);

  const handleContinue = () => {
    if (!role) return;
    router.push(role === "creator" ? "/" : "/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 560, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Sparkles style={{ width: 22, height: 22, color: "#0284c7" }} />
            <span style={{ color: "#0284c7", fontWeight: 800, fontSize: 18 }}>UGC Platform</span>
          </div>
          <h1 style={{ color: "var(--text)", fontWeight: 900, fontSize: 32, margin: "0 0 8px" }}>Welcome Aboard!</h1>
          <p style={{ color: "var(--text-subtle)", fontSize: 15 }}>Tell us how you'd like to use the platform</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
          {[
            { id: "creator" as const, icon: User, title: "I'm a Creator", desc: "Create UGC content, apply to brand briefs, and earn through escrow-protected deals." },
            { id: "brand" as const, icon: Building2, title: "I'm a Brand", desc: "Discover creators, post campaign briefs, and pay safely through escrow." },
          ].map(opt => (
            <div key={opt.id} onClick={() => setRole(opt.id)} className="card"
              style={{ padding: 24, borderRadius: 20, cursor: "pointer", border: `2px solid ${role === opt.id ? "#0284c7" : "var(--border)"}`, transition: "all 0.2s" }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: role === opt.id ? "#0284c7" : "var(--surface-subtle)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <opt.icon style={{ width: 22, height: 22, color: role === opt.id ? "#fff" : "var(--text-subtle)" }} />
              </div>
              <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, margin: "0 0 6px" }}>{opt.title}</h3>
              <p style={{ color: "var(--text-subtle)", fontSize: 13, margin: 0, lineHeight: 1.5 }}>{opt.desc}</p>
            </div>
          ))}
        </div>

        <button disabled={!role} onClick={handleContinue} className="btn btn-primary" style={{ width: "100%", padding: "14px", borderRadius: 14, fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          Continue as {role === "creator" ? "Creator" : role === "brand" ? "Brand" : "..."} <ArrowRight style={{ width: 16, height: 16 }} />
        </button>
      </div>
    </div>
  );
}
