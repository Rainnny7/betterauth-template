import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(["development", "test", "production"]),

        // Drizzle
        DRIZZLE_DATABASE_URL: z.string(),

        // BetterAuth
        BETTER_AUTH_SECRET: z.string(),
        GITHUB_CLIENT_ID: z.string(),
        GITHUB_CLIENT_SECRET: z.string(),
        DISCORD_CLIENT_ID: z.string(),
        DISCORD_CLIENT_SECRET: z.string(),

        // Cloudflare Turnstile
        TURNSTILE_SECRET_KEY: z.string(),
    },

    client: {
        // App
        NEXT_PUBLIC_BASE_URL: z.string(),
        NEXT_PUBLIC_APP_NAME: z.string(),

        // Cloudflare Turnstile
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string(),
    },

    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,

        // App
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,

        // Drizzle
        DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL,

        // BetterAuth
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
        DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,

        // Cloudflare Turnstile
        TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
        NEXT_PUBLIC_TURNSTILE_SITE_KEY:
            process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    },

    /**
     * i had a stupid fucking error so now this is forever going to be turned on (:
     * @theo fix ur shit lib
     */
    skipValidation: true,

    /**
     * Makes it so that empty strings are treated as undefined.
     * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
     */
    emptyStringAsUndefined: true,
});

export const isProd = env.NODE_ENV === "production";
