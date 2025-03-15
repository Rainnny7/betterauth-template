import { Loader2 } from "lucide-react";
import { FormEvent, ReactElement, ReactNode, useState } from "react";
import AnimatedRightChevron from "~/components/animated-right-chevron";
import { Button } from "~/components/ui/button";

type GenericFormViewProps = {
    /**
     * The text to display on the submit button.
     */
    submitText: string;

    /**
     * The function to call when the form is submitted.
     */
    onSubmit: (form: FormData) => Promise<void>;

    /**
     * The children (inputs) to display in the form.
     */
    children: ReactNode;
};

const GenericFormView = ({
    submitText,
    onSubmit,
    children,
}: GenericFormViewProps): ReactElement => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <form
            className="flex flex-col gap-3.5"
            onSubmit={async (event: FormEvent<HTMLFormElement>) => {
                if (loading) return;
                event.preventDefault();
                const formData = new FormData(event.currentTarget);

                setLoading(true);
                await onSubmit(formData);
                setLoading(false);
            }}
        >
            {/* Inputs */}
            {children}

            {/* Submit */}
            <Button
                className="group mt-1 gap-2"
                type="submit"
                variant="secondary"
                size="sm"
                disabled={loading}
            >
                {submitText}
                {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                ) : (
                    <AnimatedRightChevron />
                )}
            </Button>
        </form>
    );
};

export default GenericFormView;
