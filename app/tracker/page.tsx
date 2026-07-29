"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  CheckSquare, Clock, DollarSign, CheckCircle2, AlertCircle, Upload,
  Sparkles, ChevronRight, FileText, ArrowRight, ShieldCheck, PlayCircle
} from "lucide-react";

interface CampaignTask {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  targetTime: string;
  countdown: string;
  rewardAmount: string;
  status: "completed" | "in_progress" | "pending" | "upcoming";
  completedAt?: string;
  instructions: string[];
}

const INITIAL_TASKS: CampaignTask[] = [
  {
    id: "T-101",
    stepNumber: 1,
    title: "Script & Visual Storyboard Submission",
    description: "Submit 30-second reel hook script & 3 camera angles storyboard.",
    targetTime: "Target Due: 11:00 AM Today",
    countdown: "Completed",
    rewardAmount: "+$75.00",
    status: "completed",
    completedAt: "Completed today at 10:45 AM",
    instructions: [
      "Include hook variation in first 3 seconds",
      "List lighting angles (natural window light)",
      "Specify product callouts"
    ]
  },
  {
    id: "T-102",
    stepNumber: 2,
    title: "Raw Footage B-Roll & Product Shoot",
    description: "Record 4K 60fps raw footage of unboxing and skincare texture closeup.",
    targetTime: "Target Due: 4:00 PM Today",
    countdown: "2h 15m remaining",
    rewardAmount: "+$125.00",
    status: "in_progress",
    instructions: [
      "Record 3 texture closeup shots",
      "Natural lighting, no artificial filters",
      "Keep raw audio clear without background noise"
    ]
  },
  {
    id: "T-103",
    stepNumber: 3,
    title: "First Draft Edit Cut & Captions",
    description: "Assemble 9:16 vertical video edit with animated captions and voiceover.",
    targetTime: "Target Due: 10:00 PM Today",
    countdown: "8h 15m remaining",
    rewardAmount: "+$150.00",
    status: "pending",
    instructions: [
      "9:16 vertical aspect ratio required",
      "Add bold center-aligned captions",
      "Include brand call-to-action button overlay"
    ]
  },
  {
    id: "T-104",
    stepNumber: 4,
    title: "Final Brand Revision Clearance",
    description: "Final review by GlowBrand team for payout release into escrow.",
    targetTime: "Target Due: 12:00 PM Tomorrow",
    countdown: "Tomorrow",
    rewardAmount: "+$100.00",
    status: "upcoming",
    instructions: [
      "Review client notes if revision requested",
      "Export high-bitrate MP4 file",
      "Instant payout clearance upon approval"
    ]
  }
];

export default function CampaignTrackerPage() {
  const [tasks, setTasks] = useState<CampaignTask[]>(INITIAL_TASKS);
  const [selectedCampaign, setSelectedCampaign] = useState("C-101");

  const completedCount = tasks.filter(t => t.status === "completed").length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const markTaskComplete = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        status: "completed",
        countdown: "Completed",
        completedAt: `Completed today at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      };
    }));
  };

  return (
    <DashLayout title="Daily Campaign Tracker">
      <PageHeader
        title="Daily Campaign Progress & Task Tracker"
        subtitle="Track daily task deadlines, target completion times, and cash rewards for each active campaign milestone."
        action={
          <div style={{ display: "flex", gap: 10 }}>
            <select
              value={selectedCampaign}
              onChange={e => setSelectedCampaign(e.target.value)}
              className="input"
              style={{ fontSize: 13, padding: "8px 14px", minWidth: 260, borderRadius: 12 }}
            >
              <option value="C-101">Summer Skincare Video Ad ($450 Total)</option>
              <option value="C-102">Tech Headphones Review ($400 Total)</option>
              <option value="C-103">Protein Powder Recipe Reel ($350 Total)</option>
            </select>
          </div>
        }
      />

      {/* ── OVERALL CAMPAIGN PROGRESS BANNER ── */}
      <div className="card" style={{ padding: "26px", borderRadius: 22, background: "linear-gradient(135deg, rgba(2,132,199,0.12) 0%, rgba(16,185,129,0.08) 100%)", border: "1px solid rgba(2,132,199,0.3)", marginBottom: 28 }}>
        <div className="grid-responsive-2col" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(2,132,199,0.15)", border: "1px solid rgba(2,132,199,0.3)", borderRadius: 999, padding: "4px 12px", fontSize: 11, fontWeight: 800, color: "#0284c7", marginBottom: 12 }}>
              <Clock style={{ width: 13, height: 13 }} /> ACTIVE CAMPAIGN TRACKER
            </div>
            <h2 style={{ color: "var(--text)", fontWeight: 900, fontSize: 24, letterSpacing: "-0.03em", marginBottom: 8, lineHeight: 1.2 }}>
              Summer Skincare UGC Video Ad
            </h2>
            <p style={{ color: "var(--text-subtle)", fontSize: 13, marginBottom: 16 }}>
              Client: <strong>GlowBrand Team</strong> · Deadline: August 5, 2025 · 4 Daily Milestones
            </p>

            {/* Overall Progress Bar */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                <span style={{ color: "var(--text)" }}>Overall Milestone Completion</span>
                <span style={{ color: "#0284c7" }}>{completedCount} of {tasks.length} Completed ({progressPercent}%)</span>
              </div>
              <div style={{ height: 10, background: "var(--surface-subtle)", borderRadius: 999, overflow: "hidden", border: "1px solid var(--border)" }}>
                <div style={{ height: "100%", width: `${progressPercent}%`, background: "linear-gradient(90deg, #0284c7, #10b981)", borderRadius: 999, transition: "width 0.3s ease" }} />
              </div>
            </div>
          </div>

          {/* Reward Stats Box */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, background: "var(--surface)", padding: "18px", borderRadius: 16, border: "1px solid var(--border-strong)" }}>
            <div>
              <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>TOTAL BUDGET REWARD</div>
              <div style={{ color: "var(--text)", fontWeight: 900, fontSize: 22, marginTop: 4 }}>$450.00</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>4 Cash Milestones</div>
            </div>
            <div>
              <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>EARNED SO FAR</div>
              <div style={{ color: "#10b981", fontWeight: 900, fontSize: 22, marginTop: 4 }}>+$75.00</div>
              <div style={{ color: "#10b981", fontSize: 11, fontWeight: 600, marginTop: 2 }}>Task 1 Paid</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DAILY TASK MILESTONE TIMELINE CARDS ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, marginBottom: 4 }}>
          Daily Task Timeline & Target Times
        </div>

        {tasks.map(task => {
          const isCompleted = task.status === "completed";
          const isInProgress = task.status === "in_progress";

          return (
            <div
              key={task.id}
              className="card card-lift"
              style={{
                padding: "24px", borderRadius: 20,
                borderLeft: `5px solid ${isCompleted ? "#10b981" : isInProgress ? "#0284c7" : "var(--border-strong)"}`,
                background: isCompleted ? "rgba(16,185,129,0.03)" : "var(--surface)"
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: isCompleted ? "#10b981" : isInProgress ? "#0284c7" : "var(--surface-subtle)",
                    border: `1px solid ${isCompleted ? "#10b981" : isInProgress ? "#0284c7" : "var(--border-strong)"}`,
                    color: isCompleted || isInProgress ? "#fff" : "var(--text-subtle)",
                    fontWeight: 900, fontSize: 16,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}>
                    {isCompleted ? <CheckCircle2 style={{ width: 20, height: 20 }} /> : task.stepNumber}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, margin: 0 }}>{task.title}</h3>
                      <span className={`pill ${isCompleted ? "pill-green" : isInProgress ? "pill-blue" : "pill-gray"}`} style={{ fontSize: 11 }}>
                        {isCompleted ? "Completed" : isInProgress ? "In Progress" : task.status === "pending" ? "Pending Submission" : "Upcoming"}
                      </span>
                    </div>
                    <p style={{ color: "var(--text-subtle)", fontSize: 13, margin: "3px 0 0" }}>{task.description}</p>
                  </div>
                </div>

                {/* Reward Amount Badge */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ color: isCompleted ? "#10b981" : "#0284c7", fontWeight: 900, fontSize: 18 }}>{task.rewardAmount}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 500 }}>Milestone Reward</div>
                </div>
              </div>

              {/* Guidelines Checklist */}
              <div style={{ padding: "12px 14px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border)", marginBottom: 16 }}>
                <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", marginBottom: 6 }}>TASK INSTRUCTIONS & GUIDELINES:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {task.instructions.map((inst, idx) => (
                    <div key={idx} style={{ color: "var(--text-muted)", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "#0284c7", fontWeight: 900 }}>•</span> {inst}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Footer: Target Time + Action Button */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: isCompleted ? "#10b981" : isInProgress ? "#0284c7" : "var(--text-subtle)", fontWeight: 700 }}>
                  <Clock style={{ width: 14, height: 14 }} />
                  <span>{task.targetTime}</span>
                  <span style={{ color: "var(--text-subtle)", fontWeight: 400 }}>({task.completedAt || task.countdown})</span>
                </div>

                <div>
                  {isCompleted ? (
                    <span style={{ color: "#10b981", fontSize: 12, fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <CheckCircle2 style={{ width: 14, height: 14 }} /> Milestone Completed & Paid
                    </span>
                  ) : isInProgress ? (
                    <button
                      onClick={() => markTaskComplete(task.id)}
                      className="btn btn-primary"
                      style={{ padding: "8px 18px", fontSize: 13, borderRadius: 12 }}
                    >
                      <Upload style={{ width: 14, height: 14 }} /> Submit & Complete Task
                    </button>
                  ) : (
                    <button
                      onClick={() => markTaskComplete(task.id)}
                      className="btn btn-ghost"
                      style={{ padding: "8px 16px", fontSize: 12, borderRadius: 12 }}
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashLayout>
  );
}
