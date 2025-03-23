import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import Toolbar from "~/components/toolbar";
import { cn } from "~/lib/utils";
import AppProviders from "~/providers/app-providers";
import "../styles/globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "BetterAuth Template",
        template: "%s | BetterAuth Template",
    },
    description:
        "💂🏼‍♂️ A NextJS template app utilizing BetterAuth for authentication.",
    openGraph: {
        images: [{ url: "/logo.png", width: 128, height: 128 }],
    },
    twitter: { card: "summary" },
};
export const viewport: Viewport = { themeColor: "#000000" };

const RootLayout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>) => (
    <html lang="en" suppressHydrationWarning>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth select-none`}
        >
            <AppProviders>
                <div
                    className={cn(
                        "px-5",
                        "before:lg:absolute before:inset-x-0 before:top-12 before:w-full before:h-px before:bg-muted/60", // Top grid line
                        "after:lg:absolute after:inset-x-0 after:bottom-12 after:w-full after:h-px after:bg-muted/60" // Bottom grid line
                    )}
                    style={{
                        background:
                            "linear-gradient(to top, hsla(240, 6%, 10%, 0.45), var(--background))",
                    }}
                >
                    <div
                        className={cn(
                            "min-h-screen mx-auto max-w-screen-2xl flex flex-col justify-center items-center",
                            "before:lg:absolute before:inset-y-0 before:left-28 before:w-px before:h-full before:bg-muted/60", // Left grid line
                            "after:lg:absolute after:inset-y-0 after:right-28 after:w-px after:h-full after:bg-muted/60" // Right grid line
                        )}
                    >
                        {children}
                    </div>
                    <Toolbar />
                </div>
            </AppProviders>
        </body>
    </html>
);
export default RootLayout;
