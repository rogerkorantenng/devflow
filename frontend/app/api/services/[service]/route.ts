import { backendFetch } from "@/lib/backend";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ service: string }> }
) {
  const { service } = await params;
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") || "default";
  const data = await backendFetch(`/services/${service}?username=${username}`, {
    method: "DELETE",
  });
  return Response.json(data);
}
