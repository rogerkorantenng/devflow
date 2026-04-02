"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Workflow {
  id: number;
  name: string;
  is_active: boolean;
  created_at: string;
}

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  useEffect(() => {
    const username = localStorage.getItem("devflow_username") || "default";
    fetch(`/api/workflows?username=${username}`)
      .then((r) => r.json())
      .then((d) => setWorkflows(d.workflows || []))
      .catch(() => {});
  }, []);

  const createNew = async () => {
    const username = localStorage.getItem("devflow_username") || "default";
    const res = await fetch("/api/workflows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "New Workflow",
        definition: { nodes: [], edges: [] },
        username,
      }),
    });
    const data = await res.json();
    window.location.href = `/dashboard/workflows/${data.id}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Workflows</h2>
        <Button onClick={createNew}>New Workflow</Button>
      </div>

      {workflows.length === 0 ? (
        <Card className="border-zinc-800 bg-zinc-900 p-8 text-center">
          <p className="text-zinc-400 mb-4">
            No workflows yet. Create your first automation pipeline.
          </p>
          <Button onClick={createNew}>Create Workflow</Button>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workflows.map((w) => (
            <Link key={w.id} href={`/dashboard/workflows/${w.id}`}>
              <Card className="border-zinc-800 bg-zinc-900 p-4 hover:border-zinc-600 transition cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{w.name}</h3>
                  <Badge variant={w.is_active ? "default" : "secondary"}>
                    {w.is_active ? "Active" : "Paused"}
                  </Badge>
                </div>
                <p className="text-xs text-zinc-500">
                  Created {new Date(w.created_at).toLocaleDateString()}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
