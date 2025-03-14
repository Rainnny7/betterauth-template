"use client";

import { ReactElement, ReactNode } from "react";
import { authClient } from "~/lib/auth-client";

type LoggedInProps = {
    /**
     * The children to render when the user is logged in.
     */
    children: ReactNode;
};

/**
 * A component that renders its children only if the user is logged in.
 *
 * @param children the children to render when the user is logged in.
 * @returns the children or undefined if the user is not logged in.
 */
const LoggedIn = ({ children }: LoggedInProps): ReactElement | undefined => {
    const { data: session } = authClient.useSession();
    return session ? <>{children}</> : undefined;
};
export default LoggedIn;
