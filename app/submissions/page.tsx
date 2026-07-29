"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { ChangeEvent, DragEvent } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  Eye, RotateCcw, Clock, CheckCircle2, AlertCircle, XCircle,
  FileText, Upload, MessageSquare, X, Download,
  FileVideo, FileImage, Pencil, Send, Check
} from "lucide-react";

/* ── Types ── */
type SubmissionStatus = "draft" | "submitted" | "under_review" | "revision_requested" | "approved" | "rejected";

interface FeedbackEntry {
  from: "brand" | "creator";
  date: string;
  message: string;
  version?: number;
}

interface UploadedFile {
  name: string;
  type: "video" | "image" | "document";
  size: string;
  duration?: string;
  version: number;
}

interface Submission {
  id: string;
  campaign: string;
  brand: string;
  brandLogo: string;
  campaignImage: string;
  submittedDate: string;
  status: SubmissionStatus;
  payment: string;
  contentType: string;
  notes: string;
  files: UploadedFile[];
  feedbackHistory: FeedbackEntry[];
}

/* ── Mock Data ── */
const mockSubmissions: Submission[] = [
  {
    id: "s1",
    campaign: "Skincare Morning Routine Reel",
    brand: "GlowBrand",
    brandLogo: "GB",
    campaignImage: "/slide-2.png",
    submittedDate: "Jul 27, 2025",
    status: "approved",
    payment: "$200.00",
    contentType: "Video Reel (30s)",
    notes: "Filmed in natural daylight as requested. Mentioned discount code GLOW20 in caption.",
    files: [
      { name: "glowbrand_reel_final.mp4", type: "video", size: "84 MB", duration: "0:30", version: 1 },
      { name: "glowbrand_still_01.jpg", type: "image", size: "4.2 MB", version: 1 },
      { name: "glowbrand_still_02.jpg", type: "image", size: "3.8 MB", version: 1 },
    ],
    feedbackHistory: [
      { from: "creator", date: "Jul 27, 2025", message: "Delivered all 3 required files. Natural lighting, product clearly visible. Caption with GLOW20 code included.", version: 1 },
      { from: "brand", date: "Jul 28, 2025", message: "Fantastic work! The lighting and reactions feel very authentic. Payment has been released. Great job!" },
    ]
  },
  {
    id: "s2",
    campaign: "Noise-Canceling Headphones Unboxing",
    brand: "TechFlow",
    brandLogo: "TF",
    campaignImage: "/slide-1.png",
    submittedDate: "Jul 25, 2025",
    status: "under_review",
    payment: "$300.00",
    contentType: "Product Review (45s)",
    notes: "Filmed at a busy coffee shop. ANC demo clearly showed noise cancellation kicking in.",
    files: [
      { name: "techflow_unboxing_v1.mp4", type: "video", size: "112 MB", duration: "0:46", version: 1 },
      { name: "lifestyle_shot_1.jpg", type: "image", size: "5.1 MB", version: 1 },
    ],
    feedbackHistory: [
      { from: "creator", date: "Jul 25, 2025", message: "Submitted version 1. ANC demo at café background noise was really clear.", version: 1 },
    ]
  },
  {
    id: "s3",
    campaign: "High-Protein Meal Prep Recipe",
    brand: "NutriLife",
    brandLogo: "NL",
    campaignImage: "/slide-3.png",
    submittedDate: "Jul 20, 2025",
    status: "revision_requested",
    payment: "$120.00",
    contentType: "Recipe Video (30s) + 5 Photos",
    notes: "Uploaded smoothie bowl prep video and 5 high-res stills.",
    files: [
      { name: "nutrilife_smoothie_v1.mp4", type: "video", size: "62 MB", duration: "0:32", version: 1 },
      { name: "meal_photo_01.jpg", type: "image", size: "3.5 MB", version: 1 },
      { name: "meal_photo_02.jpg", type: "image", size: "3.9 MB", version: 1 },
    ],
    feedbackHistory: [
      { from: "creator", date: "Jul 20, 2025", message: "All content delivered as per brief.", version: 1 },
      { from: "brand", date: "Jul 22, 2025", message: "Thanks for the submission! We love the recipe video, but the photos feel a bit dark. Could you reshoot photos 02 and 03 in brighter natural light? The product label should also be fully visible in each shot." },
    ]
  },
  {
    id: "s4",
    campaign: "Summer Collection Running Promo",
    brand: "Nike",
    brandLogo: "NK",
    campaignImage: "/onboarding-brand.png",
    submittedDate: "Jul 18, 2025",
    status: "rejected",
    payment: "$150.00",
    contentType: "Athletic Reel (45s) + 3 Photos",
    notes: "Shot during golden hour at the park.",
    files: [
      { name: "nike_summer_reel.mp4", type: "video", size: "98 MB", duration: "0:44", version: 1 },
    ],
    feedbackHistory: [
      { from: "creator", date: "Jul 18, 2025", message: "Submitted the running reel filmed at golden hour.", version: 1 },
      { from: "brand", date: "Jul 20, 2025", message: "Unfortunately we can't accept this submission. A competitor brand logo is visible in the background at the 0:22 mark." },
    ]
  },
  {
    id: "s5",
    campaign: "Yoga Mat & Activewear Testimonial",
    brand: "AuraFit",
    brandLogo: "AF",
    campaignImage: "/onboarding-creator.png",
    submittedDate: "Jul 30, 2025",
    status: "submitted",
    payment: "$250.00",
    contentType: "Yoga Flow Reel (60s) + 4 Stills",
    notes: "Morning yoga routine with calm voiceover and warm lighting.",
    files: [
      { name: "aurafit_yoga_v1.mp4", type: "video", size: "144 MB", duration: "1:02", version: 1 },
      { name: "yoga_still_01.jpg", type: "image", size: "6.2 MB", version: 1 },
    ],
    feedbackHistory: [
      { from: "creator", date: "Jul 30, 2025", message: "Delivered all 4 stills and the 60s yoga flow reel. Soothing voiceover throughout.", version: 1 },
    ]
  },
  {
    id: "s6",
    campaign: "App Review & Feature Walkthrough",
    brand: "TechFlow",
    brandLogo: "TF",
    campaignImage: "/slide-1.png",
    submittedDate: "",
    status: "draft",
    payment: "$300.00",
    contentType: "Screen Record Review",
    notes: "",
    files: [],
    feedbackHistory: []
  },
];

/* ── Status Config ── */
const statusConfig: Record<SubmissionStatus, { label: string; pillClass: string; icon: React.ReactNode; color: string }> = {
  draft:              { label: "Draft",              pillClass: "pill-gray",  icon: <Pencil style={{ width: 11, height: 11 }} />,       color: "#94a3b8" },
  submitted:          { label: "Submitted",          pillClass: "pill-blue",  icon: <Send style={{ width: 11, height: 11 }} />,          color: "#38bdf8" },
  under_review:       { label: "Under Review",       pillClass: "pill-amber", icon: <Clock style={{ width: 11, height: 11 }} />,         color: "#f59e0b" },
  revision_requested: { label: "Revision Requested", pillClass: "pill-red",   icon: <AlertCircle style={{ width: 11, height: 11 }} />,   color: "#ef4444" },
  approved:           { label: "Approved",           pillClass: "pill-green", icon: <CheckCircle2 style={{ width: 11, height: 11 }} />,  color: "#10b981" },
  rejected:           { label: "Rejected",           pillClass: "pill-red",   icon: <XCircle style={{ width: 11, height: 11 }} />,       color: "#ef4444" },
};

const fileIcon = (type: UploadedFile["type"]) => {
  if (type === "video") return <FileVideo style={{ width: 16, height: 16, color: "#0284c7" }} />;
  if (type === "image") return <FileImage style={{ width: 16, height: 16, color: "#8b5cf6" }} />;
  return <FileText style={{ width: 16, height: 16, color: "#10b981" }} />;
};

/* ── Component ── */
export default function SubmissionsPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
  const [activeTab, setActiveTab] = useState<"files" | "feedback" | "resubmit">("files");
  const [resubmitNote, setResubmitNote] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reviseFileRef = useRef<HTMLInputElement>(null);
  const [revisedFile, setRevisedFile] = useState<File | null>(null);
  const [isReviseDragging, setIsReviseDragging] = useState(false);

  const filtered = filterStatus === "all"
    ? mockSubmissions
    : mockSubmissions.filter(s => s.status === filterStatus);

  const filterTabs = [
    { id: "all", label: "All" },
    { id: "draft", label: "Draft" },
    { id: "submitted", label: "Submitted" },
    { id: "under_review", label: "Under Review" },
    { id: "revision_requested", label: "Revision Requested" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
  ];

  return (
    <DashLayout title="My Submissions">
      <PageHeader
        title="Content Submissions"
        subtitle="Track your submitted content, review brand feedback, and manage revisions."
      />

      {/* ── Filter Tabs ── */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {filterTabs.map(tab => {
          const active = filterStatus === tab.id;
          const count = tab.id === "all"
            ? mockSubmissions.length
            : mockSubmissions.filter(s => s.status === tab.id).length;

          return (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              style={{
                padding: "7px 16px", borderRadius: 999,
                background: active ? "#0284c7" : "var(--surface)",
                border: `1px solid ${active ? "#0284c7" : "var(--border-strong)"}`,
                color: active ? "#fff" : "var(--text-muted)",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                fontFamily: "inherit", transition: "all 0.15s",
                boxShadow: active ? "0 4px 12px rgba(2,132,199,0.25)" : "none",
                display: "flex", alignItems: "center", gap: 6
              }}
            >
              {tab.label}
              <span style={{
                background: active ? "rgba(255,255,255,0.2)" : "var(--surface-subtle)",
                color: active ? "#fff" : "var(--text-subtle)",
                fontSize: 11, fontWeight: 700,
                padding: "1px 7px", borderRadius: 99, minWidth: 20, textAlign: "center"
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Submissions List ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-subtle)", fontSize: 14 }}>
            No submissions for this filter.
          </div>
        ) : (
          filtered.map(s => {
            const cfg = statusConfig[s.status];
            const hasRevision = s.status === "revision_requested";

            return (
              <div
                key={s.id}
                className="card"
                style={{
                  padding: "20px 24px",
                  display: "flex", alignItems: "center", gap: 20,
                  borderRadius: 16,
                  transition: "box-shadow 0.15s"
                }}
              >
                {/* Thumbnail */}
                <div style={{ position: "relative", width: 52, height: 52, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                  <Image src={s.campaignImage} alt={s.campaign} fill style={{ objectFit: "cover" }} />
                </div>

                {/* Campaign Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 15, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {s.campaign}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 18, height: 18, borderRadius: 5, background: "#0284c7", color: "#fff", fontWeight: 800, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {s.brandLogo}
                      </div>
                      <span style={{ color: "var(--text-subtle)", fontSize: 12, fontWeight: 600 }}>{s.brand}</span>
                    </div>
                    <span style={{ color: "var(--border-strong)", fontSize: 12 }}>·</span>
                    <span style={{ color: "var(--text-subtle)", fontSize: 12 }}>{s.contentType}</span>
                    {s.submittedDate && (
                      <>
                        <span style={{ color: "var(--border-strong)", fontSize: 12 }}>·</span>
                        <span style={{ color: "var(--text-subtle)", fontSize: 12 }}>{s.submittedDate}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Payment */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ color: "#10b981", fontWeight: 800, fontSize: 16 }}>{s.payment}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>
                    {s.files.length} file{s.files.length !== 1 ? "s" : ""}
                  </div>
                </div>

                {/* Status */}
                <div style={{ flexShrink: 0, minWidth: 130, textAlign: "center" }}>
                  <span className={`pill ${cfg.pillClass}`} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                    {cfg.icon} {cfg.label}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <button
                    onClick={() => { setSelectedSub(s); setActiveTab("files"); }}
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <Eye style={{ width: 13, height: 13 }} /> View
                  </button>
                  {hasRevision && (
                    <button
                      onClick={() => { setSelectedSub(s); setActiveTab("resubmit"); }}
                      style={{
                        fontSize: 12, display: "flex", alignItems: "center", gap: 5,
                        padding: "7px 13px", borderRadius: 9,
                        background: "rgba(239,68,68,0.08)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        color: "#ef4444", fontWeight: 600,
                        cursor: "pointer", fontFamily: "inherit"
                      }}
                    >
                      <RotateCcw style={{ width: 13, height: 13 }} /> Revise
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── DETAIL DRAWER ── */}
      {selectedSub && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)",
          display: "flex", justifyContent: "flex-end"
        }}>
          <div style={{
            width: "100%", maxWidth: 620, height: "100vh",
            background: "var(--bg)", borderLeft: "1px solid var(--border-strong)",
            display: "flex", flexDirection: "column",
            boxShadow: "-20px 0 60px rgba(0,0,0,0.3)"
          }}>

            {/* Drawer Header */}
            <div style={{
              padding: "22px 28px",
              background: "var(--surface)", borderBottom: "1px solid var(--border-strong)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexShrink: 0
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ position: "relative", width: 42, height: 42, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                  <Image src={selectedSub.campaignImage} alt={selectedSub.campaign} fill style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 600 }}>{selectedSub.brand}</div>
                  <h2 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, margin: "2px 0 0" }}>{selectedSub.campaign}</h2>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className={`pill ${statusConfig[selectedSub.status].pillClass}`} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                  {statusConfig[selectedSub.status].icon} {statusConfig[selectedSub.status].label}
                </span>
                <button
                  onClick={() => setSelectedSub(null)}
                  style={{ width: 32, height: 32, borderRadius: 9, background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", color: "var(--text)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <X style={{ width: 16, height: 16 }} />
                </button>
              </div>
            </div>

            {/* Payment + date strip */}
            <div style={{ padding: "16px 28px", display: "flex", gap: 12, borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
              <div style={{ flex: 1, padding: "12px 16px", borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div style={{ color: "var(--text-subtle)", fontSize: 10, fontWeight: 600, marginBottom: 3 }}>Payment</div>
                <div style={{ color: "#10b981", fontWeight: 800, fontSize: 16 }}>{selectedSub.payment}</div>
              </div>
              <div style={{ flex: 1, padding: "12px 16px", borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div style={{ color: "var(--text-subtle)", fontSize: 10, fontWeight: 600, marginBottom: 3 }}>Content Type</div>
                <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{selectedSub.contentType}</div>
              </div>
              <div style={{ flex: 1, padding: "12px 16px", borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div style={{ color: "var(--text-subtle)", fontSize: 10, fontWeight: 600, marginBottom: 3 }}>Submitted</div>
                <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{selectedSub.submittedDate || "—"}</div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ padding: "0 28px", display: "flex", gap: 2, borderBottom: "1px solid var(--border-strong)", flexShrink: 0 }}>
              {([
                { key: "files", label: "Files", icon: <FileText style={{ width: 13, height: 13 }} /> },
                { key: "feedback", label: "Feedback", icon: <MessageSquare style={{ width: 13, height: 13 }} /> },
                ...(selectedSub.status === "revision_requested"
                  ? [{ key: "resubmit", label: "Upload Revision", icon: <Upload style={{ width: 13, height: 13 }} /> }]
                  : [])
              ] as { key: string; label: string; icon: React.ReactNode }[]).map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  style={{
                    padding: "13px 16px", background: "none", border: "none",
                    borderBottom: `2px solid ${activeTab === tab.key ? "#0284c7" : "transparent"}`,
                    color: activeTab === tab.key ? "#0284c7" : "var(--text-subtle)",
                    fontWeight: 700, fontSize: 13, cursor: "pointer",
                    fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6,
                    transition: "all 0.15s", marginBottom: -1
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Scrollable Tab Content */}
            <div style={{ overflowY: "auto", flex: 1, padding: "28px" }}>

              {/* FILES TAB */}
              {activeTab === "files" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {selectedSub.notes && (
                    <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(2,132,199,0.06)", border: "1px solid rgba(2,132,199,0.18)" }}>
                      <div style={{ color: "#0284c7", fontSize: 11, fontWeight: 700, marginBottom: 5 }}>Submission Notes</div>
                      <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{selectedSub.notes}</p>
                    </div>
                  )}

                  {selectedSub.files.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-subtle)", fontSize: 13 }}>No files uploaded yet.</div>
                  ) : (
                    selectedSub.files.map((file, idx) => (
                      <div key={idx} style={{
                        padding: "14px 16px", borderRadius: 14,
                        background: "var(--surface)", border: "1px solid var(--border-strong)",
                        display: "flex", alignItems: "center", justifyContent: "space-between"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--surface-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {fileIcon(file.type)}
                          </div>
                          <div>
                            <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 13 }}>{file.name}</div>
                            <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>
                              {file.size}{file.duration && ` · ${file.duration}`} · v{file.version}
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-ghost btn-sm" style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}>
                          <Download style={{ width: 13, height: 13 }} /> Download
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* FEEDBACK TAB */}
              {activeTab === "feedback" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {selectedSub.feedbackHistory.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-subtle)", fontSize: 13 }}>No feedback yet.</div>
                  ) : (
                    selectedSub.feedbackHistory.map((entry, idx) => (
                      <div key={idx} style={{ display: "flex", gap: 12 }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                          background: entry.from === "brand" ? "#0284c7" : "#10b981",
                          color: "#fff", fontWeight: 800, fontSize: 11,
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                          {entry.from === "brand" ? selectedSub.brandLogo : "ME"}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>
                              {entry.from === "brand" ? selectedSub.brand : "You"}
                            </span>
                            {entry.version && (
                              <span style={{ fontSize: 10, fontWeight: 700, background: "rgba(2,132,199,0.1)", color: "#0284c7", padding: "2px 7px", borderRadius: 99 }}>
                                v{entry.version}
                              </span>
                            )}
                            <span style={{ color: "var(--text-subtle)", fontSize: 11 }}>{entry.date}</span>
                          </div>
                          <div style={{
                            padding: "12px 14px", borderRadius: 12,
                            background: entry.from === "brand" ? "var(--surface)" : "rgba(2,132,199,0.06)",
                            border: `1px solid ${entry.from === "brand" ? "var(--border-strong)" : "rgba(2,132,199,0.2)"}`,
                            color: "var(--text-muted)", fontSize: 13, lineHeight: 1.65
                          }}>
                            {entry.message}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* RESUBMIT TAB */}
              {activeTab === "resubmit" && selectedSub.status === "revision_requested" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <div style={{ color: "#ef4444", fontSize: 11, fontWeight: 700, marginBottom: 5, display: "flex", alignItems: "center", gap: 5 }}>
                      <AlertCircle style={{ width: 13, height: 13 }} /> Revision Requested by {selectedSub.brand}
                    </div>
                    <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                      {[...selectedSub.feedbackHistory].reverse().find(f => f.from === "brand")?.message}
                    </p>
                  </div>

                  {/* File Upload Drop Zone */}
                  <div>
                    <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                      Upload Revised File
                    </label>
                    <input
                      ref={reviseFileRef}
                      type="file"
                      accept="video/*,image/*"
                      style={{ display: "none" }}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const f = e.target.files?.[0] ?? null;
                        setRevisedFile(f);
                      }}
                    />
                    <div
                      onClick={() => reviseFileRef.current?.click()}
                      onDragOver={(e: DragEvent) => { e.preventDefault(); setIsReviseDragging(true); }}
                      onDragLeave={() => setIsReviseDragging(false)}
                      onDrop={(e: DragEvent) => {
                        e.preventDefault();
                        setIsReviseDragging(false);
                        const f = e.dataTransfer.files?.[0] ?? null;
                        setRevisedFile(f);
                      }}
                      style={{
                        borderRadius: 14, border: `2px dashed ${isReviseDragging ? "#0284c7" : revisedFile ? "#10b981" : "var(--border-strong)"}`,
                        background: isReviseDragging ? "rgba(2,132,199,0.05)" : revisedFile ? "rgba(16,185,129,0.05)" : "var(--surface-subtle)",
                        padding: "28px 20px", textAlign: "center", cursor: "pointer",
                        transition: "all 0.15s"
                      }}
                    >
                      {revisedFile ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                          <CheckCircle2 style={{ width: 28, height: 28, color: "#10b981" }} />
                          <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{revisedFile.name}</div>
                          <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{(revisedFile.size / (1024 * 1024)).toFixed(1)} MB · Click to change</div>
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                          <Upload style={{ width: 28, height: 28, color: "var(--text-subtle)" }} />
                          <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>Drop your revised file here</div>
                          <div style={{ color: "var(--text-subtle)", fontSize: 12 }}>or click to browse · MP4, MOV, JPG, PNG supported</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                      What did you change?
                    </label>
                    <textarea
                      className="input"
                      rows={3}
                      placeholder="Briefly describe what you updated based on the brand's feedback..."
                      value={resubmitNote}
                      onChange={e => setResubmitNote(e.target.value)}
                      style={{ resize: "none" }}
                    />
                  </div>

                  <div style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}>
                    <div style={{ color: "#10b981", fontSize: 12, fontWeight: 700 }}>Escrow Protected</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>
                      {selectedSub.payment} is held safely and released on brand approval.
                    </div>
                  </div>

                  <button
                    onClick={() => { alert("Revised version submitted!"); setSelectedSub(null); }}
                    className="btn btn-primary"
                    style={{ height: 44, borderRadius: 12, fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                  >
                    <Upload style={{ width: 16, height: 16 }} /> Submit Revised Version
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
