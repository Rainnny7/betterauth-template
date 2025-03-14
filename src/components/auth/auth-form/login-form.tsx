"use client";

import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { Loader2 } from "lucide-react";
import { FormEvent, ReactElement, useRef, useState } from "react";
import { UserExistsResponse } from "~/app/api/auth/user-exists/route";
import AnimatedRightChevron from "~/components/animated-right-chevron";
import { AuthFormType } from "~/components/auth/auth-form";
import EmailInput from "~/components/auth/auth-form/email-input";
import PasswordInput from "~/components/auth/auth-form/password.input";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";
import { env } from "~/lib/env";
import request from "~/lib/request";
import { isValidEmail } from "~/lib/utils";

const LoginForm = ({
    setType,
    setError,
}: {
    setType: (type: AuthFormType) => void;
    setError: (error: string | undefined) => void;
}): ReactElement => {
    const captchaRef = useRef<TurnstileInstance>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [promptPassword, setPromptPassword] = useState<boolean>(false);

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (loading) return;
        const formData = new FormData(event.currentTarget);
        const usernameOrEmail: string | null = formData.get("email") as string;
        setLoading(true);

        // Password has yet to be prompted, check if the user exists based on the input and handle it accordingly
        if (!promptPassword) {
            const doesUserExist: boolean =
                (
                    await request.post<UserExistsResponse>(
                        "/api/auth/user-exists",
                        {
                            data: {
                                input: usernameOrEmail,
                            },
                        }
                    )
                )?.exists ?? false;
            if (doesUserExist) {
                setPromptPassword(true);
            } else {
                setType("register");
            }
        } else {
            // Attempt to login with the given credentials
            const password: string | null = formData.get("password") as string;
            const turnstileToken: string | null = formData.get(
                "cf-turnstile-response"
            ) as string;
            const fetchOptions = {
                headers: {
                    "x-captcha-response": turnstileToken,
                },
            };

            const { data, error } = isValidEmail(usernameOrEmail)
                ? await authClient.signIn.email({
                      email: usernameOrEmail,
                      password,
                      fetchOptions,
                  })
                : await authClient.signIn.username({
                      username: usernameOrEmail,
                      password,
                      fetchOptions,
                  });

            // Failed login, show the user why
            if (error) {
                captchaRef.current?.reset();
                setError(error.message);
            }
            console.log({ data, error });
        }
        setLoading(false);
    };

    return (
        <form className="flex flex-col gap-3.5" onSubmit={handleLogin}>
            <EmailInput disabled={promptPassword} />
            {promptPassword && <PasswordInput />}
            <Turnstile
                ref={captchaRef}
                siteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                options={{ size: "invisible" }}
            />

            <Button
                className="group mt-1 gap-2"
                type="submit"
                variant="secondary"
                size="sm"
                disabled={loading}
            >
                {promptPassword ? "Login" : "Continue"}
                {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                ) : (
                    <AnimatedRightChevron />
                )}
            </Button>
        </form>
    );
};
export default LoginForm;
