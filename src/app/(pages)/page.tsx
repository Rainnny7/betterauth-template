import { Github, LogIn } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ReactElement } from "react";
import AnimatedRightChevron from "~/components/animated-right-chevron";
import { AuroraText } from "~/components/magicui/aurora-text";
import { Button } from "~/components/ui/button";

const LandingPage = (): ReactElement => (
    <main className="flex flex-col gap-14 justify-center text-center items-center">
        {/* Logo */}
        <Image
            src="/logo.png"
            alt="BetterAuth Logo"
            width={124}
            height={124}
            draggable={false}
        />

        <div className="flex flex-col gap-6 items-center">
            {/* Header */}
            <div className="flex flex-col gap-3.5 items-center">
                <div className="relative">
                    <AuroraText
                        className="!h-14 text-4xl lg:text-5xl font-bold"
                        colors={[
                            "#1447e6",
                            "#155dfc",
                            "#155dfc",
                            "#2b7fff",
                            "#2b7fff",
                            "#2b7fff",
                        ]}
                    >
                        BetterAuth Template
                    </AuroraText>

                    <span className="absolute inset-x-0 -bottom-2.5 text-xs text-muted-foreground/65">
                        Made by{" "}
                        <Link
                            className="text-primary/85 hover:text-primary transition-colors transform-gpu"
                            href="https://github.com/Rainnny7"
                            target="_blank"
                        >
                            Rainnny7
                        </Link>{" "}
                        <span className="animate-pulse">❤️</span>
                    </span>
                </div>

                <p className="max-w-lg md:max-w-none md:text-lg text-muted-foreground">
                    A template for building a web app using BetterAuth for
                    authentication.
                </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 items-center">
                {/* Get Started */}
                <Link
                    href="https://github.com/Rainnny7/betterauth-template"
                    target="_blank"
                    draggable={false}
                >
                    <Button className="group w-52 gap-3" size="lg">
                        <Github />
                        Get Started
                        <AnimatedRightChevron />
                    </Button>
                </Link>

                {/* Login */}
                <Link href="/auth" draggable={false}>
                    <Button
                        className="w-36 gap-3"
                        variant="secondary"
                        size="lg"
                    >
                        Login <LogIn />
                    </Button>
                </Link>
            </div>
        </div>
    </main>
);
export default LandingPage;
