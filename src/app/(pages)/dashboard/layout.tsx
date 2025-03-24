import { ReactElement, ReactNode } from "react";
import DashboardNavbar from "~/components/dashboard/dashboard-navbar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

const DashboardLayout = ({
    children,
}: {
    children: ReactNode;
}): ReactElement => (
    <SidebarProvider>
        <main className="px-[10%] pt-14 w-full min-h-screen flex">
            <DashboardNavbar />
            {/* <DashboardSidebar /> */}
            <SidebarInset className="bg-transparent">{children}</SidebarInset>
        </main>
    </SidebarProvider>
);
export default DashboardLayout;
