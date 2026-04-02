"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AuditEntry {
  id: number;
  service: string;
  action: string;
  scope_used: string;
  step_up_required: boolean;
  step_up_approved: boolean | null;
  timestamp: string;
}

export function AuditLog({ entries }: { entries: AuditEntry[] }) {
  return (
    <Card className="border-zinc-800 bg-zinc-900 p-5">
      <h3 className="mb-4 font-semibold">Audit Log</h3>
      <ScrollArea className="h-[400px]">
        <div className="space-y-2">
          {entries.length === 0 && (
            <p className="text-sm text-zinc-500">
              No activity yet. Connect services and run workflows to see logs
              here.
            </p>
          )}
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between rounded-md border border-zinc-800 px-3 py-2 text-sm"
            >
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs">
                  {entry.service}
                </Badge>
                <span className="text-zinc-300">{entry.action}</span>
              </div>
              <div className="flex items-center gap-2">
                {entry.step_up_required && (
                  <Badge
                    variant={
                      entry.step_up_approved ? "default" : "destructive"
                    }
                    className="text-xs"
                  >
                    {entry.step_up_approved ? "Approved" : "Step-up"}
                  </Badge>
                )}
                <span className="text-xs text-zinc-500">
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
