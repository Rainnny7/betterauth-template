import { Metadata } from "next";
import { ReactElement } from "react";

export const metadata: Metadata = {
    title: "Dashboard",
};

const DashboardPage = (): ReactElement => {
    return <main className="min-h-screen">Welcome</main>;
};
export default DashboardPage;
