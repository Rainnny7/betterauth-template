import { Github, LucideIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ReactElement } from "react";
import SimpleTooltip from "~/components/simple-tooltip";
import { auth } from "~/lib/auth";
import { env } from "~/lib/env";

type NavbarLink = {
    label: string;
    href: string;
    icon: LucideIcon;
};

const links: NavbarLink[] = [
    {
        label: "Our GitHub",
        href: "https://github.com/Rainnny7/betterauth-template",
        icon: Github,
    },
];

const DashboardNavbar = (): ReactElement => (
    <nav className="fixed inset-x-0 sm:inset-x-[calc(10%+1rem)] top-0 px-5 sm:px-0 h-14 flex items-center justify-between bg-background/80 backdrop-blur-sm border-b sm:border-none border-dotted border-grid-line transition-all transform-gpu z-40">
        {/* Branding */}
        <Link
            className="flex items-center gap-4 hover:opacity-75 transition-opacity transform-gpu"
            href={auth.options.authRedirect ?? "/"}
            draggable={false}
        >
            <Image
                src="/logo.png"
                alt="BetterAuth Logo"
                width={28}
                height={28}
                draggable={false}
            />
            <h1 className="hidden xs:block text-lg font-bold">
                {env.NEXT_PUBLIC_APP_NAME}
            </h1>
        </Link>

        <div className="flex items-center gap-2">
            {links.map((link: NavbarLink) => (
                <SimpleTooltip key={link.label} content={`View ${link.label}`}>
                    <Link
                        className="hover:opacity-75 transition-opacity transform-gpu"
                        href={link.href}
                        target={
                            !link.href.startsWith("/") ? "_blank" : undefined
                        }
                        draggable={false}
                    >
                        <link.icon className="size-5" />
                    </Link>
                </SimpleTooltip>
            ))}
        </div>
    </nav>
);
export default DashboardNavbar;
