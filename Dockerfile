FROM node:lts-alpine AS builder
# Install necessary tools
RUN apk add --no-cache libc6-compat yq --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community
# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
# Copy the content of the project to the machine
COPY . .
RUN yq --inplace --output-format=json '(.devDependencies = (.devDependencies | to_entries | map(select(.key | test("^(@jest/globals|@playwright/test|@ts-safeql/eslint-plugin|jest|jest-environment-jsdom|libpg-query|prettier|prettier-plugin-embed|prettier-plugin-sql|stylelint|stylelint-config-upleveled)$") | not)) | from_entries))' package.json
RUN pnpm install
RUN pnpm build

# Multi-stage builds: runner stage
FROM node:lts-alpine AS runner
ENV NODE_ENV production
# Install necessary tools
RUN apk add bash postgresql
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Copy built app
COPY --from=builder /app/.next ./.next

# Copy only necessary files to run the app (minimize production app size, improve performance)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.ts ./

# Copy start script and make it executable
COPY --from=builder /app/scripts ./scripts
RUN chmod +x /app/scripts/fly-io-start.sh

CMD ["./scripts/fly-io-start.sh"]
