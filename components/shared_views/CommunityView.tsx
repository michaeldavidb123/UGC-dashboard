"use client";

import { useState } from "react";
import DashLayout, { PageHeader } from "@/components/DashLayout";
import { MessageSquare, Users, Heart, Share2, Search, Plus, X, Image as ImageIcon } from "lucide-react";

const POSTS = [
  { id: 1, user: "Sarah M.", handle: "@sarahcreates", avatar: "SM", time: "2h ago", content: "Just landed a $500 deal with a top skincare brand 🎉 Consistency is key creators!", likes: 34, comments: 8 },
  { id: 2, user: "Marcus L.", handle: "@marcusfits", avatar: "ML", time: "4h ago", content: "New reel live! ANC headphone review — already at 12k views in 3 hours 🔥", likes: 62, comments: 14 },
  { id: 3, user: "Elena R.", handle: "@elenaugc", avatar: "ER", time: "Yesterday", content: "Tips for landing your first brand deal: 1) Post consistently 2) Nail your niche 3) Showcase results in DMs 💡", likes: 91, comments: 27 },
];

export default function CommunityView() {
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) =>
    setLiked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <DashLayout title="Social Lounge">
      <PageHeader title="Creator Social Lounge" subtitle="Connect, share wins, ask questions, and grow with other UGC creators on the platform." />
      <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
        {POSTS.map(p => (
          <div key={p.id} className="card" style={{ padding: 22, borderRadius: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 999, background: "#0284c7", color: "#fff", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>{p.avatar}</div>
              <div>
                <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 14 }}>{p.user}</div>
                <div style={{ color: "var(--text-subtle)", fontSize: 11 }}>{p.handle} · {p.time}</div>
              </div>
            </div>
            <p style={{ color: "var(--text)", fontSize: 14, margin: "0 0 14px", lineHeight: 1.6 }}>{p.content}</p>
            <div style={{ display: "flex", gap: 18, color: "var(--text-subtle)", fontSize: 13 }}>
              <button onClick={() => toggleLike(p.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: liked.has(p.id) ? "#ef4444" : "var(--text-subtle)", fontWeight: 600 }}>
                <Heart style={{ width: 15, height: 15, fill: liked.has(p.id) ? "#ef4444" : "none" }} /> {p.likes + (liked.has(p.id) ? 1 : 0)}
              </button>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><MessageSquare style={{ width: 15, height: 15 }} /> {p.comments}</span>
            </div>
          </div>
        ))}
      </div>
    </DashLayout>
  );
}
