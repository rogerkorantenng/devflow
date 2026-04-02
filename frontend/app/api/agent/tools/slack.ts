import { tool } from "ai";
import { z } from "zod";
import { getAccessTokenFromTokenVault } from "@auth0/ai-vercel";
import { withSlack } from "@/lib/token-vault";

async function slackFetch(method: string, body?: Record<string, unknown>) {
  const token = getAccessTokenFromTokenVault();
  const res = await fetch(`https://slack.com/api/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!data.ok) throw new Error(`Slack API error: ${data.error}`);
  return data;
}

export const postSlackMessage = withSlack(
  tool({
    description: "Post a message to a Slack channel",
    parameters: z.object({
      channel: z.string().describe("Channel ID or name"),
      text: z.string().describe("Message text (supports Slack markdown)"),
    }),
    execute: async ({ channel, text }) => {
      const result = await slackFetch("chat.postMessage", { channel, text });
      return { ok: true, channel: result.channel, ts: result.ts };
    },
  })
);

export const listSlackChannels = withSlack(
  tool({
    description: "List Slack channels the bot has access to",
    parameters: z.object({}),
    execute: async () => {
      const result = await slackFetch("conversations.list", {
        types: "public_channel",
        limit: 50,
      });
      return result.channels.map((c: any) => ({
        id: c.id,
        name: c.name,
        topic: c.topic?.value,
      }));
    },
  })
);
