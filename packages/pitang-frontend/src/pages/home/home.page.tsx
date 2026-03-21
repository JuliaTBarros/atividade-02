import { Button } from "@/shared/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <Button variant="destructive">Hello from Home</Button>
    </div>
  );
}

