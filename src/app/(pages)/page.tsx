import { Github, LogIn } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ReactElement } from "react";
import AnimatedRightChevron from "~/components/animated-right-chevron";
import { AuroraText } from "~/components/magicui/aurora-text";
import { Button } from "~/components/ui/button";

const LandingPage = (): ReactElement => (
    <main className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col gap-4 justify-center">
            {/* Logo */}
            <Image
                src="/logo.png"
                alt="BetterAuth Logo"
                width={54}
                height={54}
                draggable={false}
            />

            <div className="flex flex-col gap-5 xs:gap-4">
                {/* Header */}
                <div className="flex flex-col gap-1.5">
                    <AuroraText
                        className="!h-8 text-2xl lg:text-3xl font-bold"
                        colors={[
                            "#1447e6",
                            "#155dfc",
                            "#155dfc",
                            "#2b7fff",
                            "#2b7fff",
                            "#2b7fff",
                            "#2b7fff",
                        ]}
                    >
                        BetterAuth Template
                    </AuroraText>

                    <p className="max-w-lg md:max-w-none text-sm text-muted-foreground">
                        A template for building a web app using BetterAuth for
                        authentication.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col xs:flex-row gap-2 xs:items-center">
                    {/* Get Started */}
                    <Link
                        href="https://github.com/Rainnny7/betterauth-template"
                        target="_blank"
                        draggable={false}
                    >
                        <Button
                            className="group w-full xs:w-40 gap-3"
                            size="sm"
                        >
                            <Github />
                            Get Started
                            <AnimatedRightChevron />
                        </Button>
                    </Link>

                    {/* Login */}
                    <Link href="/auth" draggable={false}>
                        <Button
                            className="w-full xs:w-32 gap-3"
                            variant="secondary"
                            size="sm"
                        >
                            Login <LogIn />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </main>
);
export default LandingPage;
