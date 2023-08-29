# FROM node:18-alpine as deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# COPY package.json ./
# RUN npm install

# FROM node:18-alpine as builder
# WORKDIR /app
# COPY . .
# COPY --from=deps /app/node_modules ./node_modules
# RUN npm run build

# FROM node:18-alpine as runner
# WORKDIR /app
# ENV NODE_ENV production

# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# EXPOSE 3000

# CMD ["npm", "run", "dev"]

FROM node:18-alpine as deps
WORKDIR /app
# RUN apk add --no-cache libc6-compat
RUN npm install --global pm2
COPY package.json ./
RUN npm install

# FROM node:18-alpine as builder
# WORKDIR /app
# COPY . .
# COPY --from=deps /app/node_modules ./node_modules
# RUN npm run build

# FROM node:18-alpine as runner
# WORKDIR /app
# ENV NODE_ENV production

# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

COPY ./ ./

RUN npm run build

EXPOSE 3000

USER node

CMD [ "pm2-runtime", "start", "npm", "--", "start" ]