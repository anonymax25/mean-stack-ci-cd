FROM node:carbon as builder

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install

COPY . .

FROM node:carbon-alpine
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .
ENV ENV production
ENV MONGO_URL mongodb+srv://dev-moveup:@dev-mongo.debdw.mongodb.net/todo?retryWrites=true&w=majority
EXPOSE 8181

CMD [ "npm", "start" ]
