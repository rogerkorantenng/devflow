export interface Command {
  id: string;
  label: string;
  description: string;
  service: string;
  scope: "read" | "write" | "step-up";
  keywords: string[];
}

export const COMMANDS: Command[] = [
  {
    id: "triage-issues",
    label: "Triage Issues",
    description: "Auto-label and prioritize open GitHub issues",
    service: "github",
    scope: "write",
    keywords: ["triage", "issues", "label", "github"],
  },
  {
    id: "pr-summary",
    label: "PR Summary",
    description: "Generate a summary of a pull request",
    service: "github",
    scope: "read",
    keywords: ["pr", "pull", "request", "summary", "review"],
  },
  {
    id: "standup",
    label: "Generate Standup",
    description:
      "Create a standup from yesterday's activity across services",
    service: "slack",
    scope: "write",
    keywords: ["standup", "daily", "yesterday", "status"],
  },
  {
    id: "post-slack",
    label: "Post to Slack",
    description: "Send a message to a Slack channel",
    service: "slack",
    scope: "write",
    keywords: ["slack", "message", "post", "send"],
  },
  {
    id: "linear-issues",
    label: "List Linear Issues",
    description: "Show recent Linear issues",
    service: "linear",
    scope: "read",
    keywords: ["linear", "issues", "tickets", "sprint"],
  },
  {
    id: "create-ticket",
    label: "Create Ticket",
    description: "Create a new Linear issue from description",
    service: "linear",
    scope: "write",
    keywords: ["create", "ticket", "issue", "linear", "new"],
  },
  {
    id: "calendar",
    label: "Today's Meetings",
    description: "List upcoming calendar events",
    service: "calendar",
    scope: "read",
    keywords: ["calendar", "meetings", "events", "today", "schedule"],
  },
  {
    id: "deployments",
    label: "List Deployments",
    description: "Show recent Vercel deployments",
    service: "vercel",
    scope: "read",
    keywords: ["deploy", "vercel", "deployments", "preview", "production"],
  },
  {
    id: "deploy-preview",
    label: "Deploy Preview",
    description: "Trigger a Vercel preview deployment",
    service: "vercel",
    scope: "write",
    keywords: ["deploy", "preview", "vercel", "ship"],
  },
];
