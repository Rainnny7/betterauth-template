import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "~/lib/env";

export const db = drizzle(env.DRIZZLE_DATABASE_URL);
