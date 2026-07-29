"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, Upload, DollarSign,
  User, Zap, LogOut, Bell
} from "lucide-react";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Overview" },
  { href: "/briefs", icon: FileText, label: "Briefs" },
  { href: "/submissions", icon: Upload, label: "Submissions" },
  { href: "/earnings", icon: DollarSign, label: "Earnings" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen flex flex-col bg-[#13102b] border-r border-purple-500/10">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-purple-500/10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">UGC Studio</p>
            <p className="text-purple-400 text-xs font-medium">Creator Portal</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-xs font-semibold text-purple-900 uppercase tracking-wider px-3 mb-3">Navigation</p>
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`sidebar-link ${pathname === href ? "active" : ""}`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-purple-500/10">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-purple-500/5 border border-purple-500/10 mb-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold">S</div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Sarah Mitchell</p>
            <p className="text-purple-400 text-xs">Lifestyle Creator</p>
          </div>
          <button className="text-purple-500 hover:text-purple-300 transition-colors">
            <Bell className="w-4 h-4" />
          </button>
        </div>
        <button className="sidebar-link w-full text-red-400 hover:bg-red-500/10 hover:text-red-300">
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </aside>
  );
}

export function UserTopbar({ title }: { title: string }) {
  return (
    <header className="h-16 border-b border-purple-500/10 flex items-center justify-between px-6 bg-[#0c0a14]/80 backdrop-blur-sm sticky top-0 z-40">
      <h1 className="text-lg font-bold text-white">{title}</h1>
    </header>
  );
}
