import {
    BadgeCheck,
    Bell,
    Calendar,
    ChevronsUpDown,
    CreditCard,
    Home,
    Inbox,
    LogOut,
    Plus,
    Search,
    Settings,
    Sparkles,
} from "lucide-react";
import { ReactElement } from "react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/sidebar";

const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
];

const DashboardSidebar = (): ReactElement => {
    return (
        <Sidebar
            className="sticky inset-y-0 left-0 max-h-[calc(100vh-3.5rem)] -ml-5 sm:px-1.5 border-r border-dotted border-grid-line transition-all transform-gpu"
            collapsible="none"
        >
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <UserFooter />
            </SidebarFooter>
        </Sidebar>
    );
};

const teams = [
    {
        name: "Team 1",
        logo: Home,
        plan: "Pro",
    },
    {
        name: "Team 2",
        logo: Inbox,
        plan: "Free",
    },
];

const TeamSwitcher = (): ReactElement => (
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <div className="size-4 rounded-full bg-red-500" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                                {teams[0].name}
                            </span>
                            <span className="truncate text-xs">
                                {teams[0].plan}
                            </span>
                        </div>
                        <ChevronsUpDown className="ml-auto" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    align="start"
                    side="right"
                    sideOffset={4}
                >
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                        Teams
                    </DropdownMenuLabel>
                    {teams.map((team, index) => (
                        <DropdownMenuItem key={team.name} className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-sm border">
                                <team.logo className="size-4 shrink-0" />
                            </div>
                            {team.name}
                            <DropdownMenuShortcut>
                                ⌘{index + 1}
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 p-2">
                        <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                            <Plus className="size-4" />
                        </div>
                        <div className="font-medium text-muted-foreground">
                            Add team
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
);

const UserFooter = (): ReactElement => (
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <Avatar className="h-8 w-8 rounded-lg">
                            {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                            <AvatarFallback className="rounded-lg">
                                CN
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">John</span>
                            <span className="truncate text-xs">
                                john@doe.com
                            </span>
                        </div>
                        <ChevronsUpDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side="right"
                    align="end"
                    sideOffset={4}
                >
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                                {/* <AvatarImage
                                    src={user.avatar}
                                    alt={user.name}
                                /> */}
                                <AvatarFallback className="rounded-lg">
                                    CN
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    John
                                </span>
                                <span className="truncate text-xs">
                                    john@doe.com
                                </span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Sparkles />
                            Upgrade to Pro
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <BadgeCheck />
                            Account
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CreditCard />
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Bell />
                            Notifications
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogOut />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
);

export default DashboardSidebar;
