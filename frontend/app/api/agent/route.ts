import { streamText, stepCountIs } from "ai";
import { setAIContext } from "@auth0/ai-vercel";
import { errorSerializer } from "@auth0/ai-vercel/interruptions";
import { DEVFLOW_SYSTEM_PROMPT } from "@/lib/agent";
import {
  listRepoIssues,
  getPullRequest,
  addIssueLabel,
  commentOnIssue,
  postSlackMessage,
  listSlackChannels,
  listLinearIssues,
  createLinearIssue,
  listUpcomingEvents,
  listVercelDeployments,
  getDeploymentStatus,
} from "./tools";

export async function POST(req: Request) {
  const { messages, threadId } = await req.json();

  setAIContext({ threadID: threadId || crypto.randomUUID() });

  const tools = {
    listRepoIssues,
    getPullRequest,
    addIssueLabel,
    commentOnIssue,
    postSlackMessage,
    listSlackChannels,
    listLinearIssues,
    createLinearIssue,
    listUpcomingEvents,
    listVercelDeployments,
    getDeploymentStatus,
  };

  const result = streamText({
    model: "openai/gpt-5.4",
    system: DEVFLOW_SYSTEM_PROMPT,
    messages,
    tools,
    stopWhen: stepCountIs(10),
    onError: errorSerializer(),
  });

  return result.toUIMessageStreamResponse();
}
