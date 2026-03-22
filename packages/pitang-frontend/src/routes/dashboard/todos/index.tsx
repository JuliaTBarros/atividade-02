import {createFileRoute} from "@tanstack/react-router";
import {TodosPage} from "@/pages/dashboard/todos/todos.page";

export const Route = createFileRoute("/dashboard/todos/")({
    component: TodosPage,
});
