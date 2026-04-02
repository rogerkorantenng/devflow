import { backendFetch } from "@/lib/backend";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const service = searchParams.get("service");
  const username = searchParams.get("username") || "default";
  let path = `/activity?username=${username}`;
  if (service) path += `&service=${service}`;
  const data = await backendFetch(path);
  return Response.json(data);
}
