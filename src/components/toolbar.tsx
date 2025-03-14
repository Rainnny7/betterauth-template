import {
    ExternalLink,
    Github,
    Home,
    LogIn,
    LucideIcon,
    Shield,
} from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";
import LoggedIn from "~/components/auth/logged-in";
import LoggedOut from "~/components/auth/logged-out";
import SimpleTooltip from "~/components/simple-tooltip";
import { Button } from "~/components/ui/button";

type ToolbarLink = {
    name: string;
    icon: LucideIcon;
    href: string;
};

const links: ToolbarLink[] = [
    {
        name: "Home",
        icon: Home,
        href: "/",
    },
    {
        name: "BetterAuth",
        icon: Shield,
        href: "https://better-auth.com",
    },
    {
        name: "Star on GitHub <3",
        icon: Github,
        href: "https://github.com/Rainnny7/betterauth-template",
    },
];

const Toolbar = (): ReactElement => (
    <div className="absolute inset-x-0 bottom-6 mx-auto px-2.5 py-1.5 w-fit flex gap-5 justify-between items-center bg-zinc-900/75 backdrop-blur-md border border-muted-foreground/15 rounded-full">
        {/* Links */}
        <div className="flex gap-1.5 items-center">
            {links.map((link: ToolbarLink) => {
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
                                variant="ghost"
                                size="icon"
                                className="size-5"
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
            <LoggedIn>LOGGED IN</LoggedIn>
        </div>
    </div>
);
export default Toolbar;
