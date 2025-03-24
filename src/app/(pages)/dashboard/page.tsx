import { Metadata } from "next";
import { headers } from "next/headers";
import { ReactElement } from "react";
import { auth } from "~/lib/auth";

export const metadata: Metadata = {
    title: "Dashboard",
};

const DashboardPage = async (): Promise<ReactElement> => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return <main className="min-h-screen">Welcome {session?.user?.name}</main>;
};
export default DashboardPage;
