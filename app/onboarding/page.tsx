"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sparkles, Video, ShoppingBag, ArrowRight, Check } from "lucide-react";

export default function OnboardingRolePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<"creator" | "brand" | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    router.push(selected === "creator" ? "/onboarding/creator" : "/onboarding/brand");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      fontFamily: "var(--font-poppins), sans-serif",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Top Bar */}
      <header style={{
        height: 64,
        borderBottom: "1px solid var(--border-strong)",
        background: "var(--sidebar-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(2,132,199,0.35)" }}>
            <Sparkles style={{ width: 15, height: 15, color: "#fff" }} />
          </div>
          <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 15 }}>UGC Studio</span>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px" }}>
        <div style={{ maxWidth: 800, width: "100%", textAlign: "center" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.25)", borderRadius: 999, padding: "6px 16px", marginBottom: 28 }}>
            <Sparkles style={{ width: 13, height: 13, color: "#38bdf8" }} />
            <span style={{ color: "#38bdf8", fontSize: 12, fontWeight: 600 }}>Welcome to UGC Studio</span>
          </div>

          <h1 style={{ color: "var(--text)", fontWeight: 800, fontSize: 40, letterSpacing: "-0.04em", lineHeight: 1.15, marginBottom: 14 }}>
            Who are you joining as today?
          </h1>
          <p style={{ color: "var(--text-subtle)", fontSize: 16, lineHeight: 1.7, marginBottom: 52, maxWidth: 520, margin: "0 auto 52px" }}>
            Choose your role to get a personalised setup experience. You can always update your profile later.
          </p>

          {/* Role Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }}>
            <RoleCard
              selected={selected === "creator"}
              onClick={() => setSelected("creator")}
              icon={<Video style={{ width: 32, height: 32 }} />}
              title="Content Creator"
              subtitle="I create UGC content"
              description="You'll film, photograph, and produce authentic content for brands. Set up your rates, connect your socials, and get discovered."
              perks={[
                "Browse & apply to campaign briefs",
                "Submit content for brand review",
                "Get paid weekly via PayPal or bank",
                "Build a verified creator portfolio",
                "Earn bonuses for high-rated content",
              ]}
              image="/onboarding-creator.png"
              accent="#0284c7"
              pillText="Most Popular"
            />
            <RoleCard
              selected={selected === "brand"}
              onClick={() => setSelected("brand")}
              icon={<ShoppingBag style={{ width: 32, height: 32 }} />}
              title="Brand / Buyer"
              subtitle="I source UGC content"
              description="You represent a brand or agency looking to hire creators and source authentic content for your campaigns and ads."
              perks={[
                "Post campaigns & receive applications",
                "Browse vetted creator profiles",
                "Review & approve deliverables",
                "Manage team members & budgets",
                "Download content with full usage rights",
              ]}
              image="/onboarding-brand.png"
              accent="#7c3aed"
              pillText="For Brands"
            />
          </div>

          {/* CTA */}
          <button
            onClick={handleContinue}
            disabled={!selected}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "16px 40px", borderRadius: 14,
              background: selected ? "linear-gradient(135deg, #0284c7, #0ea5e9)" : "var(--surface-subtle)",
              border: `1px solid ${selected ? "#0284c7" : "var(--border-strong)"}`,
              color: selected ? "#fff" : "var(--text-subtle)",
              fontSize: 15, fontWeight: 700, cursor: selected ? "pointer" : "not-allowed",
              fontFamily: "inherit",
              boxShadow: selected ? "0 8px 32px rgba(2,132,199,0.4)" : "none",
              transition: "all 0.25s",
            }}
          >
            {selected
              ? <>Continue as {selected === "creator" ? "Creator" : "Brand"} <ArrowRight style={{ width: 18, height: 18 }} /></>
              : "Select a role to continue"
            }
          </button>

          <p style={{ color: "var(--text-subtle)", fontSize: 13, marginTop: 20 }}>
            By continuing, you agree to our{" "}
            <a href="#" style={{ color: "var(--accent-text)", textDecoration: "none" }}>Terms of Service</a>
            {" "}and{" "}
            <a href="#" style={{ color: "var(--accent-text)", textDecoration: "none" }}>Privacy Policy</a>
          </p>
        </div>
      </main>
    </div>
  );
}

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
        background: selected ? `${accent}0a` : "var(--surface)",
        border: `2px solid ${selected ? accent : "var(--border-strong)"}`,
        cursor: "pointer", fontFamily: "inherit", overflow: "hidden",
        boxShadow: selected ? `0 16px 48px ${accent}22` : "var(--shadow-card)",
        transform: selected ? "translateY(-4px)" : "none",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        position: "relative",
      }}
    >
      {/* Selected indicator */}
      {selected && (
        <div style={{
          position: "absolute", top: 16, right: 16, zIndex: 2,
          width: 26, height: 26, borderRadius: 999,
          background: accent, display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 12px ${accent}55`,
        }}>
          <Check style={{ width: 13, height: 13, color: "#fff" }} />
        </div>
      )}

      {/* Image header */}
      <div style={{ position: "relative", height: 180, overflow: "hidden", background: "var(--surface-subtle)" }}>
        <Image src={image} alt={title} fill style={{ objectFit: "cover", opacity: 0.85 }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${selected ? accent + "44" : "#00000066"})` }} />
        <div style={{
          position: "absolute", bottom: 16, left: 20,
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
          border: `1px solid ${accent}44`, borderRadius: 999,
          padding: "4px 12px",
        }}>
          <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>{pillText}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 28px 28px" }}>
        <div style={{ color: selected ? accent : "var(--text-muted)", marginBottom: 12 }}>
          {icon}
        </div>
        <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 20, marginBottom: 3 }}>{title}</div>
        <div style={{ color: selected ? accent : "var(--text-subtle)", fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{subtitle}</div>
        <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.65, marginBottom: 20 }}>{description}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {perks.map(perk => (
            <div key={perk} style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 18, height: 18, borderRadius: 999, background: selected ? `${accent}18` : "var(--surface-subtle)", border: `1px solid ${selected ? accent + "40" : "var(--border-strong)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Check style={{ width: 10, height: 10, color: selected ? accent : "var(--text-subtle)" }} />
              </div>
              <span style={{ color: selected ? "var(--text)" : "var(--text-subtle)", fontSize: 13 }}>{perk}</span>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}
