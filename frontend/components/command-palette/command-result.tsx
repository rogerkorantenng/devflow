import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CommandResultProps {
  command: string;
  service: string;
  status: "running" | "completed" | "error";
  result?: string;
  timestamp: string;
}

export function CommandResult({
  command,
  service,
  status,
  result,
  timestamp,
}: CommandResultProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {service}
          </Badge>
          <span className="text-sm font-medium">{command}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={
              status === "completed"
                ? "default"
                : status === "error"
                  ? "destructive"
                  : "secondary"
            }
          >
            {status}
          </Badge>
          <span className="text-xs text-zinc-500">{timestamp}</span>
        </div>
      </div>
      {result && (
        <pre className="mt-2 whitespace-pre-wrap rounded-md bg-zinc-950 p-3 text-xs text-zinc-300">
          {result}
        </pre>
      )}
    </Card>
  );
}
