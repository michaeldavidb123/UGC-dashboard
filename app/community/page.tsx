"use client";

import { useState, useRef, type ChangeEvent } from "react";
import DashLayout, { PageHeader, Field } from "@/components/DashLayout";
import {
  MessageSquare, Heart, Share2, Pin, Plus, X, Upload,
  Sparkles, CheckCircle2, TrendingUp, ShieldCheck, Search,
  Filter, Image as ImageIcon, Send, User, Flame, Award, MoreHorizontal
} from "lucide-react";

/* ─────────────────────────────────────────────
   CATEGORIES & MOCK POSTS
───────────────────────────────────────────── */
const CATEGORIES = [
  { id: "all",           label: "All Posts"       },
  { id: "announcement",  label: "Announcements"   },
  { id: "tips_tricks",   label: "Tips & Tricks"   },
  { id: "showcase",      label: "UGC Showcase"    },
  { id: "brief_help",    label: "Brief Help"      },
  { id: "collaboration", label: "Collaborations"  },
];

interface Comment {
  id: string;
  author: string;
  authorRole: "Creator" | "Brand" | "Admin";
  avatar: string;
  time: string;
  text: string;
}

interface Post {
  id: string;
  author: string;
  authorHandle: string;
  authorRole: "Creator" | "Brand" | "Admin";
  authorAvatar: string;
  time: string;
  category: string;
  title: string;
  content: string;
  isPinned?: boolean;
  likes: number;
  liked: boolean;
  comments: Comment[];
  media?: string;
}

const INITIAL_POSTS: Post[] = [
  {
    id: "P-101",
    author: "UGC Studio Team",
    authorHandle: "@ugcstudio",
    authorRole: "Admin",
    authorAvatar: "U",
    time: "2 hours ago",
    category: "announcement",
    title: "🚀 New Feature Alert: Instant Payouts & Automated Clearance",
    content: "We're excited to announce that Pro and Elite creators can now access Instant Payouts directly to their connected bank account or PayPal! Check your Earnings tab to see your cleared balance.",
    isPinned: true,
    likes: 48,
    liked: true,
    comments: [
      { id: "C-1", author: "Sarah Mitchell", authorRole: "Creator", avatar: "S", time: "1h ago", text: "This is huge! Thanks for adding instant payouts!" },
      { id: "C-2", author: "GlowBrand Team", authorRole: "Brand", avatar: "G", time: "30m ago", text: "Awesome update. Makes creator payouts so much smoother for us." },
    ],
  },
  {
    id: "P-102",
    author: "Sarah Mitchell",
    authorHandle: "@sarah.creates",
    authorRole: "Creator",
    authorAvatar: "S",
    time: "4 hours ago",
    category: "tips_tricks",
    title: "5 Lighting Hacks for High-Converting Skincare Reels 💡",
    content: "Natural lighting works best, but if you're shooting indoors at night: 1) Position your ring light at 45 degrees, 2) Use a white poster board below frame as a bounce card, 3) Match color temp to 5600K. Tested on 20+ Nike and GlowBrand briefs with a 95% approval rate!",
    likes: 32,
    liked: false,
    comments: [
      { id: "C-3", author: "Marcus Lee", authorRole: "Creator", avatar: "M", time: "2h ago", text: "The poster board bounce trick changed my content quality completely!" },
    ],
  },
  {
    id: "P-103",
    author: "GlowBrand Team",
    authorHandle: "@glowbrand",
    authorRole: "Brand",
    authorAvatar: "G",
    time: "1 day ago",
    category: "collaboration",
    title: "Looking for 10 Skincare Creators for Summer Campaign ($250/video)",
    content: "We're launching our Morning Glow Vitamin C serum campaign! Looking for creators in the UK and US with authentic skincare routines. Requirements: 4K 60fps video, clear lighting. Apply under Briefs!",
    likes: 27,
    liked: false,
    comments: [],
  },
  {
    id: "P-104",
    author: "Marcus Lee",
    authorHandle: "@marcus.tech",
    authorRole: "Creator",
    authorAvatar: "M",
    time: "2 days ago",
    category: "showcase",
    title: "Just finished my TechFlow Headphones Review Reel 🎧",
    content: "Shot on iPhone 16 Pro + DJI Mic. Kept the cuts snappy and focused on real sound cancellation demo. Approved by brand on first submission without any revision requested!",
    likes: 19,
    liked: false,
    comments: [],
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({ "P-101": true });
  const [newCommentText, setNewCommentText] = useState<Record<string, string>>({});

  /* New Post Form */
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("tips_tricks");
  const [newContent, setNewContent] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return {
        ...p,
        liked: !p.liked,
        likes: p.liked ? p.likes - 1 : p.likes + 1,
      };
    }));
  };

  const toggleCommentsView = (postId: string) => {
    setOpenComments(p => ({ ...p, [postId]: !p[postId] }));
  };

  const handleAddComment = (postId: string) => {
    const text = newCommentText[postId]?.trim();
    if (!text) return;
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const newComment: Comment = {
        id: `C-${Date.now()}`,
        author: "Sarah Mitchell",
        authorRole: "Creator",
        avatar: "S",
        time: "Just now",
        text,
      };
      return { ...p, comments: [...p.comments, newComment] };
    }));
    setNewCommentText(p => ({ ...p, [postId]: "" }));
  };

  const handleCreatePost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const created: Post = {
      id: `P-${Date.now()}`,
      author: "Sarah Mitchell",
      authorHandle: "@sarah.creates",
      authorRole: "Creator",
      authorAvatar: "S",
      time: "Just now",
      category: newCategory,
      title: newTitle,
      content: newContent,
      likes: 0,
      liked: false,
      comments: [],
    };
    setPosts([created, ...posts]);
    setNewTitle("");
    setNewContent("");
    setAttachedFile(null);
    setCreateOpen(false);
  };

  const filtered = posts.filter(p => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase()) || p.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <DashLayout title="Community Hub">
      <PageHeader
        title="Community Hub"
        subtitle="Connect with creators & brands, share tips, showcase your UGC, and ask questions."
        action={
          <button onClick={() => setCreateOpen(true)} className="btn btn-primary" style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 7 }}>
            <Plus style={{ width: 14, height: 14 }} /> Create Post
          </button>
        }
      />

      <div className="grid-responsive-2col" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 28, alignItems: "start" }}>

        {/* LEFT: FEED & FILTERS */}
        <div>
          {/* Category Filter Chips */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {CATEGORIES.map(cat => {
                const active = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      padding: "7px 16px", borderRadius: 999, fontSize: 12, fontWeight: 600,
                      background: active ? "#0284c7" : "var(--surface-subtle)",
                      border: `1px solid ${active ? "#0284c7" : "var(--border-strong)"}`,
                      color: active ? "#fff" : "var(--text-muted)",
                      cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s"
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div style={{ position: "relative" }}>
              <Search style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", width: 13, height: 13, color: "var(--text-subtle)" }} />
              <input
                type="text" placeholder="Search posts…" value={search} onChange={e => setSearch(e.target.value)}
                className="input" style={{ paddingLeft: 34, paddingTop: 7, paddingBottom: 7, fontSize: 12, width: 180 }}
              />
            </div>
          </div>

          {/* Posts Feed */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {filtered.map(post => {
              const isCommentsOpen = !!openComments[post.id];
              return (
                <div key={post.id} className="card" style={{ padding: "24px", borderRadius: 18, borderLeft: post.isPinned ? "4px solid #0284c7" : undefined }}>
                  {/* Pinned header */}
                  {post.isPinned && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#0284c7", fontSize: 11, fontWeight: 800, marginBottom: 12, letterSpacing: "0.04em" }}>
                      <Pin style={{ width: 12, height: 12, transform: "rotate(45deg)" }} /> PINNED ANNOUNCEMENT
                    </div>
                  )}

                  {/* Author Row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: post.authorRole === "Admin" ? "#0284c7" : post.authorRole === "Brand" ? "#7c3aed" : "#10b981", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15 }}>
                        {post.authorAvatar}
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>{post.author}</span>
                          <span className={`pill ${post.authorRole === "Admin" ? "pill-blue" : post.authorRole === "Brand" ? "pill-purple" : "pill-green"}`} style={{ fontSize: 10 }}>
                            {post.authorRole}
                          </span>
                        </div>
                        <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>{post.authorHandle} · {post.time}</div>
                      </div>
                    </div>

                    <span style={{ background: "var(--surface-subtle)", border: "1px solid var(--border-strong)", color: "var(--text-muted)", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 999, textTransform: "capitalize" }}>
                      {post.category.replace("_", " ")}
                    </span>
                  </div>

                  {/* Title & Body */}
                  <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, marginBottom: 8, letterSpacing: "-0.01em" }}>{post.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6, marginBottom: 18, whiteSpace: "pre-line" }}>{post.content}</p>

                  {/* Actions Bar */}
                  <div style={{ display: "flex", alignItems: "center", gap: 20, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                    <button
                      onClick={() => toggleLike(post.id)}
                      style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: post.liked ? "#ef4444" : "var(--text-subtle)", fontWeight: post.liked ? 700 : 500, fontSize: 13, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
                    >
                      <Heart style={{ width: 16, height: 16, fill: post.liked ? "#ef4444" : "none" }} />
                      {post.likes} Likes
                    </button>

                    <button
                      onClick={() => toggleCommentsView(post.id)}
                      style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "var(--text-subtle)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
                    >
                      <MessageSquare style={{ width: 16, height: 16 }} />
                      {post.comments.length} Comments
                    </button>

                    <button
                      onClick={() => navigator.clipboard.writeText(window.location.href)}
                      style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "var(--text-subtle)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
                    >
                      <Share2 style={{ width: 15, height: 15 }} /> Share
                    </button>
                  </div>

                  {/* Comments Expansion */}
                  {isCommentsOpen && (
                    <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--border-strong)" }}>
                      {/* Comment Input */}
                      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                        <input
                          className="input"
                          placeholder="Write a comment…"
                          value={newCommentText[post.id] || ""}
                          onChange={e => setNewCommentText({ ...newCommentText, [post.id]: e.target.value })}
                          onKeyDown={e => e.key === "Enter" && handleAddComment(post.id)}
                          style={{ flex: 1, fontSize: 13 }}
                        />
                        <button onClick={() => handleAddComment(post.id)} className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>
                          <Send style={{ width: 13, height: 13 }} /> Reply
                        </button>
                      </div>

                      {/* Comments List */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {post.comments.map(c => (
                          <div key={c.id} style={{ display: "flex", gap: 10, padding: "10px 14px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border)" }}>
                            <div style={{ width: 28, height: 28, borderRadius: 8, background: "#0284c7", color: "#fff", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              {c.avatar}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                                <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 12 }}>{c.author}</span>
                                <span className="pill pill-blue" style={{ fontSize: 9 }}>{c.authorRole}</span>
                                <span style={{ color: "var(--text-subtle)", fontSize: 11 }}>{c.time}</span>
                              </div>
                              <p style={{ color: "var(--text-muted)", fontSize: 13, margin: 0, lineHeight: 1.4 }}>{c.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div style={{ padding: "48px", textAlign: "center", color: "var(--text-subtle)", fontSize: 13 }} className="card">
                No community posts match your search or filter.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR: GUIDELINES & TRENDING */}
        <div style={{ position: "sticky", top: 88, display: "flex", flexDirection: "column", gap: 20 }}>
          
          {/* Guidelines Card */}
          <div className="card" style={{ padding: "24px", borderRadius: 18, borderLeft: "3px solid #0284c7" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text)", fontWeight: 800, fontSize: 15, marginBottom: 12 }}>
              <ShieldCheck style={{ width: 16, height: 16, color: "#0284c7" }} /> Community Guidelines
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, color: "var(--text-subtle)", fontSize: 12, lineHeight: 1.5 }}>
              <div>• Be supportive & respectful to all creators and brands.</div>
              <div>• No self-promotion of non-UGC Studio services.</div>
              <div>• Share actionable, constructive feedback.</div>
              <div>• Keep rate discussions professional.</div>
            </div>
          </div>

          {/* Trending Topics */}
          <div className="card" style={{ padding: "24px", borderRadius: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text)", fontWeight: 800, fontSize: 15, marginBottom: 14 }}>
              <Flame style={{ width: 16, height: 16, color: "#f59e0b" }} /> Trending Topics
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["#UGCtips", "#SkincareBriefs", "#EditingHacks", "#LightingSetup", "#TikTokReels", "#PortfolioFeedback"].map(tag => (
                <span key={tag} style={{ padding: "5px 12px", borderRadius: 999, background: "var(--surface-subtle)", border: "1px solid var(--border)", color: "#0284c7", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Top Contributors */}
          <div className="card" style={{ padding: "24px", borderRadius: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text)", fontWeight: 800, fontSize: 15, marginBottom: 14 }}>
              <Award style={{ width: 16, height: 16, color: "#10b981" }} /> Top Contributors
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { name: "Sarah Mitchell", posts: "24 posts", avatar: "S" },
                { name: "Marcus Lee",     posts: "19 posts", avatar: "M" },
                { name: "GlowBrand Team", posts: "15 posts", avatar: "G" },
              ].map((tc, idx) => (
                <div key={tc.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: "#0284c7", color: "#fff", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {tc.avatar}
                    </div>
                    <div>
                      <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 13 }}>{tc.name}</div>
                      <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{tc.posts}</div>
                    </div>
                  </div>
                  <span style={{ color: "#f59e0b", fontSize: 11, fontWeight: 800 }}>#{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ════════════════════════════════
          NEW POST MODAL
      ════════════════════════════════ */}
      {createOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1100, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div className="card" style={{ maxWidth: 520, width: "100%", padding: "28px", borderRadius: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 18, margin: 0 }}>Create Community Post</h3>
              <button onClick={() => setCreateOpen(false)} style={{ background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer" }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Field label="CATEGORY">
                <select className="input" value={newCategory} onChange={e => setNewCategory(e.target.value)}>
                  <option value="tips_tricks">Tips & Tricks</option>
                  <option value="showcase">UGC Showcase</option>
                  <option value="brief_help">Brief Help</option>
                  <option value="collaboration">Collaborations</option>
                  <option value="general">General Discussion</option>
                </select>
              </Field>

              <Field label="TITLE">
                <input className="input" placeholder="e.g. How I cut edit time by 50% using CapCut templates" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
              </Field>

              <Field label="POST CONTENT">
                <textarea className="input" rows={4} style={{ resize: "none" }} placeholder="Share your experience, ask a question, or give advice to the community…" value={newContent} onChange={e => setNewContent(e.target.value)} />
              </Field>

              <Field label="ATTACHMENT (OPTIONAL)">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{ border: "2px dashed var(--border-strong)", borderRadius: 12, padding: "16px", textAlign: "center", cursor: "pointer", background: "var(--surface-subtle)" }}
                >
                  <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={(e: ChangeEvent<HTMLInputElement>) => setAttachedFile(e.target.files?.[0] || null)} />
                  <Upload style={{ width: 20, height: 20, color: "var(--text-subtle)", margin: "0 auto 6px" }} />
                  <span style={{ color: "var(--text-subtle)", fontSize: 12 }}>
                    {attachedFile ? attachedFile.name : "Click to attach photo or video sample"}
                  </span>
                </div>
              </Field>

              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button onClick={() => setCreateOpen(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                <button onClick={handleCreatePost} disabled={!newTitle.trim() || !newContent.trim()} className="btn btn-primary" style={{ flex: 1 }}>
                  Publish Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
