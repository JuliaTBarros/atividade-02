import {createFileRoute, Outlet, useLocation} from "@tanstack/react-router";
import {AppSidebar} from "@/features/navigation/ui/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import {Separator} from "@/shared/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/shared/ui/sidebar";
import {Fragment} from "react/jsx-runtime";
import {useAuth} from "@/features/auth/hooks/use-auth";
import {useNavigate} from "@tanstack/react-router";
import {useEffect} from "react";

export const Route = createFileRoute("/dashboard")({
    component: RouteComponent,
});

function RouteComponent() {
    const location = useLocation();
    const {loggedUser, isInitialized} = useAuth();
    const navigate = useNavigate();

    // Se não está logado, redireciona para login (mas só após inicializar)
    useEffect(() => {
        if (isInitialized && !loggedUser) {
            navigate({to: "/login"});
        }
    }, [loggedUser, navigate, isInitialized]);

    // Se ainda está inicializando ou não logado, não renderiza nada
    if (!isInitialized || !loggedUser) {
        return null;
    }

    const paths = location.pathname.split("/").filter(Boolean);

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />

                        <Breadcrumb>
                            <BreadcrumbList>
                                {paths.map((path, index) => {
                                    const lastPath = index + 1 === paths.length;

                                    return (
                                        <Fragment>
                                            <BreadcrumbItem>
                                                <BreadcrumbPage
                                                    className={`capitalize ${lastPath ? "font-bold" : ""}`}
                                                >
                                                    {path}
                                                </BreadcrumbPage>
                                            </BreadcrumbItem>

                                            {!lastPath && (
                                                <BreadcrumbSeparator className="hidden md:block"/>
                                            )}
                                        </Fragment>
                                    );
                                })}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                <Outlet/>
            </SidebarInset>
        </SidebarProvider>
    );
}


