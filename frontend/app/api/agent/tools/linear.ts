import { tool, jsonSchema } from "ai";

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
  parameters: jsonSchema({
    type: "object",
    properties: {
      teamKey: { type: "string", description: "Team key to filter by" },
    },
  }),
  execute: async ({ teamKey }: { teamKey?: string }) => {
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
  parameters: jsonSchema({
    type: "object",
    properties: {
      teamId: { type: "string", description: "Linear team ID" },
      title: { type: "string" },
      description: { type: "string" },
      priority: { type: "number", description: "0=none, 1=urgent, 2=high, 3=medium, 4=low" },
    },
    required: ["teamId", "title"],
  }),
  execute: async ({ teamId, title, description, priority }: { teamId: string; title: string; description?: string; priority?: number }) => {
    const token = getLinearToken();
    const data = await linearGraphQL(
      `mutation($input: IssueCreateInput!) { issueCreate(input: $input) { success issue { id identifier title url } } }`,
      token,
      { input: { teamId, title, description, priority } }
    );
    return data.issueCreate.issue;
  },
});
