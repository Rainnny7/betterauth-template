import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/lib/auth";

export async function middleware(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    // If the user is not authenticated, redirect to the /auth
    // page. Otherwise, continue to the targeted route.
    return !session
        ? NextResponse.redirect(new URL("/auth", request.url))
        : NextResponse.next();
}

export const config = {
    runtime: "nodejs",
    matcher: ["/dashboard"],
};
