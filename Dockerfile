FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./

RUN npm ci --only=production
COPY . .

RUN npm run build

# ===============================================
# Production stage
# ===============================================
FROM nginx:alpine AS production

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html

RUN addgroup -g 1001 -S nodejs && \
    adduser -S vite -u 1001
RUN chown -R vite:nodejs /var/cache/nginx && \
    chown -R vite:nodejs /var/log/nginx && \
    chown -R vite:nodejs /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R vite:nodejs /var/run/nginx.pid && \
    chown -R vite:nodejs /usr/share/nginx/html

USER vite
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
