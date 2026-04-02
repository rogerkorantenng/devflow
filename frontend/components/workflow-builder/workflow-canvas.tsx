"use client";

import { useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  type Connection,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TriggerNode, ActionNode, ConditionNode, StepUpNode } from "./nodes";
import { NodeSidebar } from "./node-sidebar";
import { NODE_DEFS } from "@/lib/workflow-nodes";
import { Button } from "@/components/ui/button";

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  "step-up": StepUpNode,
};

interface WorkflowCanvasProps {
  workflowId?: number;
  initialNodes?: Node[];
  initialEdges?: Edge[];
  workflowName?: string;
  onSave?: (name: string, nodes: Node[], edges: Edge[]) => void;
}

export function WorkflowCanvas({
  initialNodes = [],
  initialEdges = [],
  workflowName = "Untitled Workflow",
  onSave,
}: WorkflowCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [name, setName] = useState(workflowName);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...params, animated: true, style: { stroke: "#71717a" } },
          eds
        )
      ),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !reactFlowInstance) return;

      const nodeDef = NODE_DEFS.find((n) => n.type === type);
      if (!nodeDef) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type: nodeDef.category,
        position,
        data: {
          label: nodeDef.label,
          service: nodeDef.service,
          icon: nodeDef.icon,
          color: nodeDef.color,
          nodeType: nodeDef.type,
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [reactFlowInstance, setNodes]
  );

  const handleSave = () => {
    onSave?.(name, nodes, edges);
  };

  return (
    <div className="flex h-full">
      <NodeSidebar />
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent text-lg font-semibold outline-none"
            placeholder="Workflow name..."
          />
          <Button onClick={handleSave} size="sm">
            Save Workflow
          </Button>
        </div>
        <div ref={reactFlowWrapper} className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            className="bg-zinc-950"
          >
            <Controls className="!bg-zinc-800 !border-zinc-700 !text-zinc-300" />
            <Background
              variant={BackgroundVariant.Dots}
              gap={16}
              size={1}
              color="#27272a"
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
