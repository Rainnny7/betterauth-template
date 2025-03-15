"use client";

import { ViewTransitions } from "next-view-transitions";
import { ReactNode } from "react";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { ThemeProvider } from "~/providers/theme-provider";

const AppProviders = ({ children }: { children: ReactNode }) => (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
            <ViewTransitions>
                {children}
                <Toaster
                    position="bottom-center"
                    toastOptions={{
                        classNames: {
                            toast: "!mx-auto !py-2 !w-fit !rounded-3xl !left-1/2 !-translate-x-1/2 !right-auto",
                            success: "!text-green-500",
                            error: "!text-red-500",
                            content: "!text-white/95",
                        },
                    }}
                />
            </ViewTransitions>
        </TooltipProvider>
    </ThemeProvider>
);
export default AppProviders;
