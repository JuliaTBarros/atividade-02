import {createFileRoute} from "@tanstack/react-router";
import {TodosScreen} from "@/features/todos/ui/todos-screen";

export const Route = createFileRoute("/dashboard/todos/")({
    component: TodosScreen,
});
