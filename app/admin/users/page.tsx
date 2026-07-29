"use client";

import DashLayout, { PageHeader } from "@/components/DashLayout";
import { UserPlus, Download, Search, Filter, MoreHorizontal } from "lucide-react";

const users = [
  { id: 1, name: "Sarah Mitchell", email: "sarah@email.com", role: "user", type: "creator", status: "Active", joined: "Jan 12, 2025", earnings: "$4,200.00" },
  { id: 2, name: "TechFlow Inc.", email: "hello@techflow.com", role: "user", type: "normal", status: "Active", joined: "Feb 3, 2025", earnings: "—" },
  { id: 3, name: "Marcus Lee", email: "marcus@email.com", role: "user", type: "creator", status: "Active", joined: "Mar 8, 2025", earnings: "$6,800.00" },
  { id: 4, name: "Alex Admin", email: "admin@ugcstudio.com", role: "admin", type: "—", status: "Active", joined: "Jan 1, 2025", earnings: "—" },
  { id: 5, name: "GlowBrand", email: "team@glowbrand.com", role: "user", type: "normal", status: "Suspended", joined: "Jan 22, 2025", earnings: "—" },
  { id: 6, name: "Emma Chen", email: "emma.c@email.com", role: "user", type: "creator", status: "Active", joined: "Apr 1, 2025", earnings: "$3,900.00" },
];

const statusPill: Record<string, string> = {
  Active: "pill-green",
  Suspended: "pill-rose",
};

export default function AdminUsersPage() {
  return (
    <DashLayout title="User Management">
      <PageHeader
        title="User Management"
        subtitle="View, manage, and moderate all platform accounts."
        action={
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search style={{ position: "absolute", left: 12, width: 14, height: 14, color: "var(--text-subtle)" }} />
              <input type="text" placeholder="Search by name or email..." className="input" style={{ paddingLeft: 36, width: 260, paddingTop: 9, paddingBottom: 9, fontSize: 13 }} />
            </div>
            <button className="btn btn-ghost btn-sm"><Filter style={{ width: 14, height: 14 }} /> Filter</button>
            <button className="btn btn-ghost btn-sm"><Download style={{ width: 14, height: 14 }} /> Export</button>
            <button className="btn btn-primary btn-sm"><UserPlus style={{ width: 14, height: 14 }} /> Add User</button>
          </div>
        }
      />

      {/* Table Card */}
      <div className="card" style={{ overflow: "hidden" }}>
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Account Type</th>
              <th>Status</th>
              <th>Date Joined</th>
              <th>Earnings</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--icon-bg)", border: "1px solid var(--icon-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--icon-color)", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                      {u.name[0]}
                    </div>
                    <div>
                      <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 14 }}>{u.name}</div>
                      <div style={{ color: "var(--text-subtle)", fontSize: 12, marginTop: 2 }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td><span className={`pill ${u.role === "admin" ? "pill-blue" : "pill-purple"}`}>{u.role}</span></td>
                <td><span className={`pill ${u.type === "creator" ? "pill-amber" : "pill-blue"}`}>{u.type}</span></td>
                <td><span className={`pill ${statusPill[u.status] || "pill-blue"}`}>{u.status}</span></td>
                <td style={{ color: "var(--text-subtle)", fontSize: 13 }}>{u.joined}</td>
                <td style={{ color: "#16a34a", fontWeight: 700, fontSize: 14 }}>{u.earnings}</td>
                <td>
                  <button style={{ width: 32, height: 32, borderRadius: 8, background: "var(--icon-bg)", border: "1px solid var(--icon-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--icon-color)", cursor: "pointer" }}>
                    <MoreHorizontal style={{ width: 14, height: 14 }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashLayout>
  );
}
