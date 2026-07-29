"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  Sparkles, Copy, Check, Video, RefreshCw, FileText, Wand2, Lightbulb, PlayCircle, ArrowRight
} from "lucide-react";

interface ScriptOutput {
  hooks: string[];
  script: { timestamp: string; section: string; visual: string; audio: string }[];
}

export default function AIAssistantPage() {
  const [productName, setProductName] = useState("Vitamin C Glow Serum");
  const [niche, setNiche] = useState("Beauty & Skincare");
  const [angle, setAngle] = useState("Problem / Solution");
  const [generating, setGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [output, setOutput] = useState<ScriptOutput>({
    hooks: [
      "Stop scrolling if your skin feels dry and dull by 2 PM every day!",
      "I tested 10 different Vitamin C serums so you don't have to...",
      "The $30 skincare secret dermatologists don't want you to know.",
      "If you're still applying serum with dry hands, you're doing it wrong!",
      "POV: You finally found the serum that clears hyperpigmentation in 14 days."
    ],
    script: [
      { timestamp: "0:00 - 0:03", section: "Viral Hook", visual: "Close-up of face looking at camera, holding serum bottle in window daylight.", audio: "If your skin feels dry and dull by 2 PM, you need to hear this right now." },
      { timestamp: "0:03 - 0:10", section: "Problem Callout", visual: "Show texture closeup of dry skin, gesturing to forehead.", audio: "I used to struggle with flaky foundation and dark spots no matter how much moisturizer I used." },
      { timestamp: "0:10 - 0:20", section: "Product Solution", visual: "Dispense 3 drops of Glow Serum onto palm. Smooth texture onto cheekbones.", audio: "Then I switched to GlowBrand's Vitamin C Serum. It's super lightweight and absorbs in under 5 seconds." },
      { timestamp: "0:20 - 0:30", section: "Call to Action", visual: "Smile at camera with glowing skin. Hold up bottle next to face with GLOW20 code overlay.", audio: "Grab yours today with code GLOW20 for 20% off before it sells out again!" },
    ]
  });

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
    }, 1200);
  };

  const copyHook = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <DashLayout title="AI Script Assistant">
      <PageHeader
        title="AI Script & Hook Generator"
        subtitle="Generate viral 3-second TikTok hooks, video script outlines, and visual shot checklists in seconds."
      />

      <div className="grid-responsive-2col" style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 24, alignItems: "start" }}>

        {/* LEFT COLUMN: INPUT CONTROLS */}
        <div className="card" style={{ padding: "24px", borderRadius: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <Wand2 style={{ width: 18, height: 18, color: "#0284c7" }} />
            <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, margin: 0 }}>Script Generator Input</h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Product / Brand Name</label>
              <input
                value={productName}
                onChange={e => setProductName(e.target.value)}
                className="input"
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Niche & Category</label>
              <select
                value={niche}
                onChange={e => setNiche(e.target.value)}
                className="input"
                style={{ width: "100%" }}
              >
                <option value="Beauty & Skincare">Beauty & Skincare</option>
                <option value="Consumer Tech">Consumer Tech</option>
                <option value="Fitness & Nutrition">Fitness & Nutrition</option>
                <option value="Fashion & Apparel">Fashion & Apparel</option>
                <option value="Home & Lifestyle">Home & Lifestyle</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Creative Marketing Angle</label>
              <select
                value={angle}
                onChange={e => setAngle(e.target.value)}
                className="input"
                style={{ width: "100%" }}
              >
                <option value="Problem / Solution">Problem / Solution</option>
                <option value="Unboxing & First Impression">Unboxing & First Impression</option>
                <option value="Before & After Transformation">Before & After Transformation</option>
                <option value="POV / Storytelling">POV / Storytelling</option>
                <option value="Honest Product Review">Honest Product Review</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="btn btn-primary"
              style={{ width: "100%", padding: "12px", borderRadius: 12, marginTop: 8, fontSize: 13, fontWeight: 700 }}
            >
              {generating ? (
                <>
                  <RefreshCw style={{ width: 15, height: 15, animation: "spin 1s linear infinite" }} /> Generating AI Script...
                </>
              ) : (
                <>
                  <Sparkles style={{ width: 15, height: 15 }} /> Generate Viral Script & Hooks
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: GENERATED HOOKS & SCRIPT OUTLINE */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          
          {/* 1. VIRAL HOOKS BOX */}
          <div className="card" style={{ padding: "24px", borderRadius: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Lightbulb style={{ width: 18, height: 18, color: "#f59e0b" }} />
                <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, margin: 0 }}>Generated 3-Second Viral Hooks</h3>
              </div>
              <span className="pill pill-amber">Top Converting</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {output.hooks.map((hook, idx) => (
                <div key={idx} style={{ padding: "12px 14px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <span style={{ color: "var(--text)", fontSize: 13, fontWeight: 600 }}>“{hook}”</span>
                  <button
                    onClick={() => copyHook(hook, idx)}
                    className="btn btn-ghost btn-sm"
                    style={{ flexShrink: 0, fontSize: 11 }}
                  >
                    {copiedIndex === idx ? <Check style={{ width: 13, height: 13, color: "#10b981" }} /> : <Copy style={{ width: 13, height: 13 }} />}
                    {copiedIndex === idx ? "Copied" : "Copy Hook"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 2. FULL 30s VIDEO SCRIPT OUTLINE */}
          <div className="card" style={{ padding: "24px", borderRadius: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Video style={{ width: 18, height: 18, color: "#0284c7" }} />
                <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, margin: 0 }}>Full 30-Second Video Script Breakdown</h3>
              </div>
              <span className="pill pill-blue">Ready for Filming</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {output.script.map((step, idx) => (
                <div key={idx} style={{ padding: "16px", borderRadius: 14, background: "var(--surface-subtle)", border: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ color: "#0284c7", fontWeight: 800, fontSize: 12 }}>{step.timestamp} • {step.section}</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
                    <div>
                      <strong style={{ color: "var(--text-subtle)" }}>VISUAL SHOT: </strong>
                      <span style={{ color: "var(--text-muted)" }}>{step.visual}</span>
                    </div>
                    <div>
                      <strong style={{ color: "var(--text-subtle)" }}>VOICEOVER COPY: </strong>
                      <span style={{ color: "var(--text)", fontWeight: 700 }}>“{step.audio}”</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </DashLayout>
  );
}
