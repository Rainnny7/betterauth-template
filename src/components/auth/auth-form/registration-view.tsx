import { AtSign, Mail, User } from "lucide-react";
import { ReactElement } from "react";
import FormInput, {
    FormInputGroup,
    PasswordInput,
} from "~/components/auth/auth-form/form-input";
import GenericFormView from "~/components/auth/auth-form/generic-form-view";

const RegistrationView = (): ReactElement => {
    const handleRegistration = async (form: FormData) => {
        console.log({ form });
    };

    return (
        <GenericFormView
            formInputs={[
                <FormInputGroup key="name-username">
                    <FormInput
                        key="name"
                        className="w-40"
                        label="Name"
                        name="name"
                        type="text"
                        icon={User}
                        required
                    />
                    <FormInput
                        key="username"
                        className="w-40"
                        label="Username"
                        name="username"
                        type="text"
                        icon={AtSign}
                    />
                </FormInputGroup>,
                <FormInput
                    key="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    icon={Mail}
                    required
                />,
                <PasswordInput key="password" />,
            ]}
            submitText="Register"
            onSubmit={handleRegistration}
        />
    );
};

export default RegistrationView;
