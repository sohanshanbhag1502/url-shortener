FROM node:slim AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine AS production

WORKDIR /app
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/.docker/nginx /etc/nginx/conf.d

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]