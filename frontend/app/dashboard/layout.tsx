"use client";

import { NavSidebar } from "@/components/nav-sidebar";
import { CommandPalette } from "@/components/command-palette/command-palette";
import { useUsername } from "@/lib/use-username";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username, logout } = useUsername();

  if (!username) return null;

  return (
    <div className="flex h-screen">
      <NavSidebar username={username} onLogout={logout} />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-4 flex justify-end">
          <kbd className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
            Ctrl+K
          </kbd>
        </div>
        <CommandPalette />
        {children}
      </main>
    </div>
  );
}
