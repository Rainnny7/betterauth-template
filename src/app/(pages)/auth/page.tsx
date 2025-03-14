import { Metadata } from "next";
import { ReactElement } from "react";
import AuthForm from "~/components/auth/auth-form";
import { auth, toClientAuthOptions } from "~/lib/auth";

export const metadata: Metadata = {
    title: "Auth",
};

const AuthPage = (): ReactElement => (
    <div>
        <AuthForm authOptions={toClientAuthOptions(auth.options)} />
    </div>
);
export default AuthPage;
