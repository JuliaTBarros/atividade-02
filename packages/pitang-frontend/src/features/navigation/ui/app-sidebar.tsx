import * as React from "react";

import { NavProjects } from "@/features/navigation/ui/nav-projects";
import { NavSecondary } from "@/features/navigation/ui/nav-secondary";
import { NavUser } from "@/features/navigation/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import { FrameIcon, PieChartIcon, MapIcon, TerminalIcon, PackageIcon } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/use-auth";

const data = {
  navSecondary: [],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: <PieChartIcon />,
    },
    {
      name: "Products",
      url: "/dashboard/products",
      icon: <PackageIcon />,
    },
    {
      name: "Users",
      url: "/dashboard/users",
      icon: <MapIcon />,
    },
    {
      name: "Todos",
      url: "/dashboard/todos",
      icon: <FrameIcon />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { loggedUser, handleLogout } = useAuth();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <TerminalIcon className="size-4" />
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
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
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

