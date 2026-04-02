"use client";

import { useState, useEffect } from "react";
import { SERVICES } from "@/lib/services";
import { ServiceCard } from "@/components/permissions/service-card";
import { AuditLog } from "@/components/permissions/audit-log";
import { Button } from "@/components/ui/button";

export default function PermissionsPage() {
  const [connectedServices, setConnectedServices] = useState<
    Record<string, boolean>
  >({});
  const [auditEntries, setAuditEntries] = useState<any[]>([]);

  useEffect(() => {
    const username = localStorage.getItem("devflow_username") || "default";
    fetch(`/api/services?username=${username}`)
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, boolean> = {};
        data.services?.forEach((s: any) => {
          map[s.service] = s.status === "active";
        });
        setConnectedServices(map);
      })
      .catch(() => {});

    fetch(`/api/activity?username=${username}`)
      .then((r) => r.json())
      .then((data) => {
        setAuditEntries(data.entries || []);
      })
      .catch(() => {});
  }, []);

  const handleConnect = (serviceId: string) => {
    const username = localStorage.getItem("devflow_username") || "default";
    window.location.href = `/api/services/${serviceId}/connect?username=${username}`;
  };

  const handleDisconnect = async (serviceId: string) => {
    const username = localStorage.getItem("devflow_username") || "default";
    await fetch(`/api/services/${serviceId}?username=${username}`, { method: "DELETE" });
    setConnectedServices((prev) => ({ ...prev, [serviceId]: false }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Permissions</h2>
          <p className="text-sm text-zinc-400">
            Manage connected services and review agent activity
          </p>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            if (confirm("Revoke all tokens and disconnect all services?")) {
              SERVICES.forEach((s) => handleDisconnect(s.id));
            }
          }}
        >
          Revoke All
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            connected={!!connectedServices[service.id]}
            onConnect={() => handleConnect(service.id)}
            onDisconnect={() => handleDisconnect(service.id)}
          />
        ))}
      </div>

      <AuditLog entries={auditEntries} />
    </div>
  );
}
