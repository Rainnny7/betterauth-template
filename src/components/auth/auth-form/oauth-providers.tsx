import { Loader2 } from "lucide-react";
import Image from "next/image";
import { ReactElement, useState } from "react";
import SimpleTooltip from "~/components/simple-tooltip";
import { Button } from "~/components/ui/button";
import { ExtendedBetterAuthOptions } from "~/lib/auth";
import { authClient } from "~/lib/auth-client";
import { cn } from "~/lib/utils";

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

export default OAuthProviders;
