"use client";

import { ReactElement, ReactNode } from "react";
import { authClient } from "~/lib/auth-client";
import { User } from "~/types/auth";

type LoggedInProps = {
    /**
     * The optional user to render the component for.
     */
    user?: User | undefined;

    /**
     * The children to render when the user is logged in.
     */
    children: ReactNode;
};

/**
 * A component that renders its children only if the user is logged in.
 *
 * @param user the optional user to render the component for.
 * @param children the children to render when the user is logged in.
 * @returns the children or undefined if the user is not logged in.
 */
const LoggedIn = ({ user: initialUser, children }: LoggedInProps): ReactElement | undefined => {
    const session = initialUser ? undefined : authClient.useSession();
    if (!session && !initialUser) return undefined;
    const user = session?.data?.user ?? initialUser;
    if (!user) return undefined;
    return <>{children}</>;
};
export default LoggedIn;
