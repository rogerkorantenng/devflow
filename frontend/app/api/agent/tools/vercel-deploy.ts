import { tool } from "ai";
import { z } from "zod";
import { getAccessTokenFromTokenVault } from "@auth0/ai-vercel";
import { withVercel } from "@/lib/token-vault";

async function vercelFetch(path: string, options?: RequestInit) {
  const token = getAccessTokenFromTokenVault();
  const res = await fetch(`https://api.vercel.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`Vercel API error: ${res.status}`);
  return res.json();
}

export const listVercelDeployments = withVercel(
  tool({
    description: "List recent Vercel deployments for a project",
    parameters: z.object({
      projectId: z.string().describe("Vercel project ID or name"),
    }),
    execute: async ({ projectId }) => {
      const data = await vercelFetch(
        `/v6/deployments?projectId=${projectId}&limit=10`
      );
      return data.deployments.map((d: any) => ({
        id: d.uid,
        url: d.url,
        state: d.state,
        target: d.target,
        createdAt: d.createdAt,
      }));
    },
  })
);

export const getDeploymentStatus = withVercel(
  tool({
    description: "Get the status of a specific Vercel deployment",
    parameters: z.object({
      deploymentId: z.string(),
    }),
    execute: async ({ deploymentId }) => {
      return await vercelFetch(`/v13/deployments/${deploymentId}`);
    },
  })
);
