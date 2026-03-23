import {createFileRoute} from "@tanstack/react-router";
import {HomeScreen} from "@/features/home/ui/home-screen";

export const Route = createFileRoute("/")({
    component: HomeScreen,
});

