export type ServiceId = "github" | "slack" | "linear" | "calendar" | "vercel";

export interface ServiceDef {
  id: ServiceId;
  name: string;
  icon: string;
  connection: string;
  description: string;
  readScopes: string[];
  writeScopes: string[];
  stepUpActions: string[];
  color: string;
}

export const SERVICES: ServiceDef[] = [
  {
    id: "github",
    name: "GitHub",
    icon: "GH",
    connection: "github",
    description: "Issues, PRs, repos, and code",
    readScopes: ["repo:read", "issues:read", "pull_requests:read"],
    writeScopes: ["issues:write", "pull_requests:write"],
    stepUpActions: ["Force merge", "Delete branch"],
    color: "bg-zinc-700",
  },
  {
    id: "slack",
    name: "Slack",
    icon: "SL",
    connection: "slack",
    description: "Channels, messages, and standups",
    readScopes: ["channels:read", "users:read"],
    writeScopes: ["chat:write", "files:write"],
    stepUpActions: ["Post to public channels"],
    color: "bg-purple-900",
  },
  {
    id: "linear",
    name: "Linear",
    icon: "LN",
    connection: "linear",
    description: "Issues, sprints, and project tracking",
    readScopes: ["read"],
    writeScopes: ["issues:create", "issues:update"],
    stepUpActions: ["Bulk close/archive"],
    color: "bg-indigo-900",
  },
  {
    id: "calendar",
    name: "Google Calendar",
    icon: "GC",
    connection: "google-oauth2",
    description: "Events, meetings, and scheduling",
    readScopes: ["calendar.readonly"],
    writeScopes: ["calendar.events"],
    stepUpActions: ["Delete/modify others' events"],
    color: "bg-blue-900",
  },
  {
    id: "vercel",
    name: "Vercel",
    icon: "VC",
    connection: "vercel",
    description: "Deployments and preview URLs",
    readScopes: ["read"],
    writeScopes: ["deployments:create"],
    stepUpActions: ["Promote to production"],
    color: "bg-zinc-800",
  },
];
