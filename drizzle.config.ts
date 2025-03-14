import { defineConfig } from "drizzle-kit";
import { env } from "~/lib/env";

export default defineConfig({
    out: "./drizzle",
    schema: "./src/lib/database/schemas/",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DRIZZLE_DATABASE_URL,
    },
});
