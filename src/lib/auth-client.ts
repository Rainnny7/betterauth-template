import { usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "~/lib/env";

export const authClient = createAuthClient({
    baseURL: env.NEXT_PUBLIC_BASE_URL,
    appName: env.NEXT_PUBLIC_APP_NAME,
    plugins: [usernameClient()],
});

/**
 * Gets the initials for a user
 *
 * @param name the name of the user
 * @returns the user's initials
 */
export const getInitials = (name: string) => {
    name = name.toUpperCase().trim();
    if (name.length <= 3) return name;
    return name
        .split(/\s+/)
        .map((w) => [...w][0])
        .slice(0, 3)
        .join("");
};
