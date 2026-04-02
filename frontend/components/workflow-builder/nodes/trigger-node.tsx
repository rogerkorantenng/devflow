import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Badge } from "@/components/ui/badge";

export function TriggerNode({ data }: NodeProps) {
  return (
    <div className="min-w-[180px] rounded-lg border-2 border-green-600 bg-zinc-900 p-3 shadow-lg">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{data.icon as string}</span>
        <span className="text-sm font-semibold text-green-400">
          {data.label as string}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Badge variant="outline" className="text-xs">
          {data.service as string}
        </Badge>
        <Badge
          variant="outline"
          className="text-xs text-green-400 border-green-800"
        >
          trigger
        </Badge>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-green-500 !w-3 !h-3"
      />
    </div>
  );
}
