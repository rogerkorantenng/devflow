"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StepUpModalProps {
  action: string;
  service: string;
  details: string;
  onApprove: () => void;
  onDeny: () => void;
}

export function StepUpModal({
  action,
  service,
  details,
  onApprove,
  onDeny,
}: StepUpModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-md border-red-800 bg-zinc-900 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-900/50 text-red-400 text-xl">
            ⚠
          </div>
          <div>
            <h3 className="font-semibold text-red-400">
              Step-Up Authorization Required
            </h3>
            <p className="text-sm text-zinc-400">
              This action requires elevated approval
            </p>
          </div>
        </div>

        <div className="rounded-md border border-zinc-800 bg-zinc-950 p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {service}
            </Badge>
            <span className="text-sm font-medium">{action}</span>
          </div>
          <p className="text-sm text-zinc-400">{details}</p>
        </div>

        <p className="text-xs text-zinc-500 mb-4">
          You will be asked to verify your identity via MFA before this
          action proceeds.
        </p>

        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={onDeny}>
            Deny
          </Button>
          <Button variant="destructive" onClick={onApprove}>
            Approve & Verify
          </Button>
        </div>
      </Card>
    </div>
  );
}
