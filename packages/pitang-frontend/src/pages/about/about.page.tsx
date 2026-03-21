import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

export function AboutPage() {
  return <div>Hello from About!</div>;
}

