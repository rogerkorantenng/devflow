import { backendFetch } from "@/lib/backend";

export async function GET() {
  const data = await backendFetch("/services");
  return Response.json(data);
}
