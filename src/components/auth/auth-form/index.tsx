"use client";

import { BetterAuthOptions } from "better-auth";
import Image from "next/image";
import { ReactElement, useState } from "react";
import LoginForm from "~/components/auth/auth-form/login-form";
import OAuthProviders from "~/components/auth/auth-form/oauth-providers";
import RegistrationForm from "~/components/auth/auth-form/registration-form";
import { Separator } from "~/components/ui/separator";
import { env } from "~/lib/env";
import { cn } from "~/lib/utils";

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
    type?: "auto" | "login" | "register";

    /**
     * The link to the logo to display in the form.
     */
    logo?: string;

    /**
     * The title of the form.
     */
    title?: string;
};

const AuthForm = ({
    className,
    authOptions,
    type = "auto",
    logo = "/logo.png",
    title,
}: AuthFormProps): ReactElement => {
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
        <div
            className={cn(
                "px-9 py-7 min-w-96 flex flex-col gap-5 bg-card border border-muted/65 rounded-lg select-none",
                className
            )}
        >
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

            {/* Email & Password */}
            {authOptions.emailAndPassword?.enabled && (
                <>
                    {type === "register" ? <RegistrationForm /> : <LoginForm />}
                </>
            )}

            {error && <p className="mx-auto text-destructive">{error}</p>}
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

export default AuthForm;
