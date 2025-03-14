"use client";

import { ViewTransitions } from "next-view-transitions";
import { ReactNode } from "react";
import { ThemeProvider } from "~/components/theme-provider";
import { TooltipProvider } from "~/components/ui/tooltip";

const AppProviders = ({ children }: { children: ReactNode }) => (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
            <ViewTransitions>{children}</ViewTransitions>
        </TooltipProvider>
    </ThemeProvider>
);
export default AppProviders;
