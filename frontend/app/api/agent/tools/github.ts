import { tool } from "ai";
import { z } from "zod";
import { getAccessTokenFromTokenVault } from "@auth0/ai-vercel";
import { withGitHub } from "@/lib/token-vault";

async function githubFetch(path: string, options?: RequestInit) {
  const token = getAccessTokenFromTokenVault();
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

export const listRepoIssues = withGitHub(
  tool({
    description: "List open issues for a GitHub repository",
    parameters: z.object({
      owner: z.string().describe("Repository owner"),
      repo: z.string().describe("Repository name"),
    }),
    execute: async ({ owner, repo }) => {
      const issues = await githubFetch(
        `/repos/${owner}/${repo}/issues?state=open&per_page=20`
      );
      return issues.map((i: any) => ({
        number: i.number,
        title: i.title,
        labels: i.labels.map((l: any) => l.name),
        author: i.user.login,
        created_at: i.created_at,
      }));
    },
  })
);

export const getPullRequest = withGitHub(
  tool({
    description: "Get details of a pull request including diff stats",
    parameters: z.object({
      owner: z.string(),
      repo: z.string(),
      pull_number: z.number().describe("PR number"),
    }),
    execute: async ({ owner, repo, pull_number }) => {
      const pr = await githubFetch(
        `/repos/${owner}/${repo}/pulls/${pull_number}`
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
  })
);

export const addIssueLabel = withGitHub(
  tool({
    description: "Add labels to a GitHub issue for triage",
    parameters: z.object({
      owner: z.string(),
      repo: z.string(),
      issue_number: z.number(),
      labels: z
        .array(z.string())
        .describe(
          "Labels to add: bug, feature, docs, priority-high, priority-low"
        ),
    }),
    execute: async ({ owner, repo, issue_number, labels }) => {
      return await githubFetch(
        `/repos/${owner}/${repo}/issues/${issue_number}/labels`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ labels }),
        }
      );
    },
  })
);

export const commentOnIssue = withGitHub(
  tool({
    description: "Post a comment on a GitHub issue or PR",
    parameters: z.object({
      owner: z.string(),
      repo: z.string(),
      issue_number: z.number(),
      body: z.string().describe("Comment body in markdown"),
    }),
    execute: async ({ owner, repo, issue_number, body }) => {
      return await githubFetch(
        `/repos/${owner}/${repo}/issues/${issue_number}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body }),
        }
      );
    },
  })
);
