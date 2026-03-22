import * as React from "react";
import {Link} from "@tanstack/react-router";

import {NavProjects} from "@/features/navigation/ui/nav-projects";
import {NavSecondary} from "@/features/navigation/ui/nav-secondary";
import {NavUser} from "@/features/navigation/ui/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/shared/ui/sidebar";
import {FrameIcon, PieChartIcon, MapIcon, PackageIcon, LayoutDashboard, Sun, Moon} from "lucide-react";
import {useAuth} from "@/features/auth/hooks/use-auth";

const data = {
    navSecondary: [],
    projects: [
        {
            name: "Dashboard",
            url: "/dashboard",
            icon: <PieChartIcon/>,
        },
        {
            name: "Products",
            url: "/dashboard/products",
            icon: <PackageIcon/>,
        },
        {
            name: "Users",
            url: "/dashboard/users",
            icon: <MapIcon/>,
        },
        {
            name: "Todos",
            url: "/dashboard/todos",
            icon: <FrameIcon/>,
        },
    ],
};

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    const {loggedUser, handleLogout} = useAuth();

    const [theme, setTheme] = React.useState<"light" | "dark">(() => {
        if (typeof window === "undefined") return "dark";

        const savedTheme = window.localStorage.getItem("theme");
        if (savedTheme === "light" || savedTheme === "dark") return savedTheme;

        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    React.useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        window.localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };


    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            render={<Link to="/"/>}
                        >
                            <div
                                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <LayoutDashboard className="size-4"/>
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {loggedUser?.company?.name}
                </span>
                                <span className="truncate text-xs">
                  {loggedUser?.company?.title}
                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={toggleTheme}
                            role="switch"
                            aria-checked={theme === "dark"}
                            aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
                            title={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
                            className="relative h-8 w-14 rounded-full border border-sidebar-border bg-sidebar-accent/40 p-1 transition-colors data-[state=on]:bg-sidebar-primary/30"
                            data-state={theme === "dark" ? "on" : "off"}
                        >
    <span
        className={`absolute top-1 left-1 flex size-6 items-center justify-center rounded-full bg-sidebar shadow-sm transition-transform ${
            theme === "dark" ? "translate-x-6" : "translate-x-0"
        }`}
    >
      {theme === "dark" ? <Moon className="size-4"/> : <Sun className="size-4"/>}
    </span>

                            <span className="sr-only">
      {theme === "dark" ? "Modo escuro ativado" : "Modo claro ativado"}
    </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>


            <SidebarContent>
                <NavProjects projects={data.projects}/>
                <NavSecondary items={data.navSecondary} className="mt-auto"/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser
                    handleLogout={handleLogout}
                    user={{
                        avatar: loggedUser?.image || "",
                        email: loggedUser?.email || "",
                        name: `${loggedUser?.firstName} ${loggedUser?.lastName}` || "",
                    }}
                />
            </SidebarFooter>
        </Sidebar>
    );
}

