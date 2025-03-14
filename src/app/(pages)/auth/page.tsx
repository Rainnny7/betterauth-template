import { Metadata } from "next";
import { ReactElement } from "react";
import AuthForm from "~/components/auth/auth-form";
import { auth, toClientAuthOptions } from "~/lib/auth";

export const metadata: Metadata = {
    title: "Auth",
};

const AuthPage = (): ReactElement => (
    <main>
        <AuthForm
            authOptions={toClientAuthOptions(auth.options)}
            termsAndConditions="https://example.com/legal/terms"
            privacyPolicy="https://example.com/legal/privacy"
        />
    </main>
);
export default AuthPage;
