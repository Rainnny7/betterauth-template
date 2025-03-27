"use client";

import { cva, VariantProps } from "class-variance-authority";
import { ReactElement } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { authClient, getInitials } from "~/lib/auth-client";
import { cn } from "~/lib/utils";
import { User } from "~/types/auth";

const avatarVariants = cva(undefined, {
    variants: {
        size: {
            "2xl": "size-16",
            xl: "size-12",
            default: "size-10",
            sm: "size-8",
            xs: "size-4",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

type UserAvatarProps = VariantProps<typeof avatarVariants> & {
    /**
     * The optional user to display the avatar for.
     */
    user?: User;

    /**
     * The optional class name for the avatar.
     */
    className?: string;
};

const UserAvatar = ({
    user: initialUser,
    size,
    className,
}: UserAvatarProps): ReactElement | undefined => {
    const session = initialUser ? undefined : authClient.useSession();
    if (!session?.data && !initialUser) return undefined;
    const user = session?.data?.user ?? initialUser;
    if (!user) return undefined;
    return (
        <Avatar className={cn(avatarVariants({ size, className }))}>
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback>
                {getInitials(user.username ?? user.name)}
            </AvatarFallback>
        </Avatar>
    );
};
export default UserAvatar;
