import { backendFetch } from "@/lib/backend";

export async function GET() {
  const data = await backendFetch("/workflows");
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
