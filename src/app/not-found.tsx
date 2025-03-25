"use client";

import { ArrowLeft } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import { Button } from "~/components/ui/button";

const NotFoundPage = (): ReactElement => {
    const router: AppRouterInstance = useRouter();
    return (
        <main className="min-h-screen flex justify-center items-center">
            <div className="flex gap-14">
                {/* Left */}
                <div className="hidden md:flex flex-col gap-3">
                    <Image
                        src="/Mike_Wazowski.png"
                        alt="404"
                        width={132}
                        height={132}
                        unoptimized
                    />
                </div>

                {/* Right */}
                <div className="py-4 flex flex-col gap-2.5">
                    <h1 className="text-4xl font-bold">Page not found</h1>
                    <p className="text-muted-foreground">
                        The page you are looking for does not exist.
                    </p>
                    <Button
                        className="group mt-3 md:mt-auto w-fit"
                        variant="secondary"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform transform-gpu" />
                        Go Back
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default NotFoundPage;
