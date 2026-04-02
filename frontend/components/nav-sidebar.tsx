"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "⌂" },
  { href: "/dashboard/workflows", label: "Workflows", icon: "⟳" },
  { href: "/dashboard/permissions", label: "Permissions", icon: "🔑" },
  { href: "/dashboard/activity", label: "Activity", icon: "📋" },
];

interface NavSidebarProps {
  user: { email?: string; name?: string } | null;
}

export function NavSidebar({ user }: NavSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-zinc-800 bg-zinc-950 px-3 py-4">
      <div className="mb-8 px-3">
        <h1 className="text-lg font-bold">DevFlow</h1>
        <p className="text-xs text-zinc-500">AI DevOps Command Center</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
              pathname === item.href
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-zinc-800 pt-3 px-3">
        <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
        <a
          href="/auth/logout"
          className="text-xs text-red-400 hover:text-red-300"
        >
          Sign out
        </a>
      </div>
    </aside>
  );
}
