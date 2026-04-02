import { backendFetch } from "@/lib/backend";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ service: string }> }
) {
  const { service } = await params;
  const data = await backendFetch(`/services/${service}`, {
    method: "DELETE",
  });
  return Response.json(data);
}
