export type NodeCategory = "trigger" | "action" | "condition" | "step-up";

export interface WorkflowNodeDef {
  type: string;
  category: NodeCategory;
  label: string;
  service: string;
  scope: "read" | "write" | "step-up";
  description: string;
  icon: string;
  color: string;
}

export const NODE_DEFS: WorkflowNodeDef[] = [
  // Triggers
  { type: "trigger-pr-opened", category: "trigger", label: "PR Opened", service: "github", scope: "read", description: "Fires when a PR is opened", icon: "⤴", color: "border-green-600" },
  { type: "trigger-pr-merged", category: "trigger", label: "PR Merged", service: "github", scope: "read", description: "Fires when a PR is merged", icon: "⤵", color: "border-green-600" },
  { type: "trigger-issue-created", category: "trigger", label: "Issue Created", service: "github", scope: "read", description: "Fires when an issue is opened", icon: "◉", color: "border-green-600" },
  { type: "trigger-schedule", category: "trigger", label: "Schedule", service: "system", scope: "read", description: "Fires on a cron schedule", icon: "⏱", color: "border-green-600" },

  // Actions
  { type: "action-triage", category: "action", label: "Triage Issues", service: "github", scope: "write", description: "Auto-label and prioritize issues", icon: "🏷", color: "border-blue-600" },
  { type: "action-pr-summary", category: "action", label: "PR Summary", service: "github", scope: "write", description: "Post a PR summary comment", icon: "📝", color: "border-blue-600" },
  { type: "action-post-slack", category: "action", label: "Post to Slack", service: "slack", scope: "write", description: "Send a message to a channel", icon: "💬", color: "border-purple-600" },
  { type: "action-standup", category: "action", label: "Generate Standup", service: "slack", scope: "write", description: "Post standup summary", icon: "📊", color: "border-purple-600" },
  { type: "action-create-linear", category: "action", label: "Create Ticket", service: "linear", scope: "write", description: "Create a Linear issue", icon: "🎫", color: "border-indigo-600" },
  { type: "action-sync-linear", category: "action", label: "Sync Linear", service: "linear", scope: "write", description: "Update Linear ticket status", icon: "🔄", color: "border-indigo-600" },
  { type: "action-meeting-prep", category: "action", label: "Meeting Prep", service: "calendar", scope: "read", description: "Generate meeting brief", icon: "📅", color: "border-sky-600" },
  { type: "action-deploy-preview", category: "action", label: "Deploy Preview", service: "vercel", scope: "write", description: "Trigger preview deploy", icon: "🚀", color: "border-zinc-500" },

  // Conditions
  { type: "condition-label", category: "condition", label: "If Label", service: "github", scope: "read", description: "Check if issue has label", icon: "⑂", color: "border-yellow-600" },
  { type: "condition-author", category: "condition", label: "If Author", service: "github", scope: "read", description: "Check PR/issue author", icon: "⑂", color: "border-yellow-600" },

  // Step-up
  { type: "step-up-deploy-prod", category: "step-up", label: "Deploy Production", service: "vercel", scope: "step-up", description: "Promote to production (requires approval)", icon: "⚠", color: "border-red-600" },
  { type: "step-up-force-merge", category: "step-up", label: "Force Merge", service: "github", scope: "step-up", description: "Force merge PR (requires approval)", icon: "⚠", color: "border-red-600" },
];
