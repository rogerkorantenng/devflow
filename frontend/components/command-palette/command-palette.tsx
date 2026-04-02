"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Command as Cmdk,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "cmdk";
import { Badge } from "@/components/ui/badge";
import { COMMANDS, type Command } from "@/lib/commands";
import { useChat } from "@ai-sdk/react";
import { CommandResult } from "./command-result";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<
    Array<{
      command: string;
      service: string;
      status: "running" | "completed" | "error";
      result?: string;
      timestamp: string;
    }>
  >([]);

  const { append } = useChat({
    api: "/api/agent",
    onFinish: (message) => {
      const text =
        message.parts
          ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
          .map((p) => p.text)
          .join("\n") || "";
      setResults((prev) =>
        prev.map((r) =>
          r.status === "running"
            ? { ...r, status: "completed", result: text }
            : r
        )
      );
    },
    onError: () => {
      setResults((prev) =>
        prev.map((r) =>
          r.status === "running"
            ? { ...r, status: "error", result: "Command failed" }
            : r
        )
      );
    },
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const executeCommand = useCallback(
    (cmd: Command) => {
      setOpen(false);
      const entry = {
        command: cmd.label,
        service: cmd.service,
        status: "running" as const,
        timestamp: new Date().toLocaleTimeString(),
      };
      setResults((prev) => [entry, ...prev]);
      append({ role: "user", content: cmd.description });
    },
    [append]
  );

  const scopeColor = (scope: string) =>
    scope === "read"
      ? "text-green-400 border-green-800"
      : scope === "write"
        ? "text-yellow-400 border-yellow-800"
        : "text-red-400 border-red-800";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Cmdk label="Command palette" className="flex flex-col">
              <CommandInput
                placeholder="Type a command..."
                className="border-b border-zinc-700 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-zinc-500"
              />
              <CommandList className="max-h-[300px] overflow-auto p-2">
                <CommandEmpty className="py-6 text-center text-sm text-zinc-500">
                  No commands found.
                </CommandEmpty>
                <CommandGroup>
                  {COMMANDS.map((cmd) => (
                    <CommandItem
                      key={cmd.id}
                      value={cmd.keywords.join(" ")}
                      onSelect={() => executeCommand(cmd)}
                      className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm aria-selected:bg-zinc-800"
                    >
                      <div>
                        <span className="font-medium">{cmd.label}</span>
                        <span className="ml-2 text-zinc-500">
                          {cmd.description}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="text-xs">
                          {cmd.service}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs ${scopeColor(cmd.scope)}`}
                        >
                          {cmd.scope}
                        </Badge>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Cmdk>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {results.map((r, i) => (
          <CommandResult key={i} {...r} />
        ))}
      </div>
    </>
  );
}
