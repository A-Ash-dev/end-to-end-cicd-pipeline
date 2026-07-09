# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .

# ---- Runtime stage ----
FROM node:20-alpine
WORKDIR /usr/src/app

# Run as a non-root user for better security posture
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=build /usr/src/app ./
USER appuser

ENV PORT=3000
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "app.js"]
