"use client";

import { ReactElement, ReactNode } from "react";
import { authClient } from "~/lib/auth-client";

type LoggedOutProps = {
    /**
     * The children to render when the user is logged out.
     */
    children: ReactNode;
};

/**
 * A component that renders its children only if the user is logged out.
 *
 * @param children the children to render when the user is logged out.
 * @returns the children or undefined if the user is not logged out.
 */
const LoggedOut = ({ children }: LoggedOutProps): ReactElement | undefined => {
    const { data: session } = authClient.useSession();
    return session ? undefined : <>{children}</>;
};
export default LoggedOut;
