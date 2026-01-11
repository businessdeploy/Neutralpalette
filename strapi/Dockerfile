FROM node:20-alpine AS base

# Install dependencies for sharp and native modules
RUN apk add --no-cache libc6-compat vips-dev

# Dependencies stage
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Builder stage
FROM base AS builder
WORKDIR /app

# Accept build args
ARG APP_KEYS
ARG API_TOKEN_SALT
ARG ADMIN_JWT_SECRET
ARG JWT_SECRET
ARG TRANSFER_TOKEN_SALT

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Create .tmp directory for SQLite during build
RUN mkdir -p .tmp

# Set environment for build
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337
ENV DATABASE_CLIENT=sqlite
ENV DATABASE_FILENAME=.tmp/data.db
# Use ARG values for build
ENV APP_KEYS=${APP_KEYS:-key1,key2,key3,key4}
ENV API_TOKEN_SALT=${API_TOKEN_SALT:-buildsalt}
ENV ADMIN_JWT_SECRET=${ADMIN_JWT_SECRET:-buildsecret}
ENV JWT_SECRET=${JWT_SECRET:-buildjwt}
ENV TRANSFER_TOKEN_SALT=${TRANSFER_TOKEN_SALT:-buildtransfer}

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
