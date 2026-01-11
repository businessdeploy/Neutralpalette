FROM node:20-alpine AS base

# Install dependencies for sharp and native modules
RUN apk add --no-cache libc6-compat vips-dev

# Dependencies stage
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Builder stage
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Create .tmp directory for SQLite during build
RUN mkdir -p .tmp

# Environment variables needed for build
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337
ENV DATABASE_CLIENT=sqlite
ENV DATABASE_FILENAME=.tmp/data.db
ENV APP_KEYS=build-key-1,build-key-2,build-key-3,build-key-4
ENV API_TOKEN_SALT=build-api-token-salt
ENV ADMIN_JWT_SECRET=build-admin-jwt-secret
ENV JWT_SECRET=build-jwt-secret
ENV TRANSFER_TOKEN_SALT=build-transfer-token-salt

RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 strapi
RUN adduser --system --uid 1001 strapi

# Copy necessary files
COPY --from=builder --chown=strapi:strapi /app/package.json ./
COPY --from=builder --chown=strapi:strapi /app/package-lock.json ./
COPY --from=builder --chown=strapi:strapi /app/node_modules ./node_modules
COPY --from=builder --chown=strapi:strapi /app/config ./config
COPY --from=builder --chown=strapi:strapi /app/src ./src
COPY --from=builder --chown=strapi:strapi /app/public ./public
COPY --from=builder --chown=strapi:strapi /app/dist ./dist
COPY --from=builder --chown=strapi:strapi /app/tsconfig.json ./tsconfig.json
COPY --from=builder --chown=strapi:strapi /app/types ./types
COPY --from=builder --chown=strapi:strapi /app/favicon.png ./favicon.png

# Create uploads and tmp directories
RUN mkdir -p /app/public/uploads /app/.tmp && chown -R strapi:strapi /app/public/uploads /app/.tmp

USER strapi

EXPOSE 1337

CMD ["npm", "run", "start"]
