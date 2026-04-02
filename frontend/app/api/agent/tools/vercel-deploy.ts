import { tool } from "ai";
import { z } from "zod";

const getVercelToken = () => process.env.VERCEL_TOKEN || "";

async function vercelFetch(path: string, token: string, options?: RequestInit) {
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

export const listVercelDeployments = tool({
  description: "List recent Vercel deployments for a project",
  parameters: z.object({
    projectId: z.string().describe("Vercel project ID or name"),
  }),
  execute: async ({ projectId }) => {
    const token = getVercelToken();
    const data = await vercelFetch(
      `/v6/deployments?projectId=${projectId}&limit=10`,
      token
    );
    return data.deployments.map((d: any) => ({
      id: d.uid,
      url: d.url,
      state: d.state,
      target: d.target,
      createdAt: d.createdAt,
    }));
  },
});

export const getDeploymentStatus = tool({
  description: "Get the status of a specific Vercel deployment",
  parameters: z.object({
    deploymentId: z.string(),
  }),
  execute: async ({ deploymentId }) => {
    const token = getVercelToken();
    return await vercelFetch(`/v13/deployments/${deploymentId}`, token);
  },
});
