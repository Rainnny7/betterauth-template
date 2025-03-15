import { users } from "~/lib/database/schemas/auth-schema";

export type User = typeof users.$inferSelect;
