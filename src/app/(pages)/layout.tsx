import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import Navbar from "~/components/navbar";
import { ThemeProvider } from "~/components/theme-provider";
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
};

const RootLayout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>) => (
    <html lang="en" suppressHydrationWarning>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <Navbar />
                {children}
            </ThemeProvider>
        </body>
    </html>
);
export default RootLayout;
