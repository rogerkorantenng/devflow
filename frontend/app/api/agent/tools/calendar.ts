import { tool, jsonSchema } from "ai";

const getCalendarToken = () => process.env.GOOGLE_CALENDAR_TOKEN || "";

async function calendarFetch(path: string, token: string) {
  const res = await fetch(`https://www.googleapis.com/calendar/v3${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Calendar API error: ${res.status}`);
  return res.json();
}

export const listUpcomingEvents = tool({
  description: "List upcoming calendar events for today or a specific date",
  parameters: jsonSchema({
    type: "object",
    properties: {
      date: { type: "string", description: "ISO date string (YYYY-MM-DD), defaults to today" },
    },
  }),
  execute: async ({ date }: { date?: string }) => {
    const token = getCalendarToken();
    const d = date ? new Date(date) : new Date();
    const start = new Date(d);
    start.setHours(0, 0, 0, 0);
    const end = new Date(d);
    end.setHours(23, 59, 59, 999);
    const data = await calendarFetch(
      `/calendars/primary/events?timeMin=${start.toISOString()}&timeMax=${end.toISOString()}&singleEvents=true&orderBy=startTime`,
      token
    );
    return (data.items || []).map((e: any) => ({
      id: e.id,
      summary: e.summary,
      start: e.start.dateTime || e.start.date,
      end: e.end.dateTime || e.end.date,
      attendees: e.attendees?.map((a: any) => a.email) || [],
    }));
  },
});
