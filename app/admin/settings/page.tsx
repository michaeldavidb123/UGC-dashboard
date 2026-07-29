"use client";

import DashLayout, { PageHeader, SectionCard, Field } from "@/components/DashLayout";
import { Save, Shield, Bell, CreditCard, Globe } from "lucide-react";

const tabs = [
  { icon: Globe, label: "General" },
  { icon: Shield, label: "Security" },
  { icon: Bell, label: "Notifications" },
  { icon: CreditCard, label: "Billing" },
];

export default function AdminSettingsPage() {
  return (
    <DashLayout title="Settings">
      <PageHeader
        title="Platform Settings"
        subtitle="Configure global platform settings, commission rates, and system behavior."
        action={
          <button className="btn btn-primary btn-sm">
            <Save style={{ width: 14, height: 14 }} /> Save All Changes
          </button>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 28, alignItems: "start" }}>
        {/* Tab Navigation */}
        <div className="card" style={{ padding: "16px 12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {tabs.map(({ icon: Icon, label }, i) => (
              <button key={label} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "11px 14px", borderRadius: 12,
                fontSize: 13, fontWeight: i === 0 ? 600 : 500,
                color: i === 0 ? "var(--accent-text)" : "var(--text-subtle)",
                background: i === 0 ? "var(--nav-active-bg)" : "transparent",
                border: i === 0 ? "1px solid var(--nav-active-border)" : "1px solid transparent",
                cursor: "pointer", textAlign: "left", fontFamily: "var(--font-poppins), sans-serif",
                transition: "all 0.15s"
              }}>
                <Icon style={{ width: 15, height: 15 }} /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Panels */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* General */}
          <SectionCard title="General Settings" subtitle="Basic platform identity and operational configuration.">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <Field label="Platform Name">
                <input type="text" defaultValue="UGC Studio" className="input" />
              </Field>
              <Field label="Platform URL">
                <input type="text" defaultValue="https://ugcstudio.com" className="input" />
              </Field>
              <Field label="Support Email">
                <input type="email" defaultValue="support@ugcstudio.com" className="input" />
              </Field>
              <Field label="Default Currency">
                <select className="input">
                  <option>USD — US Dollar</option>
                  <option>GBP — British Pound</option>
                  <option>EUR — Euro</option>
                </select>
              </Field>
              <Field label="Commission Rate (%)" hint="Platform fee taken from each creator payout.">
                <input type="number" defaultValue="15" className="input" />
              </Field>
              <Field label="Minimum Payout Threshold ($)">
                <input type="number" defaultValue="50" className="input" />
              </Field>
            </div>
          </SectionCard>

          {/* Payout Rules */}
          <SectionCard title="Payout & Withdrawal Rules" subtitle="Control how and when creators can withdraw their earnings.">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <Field label="Minimum Withdrawal Amount ($)" hint="Creators are blocked from requesting a payout if their available balance is below this value.">
                <input type="number" defaultValue="50" className="input" />
              </Field>
              <Field label="Maximum Single Withdrawal ($)" hint="Cap on how much a creator can withdraw in one request.">
                <input type="number" defaultValue="5000" className="input" />
              </Field>
              <Field label="Payout Processing Window (days)" hint="How many business days until a payout is processed.">
                <input type="number" defaultValue="3" className="input" />
              </Field>
              <Field label="Earnings Clearance Period (days)" hint="Days after brand approval before earnings become available to withdraw.">
                <input type="number" defaultValue="7" className="input" />
              </Field>
            </div>
            <div style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(2,132,199,0.06)", border: "1px solid rgba(2,132,199,0.2)" }}>
              <div style={{ color: "#0284c7", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>How the minimum withdrawal works</div>
              <div style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6 }}>
                If a creator&apos;s available balance is below the minimum withdrawal amount, the <strong>Request Payout</strong> button remains disabled and they see a clear message: <em>&quot;Your available balance must be at least $50.00 to request a payout.&quot;</em>
              </div>
            </div>
          </SectionCard>


          {/* Creator Policy */}
          <SectionCard title="Creator Policy" subtitle="Rules and limits for creator accounts and submissions.">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <Field label="Max Revision Rounds">
                <input type="number" defaultValue="3" className="input" />
              </Field>
              <Field label="Submission Review Window (days)">
                <input type="number" defaultValue="7" className="input" />
              </Field>
              <Field label="Max Active Campaigns per Creator">
                <input type="number" defaultValue="5" className="input" />
              </Field>
              <Field label="Content Approval Timeout (days)">
                <input type="number" defaultValue="14" className="input" />
              </Field>
            </div>

            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                ["Auto-approve creator accounts after email verification", true],
                ["Require identity verification for payouts over $500", true],
                ["Allow creators to apply to multiple briefs simultaneously", false],
              ].map(([label, enabled]) => (
                <label key={label as string} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderRadius: 14, background: "var(--surface-subtle)", border: "1px solid var(--border)", cursor: "pointer" }}>
                  <span style={{ color: "var(--text)", fontSize: 14, fontWeight: 500 }}>{label as string}</span>
                  <div style={{
                    width: 44, height: 24, borderRadius: 999,
                    background: enabled ? "#0284c7" : "var(--progress-bg)",
                    position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0
                  }}>
                    <div style={{
                      position: "absolute", top: 3, left: enabled ? 23 : 3,
                      width: 18, height: 18, borderRadius: 999, background: "#fff",
                      transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)"
                    }} />
                  </div>
                </label>
              ))}
            </div>
          </SectionCard>

          {/* Danger Zone */}
          <SectionCard title="Danger Zone" subtitle="Irreversible platform actions. Proceed with caution.">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Clear Content Moderation Cache", desc: "Forces re-review of all pending content submissions.", btn: "Clear Cache", color: "#d97706" },
                { label: "Export All Platform Data", desc: "Downloads a full CSV export of users, campaigns, and transactions.", btn: "Export Data", color: "var(--accent-text)" },
                { label: "Reset Platform to Defaults", desc: "Removes all custom settings and reverts to factory defaults.", btn: "Reset Platform", color: "#e11d48" },
              ].map(({ label, desc, btn, color }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderRadius: 14, background: "var(--surface-subtle)", border: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ color: "var(--text)", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{label}</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 13 }}>{desc}</div>
                  </div>
                  <button style={{ padding: "9px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, border: `1px solid ${color}30`, background: `${color}15`, color, cursor: "pointer", flexShrink: 0, fontFamily: "var(--font-poppins), sans-serif", transition: "all 0.15s" }}>
                    {btn}
                  </button>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </DashLayout>
  );
}
