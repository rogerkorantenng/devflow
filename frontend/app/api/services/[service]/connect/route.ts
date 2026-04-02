import { backendFetch } from "@/lib/backend";
import { redirect } from "next/navigation";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ service: string }> }
) {
  const { service } = await params;
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") || "default";
  await backendFetch("/services", {
    method: "POST",
    body: JSON.stringify({ service, username }),
  });
  redirect("/dashboard/permissions");
}
