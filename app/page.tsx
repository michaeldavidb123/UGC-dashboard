"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashLayout from "@/components/DashLayout";
import { useRole } from "@/context/RoleContext";
import AdminHome from "@/components/views/AdminHome";
import CreatorHome from "@/components/views/CreatorHome";
import NormalHome from "@/components/views/NormalHome";

export default function DashboardPage() {
  const { activeView, setActiveView } = useRole();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check if onboarding has been completed
    const done = localStorage.getItem("ugc_onboarding_complete") === "true";
    if (!done) {
      // Not onboarded yet — send them to the onboarding flow
      router.replace("/general/onboarding");
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
    <DashLayout title={title}>
      {view}
    </DashLayout>
  );
}
