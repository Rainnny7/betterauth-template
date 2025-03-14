FROM imbios/bun-node AS base


# Install dependencies
FROM base AS depends
WORKDIR /usr/src/app
COPY package.json* bun.lock* ./
RUN bun install --frozen-lockfile --quiet


# Build the app
FROM base AS builder
WORKDIR /usr/src/app
COPY --from=depends /usr/src/app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1

# App Config
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ARG NEXT_PUBLIC_APP_NAME
ENV NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME}

# Drizzle
ARG DRIZZLE_DATABASE_URL
ENV DRIZZLE_DATABASE_URL=${DRIZZLE_DATABASE_URL}

# BetterAuth
ARG BETTER_AUTH_SECRET
ENV BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
ARG DISCORD_CLIENT_ID
ENV DISCORD_CLIENT_ID=${DISCORD_CLIENT_ID}
ARG DISCORD_CLIENT_SECRET
ENV DISCORD_CLIENT_SECRET=${DISCORD_CLIENT_SECRET}

RUN bun run build


# Run the app
FROM base AS runner
WORKDIR /usr/src/app

RUN addgroup --system --gid 1007 nextjs
RUN adduser --system --uid 1007 nextjs

RUN mkdir .next
RUN chown nextjs:nextjs .next

COPY --from=builder --chown=nextjs:nextjs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /usr/src/app/.next ./.next
COPY --from=builder --chown=nextjs:nextjs /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nextjs /usr/src/app/next.config.ts ./next.config.ts
COPY --from=builder --chown=nextjs:nextjs /usr/src/app/package.json ./package.json

ENV NODE_ENV=production

# App Config
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ARG NEXT_PUBLIC_APP_NAME
ENV NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME}

# Drizzle
ARG DRIZZLE_DATABASE_URL
ENV DRIZZLE_DATABASE_URL=${DRIZZLE_DATABASE_URL}

# BetterAuth
ARG BETTER_AUTH_SECRET
ENV BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
ARG DISCORD_CLIENT_ID
ENV DISCORD_CLIENT_ID=${DISCORD_CLIENT_ID}
ARG DISCORD_CLIENT_SECRET
ENV DISCORD_CLIENT_SECRET=${DISCORD_CLIENT_SECRET}

# Exposting on port 80 so we can
# access via a reverse proxy for Dokku
ENV HOSTNAME="0.0.0.0"
EXPOSE 80
ENV PORT=80

USER nextjs
CMD ["node", "server.js"]