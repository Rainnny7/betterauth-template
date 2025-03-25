import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import Footer from "~/components/footer";
import { env, isProd } from "~/lib/env";
import { cn } from "~/lib/utils";
import AppProviders from "~/providers/app-providers";
import "./styles/globals.css";

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
        default: env.NEXT_PUBLIC_APP_NAME,
        template: `%s | ${env.NEXT_PUBLIC_APP_NAME}`,
    },
    description:
        "💂🏼‍♂️ A NextJS template app utilizing BetterAuth for authentication.",
    openGraph: isProd
        ? {
              images: [{ url: "/logo.png", width: 128, height: 128 }],
          }
        : undefined,
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
                        "relative px-5 min-h-screen",
                        "before:hidden sm:before:block before:fixed before:inset-x-0 before:top-14 before:w-full before:h-px before:border-t before:border-dotted before:border-grid-line", // Top grid line
                        "after:hidden sm:after:block after:absolute after:inset-x-0 after:bottom-14 after:w-full after:h-px after:border-t after:border-dotted after:border-grid-line" // Bottom grid line
                    )}
                    style={{
                        background:
                            "linear-gradient(to top, hsla(240, 6%, 10%, 0.35), var(--background))",
                    }}
                >
                    <div
                        className={cn(
                            "mx-auto max-w-screen-3xl relative",
                            "before:hidden sm:before:block before:fixed before:inset-y-0 before:left-[10%] before:w-px before:h-full before:border-l before:border-dotted before:border-grid-line", // Left grid line
                            "after:hidden sm:after:block after:fixed after:inset-y-0 after:right-[10%] after:w-px after:h-full after:border-l after:border-dotted after:border-grid-line" // Right grid line
                        )}
                    >
                        {children}
                    </div>
                    <Footer />
                </div>
            </AppProviders>
        </body>
    </html>
);
export default RootLayout;
