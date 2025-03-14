import { User } from "lucide-react";
import { ReactElement } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const EmailInput = ({ disabled }: { disabled: boolean }): ReactElement => (
    <div className="flex flex-col gap-2.5">
        <Label htmlFor="email">Username or Email Address</Label>
        <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4.5 text-muted-foreground" />
            <Input
                className="pl-10"
                name="email"
                type="text"
                required
                disabled={disabled}
            />
        </div>
    </div>
);
export default EmailInput;
