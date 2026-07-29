"use client";

import { useState, type ChangeEvent } from "react";
import DashLayout, { PageHeader, SectionCard, Field } from "@/components/DashLayout";
import {
  Plus, Edit3, Trash2, X, Check, Save, Crown, Star, Zap,
  ToggleLeft, ToggleRight, ChevronDown, ChevronUp, GripVertical
} from "lucide-react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface Plan {
  id: string;
  name: string;
  slug: string;
  user_type: "creator" | "brand";
  price_monthly: number;
  price_yearly: number | null;
  description: string;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
}

/* ─────────────────────────────────────────────
   SEED DATA
───────────────────────────────────────────── */
const INITIAL_PLANS: Plan[] = [
  { id: "1", name: "Free",       slug: "creator_free",  user_type: "creator", price_monthly: 0,   price_yearly: null, description: "Get started at no cost.", features: ["Apply to 2 campaigns/month","Basic analytics","Community support","Standard payout (weekly)"], is_popular: false, is_active: true, sort_order: 1 },
  { id: "2", name: "Pro",        slug: "creator_pro",   user_type: "creator", price_monthly: 29,  price_yearly: 290,  description: "For active creators serious about UGC income.", features: ["Apply to 20 campaigns/month","Priority campaign matching","Advanced analytics","Faster payout (3 days)","Pro profile badge"], is_popular: true,  is_active: true, sort_order: 2 },
  { id: "3", name: "Elite",      slug: "creator_elite", user_type: "creator", price_monthly: 79,  price_yearly: 790,  description: "For top creators scaling their content business.", features: ["Unlimited campaigns","Dedicated account manager","Real-time analytics","Same-day payout","Elite badge + priority listing","Early access to premium brands"], is_popular: false, is_active: true, sort_order: 3 },
  { id: "4", name: "Starter",    slug: "brand_starter", user_type: "brand",   price_monthly: 99,  price_yearly: 990,  description: "Launch your first UGC campaigns.", features: ["3 active campaigns","Up to 15 creator slots","Basic analytics","Email support"], is_popular: false, is_active: true, sort_order: 1 },
  { id: "5", name: "Growth",     slug: "brand_growth",  user_type: "brand",   price_monthly: 299, price_yearly: 2990, description: "Scale your content production.", features: ["15 active campaigns","Up to 50 creator slots","Advanced analytics","Priority support","Featured brand listing","Custom brief templates"], is_popular: true,  is_active: true, sort_order: 2 },
  { id: "6", name: "Enterprise", slug: "brand_enterprise", user_type: "brand", price_monthly: 999, price_yearly: 9990, description: "Full-scale UGC operations.", features: ["Unlimited campaigns","Unlimited creator slots","White-glove onboarding","Dedicated account manager","Custom integrations","SLA guarantee","Invoiced billing"], is_popular: false, is_active: true, sort_order: 3 },
];

const PLAN_COLORS: Record<string, string> = { Free: "#64748b", Starter: "#64748b", Pro: "#0284c7", Growth: "#0284c7", Elite: "#f59e0b", Enterprise: "#8b5cf6" };
const PLAN_ICONS: Record<string, typeof Zap> = { Free: Zap, Starter: Zap, Pro: Star, Growth: Star, Elite: Crown, Enterprise: Crown };

/* ─────────────────────────────────────────────
   PLAN EDIT DRAWER
───────────────────────────────────────────── */
function PlanDrawer({ plan, onClose, onSave }: { plan: Plan | null; onClose: () => void; onSave: (p: Plan) => void }) {
  const isNew = !plan?.id || plan.id === "__new__";
  const [form, setForm] = useState<Plan>(plan || {
    id: "__new__", name: "", slug: "", user_type: "creator",
    price_monthly: 0, price_yearly: null, description: "",
    features: [""], is_popular: false, is_active: true, sort_order: 99
  });
  const [newFeature, setNewFeature] = useState("");

  const set = (k: keyof Plan, v: unknown) => setForm(p => ({ ...p, [k]: v }));

  const addFeature = () => {
    if (newFeature.trim()) { set("features", [...form.features, newFeature.trim()]); setNewFeature(""); }
  };
  const removeFeature = (i: number) => set("features", form.features.filter((_, idx) => idx !== i));

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex" }}>
      <div style={{ flex: 1, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }} onClick={onClose} />
      <div style={{ width: 520, background: "var(--sidebar-bg)", borderLeft: "1px solid var(--border-strong)", overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ padding: "24px 28px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "var(--sidebar-bg)", zIndex: 2 }}>
          <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 17 }}>{isNew ? "New Plan" : `Edit — ${form.name}`}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer" }}><X style={{ width: 18, height: 18 }} /></button>
        </div>

        <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>

          {/* User Type */}
          <div>
            <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>PLAN FOR</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {(["creator", "brand"] as const).map(t => (
                <button key={t} onClick={() => set("user_type", t)} style={{ padding: "10px", borderRadius: 10, background: form.user_type === t ? "rgba(2,132,199,0.1)" : "var(--surface-subtle)", border: `1.5px solid ${form.user_type === t ? "#0284c7" : "var(--border-strong)"}`, color: form.user_type === t ? "#0284c7" : "var(--text-muted)", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize", transition: "all 0.15s" }}>
                  {t === "creator" ? "Creator" : "Brand"}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="PLAN NAME">
              <input className="input" value={form.name} onChange={(e: ChangeEvent<HTMLInputElement>) => set("name", e.target.value)} placeholder="e.g. Pro" />
            </Field>
            <Field label="SLUG (unique)">
              <input className="input" value={form.slug} onChange={(e: ChangeEvent<HTMLInputElement>) => set("slug", e.target.value)} placeholder="e.g. creator_pro" style={{ fontFamily: "monospace", fontSize: 13 }} />
            </Field>
          </div>

          <Field label="DESCRIPTION">
            <textarea className="input" rows={2} style={{ resize: "none" }} value={form.description} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set("description", e.target.value)} />
          </Field>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="MONTHLY PRICE (USD)">
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-subtle)", fontSize: 14 }}>$</span>
                <input className="input" type="number" style={{ paddingLeft: 26 }} value={form.price_monthly} onChange={(e: ChangeEvent<HTMLInputElement>) => set("price_monthly", Number(e.target.value))} />
              </div>
            </Field>
            <Field label="YEARLY PRICE (USD)" hint="Leave blank if not offered">
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-subtle)", fontSize: 14 }}>$</span>
                <input className="input" type="number" style={{ paddingLeft: 26 }} value={form.price_yearly ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => set("price_yearly", e.target.value === "" ? null : Number(e.target.value))} />
              </div>
            </Field>
          </div>

          {/* Toggles */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { key: "is_popular", label: "Mark as Popular", sub: "Shows 'Most Popular' badge on this plan" },
              { key: "is_active",  label: "Active / Visible", sub: "Inactive plans are hidden from users" },
            ].map(toggle => (
              <label key={toggle.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border)", cursor: "pointer" }}>
                <div>
                  <div style={{ color: "var(--text)", fontSize: 13, fontWeight: 600 }}>{toggle.label}</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>{toggle.sub}</div>
                </div>
                <div onClick={() => set(toggle.key as keyof Plan, !(form[toggle.key as keyof Plan] as boolean))} style={{ width: 42, height: 22, borderRadius: 999, background: (form[toggle.key as keyof Plan] as boolean) ? "#0284c7" : "var(--progress-bg)", position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}>
                  <div style={{ position: "absolute", top: 2, left: (form[toggle.key as keyof Plan] as boolean) ? 22 : 2, width: 18, height: 18, borderRadius: 999, background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.25)" }} />
                </div>
              </label>
            ))}
          </div>

          {/* Features */}
          <div>
            <label style={{ display: "block", color: "var(--text-muted)", fontSize: 12, fontWeight: 700, marginBottom: 10 }}>FEATURES</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
              {form.features.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 10, background: "var(--surface-subtle)", border: "1px solid var(--border)" }}>
                  <GripVertical style={{ width: 13, height: 13, color: "var(--text-subtle)", flexShrink: 0 }} />
                  <Check style={{ width: 12, height: 12, color: "#0284c7", flexShrink: 0 }} />
                  <span style={{ flex: 1, color: "var(--text)", fontSize: 13 }}>{f}</span>
                  <button onClick={() => removeFeature(i)} style={{ background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer", padding: "2px", display: "flex", alignItems: "center" }}>
                    <X style={{ width: 12, height: 12 }} />
                  </button>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input className="input" value={newFeature} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewFeature(e.target.value)} placeholder="Add a feature…" onKeyDown={e => e.key === "Enter" && addFeature()} style={{ flex: 1, fontSize: 13 }} />
              <button onClick={addFeature} className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }}>
                <Plus style={{ width: 13, height: 13 }} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "20px 28px", borderTop: "1px solid var(--border)", display: "flex", gap: 10, position: "sticky", bottom: 0, background: "var(--sidebar-bg)" }}>
          <button onClick={onClose} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
          <button onClick={() => { onSave(form); onClose(); }} className="btn btn-primary" style={{ flex: 1 }}>
            <Save style={{ width: 14, height: 14 }} /> {isNew ? "Create Plan" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>(INITIAL_PLANS);
  const [editPlan, setEditPlan] = useState<Plan | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tab, setTab] = useState<"creator" | "brand">("creator");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = plans.filter(p => p.user_type === tab).sort((a, b) => a.sort_order - b.sort_order);

  const savePlan = (updated: Plan) => {
    if (updated.id === "__new__") {
      setPlans(p => [...p, { ...updated, id: String(Date.now()) }]);
    } else {
      setPlans(p => p.map(pl => pl.id === updated.id ? updated : pl));
    }
  };

  const deletePlan = (id: string) => {
    setPlans(p => p.filter(pl => pl.id !== id));
    setConfirmDelete(null);
  };

  const toggleActive = (id: string) => {
    setPlans(p => p.map(pl => pl.id === id ? { ...pl, is_active: !pl.is_active } : pl));
  };

  return (
    <DashLayout title="Admin – Plans">
      {drawerOpen && (
        <PlanDrawer plan={editPlan} onClose={() => { setDrawerOpen(false); setEditPlan(null); }} onSave={savePlan} />
      )}

      <PageHeader
        title="Subscription Plans"
        subtitle="Create, edit, and manage pricing plans for creators and brands."
        action={
          <button className="btn btn-primary btn-sm" onClick={() => { setEditPlan(null); setDrawerOpen(true); }}>
            <Plus style={{ width: 14, height: 14 }} /> New Plan
          </button>
        }
      />

      {/* Tab */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {(["creator", "brand"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "9px 20px", borderRadius: 10, background: tab === t ? "#0284c7" : "var(--surface-subtle)", border: `1.5px solid ${tab === t ? "#0284c7" : "var(--border-strong)"}`, color: tab === t ? "#fff" : "var(--text-muted)", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize", transition: "all 0.15s" }}>
            {t === "creator" ? "Creator Plans" : "Brand Plans"}
          </button>
        ))}
      </div>

      {/* Plan cards */}
      <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {filtered.map(plan => {
          const PIcon = PLAN_ICONS[plan.name] || Zap;
          const color = PLAN_COLORS[plan.name] || "#0284c7";
          return (
            <div key={plan.id} className="card card-lift" style={{ padding: "24px", borderRadius: 18, opacity: plan.is_active ? 1 : 0.55, position: "relative" }}>
              {plan.is_popular && (
                <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: color, color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 12px", borderRadius: 999, whiteSpace: "nowrap" }}>
                  Most Popular
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <PIcon style={{ width: 18, height: 18, color }} />
                  </div>
                  <div>
                    <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 15 }}>{plan.name}</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 11, fontFamily: "monospace" }}>{plan.slug}</div>
                  </div>
                </div>
                {!plan.is_active && <span className="pill pill-red" style={{ fontSize: 10 }}>Inactive</span>}
              </div>

              <div style={{ marginBottom: 14 }}>
                <span style={{ color, fontWeight: 900, fontSize: 28, letterSpacing: "-0.03em" }}>
                  {plan.price_monthly === 0 ? "Free" : `$${plan.price_monthly}`}
                </span>
                {plan.price_monthly > 0 && <span style={{ color: "var(--text-subtle)", fontSize: 12 }}>/mo</span>}
                {plan.price_yearly && (
                  <div style={{ color: "#10b981", fontSize: 11, fontWeight: 700 }}>or ${plan.price_yearly}/yr</div>
                )}
              </div>

              <p style={{ color: "var(--text-subtle)", fontSize: 12, lineHeight: 1.5, marginBottom: 14 }}>{plan.description}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 20 }}>
                {plan.features.slice(0, 4).map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                    <Check style={{ width: 11, height: 11, color, flexShrink: 0, marginTop: 2 }} />
                    <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{f}</span>
                  </div>
                ))}
                {plan.features.length > 4 && (
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, marginLeft: 18 }}>+{plan.features.length - 4} more features</div>
                )}
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1, fontSize: 12 }} onClick={() => { setEditPlan(plan); setDrawerOpen(true); }}>
                  <Edit3 style={{ width: 12, height: 12 }} /> Edit
                </button>
                <button onClick={() => toggleActive(plan.id)} className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>
                  {plan.is_active ? <ToggleRight style={{ width: 14, height: 14, color: "#10b981" }} /> : <ToggleLeft style={{ width: 14, height: 14, color: "var(--text-subtle)" }} />}
                </button>
                <button onClick={() => setConfirmDelete(plan.id)} className="btn btn-ghost btn-sm" style={{ fontSize: 12, color: "#ef4444", borderColor: "rgba(239,68,68,0.3)" }}>
                  <Trash2 style={{ width: 12, height: 12 }} />
                </button>
              </div>
            </div>
          );
        })}

        {/* Add new card */}
        <button
          onClick={() => { setEditPlan(null); setDrawerOpen(true); }}
          style={{ padding: "24px", borderRadius: 18, border: "2px dashed var(--border-strong)", background: "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.15s", minHeight: 220 }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--surface-subtle)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Plus style={{ width: 20, height: 20, color: "var(--text-subtle)" }} />
          </div>
          <span style={{ color: "var(--text-subtle)", fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}>Add Plan</span>
        </button>
      </div>

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="card" style={{ maxWidth: 400, width: "100%", padding: "28px", borderRadius: 20, textAlign: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(239,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Trash2 style={{ width: 22, height: 22, color: "#ef4444" }} />
            </div>
            <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, marginBottom: 8 }}>Delete Plan?</h3>
            <p style={{ color: "var(--text-subtle)", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>This plan will be permanently removed. Existing subscribers will not be affected but new sign-ups will be blocked.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirmDelete(null)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button onClick={() => deletePlan(confirmDelete)} style={{ flex: 1, padding: "10px", borderRadius: 12, background: "#ef4444", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
