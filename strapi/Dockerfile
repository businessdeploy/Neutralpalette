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

ENV NODE_ENV=production

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
COPY --from=builder --chown=strapi:strapi /app/config ./config
COPY --from=builder --chown=strapi:strapi /app/src ./src
COPY --from=builder --chown=strapi:strapi /app/public ./public
COPY --from=builder --chown=strapi:strapi /app/dist ./dist
COPY --from=builder --chown=strapi:strapi /app/node_modules ./node_modules

# Create uploads directory
RUN mkdir -p /app/public/uploads && chown -R strapi:strapi /app/public/uploads

USER strapi

EXPOSE 1337

CMD ["npm", "run", "start"]
