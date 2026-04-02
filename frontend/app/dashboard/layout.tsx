import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { NavSidebar } from "@/components/nav-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/api/auth/login");

  return (
    <div className="flex h-screen">
      <NavSidebar />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
