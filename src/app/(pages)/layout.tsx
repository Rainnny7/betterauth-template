import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import Toolbar from "~/components/toolbar";
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
                    className="px-5"
                    style={{
                        background:
                            "linear-gradient(to top, hsla(240, 6%, 10%, 0.45), var(--background))",
                    }}
                >
                    <div className="min-h-screen mx-auto max-w-screen-2xl flex flex-col justify-center items-center">
                        {children}
                    </div>
                    <Toolbar />
                </div>
            </AppProviders>
        </body>
    </html>
);
export default RootLayout;
