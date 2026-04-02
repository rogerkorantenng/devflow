"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface WorkflowSummary {
  id: number;
  name: string;
  is_active: boolean;
  updated_at: string;
}

export function WorkflowGrid() {
  const [workflows, setWorkflows] = useState<WorkflowSummary[]>([]);

  useEffect(() => {
    fetch("/api/workflows")
      .then((r) => r.json())
      .then((data) => setWorkflows(data.workflows || []))
      .catch(() => {});
  }, []);

  return (
    <Card className="border-zinc-800 bg-zinc-900 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Workflows</h3>
        <Link
          href="/dashboard/workflows"
          className="text-xs text-zinc-400 hover:text-zinc-300"
        >
          View all
        </Link>
      </div>
      {workflows.length === 0 ? (
        <p className="text-sm text-zinc-500">
          No workflows yet.{" "}
          <Link
            href="/dashboard/workflows"
            className="text-blue-400 hover:underline"
          >
            Create one
          </Link>
        </p>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          {workflows.slice(0, 4).map((w) => (
            <Link key={w.id} href={`/dashboard/workflows/${w.id}`}>
              <Card className="border-zinc-700 bg-zinc-800 p-3 hover:bg-zinc-750 transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{w.name}</span>
                  <Badge
                    variant={w.is_active ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {w.is_active ? "Active" : "Paused"}
                  </Badge>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </Card>
  );
}
