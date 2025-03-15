import { Lock, LucideIcon } from "lucide-react";
import { ComponentProps, ReactElement } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

type FormInputGroupProps = {
    /**
     * The inputs to display in the group.
     */
    children: ReactElement[];

    /**
     * Optional className for custom styling.
     */
    className?: string;
};

type FormInputProps = {
    /**
     * Optional className for custom styling.
     */
    className?: string;

    /**
     * The label of the input.
     */
    label: string;

    /**
     * The name of the input.
     */
    name: string;

    /**
     * The optional icon of the input.
     */
    icon?: LucideIcon;
} & ComponentProps<"input">;

const FormInput = ({
    className,
    label,
    icon: Icon,
    name,
    ...props
}: FormInputProps): ReactElement => (
    <div className="flex flex-col gap-2.5">
        <Label htmlFor={name}>{label}</Label>
        <div className="relative">
            {Icon && (
                <Icon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            )}
            <Input
                className={cn(Icon && "pl-8", className)}
                name={name}
                {...props}
            />
        </div>
    </div>
);

export const PasswordInput = (): ReactElement => (
    <FormInput
        label="Password"
        name="password"
        type="password"
        icon={Lock}
        required
    />
);

export const FormInputGroup = ({
    children,
    className,
}: FormInputGroupProps): ReactElement => (
    <div className={cn("grid grid-cols-2 gap-3.5", className)}>{children}</div>
);

export default FormInput;
