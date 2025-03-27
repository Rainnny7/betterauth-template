import { Metadata } from "next";
import { ReactElement } from "react";
import { auth, toClientAuthOptions } from "~/lib/auth";
import AuthForm from "../../../../registry/new-york/auth-form";

export const metadata: Metadata = {
    title: "Auth",
};

const AuthPage = (): ReactElement => (
    <main className="min-h-screen flex justify-center items-center">
        <AuthForm
            authOptions={toClientAuthOptions(auth.options)}
            type="auto"
            logo="/logo.png"
            termsAndConditions="https://example.com/legal/terms"
            privacyPolicy="https://example.com/legal/privacy"
        />
    </main>
);
export default AuthPage;
