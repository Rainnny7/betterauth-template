import { ReactElement, ReactNode } from "react";
import DashboardNavbar from "~/components/dashboard/dashboard-navbar";
import Toolbar from "~/components/toolbar";
import { SidebarProvider } from "~/components/ui/sidebar";

const DashboardLayout = ({
    children,
}: {
    children: ReactNode;
}): ReactElement => (
    <SidebarProvider>
        {/* <DashboardSidebar /> */}
        <main className="w-full min-h-screen">
            <DashboardNavbar />
            {children}
            <Toolbar />
        </main>
    </SidebarProvider>
);
export default DashboardLayout;
