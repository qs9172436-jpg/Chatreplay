# ChatReplay — TanStack Start production image
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lockb* package-lock.json* ./
RUN bun install --frozen-lockfile || bun install
COPY . .
RUN bun run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]