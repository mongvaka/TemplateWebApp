#stage 1
FROM node:14.16.1 as node
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps 
RUN npm run build --prod=true
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/app-template /usr/share/nginx/html