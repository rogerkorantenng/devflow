"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ServiceDef } from "@/lib/services";

interface ServiceCardProps {
  service: ServiceDef;
  connected: boolean;
  lastUsed?: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function ServiceCard({
  service,
  connected,
  lastUsed,
  onConnect,
  onDisconnect,
}: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="border-zinc-800 bg-zinc-900 p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${service.color} text-sm font-bold`}
          >
            {service.icon}
          </div>
          <div>
            <h3 className="font-semibold">{service.name}</h3>
            <p className="text-sm text-zinc-400">{service.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={connected ? "default" : "secondary"}>
            {connected ? "Connected" : "Not connected"}
          </Badge>
          <Button
            size="sm"
            variant={connected ? "destructive" : "default"}
            onClick={connected ? onDisconnect : onConnect}
          >
            {connected ? "Disconnect" : "Connect"}
          </Button>
        </div>
      </div>

      {lastUsed && (
        <p className="mt-2 text-xs text-zinc-500">
          Last used: {new Date(lastUsed).toLocaleString()}
        </p>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 text-xs text-zinc-400 hover:text-zinc-300"
      >
        {expanded ? "Hide" : "Show"} scope details
      </button>

      {expanded && (
        <div className="mt-3 space-y-2 text-xs">
          <div>
            <span className="text-green-400">Read:</span>{" "}
            {service.readScopes.map((s) => (
              <Badge
                key={s}
                variant="outline"
                className="mr-1 text-green-400 border-green-800"
              >
                {s}
              </Badge>
            ))}
          </div>
          <div>
            <span className="text-yellow-400">Write:</span>{" "}
            {service.writeScopes.map((s) => (
              <Badge
                key={s}
                variant="outline"
                className="mr-1 text-yellow-400 border-yellow-800"
              >
                {s}
              </Badge>
            ))}
          </div>
          <div>
            <span className="text-red-400">Step-up required:</span>{" "}
            {service.stepUpActions.map((s) => (
              <Badge
                key={s}
                variant="outline"
                className="mr-1 text-red-400 border-red-800"
              >
                {s}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
