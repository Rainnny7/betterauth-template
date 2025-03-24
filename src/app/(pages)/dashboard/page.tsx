import { Metadata } from "next";
import { headers } from "next/headers";
import { ReactElement } from "react";
import { Button } from "~/components/ui/button";
import { auth } from "~/lib/auth";

export const metadata: Metadata = {
    title: "Dashboard",
};

const DashboardPage = async (): Promise<ReactElement> => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return (
        <main className="min-h-screen flex flex-col">
            Welcome {session?.user?.name}
            <Button>Bob</Button>
        </main>
    );
};
export default DashboardPage;
