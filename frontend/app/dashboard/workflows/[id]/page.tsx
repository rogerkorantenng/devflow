"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { WorkflowCanvas } from "@/components/workflow-builder/workflow-canvas";
import type { Node, Edge } from "@xyflow/react";

export default function WorkflowEditorPage() {
  const { id } = useParams();
  const [workflow, setWorkflow] = useState<{
    name: string;
    definition: { nodes: Node[]; edges: Edge[] };
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/workflows/${id}`)
      .then((r) => r.json())
      .catch(() => null)
      .then((data) => {
        if (data?.name) {
          setWorkflow(data);
        } else {
          setWorkflow({
            name: "New Workflow",
            definition: { nodes: [], edges: [] },
          });
        }
        setLoading(false);
      });
  }, [id]);

  const handleSave = async (name: string, nodes: Node[], edges: Edge[]) => {
    await fetch(`/api/workflows/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, definition: { nodes, edges } }),
    });
  };

  if (loading)
    return <div className="p-8 text-zinc-400">Loading...</div>;

  return (
    <div className="h-[calc(100vh-4rem)] -m-8">
      <WorkflowCanvas
        workflowId={Number(id)}
        initialNodes={workflow?.definition?.nodes || []}
        initialEdges={workflow?.definition?.edges || []}
        workflowName={workflow?.name}
        onSave={handleSave}
      />
    </div>
  );
}
