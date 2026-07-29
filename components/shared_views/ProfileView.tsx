"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import { User, Camera, Globe, Instagram, Youtube, Twitter, Edit3, Check } from "lucide-react";

export default function ProfileView() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Sarah Mitchell");
  const [bio, setBio] = useState("UGC Creator · Beauty & Skincare specialist · 1.4M+ total views across brand campaigns");
  const [niche, setNiche] = useState("Beauty & Skincare");

  return (
    <DashLayout title="Profile & Showcase">
      <PageHeader
        title="Creator Profile & Showcase"
        subtitle="Your public portfolio seen by brands. Keep it updated to attract more high-value partnerships."
        action={
          <button onClick={() => setEditing(!editing)} className={editing ? "btn btn-primary" : "btn btn-secondary"} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {editing ? <Check style={{ width: 14, height: 14 }} /> : <Edit3 style={{ width: 14, height: 14 }} />}
            {editing ? "Save Profile" : "Edit Profile"}
          </button>
        }
      />

      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div className="card" style={{ padding: 28, borderRadius: 22, marginBottom: 20 }}>
          {/* Avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 22 }}>
            <div style={{ width: 72, height: 72, borderRadius: 999, background: "linear-gradient(135deg, #0284c7, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 26 }}>SM</div>
            <div>
              {editing ? (
                <input value={name} onChange={e => setName(e.target.value)} className="input" style={{ fontWeight: 800, fontSize: 18 }} />
              ) : (
                <h2 style={{ color: "var(--text)", fontWeight: 900, fontSize: 20, margin: 0 }}>{name}</h2>
              )}
              <span className="pill pill-blue" style={{ fontSize: 11, marginTop: 4, display: "inline-flex" }}>{niche}</span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label style={{ display: "block", color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>BIO</label>
            {editing ? (
              <textarea value={bio} onChange={e => setBio(e.target.value)} className="input" style={{ width: "100%", minHeight: 80, resize: "vertical" }} />
            ) : (
              <p style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{bio}</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { label: "Total Views", value: "1.4M" },
            { label: "Deals Completed", value: "18" },
            { label: "Avg Rating", value: "4.92★" },
          ].map(s => (
            <div key={s.label} className="card" style={{ padding: 18, borderRadius: 16, textAlign: "center" }}>
              <div style={{ color: "#0284c7", fontWeight: 900, fontSize: 22 }}>{s.value}</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </DashLayout>
  );
}
