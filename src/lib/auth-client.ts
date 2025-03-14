import { usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "~/lib/env";

export const authClient = createAuthClient({
    baseURL: env.NEXT_PUBLIC_BASE_URL,
    plugins: [usernameClient()],
});
