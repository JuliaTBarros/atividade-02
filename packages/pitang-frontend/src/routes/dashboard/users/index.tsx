// packages/pitang-frontend/src/routes/dashboard/users/index.tsx
import {createFileRoute} from "@tanstack/react-router";
import {UsersPage} from "@/pages/dashboard/users/users.page";

export const Route = createFileRoute("/dashboard/users/")({
    component: UsersPage,
});
