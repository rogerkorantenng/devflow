import { tool } from "ai";
import { z } from "zod";

const getLinearToken = () => process.env.LINEAR_TOKEN || "";

async function linearGraphQL(
  query: string,
  token: string,
  variables?: Record<string, unknown>
) {
  const res = await fetch("https://api.linear.app/graphql", {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  if (data.errors)
    throw new Error(`Linear API error: ${JSON.stringify(data.errors)}`);
  return data.data;
}

export const listLinearIssues = tool({
  description: "List recent Linear issues",
  parameters: z.object({
    teamKey: z.string().optional().describe("Team key to filter by"),
  }),
  execute: async ({ teamKey }) => {
    const token = getLinearToken();
    const filter = teamKey
      ? `(filter: { team: { key: { eq: "${teamKey}" } } })`
      : "";
    const data = await linearGraphQL(
      `{ issues${filter} { nodes { id identifier title state { name } priority assignee { name } createdAt } } }`,
      token
    );
    return data.issues.nodes.slice(0, 20);
  },
});

export const createLinearIssue = tool({
  description: "Create a new Linear issue",
  parameters: z.object({
    teamId: z.string().describe("Linear team ID"),
    title: z.string(),
    description: z.string().optional(),
    priority: z
      .number()
      .min(0)
      .max(4)
      .optional()
      .describe("0=none, 1=urgent, 2=high, 3=medium, 4=low"),
  }),
  execute: async ({ teamId, title, description, priority }) => {
    const token = getLinearToken();
    const data = await linearGraphQL(
      `mutation($input: IssueCreateInput!) { issueCreate(input: $input) { success issue { id identifier title url } } }`,
      token,
      { input: { teamId, title, description, priority } }
    );
    return data.issueCreate.issue;
  },
});
