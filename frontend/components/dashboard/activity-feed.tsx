"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Activity {
  id: number;
  service: string;
  action: string;
  timestamp: string;
  step_up_required: boolean;
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const username = localStorage.getItem("devflow_username") || "default";
    fetch(`/api/activity?username=${username}&limit=20`)
      .then((r) => r.json())
      .then((data) => setActivities(data.entries || []))
      .catch(() => {});
  }, []);

  return (
    <Card className="border-zinc-800 bg-zinc-900 p-5">
      <h3 className="mb-4 font-semibold">Recent Activity</h3>
      <ScrollArea className="h-[300px]">
        {activities.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No activity yet. Run a command or workflow to see activity here.
          </p>
        ) : (
          <div className="space-y-2">
            {activities.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between rounded border border-zinc-800 px-3 py-2 text-sm"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {a.service}
                  </Badge>
                  <span className="text-zinc-300">{a.action}</span>
                </div>
                <span className="text-xs text-zinc-500">
                  {new Date(a.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}
