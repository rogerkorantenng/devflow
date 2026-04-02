import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Badge } from "@/components/ui/badge";

export function StepUpNode({ data }: NodeProps) {
  return (
    <div className="min-w-[180px] rounded-lg border-2 border-red-600 bg-zinc-900 p-3 shadow-lg animate-pulse">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-red-500 !w-3 !h-3"
      />
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{data.icon as string}</span>
        <span className="text-sm font-semibold text-red-400">
          {data.label as string}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Badge variant="outline" className="text-xs">
          {data.service as string}
        </Badge>
        <Badge
          variant="outline"
          className="text-xs text-red-400 border-red-800"
        >
          step-up
        </Badge>
      </div>
      <p className="mt-1 text-xs text-red-400/70">Requires approval</p>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-red-500 !w-3 !h-3"
      />
    </div>
  );
}
