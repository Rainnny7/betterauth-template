import { sessions, users } from "~/lib/database/schemas/auth-schema";

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;

export type GetCurrentUserResponse = {
    user: User;
    session: Session;
};
