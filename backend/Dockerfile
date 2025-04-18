FROM node:slim AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .
RUN npm run build

FROM node:slim AS production

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/.env ./

EXPOSE 80

CMD ["node", "dist/index.js"]