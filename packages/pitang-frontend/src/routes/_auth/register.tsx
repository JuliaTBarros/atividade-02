import {createFileRoute} from "@tanstack/react-router";
import {SignupForm} from "@/features/auth/ui/signup-form";
import {useAuth} from "@/features/auth/hooks/use-auth";
import {useNavigate} from "@tanstack/react-router";
import {useEffect} from "react";

export const Route = createFileRoute("/_auth/register")({
    component: RouteComponent,
});

function RouteComponent() {
    const {loggedUser, isInitialized} = useAuth();
    const navigate = useNavigate();

    // Se já está logado, redireciona para dashboard
    useEffect(() => {
        if (isInitialized && loggedUser) {
            navigate({to: "/dashboard"});
        }
    }, [loggedUser, navigate, isInitialized]);

    return <SignupForm/>;
}
