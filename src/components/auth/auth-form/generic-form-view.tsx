import { Loader2 } from "lucide-react";
import { FormEvent, ReactElement, useState } from "react";
import AnimatedRightChevron from "~/components/animated-right-chevron";
import { Button } from "~/components/ui/button";

type GenericFormViewProps = {
    /**
     * The form inputs to display. Can be either individual FormInput components
     * or FormInputGroup components containing multiple FormInputs.
     */
    formInputs: ReactElement[];

    /**
     * The text to display on the submit button.
     */
    submitText: string;

    /**
     * The function to call when the form is submitted.
     */
    onSubmit: (form: FormData) => Promise<void>;
};

const GenericFormView = ({
    formInputs,
    submitText,
    onSubmit,
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
            {formInputs.map((input: ReactElement) => (
                <div key={input.key}>{input}</div>
            ))}

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
