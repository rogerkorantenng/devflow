import { tool, jsonSchema } from "ai";

async function githubFetch(path: string, token: string, options?: RequestInit) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      ...options?.headers,
    },
  });
  if (!res.ok)
    throw new Error(`GitHub API error: ${res.status} ${await res.text()}`);
  return res.json();
}

const getGitHubToken = () => process.env.GITHUB_TOKEN || "";

export const listRepoIssues = tool({
  description: "List open issues for a GitHub repository",
  parameters: jsonSchema({
    type: "object",
    properties: {
      owner: { type: "string", description: "Repository owner" },
      repo: { type: "string", description: "Repository name" },
    },
    required: ["owner", "repo"],
  }),
  execute: async ({ owner, repo }: { owner: string; repo: string }) => {
    const token = getGitHubToken();
    const issues = await githubFetch(
      `/repos/${owner}/${repo}/issues?state=open&per_page=20`,
      token
    );
    return issues.map((i: any) => ({
      number: i.number,
      title: i.title,
      labels: i.labels.map((l: any) => l.name),
      author: i.user.login,
      created_at: i.created_at,
    }));
  },
});

export const getPullRequest = tool({
  description: "Get details of a pull request including diff stats",
  parameters: jsonSchema({
    type: "object",
    properties: {
      owner: { type: "string" },
      repo: { type: "string" },
      pull_number: { type: "number", description: "PR number" },
    },
    required: ["owner", "repo", "pull_number"],
  }),
  execute: async ({ owner, repo, pull_number }: { owner: string; repo: string; pull_number: number }) => {
    const token = getGitHubToken();
    const pr = await githubFetch(
      `/repos/${owner}/${repo}/pulls/${pull_number}`,
      token
    );
    return {
      number: pr.number,
      title: pr.title,
      state: pr.state,
      author: pr.user.login,
      additions: pr.additions,
      deletions: pr.deletions,
      changed_files: pr.changed_files,
      mergeable: pr.mergeable,
      body: pr.body?.slice(0, 500),
    };
  },
});

export const addIssueLabel = tool({
  description: "Add labels to a GitHub issue for triage",
  parameters: jsonSchema({
    type: "object",
    properties: {
      owner: { type: "string" },
      repo: { type: "string" },
      issue_number: { type: "number" },
      labels: {
        type: "array",
        items: { type: "string" },
        description: "Labels to add: bug, feature, docs, priority-high, priority-low",
      },
    },
    required: ["owner", "repo", "issue_number", "labels"],
  }),
  execute: async ({ owner, repo, issue_number, labels }: { owner: string; repo: string; issue_number: number; labels: string[] }) => {
    const token = getGitHubToken();
    return await githubFetch(
      `/repos/${owner}/${repo}/issues/${issue_number}/labels`,
      token,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ labels }),
      }
    );
  },
});

export const commentOnIssue = tool({
  description: "Post a comment on a GitHub issue or PR",
  parameters: jsonSchema({
    type: "object",
    properties: {
      owner: { type: "string" },
      repo: { type: "string" },
      issue_number: { type: "number" },
      body: { type: "string", description: "Comment body in markdown" },
    },
    required: ["owner", "repo", "issue_number", "body"],
  }),
  execute: async ({ owner, repo, issue_number, body }: { owner: string; repo: string; issue_number: number; body: string }) => {
    const token = getGitHubToken();
    return await githubFetch(
      `/repos/${owner}/${repo}/issues/${issue_number}/comments`,
      token,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      }
    );
  },
});
