import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/pages/about/about.page";

export const Route = createFileRoute("/About")({
  component: AboutPage,
});

