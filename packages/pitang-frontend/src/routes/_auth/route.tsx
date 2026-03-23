import {cn} from "@/shared/lib/utils";
import {createFileRoute, Link, Outlet, useRouterState} from "@tanstack/react-router";
import {GalleryVerticalEnd} from "lucide-react";

export const Route = createFileRoute("/_auth")({
    component: RouteComponent,
});

function RouteComponent() {
    const pathname = useRouterState({select: (s) => s.location.pathname});

    const isLogin = pathname === "/login";
    const isRegister = pathname === "/register";

    const sideImageSrc = isLogin
        ? "/auth/login-side.jpg"
        : "/auth/register-side.svg";

    const sideImageAlt = isLogin
        ? "Imagem da tela de login"
        : "Imagem da tela de cadastro";

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div
                className={cn(
                    "flex flex-col gap-4 p-6 md:p-10",
                    isRegister && "lg:order-2",
                )}
            >
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link to="/" className="flex items-center gap-2 font-medium">
                        <div
                            className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <GalleryVerticalEnd className="size-4"/>
                        </div>
                        Acme Inc.
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <Outlet/>
                    </div>
                </div>
            </div>

            <div
                className={cn(
                    "relative hidden bg-muted lg:block",
                    isRegister && "lg:order-1",
                )}
            >
                <img
                    src={sideImageSrc}
                    alt={sideImageAlt}
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-90"
                />
            </div>
        </div>
    );
}
