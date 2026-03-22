import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export const Route = createFileRoute("/About")({
  component: AboutRouteComponent,
});

function AboutRouteComponent() {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          This page is ready for your project description and team details.
        </CardContent>
      </Card>
    </div>
  );
}

