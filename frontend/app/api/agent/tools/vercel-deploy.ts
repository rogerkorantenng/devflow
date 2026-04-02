import { tool, jsonSchema } from "ai";

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
  parameters: jsonSchema({
    type: "object",
    properties: {
      projectId: { type: "string", description: "Vercel project ID or name" },
    },
    required: ["projectId"],
  }),
  execute: async ({ projectId }: { projectId: string }) => {
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
  parameters: jsonSchema({
    type: "object",
    properties: {
      deploymentId: { type: "string" },
    },
    required: ["deploymentId"],
  }),
  execute: async ({ deploymentId }: { deploymentId: string }) => {
    const token = getVercelToken();
    return await vercelFetch(`/v13/deployments/${deploymentId}`, token);
  },
});
