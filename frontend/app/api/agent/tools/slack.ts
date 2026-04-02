import { tool } from "ai";
import { z } from "zod";

const getSlackToken = () => process.env.SLACK_TOKEN || "";

async function slackFetch(method: string, token: string, body?: Record<string, unknown>) {
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

export const postSlackMessage = tool({
  description: "Post a message to a Slack channel",
  parameters: z.object({
    channel: z.string().describe("Channel ID or name"),
    text: z.string().describe("Message text (supports Slack markdown)"),
  }),
  execute: async ({ channel, text }) => {
    const token = getSlackToken();
    const result = await slackFetch("chat.postMessage", token, { channel, text });
    return { ok: true, channel: result.channel, ts: result.ts };
  },
});

export const listSlackChannels = tool({
  description: "List Slack channels the bot has access to",
  parameters: z.object({}),
  execute: async () => {
    const token = getSlackToken();
    const result = await slackFetch("conversations.list", token, {
      types: "public_channel",
      limit: 50,
    });
    return result.channels.map((c: any) => ({
      id: c.id,
      name: c.name,
      topic: c.topic?.value,
    }));
  },
});
