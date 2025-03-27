import { Metadata } from "next";
import { ReactElement } from "react";
import { Button } from "~/components/ui/button";
import { getCurrentUser } from "~/lib/auth";

export const metadata: Metadata = {
    title: "Dashboard",
};

const DashboardPage = async (): Promise<ReactElement> => {
    const { user } = await getCurrentUser();
    return (
        <main className="min-h-screen flex flex-col">
            Welcome {user?.name}
            <Button>Bob</Button>
        </main>
    );
};
export default DashboardPage;
