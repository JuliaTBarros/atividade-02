import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/features/auth/ui/login-form";
import { useAuth } from "@/features/auth/hooks/use-auth";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { handleLogin } = useAuth();

  return <LoginForm onSubmit={handleLogin} />;
}
