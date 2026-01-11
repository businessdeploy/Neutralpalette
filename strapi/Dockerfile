# Use Debian-based image instead of Alpine for glibc compatibility with @swc/core
FROM node:20-slim AS base

# Install dependencies for sharp and native modules
RUN apt-get update && apt-get install -y \
    libvips-dev \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Builder stage - install and build in the same stage
FROM base AS builder
WORKDIR /app

# Copy package files first
COPY package.json package-lock.json ./

# Install dependencies including native modules
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Create .tmp directory for SQLite during build
RUN mkdir -p .tmp

# Set environment for build
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337
ENV DATABASE_CLIENT=sqlite
ENV DATABASE_FILENAME=.tmp/data.db
ENV APP_KEYS=buildkey1,buildkey2,buildkey3,buildkey4
ENV API_TOKEN_SALT=buildsalt
ENV ADMIN_JWT_SECRET=buildsecret
ENV JWT_SECRET=buildjwt
ENV TRANSFER_TOKEN_SALT=buildtransfer

# Build Strapi
RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN groupadd --system --gid 1001 strapi
RUN useradd --system --uid 1001 --gid strapi strapi

# Copy all necessary files from builder
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
