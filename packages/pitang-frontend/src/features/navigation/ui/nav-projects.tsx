import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/shared/ui/sidebar";

import {Link} from "@tanstack/react-router";

export function NavProjects({
                                projects,
                            }: {
    projects: {
        name: string;
        url: React.ComponentProps<typeof Link>["to"];
        icon: React.ReactNode;
    }[];
}) {
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarMenu>
                {projects.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton render={<Link to={item.url}/>}>
                            {item.icon}
                            <span>{item.name}</span>
                        </SidebarMenuButton>

                    </SidebarMenuItem>
                ))}

            </SidebarMenu>
        </SidebarGroup>
    );
}
