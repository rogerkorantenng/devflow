import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Badge } from "@/components/ui/badge";

export function ActionNode({ data }: NodeProps) {
  return (
    <div
      className={`min-w-[180px] rounded-lg border-2 ${data.color as string} bg-zinc-900 p-3 shadow-lg`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-blue-500 !w-3 !h-3"
      />
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{data.icon as string}</span>
        <span className="text-sm font-semibold">{data.label as string}</span>
      </div>
      <div className="flex items-center gap-1">
        <Badge variant="outline" className="text-xs">
          {data.service as string}
        </Badge>
        <Badge
          variant="outline"
          className="text-xs text-yellow-400 border-yellow-800"
        >
          write
        </Badge>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-blue-500 !w-3 !h-3"
      />
    </div>
  );
}
