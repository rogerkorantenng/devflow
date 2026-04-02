import { backendFetch } from "@/lib/backend";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") || "default";
  const data = await backendFetch(`/services?username=${username}`);
  return Response.json(data);
}
