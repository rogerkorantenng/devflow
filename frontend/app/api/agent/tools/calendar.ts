import { tool } from "ai";
import { z } from "zod";
import { getAccessTokenFromTokenVault } from "@auth0/ai-vercel";
import { withGoogleCalendar } from "@/lib/token-vault";

async function calendarFetch(path: string) {
  const token = getAccessTokenFromTokenVault();
  const res = await fetch(`https://www.googleapis.com/calendar/v3${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Calendar API error: ${res.status}`);
  return res.json();
}

export const listUpcomingEvents = withGoogleCalendar(
  tool({
    description: "List upcoming calendar events for today or a specific date",
    parameters: z.object({
      date: z
        .string()
        .optional()
        .describe("ISO date string (YYYY-MM-DD), defaults to today"),
    }),
    execute: async ({ date }) => {
      const d = date ? new Date(date) : new Date();
      const start = new Date(d);
      start.setHours(0, 0, 0, 0);
      const end = new Date(d);
      end.setHours(23, 59, 59, 999);
      const timeMin = start.toISOString();
      const timeMax = end.toISOString();
      const data = await calendarFetch(
        `/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`
      );
      return (data.items || []).map((e: any) => ({
        id: e.id,
        summary: e.summary,
        start: e.start.dateTime || e.start.date,
        end: e.end.dateTime || e.end.date,
        attendees: e.attendees?.map((a: any) => a.email) || [],
      }));
    },
  })
);
