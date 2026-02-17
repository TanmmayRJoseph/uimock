# ===============================
# 1️⃣ Build Stage
# ===============================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy project files
COPY . .

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js app
RUN npm run build


# ===============================
# 2️⃣ Production Stage
# ===============================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create non-root user
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Copy necessary files only
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
