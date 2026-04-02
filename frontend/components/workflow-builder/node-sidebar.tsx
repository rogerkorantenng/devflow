"use client";

import { Badge } from "@/components/ui/badge";
import { NODE_DEFS, type NodeCategory } from "@/lib/workflow-nodes";

const categories: { key: NodeCategory; label: string; color: string }[] = [
  { key: "trigger", label: "Triggers", color: "text-green-400" },
  { key: "action", label: "Actions", color: "text-blue-400" },
  { key: "condition", label: "Conditions", color: "text-yellow-400" },
  { key: "step-up", label: "Step-Up Auth", color: "text-red-400" },
];

export function NodeSidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-4 overflow-auto">
      <h3 className="mb-4 text-sm font-semibold text-zinc-400">
        Drag nodes to canvas
      </h3>
      {categories.map((cat) => (
        <div key={cat.key} className="mb-4">
          <h4
            className={`mb-2 text-xs font-semibold uppercase ${cat.color}`}
          >
            {cat.label}
          </h4>
          <div className="space-y-1">
            {NODE_DEFS.filter((n) => n.category === cat.key).map((node) => (
              <div
                key={node.type}
                draggable
                onDragStart={(e) => onDragStart(e, node.type)}
                className="flex cursor-grab items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm hover:border-zinc-600 active:cursor-grabbing"
              >
                <span>{node.icon}</span>
                <span>{node.label}</span>
                <Badge variant="outline" className="ml-auto text-xs">
                  {node.service}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
