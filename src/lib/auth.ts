import { betterAuth, BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { db } from "~/lib/database";
import { env } from "~/lib/env";
import * as schema from "./database/schemas/auth-schema";

export type ExtendedBetterAuthOptions = BetterAuthOptions & {
    authRedirect?: string;
};

export const auth = betterAuth({
    baseURL: env.NEXT_PUBLIC_BASE_URL,
    appName: env.NEXT_PUBLIC_APP_NAME,
    authRedirect: "/dashboard",
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema,
        },
        usePlural: true,
    }),
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["github", "discord"],
        },
    },
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        github: {
            id: "github",
            name: "Github",
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        },
        discord: {
            id: "discord",
            name: "Discord",
            clientId: env.DISCORD_CLIENT_ID,
            clientSecret: env.DISCORD_CLIENT_SECRET,
        },
    },
    plugins: [
        username(),
        // captcha({
        //     provider: "cloudflare-turnstile",
        //     secretKey: env.TURNSTILE_SECRET_KEY,
        //     endpoints: ["/auth"],
        // }),
    ],
});

export const toClientAuthOptions = (authOptions: BetterAuthOptions) => {
    const options: BetterAuthOptions = JSON.parse(JSON.stringify(authOptions));

    // Recursively remove any property that contains 'secret' from the entire object
    const removeSecrets = (obj: any) => {
        if (!obj || typeof obj !== "object") return;
        for (const key of Object.keys(obj)) {
            if (key.toLowerCase().includes("secret")) {
                delete obj[key];
            } else if (typeof obj[key] === "object") {
                removeSecrets(obj[key]);
            }
        }
    };

    removeSecrets(options);
    return options;
};
