"use client";

import { LucideIcon, Monitor, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ReactElement } from "react";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";

type Theme = {
    name: string;
    icon: LucideIcon;
};

const THEMES: Theme[] = [
    { name: "Light", icon: Sun },
    { name: "Dark", icon: MoonStar },
    { name: "System", icon: Monitor },
];

const ThemeSwitcher = (): ReactElement => {
    const { theme: currentTheme, setTheme } = useTheme();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="size-5 opacity-80 hover:opacity-100 hover:!bg-transparent"
                    variant="ghost"
                    size="icon"
                >
                    <Sun className="size-[1.2rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0 transition-all transform-gpu" />
                    <MoonStar className="absolute size-[1.2rem] rotate-90 scale-0 dark:rotate-0 dark:scale-100 transition-all transform-gpu" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {THEMES.map((theme: Theme) => {
                    const active: boolean =
                        theme.name.toLowerCase() === currentTheme;
                    return (
                        <DropdownMenuItem
                            key={theme.name}
                            className={cn(
                                active && "text-primary/90 hover:!text-primary"
                            )}
                            onClick={() => setTheme(theme.name.toLowerCase())}
                        >
                            <theme.icon className="size-4 mr-1" />
                            {theme.name}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default ThemeSwitcher;
