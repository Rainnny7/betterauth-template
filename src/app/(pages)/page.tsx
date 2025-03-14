"use client";

import { ReactElement } from "react";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";

const HomePage = (): ReactElement => {
    const { data: session } = authClient.useSession();
    return (
        <div>
            {session ? (
                <div>
                    <p>Hello {session.user.name}</p>
                </div>
            ) : (
                <>
                    <p>No session</p>
                    <Button>Login</Button>
                </>
            )}
        </div>
    );
};
export default HomePage;
