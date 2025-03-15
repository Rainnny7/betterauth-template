"use client";

import { format } from "date-fns";
import { ReactElement, ReactNode } from "react";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { authClient } from "~/lib/auth-client";
import { User } from "~/types/auth";

type UserPopoverProps = {
    /**
     * The element to display as the trigger.
     *
     * @param user the user logged in
     * @returns the trigger element
     */
    trigger: (user: User) => ReactNode;
};

const UserPopover = ({
    trigger,
}: UserPopoverProps): ReactElement | undefined => {
    const { data: session } = authClient.useSession();
    if (!session) return undefined;
    const { user } = session;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger(session.user as User)}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <div className="flex items-center gap-2 p-2">
                    {/* <Avatar className="h-16 w-16">
                        <AvatarImage src={user.image ?? ""} alt={user.name} />
                        <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar> */}
                    D{" "}
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.name}
                        </p>
                        {user.username && (
                            <p className="text-sm text-muted-foreground">
                                @{user.displayUsername ?? user.username}
                            </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Joined {format(new Date(user.createdAt), "MMMM d, yyyy")}
                </DropdownMenuLabel>
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Account Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        toast.info("Hello World (:");
                    }}
                >
                    Hello World
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default UserPopover;
