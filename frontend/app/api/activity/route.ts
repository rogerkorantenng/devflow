import { backendFetch } from "@/lib/backend";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const service = searchParams.get("service");
  const path = service ? `/activity?service=${service}` : "/activity";
  const data = await backendFetch(path);
  return Response.json(data);
}
