"use client";

import {
    ArrowLeftIcon,
    AtSign,
    Eye,
    EyeClosed,
    Loader2,
    Lock,
    LucideIcon,
    Mail,
    User,
} from "lucide-react";
import { Link } from "next-view-transitions";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import {
    ComponentProps,
    FormEvent,
    ReactElement,
    ReactNode,
    useState,
} from "react";
import { toast } from "sonner";
import { UserExistsResponse } from "~/app/api/auth/user-exists/route";
import AnimatedRightChevron from "~/components/animated-right-chevron";
import SimpleTooltip from "~/components/simple-tooltip";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { ExtendedBetterAuthOptions } from "~/lib/auth";
import { authClient } from "~/lib/auth-client";
import { env, isProd } from "~/lib/env";
import request from "~/lib/request";
import { cn, isValidEmail } from "~/lib/utils";

export type AuthFormType = "auto" | "login" | "register";

export type AuthFormProps = {
    /**
     * The optional class name to apply to the form.
     */
    className?: string | undefined;

    /**
     * The BetterAuth options to use.
     */
    authOptions: ExtendedBetterAuthOptions;

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
     * The subtitle of the form.
     */
    subtitle?: string;

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
    subtitle = "Hello there, please login to continue",
    termsAndConditions,
    privacyPolicy,
}: AuthFormProps): ReactElement => {
    const router: AppRouterInstance = useRouter();
    const [type, setType] = useState<AuthFormType>(initialType);
    const [error, setError] = useState<string | undefined>(undefined);
    const [registrationData, setRegistrationData] = useState<
        LoginToRegisterData | undefined
    >(undefined);

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
                    "relative px-9 py-7 min-w-96 flex flex-col gap-5 bg-card border border-muted/65 rounded-lg select-none overflow-y-auto z-10",
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

                <Header logo={logo} title={title} subtitle={subtitle} />

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
                            <RegistrationView
                                authOptions={authOptions}
                                prefilledData={registrationData}
                                setError={setError}
                            />
                        ) : (
                            <LoginView
                                authOptions={authOptions}
                                type={type}
                                setType={setType}
                                setError={setError}
                                onSwitchToRegister={setRegistrationData}
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

const Header = ({
    logo,
    title,
    subtitle,
}: {
    logo: string;
    title: string;
    subtitle: string;
}) => (
    <div className="flex flex-col gap-1.5 items-center">
        <Image
            className="py-7"
            src={logo}
            alt={`${env.NEXT_PUBLIC_APP_NAME} Logo`}
            width={42}
            height={42}
            draggable={false}
            unoptimized
        />
        <h1 className="font-bold">{title}</h1>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
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
        <GenericFormView submitText="Register" onSubmit={handleRegistration}>
            <FormInputGroup key="name-username">
                <FormInput
                    className="w-40"
                    label="Name"
                    name="name"
                    type="text"
                    icon={User}
                    required
                />
                <FormInput
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
                    disabled={!prefilledData?.isEmail && !!prefilledData?.input}
                />
            </FormInputGroup>
            <FormInput
                label="Email Address"
                name="email"
                type="email"
                icon={Mail}
                required
                defaultValue={
                    prefilledData?.isEmail ? prefilledData?.input : undefined
                }
                disabled={prefilledData?.isEmail && !!prefilledData?.input}
            />
            <PasswordInput key="password" />
        </GenericFormView>
    );
};

type LoginToRegisterData = {
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

const OAuthProviders = ({
    authOptions,
    setError,
}: {
    authOptions: ExtendedBetterAuthOptions;
    setError: (error: string | undefined) => void;
}): ReactElement => {
    // Render the providers
    const showNames: boolean =
        Object.values(authOptions.socialProviders ?? {}).length < 3;
    return (
        <div className="flex flex-wrap gap-1.5 justify-center items-center">
            {Object.values(authOptions.socialProviders ?? {}).map(
                (provider: any) => (
                    <OAuthProvider
                        key={provider.id}
                        provider={provider}
                        showNames={showNames}
                        authOptions={authOptions}
                        setError={setError}
                    />
                )
            )}
        </div>
    );
};

const OAuthProvider = ({
    provider,
    showNames,
    authOptions,
    setError,
}: {
    provider: any;
    showNames: boolean;
    authOptions: ExtendedBetterAuthOptions;
    setError: (error: string | undefined) => void;
}): ReactElement => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        setLoading(true);
        const { error } = await authClient.signIn.social({
            provider: provider.id,
            callbackURL: authOptions.authRedirect ?? "/app",
        });
        setLoading(false);
        setError(error?.message);
    };

    return (
        <SimpleTooltip content={`Continue with ${provider.name}`} side="bottom">
            <Button
                className={cn(
                    "text-sm gap-4 bg-zinc-900 border border-muted/75",
                    showNames ? "px-9" : "px-10"
                )}
                variant="secondary"
                size="sm"
                onClick={handleLogin}
                disabled={loading}
            >
                <div>
                    {loading ? (
                        <Loader2 className="size-4 animate-spin" />
                    ) : (
                        <Image
                            src={`https://img.clerk.com/static/${provider.id}.svg?width=80`}
                            alt={provider.name}
                            width={16}
                            height={16}
                            unoptimized
                        />
                    )}
                </div>
                {showNames && provider.name}
            </Button>
        </SimpleTooltip>
    );
};

type FormInputGroupProps = {
    /**
     * The inputs to display in the group.
     */
    children: ReactElement[];

    /**
     * Optional className for custom styling.
     */
    className?: string;
};

type FormInputProps = {
    /**
     * Optional className for custom styling.
     */
    className?: string;

    /**
     * The label of the input.
     */
    label: string;

    /**
     * The name of the input.
     */
    name: string;

    /**
     * The optional icon of the input.
     */
    icon?: LucideIcon;
} & ComponentProps<"input">;

const FormInput = ({
    className,
    label,
    icon: Icon,
    name,
    ...props
}: FormInputProps): ReactElement => (
    <div className="flex flex-col gap-2.5">
        <Label htmlFor={name}>{label}</Label>
        <div className="relative">
            {Icon && (
                <Icon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            )}
            <Input
                className={cn(Icon && "pl-8", className)}
                name={name}
                {...props}
            />
        </div>
    </div>
);

export const PasswordInput = (): ReactElement => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="relative">
            <FormInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                icon={Lock}
                required
            />
            <Button
                className="absolute right-2 top-2/3 -translate-y-1/2 mt-px text-muted-foreground hover:!bg-transparent"
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword((prev) => !prev)}
            >
                {showPassword ? <Eye /> : <EyeClosed />}
            </Button>
        </div>
    );
};

export const FormInputGroup = ({
    children,
    className,
}: FormInputGroupProps): ReactElement => (
    <div className={cn("grid grid-cols-2 gap-3.5", className)}>{children}</div>
);

type GenericFormViewProps = {
    /**
     * The text to display on the submit button.
     */
    submitText: string;

    /**
     * The function to call when the form is submitted.
     */
    onSubmit: (form: FormData) => Promise<void>;

    /**
     * The children (inputs) to display in the form.
     */
    children: ReactNode;
};

const GenericFormView = ({
    submitText,
    onSubmit,
    children,
}: GenericFormViewProps): ReactElement => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <form
            className="flex flex-col gap-3.5"
            onSubmit={async (event: FormEvent<HTMLFormElement>) => {
                if (loading) return;
                event.preventDefault();
                const formData = new FormData(event.currentTarget);

                setLoading(true);
                await onSubmit(formData);
                setLoading(false);
            }}
        >
            {/* Inputs */}
            {children}

            {/* Submit */}
            <Button
                className="group mt-1 gap-2"
                type="submit"
                variant="secondary"
                size="sm"
                disabled={loading}
            >
                {submitText}
                {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                ) : (
                    <AnimatedRightChevron />
                )}
            </Button>
        </form>
    );
};

export default AuthForm;
