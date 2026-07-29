"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  ShieldCheck, Clock, Key, DollarSign, CheckCircle2, AlertCircle,
  Copy, Check, FileText, Download, Sparkles, RefreshCw
} from "lucide-react";

interface LicenseItem {
  id: string;
  videoTitle: string;
  brand: string;
  creator: string;
  licenseType: string;
  sparkCode: string;
  expiresIn: string;
  status: "active" | "expiring_soon" | "expired";
  price: string;
}

const MOCK_LICENSES: LicenseItem[] = [
  {
    id: "LIC-101",
    videoTitle: "Skincare Morning Routine Reel",
    brand: "GlowBrand",
    creator: "Sarah Mitchell",
    licenseType: "90-Day Spark Ads Whitelisting",
    sparkCode: "TT-SPARK-8924-GLOW",
    expiresIn: "45 Days Remaining",
    status: "active",
    price: "$150.00"
  },
  {
    id: "LIC-102",
    videoTitle: "Noise-Canceling Headphones Unboxing",
    brand: "TechFlow Labs",
    creator: "Sarah Mitchell",
    licenseType: "30-Day Paid Ad Rights",
    sparkCode: "IG-WHITELIST-4421-TF",
    expiresIn: "4 Days Remaining",
    status: "expiring_soon",
    price: "$100.00"
  },
  {
    id: "LIC-103",
    videoTitle: "Protein Powder Smoothie Recipe",
    brand: "NutriLife",
    creator: "Marcus Lee",
    licenseType: "Perpetual Master Buyout",
    sparkCode: "PERPETUAL-BUYOUT-NL",
    expiresIn: "Never (Perpetual)",
    status: "active",
    price: "$450.00"
  }
];

export default function LicensesPage() {
  const [licenses, setLicenses] = useState<LicenseItem[]>(MOCK_LICENSES);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRenew = (id: string) => {
    setLicenses(prev => prev.map(l => {
      if (l.id !== id) return l;
      return { ...l, expiresIn: "90 Days Remaining", status: "active" };
    }));
    alert("License renewed for 90 additional days!");
  };

  return (
    <DashLayout title="Content Licensing">
      <PageHeader
        title="Content Licensing & Whitelisting Manager"
        subtitle="Manage Spark Ads whitelisting codes, digital commercial ad rights, and usage license renewals."
      />

      {/* ── KPI METRICS BANNER ── */}
      <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 28 }}>
        <div className="stat-card" style={{ borderLeft: "3px solid #10b981" }}>
          <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>ACTIVE AD LICENSES</div>
          <div style={{ color: "var(--text)", fontWeight: 900, fontSize: 26, marginTop: 4 }}>3 Active</div>
          <div style={{ color: "#10b981", fontSize: 12, fontWeight: 600, marginTop: 2 }}>Commercial usage rights protected</div>
        </div>

        <div className="stat-card" style={{ borderLeft: "3px solid #f59e0b" }}>
          <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>EXPIRING SOON</div>
          <div style={{ color: "#f59e0b", fontWeight: 900, fontSize: 26, marginTop: 4 }}>1 License</div>
          <div style={{ color: "#f59e0b", fontSize: 12, fontWeight: 600, marginTop: 2 }}>Expires in 4 days</div>
        </div>

        <div className="stat-card" style={{ borderLeft: "3px solid #0284c7" }}>
          <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>TOTAL LICENSE REVENUE</div>
          <div style={{ color: "#0284c7", fontWeight: 900, fontSize: 26, marginTop: 4 }}>$700.00</div>
          <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>Usage extension fees collected</div>
        </div>
      </div>

      {/* ── LICENSES TABLE ── */}
      <div className="card table-responsive" style={{ padding: "24px", borderRadius: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Key style={{ width: 18, height: 18, color: "#0284c7" }} />
            <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, margin: 0 }}>Active Content Licenses</h3>
          </div>
          <span className="pill pill-blue">Escrow Whitelisting Active</span>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Deliverable Title", "Brand / Client", "License Type", "Whitelisting Code", "Expiration", "Extension Fee", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", background: "var(--surface-subtle)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {licenses.map(row => (
              <tr key={row.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{row.videoTitle}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>Creator: {row.creator}</div>
                </td>
                <td style={{ padding: "14px 16px", color: "var(--text-muted)", fontSize: 12 }}>{row.brand}</td>
                <td style={{ padding: "14px 16px" }}><span className="pill pill-purple" style={{ fontSize: 10 }}>{row.licenseType}</span></td>
                
                {/* Whitelisting Code */}
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <code style={{ background: "var(--surface-subtle)", border: "1px solid var(--border)", padding: "4px 8px", borderRadius: 6, fontSize: 11, fontFamily: "monospace", color: "#0284c7" }}>
                      {row.sparkCode}
                    </code>
                    <button onClick={() => copyCode(row.sparkCode, row.id)} className="btn btn-ghost btn-sm" style={{ padding: 4 }}>
                      {copiedId === row.id ? <Check style={{ width: 12, height: 12, color: "#10b981" }} /> : <Copy style={{ width: 12, height: 12 }} />}
                    </button>
                  </div>
                </td>

                <td style={{ padding: "14px 16px" }}>
                  <span className={`pill ${row.status === "active" ? "pill-green" : "pill-amber"}`} style={{ fontSize: 10 }}>
                    {row.expiresIn}
                  </span>
                </td>

                <td style={{ padding: "14px 16px", color: "#10b981", fontWeight: 800, fontSize: 13 }}>{row.price}</td>

                <td style={{ padding: "14px 16px" }}>
                  {row.status === "expiring_soon" ? (
                    <button onClick={() => handleRenew(row.id)} className="btn btn-primary btn-sm" style={{ borderRadius: 8, fontSize: 11 }}>
                      <RefreshCw style={{ width: 11, height: 11 }} /> Renew License
                    </button>
                  ) : (
                    <span style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 600 }}>Active</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashLayout>
  );
}
