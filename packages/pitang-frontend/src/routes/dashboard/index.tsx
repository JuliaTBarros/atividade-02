import { createFileRoute } from "@tanstack/react-router";
import { DashboardScreen } from "@/features/dashboard/ui/dashboard-screen";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardScreen,
});

