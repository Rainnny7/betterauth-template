import { Home, LucideIcon, Paperclip } from "lucide-react";
import { Link } from "next-view-transitions";
import { ReactElement } from "react";
import UserFooter from "~/components/dashboard/dashboard-sidebar/user-footer";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/sidebar";
import { getCurrentUser } from "~/lib/auth";
import { cn } from "~/lib/utils";

type SidebarItem = {
    title: string;
    url: string;
    icon: LucideIcon;
};

const items: SidebarItem[] = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Something",
        url: "/dashboard/something",
        icon: Paperclip,
    },
    {
        title: "Something",
        url: "/dashboard/something",
        icon: Paperclip,
    },
    {
        title: "Something",
        url: "/dashboard/something",
        icon: Paperclip,
    },
];

const DashboardSidebar = async (): Promise<ReactElement> => {
    const { user } = await getCurrentUser();
    return (
        <Sidebar
            className="sticky inset-y-0 left-0 max-h-[calc(100vh-3.5rem)] -ml-5 sm:px-1.5 border-r border-dotted border-grid-line transition-all transform-gpu"
            collapsible="none"
        >
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Overview</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item: SidebarItem, index: number) => {
                                const active: boolean = index === 0;
                                return (
                                    <SidebarMenuItem
                                        key={index}
                                        className={cn(
                                            active &&
                                                "bg-sidebar-accent/75 border border-zinc-700/50 rounded-lg"
                                        )}
                                    >
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <UserFooter user={user} />
            </SidebarFooter>
        </Sidebar>
    );
};
export default DashboardSidebar;
