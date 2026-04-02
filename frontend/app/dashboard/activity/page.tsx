"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/services";

interface Activity {
  id: number;
  service: string;
  action: string;
  scope_used: string;
  step_up_required: boolean;
  step_up_approved: boolean | null;
  timestamp: string;
  details: Record<string, unknown>;
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("devflow_username") || "default";
    let params = `?username=${username}`;
    if (filter) params += `&service=${filter}`;
    fetch(`/api/activity${params}`)
      .then((r) => r.json())
      .then((d) => setActivities(d.entries || []))
      .catch(() => {});
  }, [filter]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Activity Log</h2>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant={filter === null ? "default" : "ghost"}
          onClick={() => setFilter(null)}
        >
          All
        </Button>
        {SERVICES.map((s) => (
          <Button
            key={s.id}
            size="sm"
            variant={filter === s.id ? "default" : "ghost"}
            onClick={() => setFilter(s.id)}
          >
            {s.icon} {s.name}
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        {activities.length === 0 && (
          <Card className="border-zinc-800 bg-zinc-900 p-8 text-center">
            <p className="text-zinc-500">No activity recorded yet.</p>
          </Card>
        )}
        {activities.map((a) => (
          <Card key={a.id} className="border-zinc-800 bg-zinc-900 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs">
                  {a.service}
                </Badge>
                <span className="text-sm text-zinc-200">{a.action}</span>
                {a.scope_used && (
                  <span className="text-xs text-zinc-500">
                    scope: {a.scope_used}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {a.step_up_required && (
                  <Badge
                    variant={
                      a.step_up_approved ? "default" : "destructive"
                    }
                    className="text-xs"
                  >
                    {a.step_up_approved
                      ? "Step-up approved"
                      : "Step-up required"}
                  </Badge>
                )}
                <span className="text-xs text-zinc-500">
                  {new Date(a.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
