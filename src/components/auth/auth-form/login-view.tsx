"use client";

import { Mail } from "lucide-react";
import { ReactElement, useState } from "react";
import { UserExistsResponse } from "~/app/api/auth/user-exists/route";
import { AuthFormType } from "~/components/auth/auth-form";
import FormInput, {
    PasswordInput,
} from "~/components/auth/auth-form/form-input";
import GenericFormView from "~/components/auth/auth-form/generic-form-view";
import { authClient } from "~/lib/auth-client";
import request from "~/lib/request";
import { isValidEmail } from "~/lib/utils";

const LoginForm = ({
    setType,
    setError,
}: {
    setType: (type: AuthFormType) => void;
    setError: (error: string | undefined) => void;
}): ReactElement => {
    const [promptPassword, setPromptPassword] = useState<boolean>(false);

    const handleLogin = async (form: FormData) => {
        const usernameOrEmail: string | null = form.get("email") as string;

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
            const password: string | null = form.get("password") as string;

            const { data, error } = isValidEmail(usernameOrEmail)
                ? await authClient.signIn.email({
                      email: usernameOrEmail,
                      password,
                  })
                : await authClient.signIn.username({
                      username: usernameOrEmail,
                      password,
                  });

            // Failed login, show the user why
            if (error) {
                setError(error.message);
            }
            console.log({ data, error });
        }
    };

    return (
        <GenericFormView
            formInputs={[
                <FormInput
                    key="email"
                    label="Username or Email Address"
                    name="email"
                    type="text"
                    icon={Mail}
                    required
                    disabled={promptPassword}
                />,
                ...(!promptPassword ? [] : [<PasswordInput key="password" />]),
            ]}
            submitText={promptPassword ? "Login" : "Continue"}
            onSubmit={handleLogin}
        />
    );
};
export default LoginForm;
