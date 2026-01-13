FROM oven/bun:1-alpine

WORKDIR /app

COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json
COPY ./bun.lock ./bun.lock
COPY ./packages/*/package.json ./packages/

COPY ./apps/backend/package.json ./apps/backend/package.json

RUN bun install
COPY . .
RUN bun run db:generate

EXPOSE 8080

CMD ["bun", "run", "start:backend"]