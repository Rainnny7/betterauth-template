"use client";

import { ViewTransitions } from "next-view-transitions";
import { ReactNode } from "react";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";

const AppProviders = ({ children }: { children: ReactNode }) => (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
            <ViewTransitions>
                {children}
                <Toaster />
            </ViewTransitions>
        </TooltipProvider>
    </ThemeProvider>
);
export default AppProviders;
