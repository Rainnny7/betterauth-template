import { Loader2 } from "lucide-react";
import { ReactElement, useState } from "react";
import AnimatedRightChevron from "~/components/animated-right-chevron";
import EmailInput from "~/components/auth/auth-form/email-input";
import PasswordInput from "~/components/auth/auth-form/password.input";
import { Button } from "~/components/ui/button";

const RegistrationForm = (): ReactElement => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <form className="flex flex-col gap-3.5">
            <EmailInput disabled={false} />
            <PasswordInput />
            <Button
                className="group mt-1 gap-2"
                type="submit"
                variant="secondary"
                size="sm"
                disabled={loading}
            >
                Register
                {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                ) : (
                    <AnimatedRightChevron />
                )}
            </Button>
        </form>
    );
};
export default RegistrationForm;
