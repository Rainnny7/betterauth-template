"use client";

import {
    Book,
    ExternalLink,
    Github,
    Home,
    LogIn,
    LucideIcon,
} from "lucide-react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import LoggedOut from "~/components/auth/logged-out";
import UserAvatar from "~/components/auth/user-avatar";
import UserPopover from "~/components/auth/user-dropdown";
import SimpleTooltip from "~/components/simple-tooltip";
import ThemeSwitcher from "~/components/theme-switcher";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { User } from "~/types/auth";

type ToolbarLink = {
    name: string;
} & (
    | {
          icon: LucideIcon;
          href: string;
          element?: never;
      }
    | {
          icon?: never;
          href?: never;
          element: ReactElement;
      }
);

const links: ToolbarLink[] = [
    {
        name: "Home",
        icon: Home,
        href: "/",
    },
    {
        name: "BetterAuth",
        icon: Book,
        href: "https://better-auth.com/docs",
    },
    {
        name: "Star on GitHub <3",
        icon: Github,
        href: "https://github.com/Rainnny7/betterauth-template",
    },
    {
        name: "Theme Switcher",
        element: <ThemeSwitcher />,
    },
];

const Toolbar = (): ReactElement => {
    const path: string = usePathname();
    return (
        <div className="fixed inset-x-0 bottom-9 mx-auto px-2.5 py-1.5 w-fit flex gap-5 justify-between items-center bg-zinc-900/75 backdrop-blur-md border border-muted-foreground/15 rounded-full z-50">
            {/* Links */}
            <div className="flex gap-1.5 items-center">
                {links.map((link: ToolbarLink) => {
                    // If the link has an element, render it
                    if (link.element) {
                        return (
                            <SimpleTooltip key={link.name} content={link.name}>
                                <div className="flex items-center">
                                    {link.element}
                                </div>
                            </SimpleTooltip>
                        );
                    }
                    // If the link has a href, render it
                    const active: boolean = path === link.href;
                    const external: boolean = !link.href.startsWith("/");
                    return (
                        <SimpleTooltip
                            key={link.name}
                            content={
                                <div className="flex gap-1.5 items-center">
                                    {link.name}
                                    {external && (
                                        <ExternalLink className="size-3 text-muted-foreground" />
                                    )}
                                </div>
                            }
                        >
                            <Link
                                className="flex items-center"
                                href={link.href}
                                target={external ? "_blank" : "_self"}
                                draggable={false}
                            >
                                <Button
                                    className={cn(
                                        "size-5 opacity-80 hover:opacity-100 hover:!bg-transparent",
                                        active &&
                                            "text-primary hover:text-primary"
                                    )}
                                    variant="ghost"
                                    size="icon"
                                >
                                    <link.icon />
                                </Button>
                            </Link>
                        </SimpleTooltip>
                    );
                })}
            </div>

            {/* Profile */}
            <div>
                {/* Login */}
                <LoggedOut>
                    <SimpleTooltip content="Login">
                        <Link href="/auth" draggable={false}>
                            <Button className="h-6" variant="outline" size="sm">
                                Login
                                <LogIn className="size-3.5" />
                            </Button>
                        </Link>
                    </SimpleTooltip>
                </LoggedOut>

                {/* Profile */}
                <UserPopover
                    trigger={(user: User) => (
                        <Button className="h-6" variant="outline" size="sm">
                            {user.username ? `@${user.username}` : user.name}
                            <UserAvatar size="xs" />
                        </Button>
                    )}
                />
            </div>
        </div>
    );
};
export default Toolbar;
