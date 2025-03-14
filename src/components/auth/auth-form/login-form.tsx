import { ReactElement } from "react";
import AnimatedRightChevron from "~/components/animated-right-chevron";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const LoginForm = (): ReactElement => (
    <form className="flex flex-col gap-5">
        <EmailInput />
        <Button className="gap-2" type="submit" variant="secondary" size="sm">
            Continue
            <AnimatedRightChevron />
        </Button>
    </form>
);

const EmailInput = (): ReactElement => (
    <div className="flex flex-col gap-2.5">
        <Label htmlFor="email">Email Address</Label>
        <Input name="email" type="email" />
    </div>
);

export default LoginForm;
