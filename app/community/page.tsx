"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import {
  Heart, MessageSquare, Repeat, Share2, Bookmark, Image as ImageIcon,
  Sparkles, TrendingUp, MoreHorizontal, CheckCircle2, UserCheck, Search,
  Send, ShieldCheck, Tag, Plus, Flame, Award, Globe
} from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  role: "Creator" | "Brand" | "Admin";
  content: string;
  time: string;
}

interface SocialPost {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  role: "Creator" | "Brand" | "Admin";
  verified: boolean;
  category: string;
  time: string;
  content: string;
  hashtags: string[];
  media?: string;
  likes: number;
  commentsCount: number;
  reposts: number;
  shares: number;
  liked: boolean;
  reposted: boolean;
  bookmarked: boolean;
  comments: Comment[];
}

const INITIAL_SOCIAL_POSTS: SocialPost[] = [
  {
    id: "SP-1",
    author: "Sarah Mitchell",
    handle: "sarah_creator",
    avatar: "S",
    role: "Creator",
    verified: true,
    category: "Tips & Tricks",
    time: "2h ago",
    content: "Just hit my 50th approved UGC video on the platform! 🚀 Here are 3 lighting hacks that instantly doubled my brand approval rates: 1. Always use 45-degree natural window light. 2. Warm rim lighting behind your product. 3. Clean background contrast!",
    hashtags: ["#UGCtips", "#CreatorJourney", "#SkincareReels"],
    media: "/slide-1.png",
    likes: 142,
    commentsCount: 18,
    reposts: 24,
    shares: 12,
    liked: false,
    reposted: false,
    bookmarked: false,
    comments: [
      { id: "C-1", author: "GlowBrand Team", avatar: "G", role: "Brand", content: "Great tips Sarah! Loved working with you on our last campaign.", time: "1h ago" },
      { id: "C-2", author: "Marcus Lee", avatar: "M", role: "Creator", content: "That 45-degree lighting tip changed my whole setup!", time: "45m ago" },
    ]
  },
  {
    id: "SP-2",
    author: "UGC Studio Official",
    handle: "ugcstudio",
    avatar: "U",
    role: "Admin",
    verified: true,
    category: "Announcement",
    time: "4h ago",
    content: "🎉 Platform Upgrade Alert: Instant Payout Clearance is now LIVE for all Pro & Elite creators! Withdraw earnings in under 24 hours with 0 platform delay fees.",
    hashtags: ["#PlatformUpdate", "#InstantPayouts", "#UGCStudio"],
    media: "/slide-2.png",
    likes: 389,
    commentsCount: 42,
    reposts: 88,
    shares: 45,
    liked: true,
    reposted: false,
    bookmarked: true,
    comments: [
      { id: "C-3", author: "Elena Rostova", avatar: "E", role: "Creator", content: "This is huge! Received my payout in 15 mins today!", time: "3h ago" }
    ]
  },
  {
    id: "SP-3",
    author: "TechFlow Labs",
    handle: "techflow_hq",
    avatar: "T",
    role: "Brand",
    verified: true,
    category: "Collaboration",
    time: "6h ago",
    content: "We are officially hiring 10 Tech & Gadget Creators for our noise-canceling headphones summer launch! $400 base payout + product keeps. Apply on the Briefs page!",
    hashtags: ["#BrandBrief", "#TechUGC", "#CreatorJobs"],
    media: "/slide-3.png",
    likes: 215,
    commentsCount: 31,
    reposts: 52,
    shares: 28,
    liked: false,
    reposted: false,
    bookmarked: false,
    comments: []
  }
];

const TRENDING_HASHTAGS = [
  { tag: "#UGCtips", posts: "1.4k posts" },
  { tag: "#SkincareReels", posts: "890 posts" },
  { tag: "#InstantPayouts", posts: "620 posts" },
  { tag: "#BrandBriefs", posts: "450 posts" },
  { tag: "#TikTokHooks", posts: "310 posts" },
];

const TOP_CREATORS = [
  { name: "Sarah Mitchell", handle: "@sarah_c", role: "Elite Creator", rating: "4.92 ★", color: "#0284c7" },
  { name: "Jake Rodriguez", handle: "@jake_reviews", role: "Pro Creator", rating: "4.88 ★", color: "#10b981" },
  { name: "Elena Rostova", handle: "@elena_ugc", role: "Pro Creator", rating: "4.95 ★", color: "#8b5cf6" },
];

export default function SocialCommunityPage() {
  const [posts, setPosts] = useState<SocialPost[]>(INITIAL_SOCIAL_POSTS);
  const [activeTab, setActiveTab] = useState("all");
  const [composerText, setComposerText] = useState("");
  const [composerCategory, setComposerCategory] = useState("Tips & Tricks");
  const [openCommentInput, setOpenCommentInput] = useState<Record<string, boolean>>({ "SP-1": true });
  const [commentText, setCommentText] = useState<Record<string, string>>({});

  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== id) return p;
      return {
        ...p,
        liked: !p.liked,
        likes: p.liked ? p.likes - 1 : p.likes + 1
      };
    }));
  };

  const toggleRepost = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== id) return p;
      return {
        ...p,
        reposted: !p.reposted,
        reposts: p.reposted ? p.reposts - 1 : p.reposts + 1
      };
    }));
  };

  const toggleBookmark = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== id) return p;
      return { ...p, bookmarked: !p.bookmarked };
    }));
  };

  const handleAddComment = (postId: string) => {
    const text = commentText[postId]?.trim();
    if (!text) return;

    const newComment: Comment = {
      id: `C-${Date.now()}`,
      author: "Sarah Mitchell",
      avatar: "S",
      role: "Creator",
      content: text,
      time: "Just now"
    };

    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return {
        ...p,
        commentsCount: p.commentsCount + 1,
        comments: [...p.comments, newComment]
      };
    }));

    setCommentText(prev => ({ ...prev, [postId]: "" }));
  };

  const handleCreatePost = () => {
    if (!composerText.trim()) return;

    const newPost: SocialPost = {
      id: `SP-${Date.now()}`,
      author: "Sarah Mitchell",
      handle: "sarah_creator",
      avatar: "S",
      role: "Creator",
      verified: true,
      category: composerCategory,
      time: "Just now",
      content: composerText.trim(),
      hashtags: ["#UGCStudio", "#CreatorCommunity"],
      likes: 1,
      commentsCount: 0,
      reposts: 0,
      shares: 0,
      liked: true,
      reposted: false,
      bookmarked: false,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setComposerText("");
  };

  const filteredPosts = posts.filter(p => {
    if (activeTab === "all") return true;
    if (activeTab === "tips") return p.category === "Tips & Tricks";
    if (activeTab === "briefs") return p.category === "Collaboration";
    if (activeTab === "announcements") return p.category === "Announcement";
    return true;
  });

  return (
    <DashLayout title="Community Feed">
      <PageHeader
        title="Social Community Feed"
        subtitle="Connect with creators & brands, share campaign insights, showcase reels, and engage in real-time."
      />

      <div className="grid-responsive-2col" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>

        {/* LEFT COLUMN: SOCIAL FEED & COMPOSER */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* 1. SOCIAL POST COMPOSER */}
          <div className="card" style={{ padding: "20px", borderRadius: 20, background: "var(--surface)" }}>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "#0284c7", color: "#fff", fontWeight: 800, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                S
              </div>
              <div style={{ flex: 1 }}>
                <textarea
                  value={composerText}
                  onChange={e => setComposerText(e.target.value)}
                  placeholder="What's happening in your UGC journey? Share tips or ask questions…"
                  rows={3}
                  className="input"
                  style={{
                    width: "100%", background: "var(--surface-subtle)", border: "1px solid var(--border)",
                    borderRadius: 14, padding: "12px 14px", fontSize: 14, resize: "none",
                    fontFamily: "inherit", color: "var(--text)"
                  }}
                />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12, flexWrap: "wrap", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <select
                      value={composerCategory}
                      onChange={e => setComposerCategory(e.target.value)}
                      className="input"
                      style={{ fontSize: 12, padding: "6px 12px", width: "auto", borderRadius: 10 }}
                    >
                      <option value="Tips & Tricks">Tips & Tricks</option>
                      <option value="Showcase">Showcase Reel</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="General">General Talk</option>
                    </select>

                    <button className="btn btn-ghost btn-sm" title="Add Media" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                      <ImageIcon style={{ width: 15, height: 15, color: "#38bdf8" }} /> Media
                    </button>
                  </div>

                  <button
                    onClick={handleCreatePost}
                    disabled={!composerText.trim()}
                    className="btn btn-primary"
                    style={{ padding: "8px 20px", fontSize: 13, borderRadius: 12 }}
                  >
                    Post to Feed
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. FEED TABS */}
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            {[
              { id: "all", label: "All Posts" },
              { id: "tips", label: "Tips & Hacks" },
              { id: "briefs", label: "Brand Briefs" },
              { id: "announcements", label: "Announcements" },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: "8px 18px", borderRadius: 999, fontSize: 13, fontWeight: 700,
                  cursor: "pointer", border: "none", transition: "all 0.15s", whiteSpace: "nowrap",
                  background: activeTab === t.id ? "#0284c7" : "var(--surface-subtle)",
                  color: activeTab === t.id ? "#fff" : "var(--text-subtle)",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* 3. SOCIAL POST CARDS */}
          {filteredPosts.map(post => {
            const commentsShown = openCommentInput[post.id];
            return (
              <article key={post.id} className="card card-lift" style={{ padding: "24px", borderRadius: 20 }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: post.role === "Admin" ? "#0284c7" : post.role === "Brand" ? "#8b5cf6" : "#10b981", color: "#fff", fontWeight: 800, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {post.avatar}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ color: "var(--text)", fontWeight: 800, fontSize: 15 }}>{post.author}</span>
                        {post.verified && <CheckCircle2 style={{ width: 14, height: 14, color: "#38bdf8", fill: "#38bdf8" }} />}
                        <span style={{ color: "var(--text-subtle)", fontSize: 12 }}>@{post.handle}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                        <span className={`pill ${post.role === "Admin" ? "pill-blue" : post.role === "Brand" ? "pill-purple" : "pill-green"}`} style={{ fontSize: 10 }}>{post.role}</span>
                        <span style={{ color: "var(--text-subtle)", fontSize: 11 }}>• {post.time}</span>
                      </div>
                    </div>
                  </div>

                  <button style={{ background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer", padding: 4 }}>
                    <MoreHorizontal style={{ width: 18, height: 18 }} />
                  </button>
                </div>

                {/* Content */}
                <p style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.6, marginBottom: 12, whiteSpace: "pre-wrap" }}>
                  {post.content}
                </p>

                {/* Hashtags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                  {post.hashtags.map(tag => (
                    <span key={tag} style={{ color: "#38bdf8", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{tag}</span>
                  ))}
                </div>

                {/* Media Preview if present */}
                {post.media && (
                  <div style={{ position: "relative", width: "100%", height: 240, borderRadius: 14, overflow: "hidden", marginBottom: 16, border: "1px solid var(--border)" }}>
                    <Image src={post.media} alt="Post media" fill style={{ objectFit: "cover" }} />
                  </div>
                )}

                {/* ENGAGEMENT ACTION BAR (Like, Comment, Repost, Share, Bookmark) */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: 14, borderBottom: commentsShown ? "1px solid var(--border)" : "none", paddingBottom: commentsShown ? 14 : 0 }}>
                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(post.id)}
                    style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 6, color: post.liked ? "#ef4444" : "var(--text-subtle)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                  >
                    <Heart style={{ width: 17, height: 17, fill: post.liked ? "#ef4444" : "none" }} />
                    <span>{post.likes}</span>
                  </button>

                  {/* Comment Button */}
                  <button
                    onClick={() => setOpenCommentInput(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                    style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 6, color: "var(--text-subtle)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                  >
                    <MessageSquare style={{ width: 17, height: 17 }} />
                    <span>{post.commentsCount}</span>
                  </button>

                  {/* Repost / Retweet */}
                  <button
                    onClick={() => toggleRepost(post.id)}
                    style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 6, color: post.reposted ? "#10b981" : "var(--text-subtle)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                  >
                    <Repeat style={{ width: 17, height: 17 }} />
                    <span>{post.reposts}</span>
                  </button>

                  {/* Share */}
                  <button style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 6, color: "var(--text-subtle)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                    <Share2 style={{ width: 17, height: 17 }} />
                    <span>{post.shares}</span>
                  </button>

                  {/* Bookmark */}
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    style={{ background: "none", border: "none", color: post.bookmarked ? "#0284c7" : "var(--text-subtle)", cursor: "pointer" }}
                  >
                    <Bookmark style={{ width: 17, height: 17, fill: post.bookmarked ? "#0284c7" : "none" }} />
                  </button>
                </div>

                {/* EXPANDABLE COMMENTS SECTION */}
                {commentsShown && (
                  <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                    {/* Add Comment Input */}
                    <div style={{ display: "flex", gap: 10 }}>
                      <input
                        type="text"
                        placeholder="Write a reply..."
                        value={commentText[post.id] || ""}
                        onChange={e => setCommentText({ ...commentText, [post.id]: e.target.value })}
                        onKeyDown={e => e.key === "Enter" && handleAddComment(post.id)}
                        className="input"
                        style={{ flex: 1, fontSize: 12, padding: "8px 12px", borderRadius: 10 }}
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="btn btn-primary btn-sm"
                        style={{ borderRadius: 10, padding: "0 14px" }}
                      >
                        <Send style={{ width: 13, height: 13 }} />
                      </button>
                    </div>

                    {/* Existing Comments */}
                    {post.comments.map(c => (
                      <div key={c.id} style={{ display: "flex", gap: 10, padding: "10px 12px", borderRadius: 12, background: "var(--surface-subtle)", border: "1px solid var(--border)" }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: "#0284c7", color: "#fff", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {c.avatar}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 12 }}>{c.author}</span>
                            <span style={{ color: "var(--text-subtle)", fontSize: 10 }}>{c.time}</span>
                          </div>
                          <p style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 3, lineHeight: 1.4 }}>{c.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* RIGHT COLUMN: SOCIAL SIDEBAR (Trending, Top Creators, Guidelines) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* 1. TRENDING HASHTAGS WIDGET */}
          <div className="card" style={{ padding: "20px", borderRadius: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Flame style={{ width: 18, height: 18, color: "#f59e0b" }} />
              <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 15, margin: 0 }}>Trending in UGC</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {TRENDING_HASHTAGS.map((t, idx) => (
                <div key={t.tag} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{t.tag}</div>
                    <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{t.posts}</div>
                  </div>
                  <span style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 700 }}>#{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. TOP CREATORS OF THE WEEK */}
          <div className="card" style={{ padding: "20px", borderRadius: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Award style={{ width: 18, height: 18, color: "#0284c7" }} />
              <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 15, margin: 0 }}>Top Creators This Week</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {TOP_CREATORS.map(c => (
                <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: `${c.color}20`, border: `1px solid ${c.color}40`, color: c.color, fontWeight: 800, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {c.name[0]}
                    </div>
                    <div>
                      <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{c.name}</div>
                      <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{c.handle}</div>
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm" style={{ padding: "4px 10px", fontSize: 11 }}>Follow</button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </DashLayout>
  );
}
