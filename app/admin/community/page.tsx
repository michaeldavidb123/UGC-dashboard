"use client";

import { useState, type ChangeEvent } from "react";
import DashLayout, { PageHeader, Field } from "@/components/DashLayout";
import {
  Search, MessageSquare, Heart, Pin, EyeOff, Flag, Trash2,
  MoreHorizontal, CheckCircle2, AlertTriangle, Filter, Sparkles,
  Plus, Edit3, X, UserCheck, ShieldCheck, Check
} from "lucide-react";

/* ─────────────────────────────────────────────
   MOCK ADMIN POSTS
───────────────────────────────────────────── */
const STATUS_PILLS: Record<string, { label: string; pill: string }> = {
  active:  { label: "Active",  pill: "pill-green" },
  pinned:  { label: "Pinned",  pill: "pill-blue"  },
  flagged: { label: "Flagged", pill: "pill-amber" },
  hidden:  { label: "Hidden",  pill: "pill-red"   },
};

const INITIAL_ADMIN_POSTS = [
  { id: "P-101", author: "UGC Studio Team", authorEmail: "admin@ugcstudio.com", role: "Admin", category: "Announcement", title: "New Feature Alert: Instant Payouts & Automated Clearance", likes: 48, comments: 2, isPinned: true, status: "pinned", date: "Jul 29, 2025" },
  { id: "P-102", author: "Sarah Mitchell", authorEmail: "sarah@email.com", role: "Creator", category: "Tips & Tricks", title: "5 Lighting Hacks for High-Converting Skincare Reels", likes: 32, comments: 1, isPinned: false, status: "active", date: "Jul 29, 2025" },
  { id: "P-103", author: "GlowBrand Team", authorEmail: "hello@glowbrand.com", role: "Brand", category: "Collaboration", title: "Looking for 10 Skincare Creators for Summer Campaign", likes: 27, comments: 0, isPinned: false, status: "active", date: "Jul 28, 2025" },
  { id: "P-104", author: "Marcus Lee", authorEmail: "marcus@email.com", role: "Creator", category: "Showcase", title: "Just finished my TechFlow Headphones Review Reel", likes: 19, comments: 0, isPinned: false, status: "active", date: "Jul 27, 2025" },
  { id: "P-105", author: "SpamUser99", authorEmail: "spam@unverified.com", role: "Creator", category: "General", title: "Buy cheap Instagram followers fast 100% real", likes: 0, comments: 0, isPinned: false, status: "flagged", date: "Jul 26, 2025" },
  { id: "P-106", author: "TechFlow Labs", authorEmail: "hello@techflow.com", role: "Brand", category: "Brief Help", title: "How long does video revision review typically take?", likes: 8, comments: 4, isPinned: false, status: "active", date: "Jul 25, 2025" },
];

export default function AdminCommunityPage() {
  const [posts, setPosts] = useState(INITIAL_ADMIN_POSTS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  /* Edit Likes Modal */
  const [editingLikesPost, setEditingLikesPost] = useState<typeof INITIAL_ADMIN_POSTS[0] | null>(null);
  const [likesInputValue, setLikesInputValue] = useState<string>("0");

  /* Create Post Modal */
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState("UGC Studio Team");
  const [authorEmail, setAuthorEmail] = useState("admin@ugcstudio.com");
  const [authorRole, setAuthorRole] = useState<"Admin" | "Creator" | "Brand">("Admin");
  const [postCategory, setPostCategory] = useState("Announcement");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [initialLikes, setInitialLikes] = useState("25");

  const filtered = posts.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    const matchRole   = filterRole === "all"   || p.role.toLowerCase() === filterRole;
    return matchSearch && matchStatus && matchRole;
  });

  const togglePin = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== id) return p;
      const nextPinned = !p.isPinned;
      return { ...p, isPinned: nextPinned, status: nextPinned ? "pinned" : "active" };
    }));
    setActiveMenu(null);
  };

  const toggleHide = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== id) return p;
      return { ...p, status: p.status === "hidden" ? "active" : "hidden" };
    }));
    setActiveMenu(null);
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    setDeleteConfirm(null);
  };

  const openLikesEdit = (post: typeof INITIAL_ADMIN_POSTS[0]) => {
    setEditingLikesPost(post);
    setLikesInputValue(String(post.likes));
    setActiveMenu(null);
  };

  const saveManipulatedLikes = () => {
    if (!editingLikesPost) return;
    const num = Math.max(0, parseInt(likesInputValue) || 0);
    setPosts(prev => prev.map(p => p.id === editingLikesPost.id ? { ...p, likes: num } : p));
    setEditingLikesPost(null);
  };

  const handleCreatePost = () => {
    if (!postTitle.trim()) return;
    const created = {
      id: `P-${Date.now()}`,
      author: authorName.trim() || "Anonymous",
      authorEmail: authorEmail.trim() || "user@platform.com",
      role: authorRole,
      category: postCategory,
      title: postTitle.trim(),
      likes: Math.max(0, parseInt(initialLikes) || 0),
      comments: 0,
      isPinned: authorRole === "Admin",
      status: authorRole === "Admin" ? "pinned" : "active",
      date: "Just now",
    };
    setPosts([created, ...posts]);
    setPostTitle("");
    setPostContent("");
    setCreateModalOpen(false);
  };

  return (
    <DashLayout title="Admin – Community">
      <PageHeader
        title="Manage Community Posts"
        subtitle="Moderate forum topics, publish as any user persona, and adjust engagement likes."
        action={
          <button
            onClick={() => setCreateModalOpen(true)}
            className="btn btn-primary"
            style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 7 }}
          >
            <Plus style={{ width: 14, height: 14 }} /> Publish Post as Persona
          </button>
        }
      />

      {/* KPIs */}
      <div className="grid-responsive-4col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: 28 }}>
        {[
          { label: "Total Community Posts", value: posts.length.toString(), sub: "All time", color: "#0284c7", icon: MessageSquare },
          { label: "Total Comments",         value: "1,240", sub: "User replies", color: "#10b981", icon: Sparkles },
          { label: "Total Likes (Boosted)",  value: posts.reduce((a, b) => a + b.likes, 0).toLocaleString(), sub: "Platform engagement", color: "#f59e0b", icon: Heart },
          { label: "Flagged Content",       value: posts.filter(p => p.status === "flagged").length.toString() + " Posts", sub: "Requires review", color: "#ef4444", icon: AlertTriangle },
        ].map(k => (
          <div key={k.label} className="stat-card card-lift" style={{ borderLeft: `3px solid ${k.color}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }}>{k.label.toUpperCase()}</span>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `${k.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <k.icon style={{ width: 15, height: 15, color: k.color }} />
              </div>
            </div>
            <div style={{ color: "var(--text)", fontWeight: 900, fontSize: 26, letterSpacing: "-0.03em" }}>{k.value}</div>
            <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 4 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
          <Search style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", width: 13, height: 13, color: "var(--text-subtle)" }} />
          <input
            type="text" placeholder="Search post title or author…" value={search} onChange={e => setSearch(e.target.value)}
            className="input" style={{ paddingLeft: 34, paddingTop: 8, paddingBottom: 8, fontSize: 13 }}
          />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <select className="input" style={{ fontSize: 13, paddingTop: 8, paddingBottom: 8, minWidth: 130 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="pinned">Pinned</option>
            <option value="flagged">Flagged</option>
            <option value="hidden">Hidden</option>
          </select>
          <select className="input" style={{ fontSize: 13, paddingTop: 8, paddingBottom: 8, minWidth: 120 }} value={filterRole} onChange={e => setFilterRole(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="creator">Creator</option>
            <option value="brand">Brand</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="card table-responsive" style={{ borderRadius: 18, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Post ID", "Author", "Role", "Category", "Title", "Likes (Manipulate)", "Comments", "Status", "Date", "Actions"].map(h => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "var(--text-subtle)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", background: "var(--surface-subtle)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((post, i) => {
              const st = STATUS_PILLS[post.status] || STATUS_PILLS.active;
              return (
                <tr key={post.id} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "var(--surface-subtle)" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ color: "var(--text-subtle)", fontSize: 12, fontFamily: "monospace" }}>{post.id}</span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{post.author}</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{post.authorEmail}</div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span className={`pill ${post.role === "Admin" ? "pill-blue" : post.role === "Brand" ? "pill-purple" : "pill-green"}`} style={{ fontSize: 11 }}>{post.role}</span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span className="pill pill-blue" style={{ fontSize: 11 }}>{post.category}</span>
                  </td>
                  <td style={{ padding: "14px 16px", maxWidth: 240 }}>
                    <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</div>
                  </td>
                  {/* Likes Manipulation Button */}
                  <td style={{ padding: "14px 16px" }}>
                    <button
                      onClick={() => openLikesEdit(post)}
                      className="btn btn-ghost btn-sm"
                      style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 5, color: "#ef4444", border: "1px dashed rgba(239,68,68,0.4)" }}
                      title="Click to edit like count"
                    >
                      <Heart style={{ width: 13, height: 13, fill: "#ef4444" }} />
                      <span style={{ fontWeight: 800 }}>{post.likes}</span>
                      <Edit3 style={{ width: 11, height: 11, color: "var(--text-subtle)" }} />
                    </button>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-muted)", fontSize: 13 }}>
                      <MessageSquare style={{ width: 13, height: 13, color: "var(--text-subtle)" }} />
                      <span>{post.comments}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span className={`pill ${st.pill}`} style={{ fontSize: 11 }}>{st.label}</span>
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--text-subtle)", fontSize: 12 }}>{post.date}</td>
                  <td style={{ padding: "14px 16px", position: "relative" }}>
                    <button onClick={() => setActiveMenu(activeMenu === post.id ? null : post.id)} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "5px", cursor: "pointer", color: "var(--text-subtle)", display: "flex", alignItems: "center" }}>
                      <MoreHorizontal style={{ width: 15, height: 15 }} />
                    </button>
                    {activeMenu === post.id && (
                      <div style={{ position: "absolute", right: 12, top: "100%", zIndex: 50, background: "var(--surface)", border: "1px solid var(--border-strong)", borderRadius: 12, padding: "6px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", minWidth: 170 }}>
                        <button onClick={() => openLikesEdit(post)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", borderRadius: 8, background: "none", border: "none", color: "#ef4444", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                          <Heart style={{ width: 13, height: 13 }} /> Manipulate Likes
                        </button>
                        <button onClick={() => togglePin(post.id)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", borderRadius: 8, background: "none", border: "none", color: "#0284c7", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                          <Pin style={{ width: 13, height: 13 }} /> {post.isPinned ? "Unpin" : "Pin to Top"}
                        </button>
                        <button onClick={() => toggleHide(post.id)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", borderRadius: 8, background: "none", border: "none", color: "#f59e0b", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                          <EyeOff style={{ width: 13, height: 13 }} /> {post.status === "hidden" ? "Unhide" : "Hide Post"}
                        </button>
                        <button onClick={() => { setDeleteConfirm(post.id); setActiveMenu(null); }} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", borderRadius: 8, background: "none", border: "none", color: "#dc2626", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                          <Trash2 style={{ width: 13, height: 13 }} /> Delete Post
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--text-subtle)", fontSize: 13 }}>No community posts match your filter.</div>
        )}
      </div>

      {/* ════════════════════════════════
          EDIT LIKES MODAL
      ════════════════════════════════ */}
      {editingLikesPost && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1150, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div className="card" style={{ maxWidth: 400, width: "100%", padding: "28px", borderRadius: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#ef4444", fontWeight: 800, fontSize: 16 }}>
                <Heart style={{ width: 18, height: 18, fill: "#ef4444" }} /> Manipulate Likes Count
              </div>
              <button onClick={() => setEditingLikesPost(null)} style={{ background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer" }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>
              Setting likes count for: <strong>{editingLikesPost.title}</strong>
            </div>

            <Field label="NEW LIKES COUNT">
              <input
                type="number"
                className="input"
                value={likesInputValue}
                onChange={e => setLikesInputValue(e.target.value)}
                placeholder="e.g. 250"
              />
            </Field>

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => setEditingLikesPost(null)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button onClick={saveManipulatedLikes} className="btn btn-primary" style={{ flex: 1 }}>
                Save New Likes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════
          PUBLISH POST AS PERSONA MODAL
      ════════════════════════════════ */}
      {createModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1100, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div className="card" style={{ maxWidth: 540, width: "100%", padding: "28px", borderRadius: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(2,132,199,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <UserCheck style={{ width: 18, height: 18, color: "#0284c7" }} />
                </div>
                <div>
                  <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, margin: 0 }}>Publish Post as Any Persona</h3>
                  <div style={{ color: "var(--text-subtle)", fontSize: 12 }}>Post as Admin, Creator, or Brand with custom author name</div>
                </div>
              </div>
              <button onClick={() => setCreateModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer" }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="AUTHOR NAME">
                  <input className="input" placeholder="e.g. Sarah Mitchell" value={authorName} onChange={e => setAuthorName(e.target.value)} />
                </Field>

                <Field label="AUTHOR ROLE">
                  <select className="input" value={authorRole} onChange={e => setAuthorRole(e.target.value as any)}>
                    <option value="Admin">Admin</option>
                    <option value="Creator">Creator</option>
                    <option value="Brand">Brand</option>
                  </select>
                </Field>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="AUTHOR EMAIL">
                  <input className="input" placeholder="sarah@email.com" value={authorEmail} onChange={e => setAuthorEmail(e.target.value)} />
                </Field>

                <Field label="CATEGORY">
                  <select className="input" value={postCategory} onChange={e => setPostCategory(e.target.value)}>
                    <option value="Announcement">Announcement</option>
                    <option value="Tips & Tricks">Tips & Tricks</option>
                    <option value="Showcase">Showcase</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Brief Help">Brief Help</option>
                    <option value="General">General</option>
                  </select>
                </Field>
              </div>

              <Field label="POST TITLE">
                <input className="input" placeholder="e.g. 5 Lighting Hacks for High-Converting Skincare Reels" value={postTitle} onChange={e => setPostTitle(e.target.value)} />
              </Field>

              <Field label="POST CONTENT">
                <textarea className="input" rows={3} style={{ resize: "none" }} placeholder="Enter post content body…" value={postContent} onChange={e => setPostContent(e.target.value)} />
              </Field>

              <Field label="INITIAL BOOSTED LIKES COUNT">
                <input type="number" className="input" placeholder="25" value={initialLikes} onChange={e => setInitialLikes(e.target.value)} />
              </Field>

              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button onClick={() => setCreateModalOpen(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                <button onClick={handleCreatePost} disabled={!postTitle.trim()} className="btn btn-primary" style={{ flex: 1 }}>
                  Publish Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1100, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="card" style={{ maxWidth: 400, width: "100%", padding: "28px", borderRadius: 20, textAlign: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(239,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Trash2 style={{ width: 22, height: 22, color: "#ef4444" }} />
            </div>
            <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, marginBottom: 8 }}>Delete Community Post?</h3>
            <p style={{ color: "var(--text-subtle)", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>This post and all associated comments will be permanently deleted. This action cannot be undone.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setDeleteConfirm(null)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button onClick={() => deletePost(deleteConfirm)} style={{ flex: 1, padding: "10px", borderRadius: 12, background: "#ef4444", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
