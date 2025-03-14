"use client";

import { BetterAuthOptions } from "better-auth";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactElement, ReactNode, useState } from "react";
import LoginForm from "~/components/auth/auth-form/login-form";
import OAuthProviders from "~/components/auth/auth-form/oauth-providers";
import RegistrationForm from "~/components/auth/auth-form/registration-form";
import SimpleTooltip from "~/components/simple-tooltip";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { env, isProd } from "~/lib/env";
import { cn } from "~/lib/utils";

export type AuthFormType = "auto" | "login" | "register";

type AuthFormProps = {
    /**
     * The optional class name to apply to the form.
     */
    className?: string | undefined;

    /**
     * The BetterAuth options to use.
     */
    authOptions: BetterAuthOptions;

    /**
     * The type of auth form to render.
     * <p>
     * auto - The form will dynamically change based on if the user has an account associated with the email.
     * login - The form will only be for logging in.
     * register - The form will only be for registering.
     * </p>
     */
    type?: AuthFormType;

    /**
     * The link to the logo to display in the form.
     */
    logo?: string;

    /**
     * The title of the form.
     */
    title?: string;

    /**
     * The terms and conditions to display in the form.
     */
    termsAndConditions?: string;

    /**
     * The privacy policy to display in the form.
     */
    privacyPolicy?: string;
};

const AuthForm = ({
    className,
    authOptions,
    type: initialType = "auto",
    logo = "/logo.png",
    title,
    termsAndConditions,
    privacyPolicy,
}: AuthFormProps): ReactElement => {
    const router: AppRouterInstance = useRouter();
    const [type, setType] = useState<AuthFormType>(initialType);
    const [error, setError] = useState<string | undefined>(undefined);

    // Obtain the title from the form type if needed
    if (!title) {
        title =
            (type === "auto"
                ? "Welcome"
                : type === "login"
                ? "Login"
                : "Register") + ` to ${env.NEXT_PUBLIC_APP_NAME}`;
    }

    // Render the form
    return (
        <div className="flex flex-col">
            {/* Card */}
            <div
                className={cn(
                    "relative px-9 py-7 min-w-96 flex flex-col gap-5 bg-card border border-muted/65 rounded-lg select-none z-10",
                    className
                )}
            >
                {/* Back Button */}
                <SimpleTooltip content="Go Back" side="bottom">
                    <Button
                        className="group absolute top-2.5 left-2.5 text-muted-foreground hover:!bg-transparent"
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                    >
                        <ArrowLeftIcon className="size-4 group-hover:-translate-x-0.5 transition-transform transform-gpu" />
                    </Button>
                </SimpleTooltip>

                <Header logo={logo} title={title} />

                {/* OAuth */}
                {authOptions.socialProviders && (
                    <>
                        <OAuthProviders
                            authOptions={authOptions}
                            setError={setError}
                        />
                        {authOptions.emailAndPassword?.enabled && (
                            <div className="relative my-1.5">
                                <Separator />
                                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-card px-5 text-sm text-muted-foreground">
                                    Or
                                </span>
                            </div>
                        )}
                    </>
                )}

                {/* Login/Registration Forms */}
                {authOptions.emailAndPassword?.enabled && (
                    <>
                        {type === "register" ? (
                            <RegistrationForm />
                        ) : (
                            <LoginForm
                                setType={setType}
                                setError={setError}
                            />
                        )}
                    </>
                )}

                {error && <p className="mx-auto text-destructive">{error}</p>}

                {(termsAndConditions || privacyPolicy) && (
                    <LegalFooter
                        termsAndConditions={termsAndConditions}
                        privacyPolicy={privacyPolicy}
                    />
                )}
            </div>

            {/* Development Footer */}
            {!isProd && (
                <div
                    className="-translate-y-3 p-3.5 pt-5 flex gap-1 justify-center text-sm bg-zinc-900/65 text-muted-foreground border border-muted/65 rounded-lg"
                    style={{
                        background:
                            "linear-gradient(to bottom, hsl(240, 6%, 10%), rgba(253, 154, 0, 0.09))",
                    }}
                >
                    Operating in{" "}
                    <span className="text-[#DA8702] font-medium">
                        Development
                    </span>
                </div>
            )}
        </div>
    );
};

const Header = ({ logo, title }: { logo: string; title: string }) => (
    <div className="flex flex-col gap-1.5 items-center">
        <Image
            className="py-7"
            src={logo}
            alt={`${env.NEXT_PUBLIC_APP_NAME} Logo`}
            width={42}
            height={42}
            draggable={false}
        />
        <h1 className="font-bold">{title}</h1>
        <p className="text-xs text-muted-foreground">
            Hello there, please login to continue
        </p>
    </div>
);

const LegalFooter = ({
    termsAndConditions,
    privacyPolicy,
}: {
    termsAndConditions?: string;
    privacyPolicy?: string;
}) => (
    <footer className="flex flex-col gap-1 items-center text-sm text-muted-foreground">
        <span>By continuing, you agree to our</span>
        <div className="flex gap-3.5 items-center">
            {termsAndConditions && (
                <LegalLink href={termsAndConditions}>
                    Terms of Service
                </LegalLink>
            )}
            {privacyPolicy && (
                <LegalLink href={privacyPolicy}>Privacy Policy</LegalLink>
            )}
        </div>
    </footer>
);

const LegalLink = ({
    href,
    children,
}: {
    href: string;
    children: ReactNode;
}) => (
    <Link
        className="hover:text-primary transition-colors transform-gpu"
        href={href}
        target="_blank"
        draggable={false}
    >
        {children}
    </Link>
);

export default AuthForm;
