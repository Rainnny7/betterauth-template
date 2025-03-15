"use client";

import { ReactElement, ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { authClient } from "~/lib/auth-client";
import { User } from "~/types/auth";

type UserButtonProps = {
    trigger: (user: User) => ReactNode;
};

const UserButton = ({ trigger }: UserButtonProps): ReactElement | undefined => {
    const { data: session } = authClient.useSession();
    if (!session) return undefined;
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger(session?.user as User)}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>User Profile</DialogTitle>
                    <DialogDescription>
                        Culpa magna eu aliquip Lorem eiusmod do. Consectetur
                        reprehenderit officia minim occaecat.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
export default UserButton;
