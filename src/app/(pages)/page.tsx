import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

        <div className="flex flex-col gap-5 items-center">
            {/* Header */}
            <div className="flex flex-col gap-2 items-center">
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
                <p className="text-lg lg:text-xl text-muted-foreground">
                    A template for building a web app using BetterAuth for
                    authentication.
                </p>
            </div>

            {/* Get Started */}
            <Link
                href="https://github.com/Rainnny7/betterauth-template"
                target="_blank"
                draggable={false}
            >
                <Button className="group w-56 gap-3" size="lg">
                    <Github />
                    Get Started
                    <AnimatedRightChevron />
                </Button>
            </Link>
        </div>
    </main>
);
export default LandingPage;
