import { ServiceStatusBar } from "@/components/dashboard/service-status-bar";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { WorkflowGrid } from "@/components/dashboard/workflow-grid";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <ServiceStatusBar />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <WorkflowGrid />
        <ActivityFeed />
      </div>
    </div>
  );
}
