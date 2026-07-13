# ── Stage 1: build situs statis ─────────────────────────────
FROM node:22-alpine AS build

WORKDIR /app

# layer dependensi terpisah agar cache build efektif
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# @nuxt/fonts mengunduh font Google saat build, butuh akses internet
RUN npm run generate

# ── Stage 2: sajikan lewat nginx ─────────────────────────────
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/.output/public /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO /dev/null http://127.0.0.1/ || exit 1
