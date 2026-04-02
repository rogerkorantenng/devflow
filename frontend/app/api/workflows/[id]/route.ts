import { backendFetch } from "@/lib/backend";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await backendFetch(`/workflows/${id}`);
  return Response.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const data = await backendFetch(`/workflows/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  return Response.json(data);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await backendFetch(`/workflows/${id}`, { method: "DELETE" });
  return Response.json(data);
}
