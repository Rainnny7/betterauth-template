import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "~/lib/database";
import { users } from "~/lib/database/schemas/auth-schema";
import { isValidEmail } from "~/lib/utils";

export type UserExistsResponse = {
    exists: boolean;
};

/**
 * A POST request that checks if a user exists in the database
 * with the input as either an email or username.
 *
 * @param request the request
 * @returns the response containing the user existence status
 */
export const POST = async (request: Request): Promise<NextResponse> => {
    const { input } = await request.json();
    if (!input) {
        return NextResponse.json(
            { error: "Malformed request." },
            { status: 400 }
        );
    }

    // Check if the input is an email or username and query accordingly
    const user = (
        await db
            .select()
            .from(users)
            .where(
                sql`LOWER(${
                    users[isValidEmail(input) ? "email" : "username"]
                }) = ${input.toLowerCase()}`
            )
            .limit(1)
    )?.[0];
    return NextResponse.json({ exists: !!user }, { status: user ? 200 : 404 });
};
