import { backendFetch } from "@/lib/backend";
import { redirect } from "next/navigation";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ service: string }> }
) {
  const { service } = await params;
  await backendFetch("/services", {
    method: "POST",
    body: JSON.stringify({ service }),
  });
  redirect("/dashboard/permissions");
}
