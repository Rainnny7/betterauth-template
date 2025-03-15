"use client";

import { Mail } from "lucide-react";
import { redirect } from "next/navigation";
import { ReactElement, useState } from "react";
import { toast } from "sonner";
import { UserExistsResponse } from "~/app/api/auth/user-exists/route";
import { AuthFormType } from "~/components/auth/auth-form";
import FormInput, {
    PasswordInput,
} from "~/components/auth/auth-form/form-input";
import GenericFormView from "~/components/auth/auth-form/generic-form-view";
import { Button } from "~/components/ui/button";
import { ExtendedBetterAuthOptions } from "~/lib/auth";
import { authClient } from "~/lib/auth-client";
import request from "~/lib/request";
import { cn, isValidEmail } from "~/lib/utils";

export type LoginToRegisterData = {
    /**
     * The input to use.
     */
    input: string;

    /**
     * Whether the input is an email.
     */
    isEmail: boolean;
};

type LoginViewProps = {
    /**
     * The BetterAuth options to use.
     */
    authOptions: ExtendedBetterAuthOptions;

    /**
     * The type of auth form to render.
     */
    type: AuthFormType;

    /**
     * The function to call when the type changes.
     */
    setType: (type: AuthFormType) => void;

    /**
     * The function to call when the error changes.
     */
    setError: (error: string | undefined) => void;

    /**
     * The function to call when the user switches to the register view.
     */
    onSwitchToRegister?: (data: LoginToRegisterData) => void;
};

const LoginView = ({
    authOptions,
    type,
    setType,
    setError,
    onSwitchToRegister,
}: LoginViewProps): ReactElement => {
    const initialType: AuthFormType = type ?? "auto";
    const [promptPassword, setPromptPassword] = useState<boolean>(false);

    const handleLogin = async (form: FormData) => {
        const usernameOrEmail: string | undefined = form.get("email") as string;
        if (!usernameOrEmail) {
            setError("Missing required fields ):");
            return;
        }

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
                const isEmailInput = isValidEmail(usernameOrEmail);
                onSwitchToRegister?.({
                    input: usernameOrEmail,
                    isEmail: isEmailInput,
                });
                setType("register");
            }
        } else {
            // Attempt to login with the given credentials
            const password: string | undefined = form.get("password") as string;
            if (!password) {
                setError("Missing required fields ):");
                return;
            }
            const { data, error } = isValidEmail(usernameOrEmail)
                ? await authClient.signIn.email({
                      email: usernameOrEmail,
                      password,
                  })
                : await authClient.signIn.username({
                      username: usernameOrEmail,
                      password,
                  });
            setError(error?.message);

            // Redirect the user once they login
            if (!error) {
                toast.success(`Logged in, welcome back ${data?.user?.name}!`);
                redirect(authOptions.authRedirect ?? "/app");
            }
        }
    };

    return (
        <GenericFormView
            submitText={promptPassword ? "Login" : "Continue"}
            onSubmit={handleLogin}
        >
            {/* Username or Email Address */}
            <div className="relative">
                <FormInput
                    className={cn(
                        promptPassword &&
                            "opacity-50 cursor-not-allowed bg-muted"
                    )}
                    label="Username or Email Address"
                    name="email"
                    type="text"
                    icon={Mail}
                    required
                    readOnly={promptPassword}
                />
                {promptPassword && (
                    <Button
                        className="absolute right-2 top-2/3 -translate-y-1/2 mt-px h-6 text-xs text-muted-foreground"
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setType(initialType);
                            setPromptPassword(false);
                        }}
                    >
                        Not You?
                    </Button>
                )}
            </div>

            {promptPassword && <PasswordInput />}
        </GenericFormView>
    );
};
export default LoginView;
