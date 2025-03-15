import { cva, VariantProps } from "class-variance-authority";
import { ReactElement } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { authClient, getInitials } from "~/lib/auth-client";
import { cn } from "~/lib/utils";

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
    className?: string;
};

const UserAvatar = ({
    size,
    className,
}: UserAvatarProps): ReactElement | undefined => {
    const { data: session } = authClient.useSession();
    if (!session) return undefined;
    const { user } = session;
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
