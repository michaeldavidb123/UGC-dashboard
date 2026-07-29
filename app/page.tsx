"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar, { Topbar } from "@/components/Sidebar";
import { useRole } from "@/context/RoleContext";
import { useUI } from "@/context/UIContext";
import AdminHome from "@/components/views/AdminHome";
import CreatorHome from "@/components/views/CreatorHome";
import NormalHome from "@/components/views/NormalHome";

export default function DashboardPage() {
  const { activeView, setActiveView } = useRole();
  const { sidebarW } = useUI();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check if onboarding has been completed
    const done = localStorage.getItem("ugc_onboarding_complete") === "true";
    if (!done) {
      // Not onboarded yet — send them to the onboarding flow
      router.replace("/onboarding");
      return;
    }

    // Onboarding done: read the role they chose and set the active view
    const savedRole = localStorage.getItem("ugc_creator_role") as "creator" | "normal" | null;
    if (savedRole && (savedRole === "creator" || savedRole === "normal")) {
      setActiveView(savedRole);
    }

    setReady(true);
  }, [router, setActiveView]);

  // Don't render anything while checking / redirecting
  if (!ready) return null;

  const view =
    activeView === "admin" ? <AdminHome /> :
    activeView === "creator" ? <CreatorHome /> :
    <NormalHome />;

  const title =
    activeView === "admin" ? "Platform Overview" :
    activeView === "creator" ? "Creator Overview" :
    "Brand Workspace";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, marginLeft: sidebarW, transition: "margin-left 0.25s cubic-bezier(0.4,0,0.2,1)" }}>
        <Topbar title={title} />
        <main style={{ flex: 1, padding: "40px 48px" }}>
          {view}
        </main>
      </div>
    </div>
  );
}
