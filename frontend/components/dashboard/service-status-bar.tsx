"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/services";

export function ServiceStatusBar() {
  const [connected, setConnected] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, boolean> = {};
        data.services?.forEach((s: any) => {
          map[s.service] = s.status === "active";
        });
        setConnected(map);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex gap-2">
      {SERVICES.map((s) => (
        <Badge
          key={s.id}
          variant="outline"
          className={
            connected[s.id]
              ? "border-green-700 text-green-400"
              : "border-zinc-700 text-zinc-500"
          }
        >
          {s.icon} {s.name}
        </Badge>
      ))}
    </div>
  );
}
