// packages/pitang-frontend/src/routes/dashboard/users/index.tsx
import {createFileRoute} from "@tanstack/react-router";
import {UsersScreen} from "@/features/users/ui/users-screen";

export const Route = createFileRoute("/dashboard/users/")({
    component: UsersScreen,
});
