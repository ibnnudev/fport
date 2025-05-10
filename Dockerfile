FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:lts-alpine AS production
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev
COPY public ./public
COPY next.config.ts ./
# COPY .env ./
CMD ["npm", "start"]

EXPOSE 3000