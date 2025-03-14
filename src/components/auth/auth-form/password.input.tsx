import { Lock } from "lucide-react";
import { ReactElement } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const PasswordInput = (): ReactElement => (
    <div className="flex flex-col gap-2.5">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4.5 text-muted-foreground" />
            <Input className="pl-10" name="password" type="password" required />
        </div>
    </div>
);
export default PasswordInput;
