import { BetterAuthOptions } from "better-auth";
import Image from "next/image";
import { ReactElement } from "react";
import SimpleTooltip from "~/components/simple-tooltip";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";
import { cn } from "~/lib/utils";

const OAuthProviders = ({
    authOptions,
    setError,
}: {
    authOptions: BetterAuthOptions;
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
    setError,
}: {
    provider: any;
    showNames: boolean;
    setError: (error: string | undefined) => void;
}): ReactElement => {
    const handleLogin = async () => {
        const { error } = await authClient.signIn.social({
            provider: provider.id,
        });
        if (error) setError(error.message);
    };

    return (
        <SimpleTooltip content={`Continue with ${provider.name}`}>
            <Button
                className={cn(
                    "text-sm gap-4 bg-zinc-900 border border-muted/75",
                    showNames ? "px-9" : "px-10"
                )}
                variant="secondary"
                size="sm"
                onClick={handleLogin}
            >
                <Image
                    src={`https://img.clerk.com/static/${provider.id}.svg?width=80`}
                    alt={provider.name}
                    width={16}
                    height={16}
                    unoptimized
                />
                {showNames && provider.name}
            </Button>
        </SimpleTooltip>
    );
};

export default OAuthProviders;
