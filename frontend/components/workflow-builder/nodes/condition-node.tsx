import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Badge } from "@/components/ui/badge";

export function ConditionNode({ data }: NodeProps) {
  return (
    <div className="min-w-[180px] rounded-lg border-2 border-yellow-600 bg-zinc-900 p-3 shadow-lg">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-yellow-500 !w-3 !h-3"
      />
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{data.icon as string}</span>
        <span className="text-sm font-semibold text-yellow-400">
          {data.label as string}
        </span>
      </div>
      <Badge variant="outline" className="text-xs">
        {data.service as string}
      </Badge>
      <div className="flex justify-between mt-2">
        <Handle
          type="source"
          position={Position.Bottom}
          id="yes"
          className="!bg-green-500 !w-3 !h-3 !left-[30%]"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="no"
          className="!bg-red-500 !w-3 !h-3 !left-[70%]"
        />
      </div>
    </div>
  );
}
