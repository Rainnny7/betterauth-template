import { betterAuth, BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { db } from "~/lib/database";
import { env } from "~/lib/env";
import * as schema from "./database/schemas/auth-schema";

export const auth = betterAuth({
    appName: env.NEXT_PUBLIC_APP_NAME,
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema,
        },
        usePlural: true,
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        discord: {
            id: "discord",
            name: "Discord",
            clientId: env.DISCORD_CLIENT_ID as string,
            clientSecret: env.DISCORD_CLIENT_SECRET as string,
        },
    },
    plugins: [username()],
});

export const toClientAuthOptions = (authOptions: BetterAuthOptions) => {
    const options: BetterAuthOptions = JSON.parse(JSON.stringify(authOptions));

    // Remove every clientSecret entry from the socialProviders object
    for (const provider of Object.values(options.socialProviders ?? {})) {
        delete (provider as any).clientSecret;
    }
    return options;
};
