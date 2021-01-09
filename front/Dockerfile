FROM node:10.13 AS build

ENV NODE_VERSION 10.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install
COPY . .
#RUN ng serve --port 80
RUN npm run build

EXPOSE 80
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/todolist-front /usr/share/nginx/html

