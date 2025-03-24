import { ReactElement, ReactNode } from "react";
import DashboardNavbar from "~/components/dashboard/dashboard-navbar";
import DashboardSidebar from "~/components/dashboard/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";

const DashboardLayout = ({
    children,
}: {
    children: ReactNode;
}): ReactElement => (
    <SidebarProvider>
        <main
            className={cn(
                "sm:px-[10%] pt-14 w-full min-h-screen flex transition-all transform-gpu",
                "[--sidebar-width:11.5rem] sm:[--sidebar-width:15rem]"
            )}
        >
            <DashboardNavbar />
            <DashboardSidebar />
            <SidebarInset className="pl-5 bg-transparent">
                {children}
            </SidebarInset>
        </main>
    </SidebarProvider>
);
export default DashboardLayout;
