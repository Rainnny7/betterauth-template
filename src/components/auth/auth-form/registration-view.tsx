import { AtSign, Mail, User } from "lucide-react";
import { redirect } from "next/navigation";
import { ReactElement } from "react";
import { toast } from "sonner";
import FormInput, {
    FormInputGroup,
    PasswordInput,
} from "~/components/auth/auth-form/form-input";
import GenericFormView from "~/components/auth/auth-form/generic-form-view";
import { ExtendedBetterAuthOptions } from "~/lib/auth";
import { authClient } from "~/lib/auth-client";
import { env } from "~/lib/env";
import { isValidEmail } from "~/lib/utils";
import { LoginToRegisterData } from "./login-view";

type RegistrationViewProps = {
    /**
     * The BetterAuth options to use.
     */
    authOptions: ExtendedBetterAuthOptions;

    /**
     * The prefilled data to use.
     */
    prefilledData?: LoginToRegisterData;

    /**
     * The function to call when the error changes.
     */
    setError: (error: string | undefined) => void;
};

const RegistrationView = ({
    authOptions,
    prefilledData,
    setError,
}: RegistrationViewProps): ReactElement => {
    const handleRegistration = async (form: FormData) => {
        const name: string | undefined = form.get("name") as string;
        const username: string | undefined =
            (form.get("username") as string) ??
            (!prefilledData?.isEmail ? prefilledData?.input : undefined);
        const email: string | undefined =
            (form.get("email") as string) ??
            (prefilledData?.isEmail ? prefilledData?.input : undefined);
        const password: string | undefined = form.get("password") as string;
        console.log({ name, username, email, password });

        // Ensure the fields are valid first
        if (!email || !password || !username || !name) {
            setError("Missing required fields ):");
            return;
        }
        if (!isValidEmail(email)) {
            setError("Invalid email address");
            return;
        }
        // Attempt to register the user
        const { data, error } = await authClient.signUp.email({
            email,
            name,
            password,
            username,
        });
        setError(error?.message);

        // Redirect the user once they register
        if (!error) {
            toast.success(
                `Account created, welcome to ${env.NEXT_PUBLIC_APP_NAME} ${data?.user?.name}!`
            );
            redirect(authOptions.authRedirect ?? "/app");
        }
    };

    return (
        <GenericFormView
            formInputs={[
                <FormInputGroup key="name-username">
                    <FormInput
                        key="name"
                        className="w-40"
                        label="Name"
                        name="name"
                        type="text"
                        icon={User}
                        required
                    />
                    <FormInput
                        key="username"
                        className="w-40"
                        label="Username"
                        name="username"
                        type="text"
                        icon={AtSign}
                        defaultValue={
                            !prefilledData?.isEmail
                                ? prefilledData?.input
                                : undefined
                        }
                        disabled={
                            !prefilledData?.isEmail && !!prefilledData?.input
                        }
                    />
                </FormInputGroup>,
                <FormInput
                    key="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    icon={Mail}
                    required
                    defaultValue={
                        prefilledData?.isEmail
                            ? prefilledData?.input
                            : undefined
                    }
                    disabled={prefilledData?.isEmail && !!prefilledData?.input}
                />,
                <PasswordInput key="password" />,
            ]}
            submitText="Register"
            onSubmit={handleRegistration}
        />
    );
};

export default RegistrationView;
