import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { NavSidebar } from "@/components/nav-sidebar";
import { CommandPalette } from "@/components/command-palette/command-palette";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();
  if (!session) redirect("/auth/login");

  return (
    <div className="flex h-screen">
      <NavSidebar user={session.user} />
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
