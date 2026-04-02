import { backendFetch } from "@/lib/backend";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") || "default";
  const data = await backendFetch(`/workflows?username=${username}`);
  return Response.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const data = await backendFetch("/workflows", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return Response.json(data);
}
